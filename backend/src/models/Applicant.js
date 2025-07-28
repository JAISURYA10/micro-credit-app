const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
  // Basic Information
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  profilePhoto: Buffer,
  profilePhotoType: String,
  
  // Personal Information
  address: String,
  panNumber: String,
  dateOfBirth: Date,
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'] },
  
  // Employment Information
  company: String,
  currentSalary: Number,
  previousSalary: Number,
  employmentDuration: Number, // in months
  industry: String,
  jobTitle: String,
  datePrevHike: Date,
  estimatedNextHike: Date,
  
  // Financial Information
  bankName: String,
  avgMonthlySavings: Number,
  currentEMIs: Number,
  avgCreditCardBill: Number,
  totalCreditLimit: Number,
  creditScore: Number,
  
  // Housing Information
  ownsHouse: Boolean,
  rentAmount: Number,
  utilityBills: Number,
  propertyValue: Number,
  
  // Lifestyle & Spending Patterns (AI-driven data points)
  groceryExpense: Number,
  mallVisitsPerMonth: Number,
  avgMallSpending: Number,
  restaurantVisitsPerMonth: Number,
  avgRestaurantSpending: Number,
  entertainmentExpense: Number,
  travelExpense: Number,
  shoppingExpense: Number,
  healthExpense: Number,
  educationExpense: Number,
  
  // Additional Risk Factors
  dependents: Number,
  healthInsurance: Boolean,
  hasEmergencyFund: Boolean,
  alcoholSmoker: Boolean,
  gamblingHabits: Boolean,
  investmentPortfolio: Number,
  
  // Social & Behavioral Factors
  socialMediaUsage: { type: String, enum: ['Low', 'Medium', 'High'] },
  onlineShoppingFrequency: { type: String, enum: ['Rarely', 'Sometimes', 'Often', 'Very Often'] },
  creditCardUsage: { type: String, enum: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'] },
  
  // Risk Assessment Scores (calculated by AI)
  spendingHabitsScore: Number, // 0-100
  financialStabilityScore: Number, // 0-100
  lifestyleRiskScore: Number, // 0-100
  overallRiskScore: Number, // 0-100
  
  // Profile Completion
  profileCompletionPercentage: { type: Number, default: 0 },
  lastProfileUpdate: Date,
  
  // Account Status
  isActive: { type: Boolean, default: true },
  accountCreatedAt: { type: Date, default: Date.now },
  
  // Verification Status
  emailVerified: { type: Boolean, default: false },
  mobileVerified: { type: Boolean, default: false },
  kycVerified: { type: Boolean, default: false }
}, { 
  timestamps: true 
});

// Calculate profile completion percentage
ApplicantSchema.methods.calculateProfileCompletion = function() {
  const requiredFields = [
    'fullName', 'address', 'panNumber', 'company', 'currentSalary',
    'employmentDuration', 'bankName', 'groceryExpense', 'currentEMIs',
    'ownsHouse', 'dependents', 'healthInsurance', 'hasEmergencyFund'
  ];
  
  const optionalFields = [
    'dateOfBirth', 'gender', 'maritalStatus', 'previousSalary', 'industry',
    'jobTitle', 'datePrevHike', 'estimatedNextHike', 'avgMonthlySavings',
    'avgCreditCardBill', 'totalCreditLimit', 'creditScore', 'rentAmount',
    'utilityBills', 'propertyValue', 'mallVisitsPerMonth', 'avgMallSpending',
    'restaurantVisitsPerMonth', 'avgRestaurantSpending', 'entertainmentExpense',
    'travelExpense', 'shoppingExpense', 'healthExpense', 'educationExpense',
    'alcoholSmoker', 'gamblingHabits', 'investmentPortfolio', 'socialMediaUsage',
    'onlineShoppingFrequency', 'creditCardUsage'
  ];
  
  let completedRequired = 0;
  let completedOptional = 0;
  
  requiredFields.forEach(field => {
    if (this[field] !== undefined && this[field] !== null && this[field] !== '') {
      completedRequired++;
    }
  });
  
  optionalFields.forEach(field => {
    if (this[field] !== undefined && this[field] !== null && this[field] !== '') {
      completedOptional++;
    }
  });
  
  const requiredWeight = 0.7; // 70% weight for required fields
  const optionalWeight = 0.3; // 30% weight for optional fields
  
  const requiredScore = (completedRequired / requiredFields.length) * requiredWeight;
  const optionalScore = (completedOptional / optionalFields.length) * optionalWeight;
  
  return Math.round((requiredScore + optionalScore) * 100);
};

module.exports = mongoose.model('Applicant', ApplicantSchema);