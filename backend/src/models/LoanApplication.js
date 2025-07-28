const mongoose = require('mongoose');

const LoanApplicationSchema = new mongoose.Schema({
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true },
  
  // Loan Details
  requestedAmount: { type: Number, required: true },
  loanPurpose: { type: String, required: true },
  repaymentPeriod: { type: Number, default: 12 },
  
  // Collateral Information
  collateralType: String,
  collateralValue: { type: Number, default: 0 },
  
  // Additional Income Sources
  additionalIncome: { type: Number, default: 0 },
  coApplicant: { type: Boolean, default: false },
  coApplicantIncome: { type: Number, default: 0 },
  
  // Application Status
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'under_review'], 
    default: 'pending' 
  },
  
  // AI Analysis Results
  result: {
    eligible: Boolean,
    grantedAmount: Number,
    repaymentMonths: Number,
    emi: Number,
    interestRate: Number,
    riskScore: Number,
    reason: String,
    
    // Financial Analysis
    totalMonthlyIncome: Number,
    debtToIncomeRatio: Number,
    
    // Detailed Risk Scores
    spendingHabitsScore: Number,
    financialStabilityScore: Number,
    lifestyleRiskScore: Number,
    employmentStabilityScore: Number,
    behavioralRiskScore: Number,
    
    // Spending Pattern Analysis
    mallSpendingRatio: Number,
    restaurantSpendingRatio: Number,
    savingsRatio: Number,
    spendingToIncomeRatio: Number,
    
    // Risk Analysis Breakdown
    analysis: {
      financialStability: String,
      spendingHabits: String,
      lifestyleRisk: String,
      employmentStability: String,
      behavioralRisk: String
    }
  },
  
  // Application Tracking
  applicationDate: { type: Date, default: Date.now },
  processedDate: Date,
  processedBy: String, // For future admin functionality
  
  // Additional Metadata
  ipAddress: String,
  userAgent: String,
  applicationSource: { type: String, default: 'web' }, // web, mobile, api
  
  // Notes and Comments
  adminNotes: String,
  customerNotes: String,
  
  // Document References (for future enhancement)
  documents: [{
    type: { type: String }, // pan_card, salary_slip, bank_statement, etc.
    filename: String,
    uploadedAt: { type: Date, default: Date.now },
    verified: { type: Boolean, default: false }
  }],

  // Repayment Tracking
  repaymentSchedule: [{
    dueDate: Date,
    amount: Number,
    paid: { type: Boolean, default: false },
    paidDate: Date
  }],
  active: { type: Boolean, default: true },
  closedDate: Date
}, { 
  timestamps: true 
});

// Index for better query performance
LoanApplicationSchema.index({ applicant: 1, applicationDate: -1 });
LoanApplicationSchema.index({ status: 1, applicationDate: -1 });

module.exports = mongoose.model('LoanApplication', LoanApplicationSchema);