const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Applicant = require('../models/Applicant');
const auth = require('../middleware/authMiddleware');
const { validateFields } = require('../middleware/validationMiddleware');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/profile-pictures';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Register
router.post(
  '/register',
  upload.single('profilePicture'),
  validateFields(['email', 'mobile', 'password', 'fullName']),
  async (req, res) => {
  try {
    const { email, mobile, password, fullName } = req.body;
    
    // Check if user already exists
    const existingUser = await Applicant.findOne({ 
      $or: [{ email }, { mobile }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email or mobile number already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const applicantData = {
      email,
      mobile,
      password: hashedPassword,
      fullName
    };

    // Store profile photo as Buffer in DB if uploaded
    if (req.file) {
      applicantData.profilePhoto = fs.readFileSync(req.file.path);
      applicantData.profilePhotoType = req.file.mimetype;
      fs.unlinkSync(req.file.path);
    }

    const applicant = new Applicant(applicantData);
    await applicant.save();
    
    res.status(201).json({ 
      message: 'Registration successful',
      user: {
        _id: applicant._id,
        email: applicant.email,
        fullName: applicant.fullName
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    const applicant = await Applicant.findOne({ email });
    if (!applicant) return res.status(404).json({ error: 'User not found' });
    const valid = await bcrypt.compare(password, applicant.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    
    console.log('Login successful for user ID:', applicant._id);
    const token = jwt.sign({ id: applicant._id, email: applicant.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('Generated token for user ID:', applicant._id);
    res.json({ 
      token, 
      email: applicant.email,
      fullName: applicant.fullName,
      _id: applicant._id.toString()
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Get Profile - now uses auth middleware
router.get('/profile', auth, async (req, res) => {
  try {
    console.log('Profile request - userId:', req.userId);
    const applicant = await Applicant.findById(req.userId);
    console.log('Found applicant:', applicant ? 'yes' : 'no');
    if (!applicant) return res.status(404).json({ error: 'User not found' });
    res.json(applicant);
  } catch (err) {
    console.error('Profile error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Update Profile - now uses auth middleware and supports photo upload
router.post(
  '/profile',
  auth,
  upload.single('profilePhoto'),
  validateFields([
    'fullName', 'address', 'panNumber', 'company', 'currentSalary',
    'employmentDuration', 'bankName', 'groceryExpense', 'currentEMIs',
    'dependents', 'gender', 'maritalStatus'
  ]),
  async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.profilePhoto = fs.readFileSync(req.file.path);
      updateData.profilePhotoType = req.file.mimetype;
      fs.unlinkSync(req.file.path);
    }
    const applicant = await Applicant.findByIdAndUpdate(req.userId, updateData, { new: true });
    if (!applicant) return res.status(404).json({ error: 'User not found' });
    res.json(applicant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Serve profile photo from DB
router.get('/profile-photo/:id', async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    if (!applicant || !applicant.profilePhoto) {
      return res.status(404).send('No photo');
    }
    res.set('Content-Type', applicant.profilePhotoType || 'image/jpeg');
    res.send(applicant.profilePhoto);
  } catch (err) {
    res.status(400).send('Error fetching photo');
  }
});

module.exports = router;