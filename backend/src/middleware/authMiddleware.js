const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token required' });

  const token = authHeader.split(' ')[1];
  console.log('Auth middleware - token received:', token ? 'yes' : 'no');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - decoded token:', decoded);
    req.userId = decoded.id;
    req.userEmail = decoded.email || decoded.id; // fallback
    console.log('Auth middleware - set userId:', req.userId);
    next();
  } catch (err) {
    console.error('Auth middleware - token verification failed:', err.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};