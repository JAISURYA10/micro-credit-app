const Applicant = require('../models/Applicant');

/**
 * Advanced AI-Driven Loan Eligibility Algorithm
 * 
 * This algorithm analyzes multiple factors to determine loan eligibility:
 * 1. Financial Stability (Income, Savings, Debt-to-Income Ratio)
 * 2. Spending Patterns (Mall visits, Restaurant spending, etc.)
 * 3. Lifestyle Risk Factors (Smoking, Gambling, etc.)
 * 4. Employment Stability (Duration, Industry, Salary growth)
 * 5. Behavioral Patterns (Social media usage, online shopping)
 * 6. Housing & Living Expenses
 * 7. Credit History & EMIs
 * 
 * The algorithm uses weighted scoring and machine learning principles
 * to predict repayment probability and determine optimal loan terms.
 */

const loanEligibilityAlgorithm = async (applicant, loanData) => {
  const {
    requestedAmount,
    loanPurpose,
    repaymentPeriod = 12,
    collateralType,
    collateralValue = 0,
    additionalIncome = 0,
    coApplicant = false,
    coApplicantIncome = 0
  } = loanData;

  // Initialize risk scores
  let financialStabilityScore = 0;
  let spendingHabitsScore = 0;
  let lifestyleRiskScore = 0;
  let employmentStabilityScore = 0;
  let behavioralRiskScore = 0;
  let overallRiskScore = 100; // Start with maximum risk

  // 1. FINANCIAL STABILITY ANALYSIS (30% weight)
  const totalMonthlyIncome = (applicant.currentSalary || 0) + additionalIncome + (coApplicant ? coApplicantIncome : 0);
  const monthlyEMIs = applicant.currentEMIs || 0;
  const creditCardBill = applicant.avgCreditCardBill || 0;
  const debtToIncomeRatio = totalMonthlyIncome > 0 ? (monthlyEMIs + creditCardBill) / totalMonthlyIncome : 1;
  
  // Financial stability scoring
  if (totalMonthlyIncome >= 50000) financialStabilityScore += 25;
  else if (totalMonthlyIncome >= 30000) financialStabilityScore += 20;
  else if (totalMonthlyIncome >= 20000) financialStabilityScore += 15;
  else if (totalMonthlyIncome >= 15000) financialStabilityScore += 10;
  else financialStabilityScore += 5;

  // Debt-to-income ratio analysis
  if (debtToIncomeRatio <= 0.2) financialStabilityScore += 25;
  else if (debtToIncomeRatio <= 0.3) financialStabilityScore += 20;
  else if (debtToIncomeRatio <= 0.4) financialStabilityScore += 15;
  else if (debtToIncomeRatio <= 0.5) financialStabilityScore += 10;
  else financialStabilityScore += 5;

  // Savings analysis
  const savingsRatio = totalMonthlyIncome > 0 ? (applicant.avgMonthlySavings || 0) / totalMonthlyIncome : 0;
  if (savingsRatio >= 0.3) financialStabilityScore += 25;
  else if (savingsRatio >= 0.2) financialStabilityScore += 20;
  else if (savingsRatio >= 0.1) financialStabilityScore += 15;
  else if (savingsRatio >= 0.05) financialStabilityScore += 10;
  else financialStabilityScore += 5;

  // Emergency fund analysis
  if (applicant.hasEmergencyFund) financialStabilityScore += 15;
  if (applicant.healthInsurance) financialStabilityScore += 10;

  // 2. SPENDING PATTERNS ANALYSIS (25% weight) - AI-driven lifestyle assessment
  const monthlySpending = (applicant.groceryExpense || 0) + 
                         (applicant.rentAmount || 0) + 
                         (applicant.utilityBills || 0) + 
                         (applicant.entertainmentExpense || 0) + 
                         (applicant.shoppingExpense || 0) + 
                         (applicant.travelExpense || 0) + 
                         (applicant.healthExpense || 0) + 
                         (applicant.educationExpense || 0);

  const spendingToIncomeRatio = totalMonthlyIncome > 0 ? monthlySpending / totalMonthlyIncome : 1;
  
  // Mall spending analysis (key indicator as mentioned in requirements)
  const mallSpendingPerMonth = (applicant.mallVisitsPerMonth || 0) * (applicant.avgMallSpending || 0);
  const mallSpendingRatio = totalMonthlyIncome > 0 ? mallSpendingPerMonth / totalMonthlyIncome : 0;
  
  if (mallSpendingRatio <= 0.05) spendingHabitsScore += 30;
  else if (mallSpendingRatio <= 0.1) spendingHabitsScore += 25;
  else if (mallSpendingRatio <= 0.15) spendingHabitsScore += 20;
  else if (mallSpendingRatio <= 0.2) spendingHabitsScore += 15;
  else if (mallSpendingRatio <= 0.25) spendingHabitsScore += 10;
  else spendingHabitsScore += 5;

  // Restaurant spending analysis
  const restaurantSpendingPerMonth = (applicant.restaurantVisitsPerMonth || 0) * (applicant.avgRestaurantSpending || 0);
  const restaurantSpendingRatio = totalMonthlyIncome > 0 ? restaurantSpendingPerMonth / totalMonthlyIncome : 0;
  
  if (restaurantSpendingRatio <= 0.05) spendingHabitsScore += 20;
  else if (restaurantSpendingRatio <= 0.1) spendingHabitsScore += 15;
  else if (restaurantSpendingRatio <= 0.15) spendingHabitsScore += 10;
  else spendingHabitsScore += 5;

  // Overall spending discipline
  if (spendingToIncomeRatio <= 0.6) spendingHabitsScore += 30;
  else if (spendingToIncomeRatio <= 0.7) spendingHabitsScore += 25;
  else if (spendingToIncomeRatio <= 0.8) spendingHabitsScore += 20;
  else if (spendingToIncomeRatio <= 0.9) spendingHabitsScore += 15;
  else spendingHabitsScore += 10;

  // 3. LIFESTYLE RISK ANALYSIS (20% weight)
  if (!applicant.alcoholSmoker) lifestyleRiskScore += 20;
  if (!applicant.gamblingHabits) lifestyleRiskScore += 20;
  if (applicant.hasEmergencyFund) lifestyleRiskScore += 15;
  if (applicant.healthInsurance) lifestyleRiskScore += 15;
  
  // Dependents analysis
  const dependents = applicant.dependents || 0;
  if (dependents <= 2) lifestyleRiskScore += 15;
  else if (dependents <= 4) lifestyleRiskScore += 10;
  else lifestyleRiskScore += 5;

  // Housing stability
  if (applicant.ownsHouse) lifestyleRiskScore += 15;

  // 4. EMPLOYMENT STABILITY ANALYSIS (15% weight)
  const employmentDuration = applicant.employmentDuration || 0;
  if (employmentDuration >= 60) employmentStabilityScore += 30; // 5+ years
  else if (employmentDuration >= 36) employmentStabilityScore += 25; // 3+ years
  else if (employmentDuration >= 24) employmentStabilityScore += 20; // 2+ years
  else if (employmentDuration >= 12) employmentStabilityScore += 15; // 1+ year
  else if (employmentDuration >= 6) employmentStabilityScore += 10; // 6+ months
  else employmentStabilityScore += 5;

  // Salary growth analysis
  const salaryGrowth = applicant.previousSalary > 0 ? 
    ((applicant.currentSalary - applicant.previousSalary) / applicant.previousSalary) * 100 : 0;
  
  if (salaryGrowth >= 20) employmentStabilityScore += 25;
  else if (salaryGrowth >= 10) employmentStabilityScore += 20;
  else if (salaryGrowth >= 5) employmentStabilityScore += 15;
  else if (salaryGrowth >= 0) employmentStabilityScore += 10;
  else employmentStabilityScore += 5;

  // Industry stability
  const stableIndustries = ['IT', 'Healthcare', 'Education', 'Government', 'Banking', 'Insurance'];
  if (stableIndustries.includes(applicant.industry)) employmentStabilityScore += 25;
  else employmentStabilityScore += 15;

  // 5. BEHAVIORAL RISK ANALYSIS (10% weight)
  // Social media usage (indicator of lifestyle)
  const socialMediaScore = applicant.socialMediaUsage === 'Low' ? 25 : 
                          applicant.socialMediaUsage === 'Medium' ? 20 : 15;
  behavioralRiskScore += socialMediaScore;

  // Online shopping frequency (spending behavior)
  const shoppingScore = applicant.onlineShoppingFrequency === 'Rarely' ? 25 :
                       applicant.onlineShoppingFrequency === 'Sometimes' ? 20 :
                       applicant.onlineShoppingFrequency === 'Often' ? 15 : 10;
  behavioralRiskScore += shoppingScore;

  // Credit card usage (financial discipline)
  const creditCardScore = applicant.creditCardUsage === 'Never' ? 25 :
                         applicant.creditCardUsage === 'Rarely' ? 20 :
                         applicant.creditCardUsage === 'Sometimes' ? 15 : 10;
  behavioralRiskScore += creditCardScore;

  // Investment portfolio (financial planning)
  if (applicant.investmentPortfolio > 0) behavioralRiskScore += 25;
  else behavioralRiskScore += 10;

  // CALCULATE OVERALL RISK SCORE
  const weightedScore = 
    (financialStabilityScore * 0.30) +
    (spendingHabitsScore * 0.25) +
    (lifestyleRiskScore * 0.20) +
    (employmentStabilityScore * 0.15) +
    (behavioralRiskScore * 0.10);

  overallRiskScore = Math.max(0, 100 - weightedScore);

  // LOAN PURPOSE RISK ADJUSTMENT
  const purposeRiskMultiplier = {
    'Home Renovation': 0.9,
    'Education': 0.85,
    'Medical Emergency': 0.8,
    'Business Investment': 1.2,
    'Vehicle Purchase': 1.1,
    'Wedding': 1.3,
    'Vacation': 1.4,
    'Debt Consolidation': 1.0,
    'Other': 1.1
  };

  const purposeMultiplier = purposeRiskMultiplier[loanPurpose] || 1.1;
  overallRiskScore = Math.min(100, overallRiskScore * purposeMultiplier);

  // DETERMINE ELIGIBILITY
  const eligible = overallRiskScore <= 65; // Stricter threshold for better risk management

  let grantedAmount = 0;
  let reason = '';
  let interestRate = 12; // Base interest rate

  if (eligible) {
    // Calculate maximum loan amount based on multiple factors
    const maxLoanByIncome = totalMonthlyIncome * 12 * 0.4; // 40% of annual income
    const maxLoanByCollateral = collateralValue * 0.8;
    const maxLoanByRiskScore = requestedAmount * (1 - (overallRiskScore / 100));
    
    let maxLoanAmount = Math.min(maxLoanByIncome, 1000000); // Cap at 10L
    
    if (collateralValue > 0) {
      maxLoanAmount = Math.max(maxLoanAmount, maxLoanByCollateral);
    }
    
    // Adjust based on risk score
    maxLoanAmount = Math.min(maxLoanAmount, maxLoanByRiskScore);
    
    grantedAmount = Math.min(requestedAmount, maxLoanAmount);
    
    // Interest rate adjustment based on risk score
    if (overallRiskScore <= 30) interestRate = 10;
    else if (overallRiskScore <= 45) interestRate = 12;
    else if (overallRiskScore <= 60) interestRate = 15;
    else interestRate = 18;
    
    reason = 'Loan approved based on comprehensive AI analysis of financial stability, spending patterns, and risk factors.';
  } else {
    if (overallRiskScore > 80) {
      reason = 'High risk profile - application denied due to poor financial discipline and spending patterns.';
    } else if (overallRiskScore > 70) {
      reason = 'Moderate risk profile - application denied. Consider improving savings and reducing discretionary spending.';
    } else {
      reason = 'Application denied - does not meet eligibility criteria. Focus on building financial stability.';
    }
  }

  // Calculate EMI
  const monthlyRate = interestRate / 12 / 100;
  const emi = grantedAmount * (monthlyRate * Math.pow(1 + monthlyRate, repaymentPeriod)) / 
              (Math.pow(1 + monthlyRate, repaymentPeriod) - 1);

  // Update applicant's risk scores
  applicant.spendingHabitsScore = Math.round(spendingHabitsScore);
  applicant.financialStabilityScore = Math.round(financialStabilityScore);
  applicant.lifestyleRiskScore = Math.round(lifestyleRiskScore);
  applicant.overallRiskScore = Math.round(overallRiskScore);
  applicant.profileCompletionPercentage = applicant.calculateProfileCompletion();
  applicant.lastProfileUpdate = new Date();
  
  await applicant.save();

  return {
    eligible,
    grantedAmount: Math.round(grantedAmount),
    repaymentMonths: repaymentPeriod,
    emi: Math.round(emi),
    interestRate: Math.round(interestRate * 100) / 100,
    riskScore: Math.round(overallRiskScore),
    reason,
    totalMonthlyIncome: Math.round(totalMonthlyIncome),
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 100) / 100,
    spendingHabitsScore: Math.round(spendingHabitsScore),
    financialStabilityScore: Math.round(financialStabilityScore),
    lifestyleRiskScore: Math.round(lifestyleRiskScore),
    employmentStabilityScore: Math.round(employmentStabilityScore),
    behavioralRiskScore: Math.round(behavioralRiskScore),
    mallSpendingRatio: Math.round(mallSpendingRatio * 100) / 100,
    restaurantSpendingRatio: Math.round(restaurantSpendingRatio * 100) / 100,
    savingsRatio: Math.round(savingsRatio * 100) / 100,
    spendingToIncomeRatio: Math.round(spendingToIncomeRatio * 100) / 100,
    analysis: {
      financialStability: getScoreDescription(financialStabilityScore),
      spendingHabits: getScoreDescription(spendingHabitsScore),
      lifestyleRisk: getScoreDescription(lifestyleRiskScore),
      employmentStability: getScoreDescription(employmentStabilityScore),
      behavioralRisk: getScoreDescription(behavioralRiskScore)
    }
  };
};

// Helper function to get score descriptions
const getScoreDescription = (score) => {
  if (score >= 80) return 'Excellent';
  else if (score >= 60) return 'Good';
  else if (score >= 40) return 'Fair';
  else if (score >= 20) return 'Poor';
  else return 'Very Poor';
};

module.exports = { loanEligibilityAlgorithm };