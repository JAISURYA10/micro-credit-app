const express = require('express');
const router = express.Router();
const Applicant = require('../models/Applicant');
const LoanApplication = require('../models/LoanApplication');
const { loanEligibilityAlgorithm } = require('../services/loanAlgo');
const auth = require('../middleware/authMiddleware');

const { validateFields } = require('../middleware/validationMiddleware');

router.post(
  '/apply',
  auth,
  validateFields(['requestedAmount', 'loanPurpose', 'repaymentPeriod']),
  async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.userId);
    if (!applicant) return res.status(404).json({ error: 'Applicant not found' });

    const loanData = req.body;
    const result = await loanEligibilityAlgorithm(applicant, loanData);

    // Generate repayment schedule if approved
    let repaymentSchedule = [];
    if (result.eligible) {
      const today = new Date();
      for (let i = 1; i <= result.repaymentMonths; i++) {
        const dueDate = new Date(today.getFullYear(), today.getMonth() + i, today.getDate());
        repaymentSchedule.push({
          dueDate,
          amount: result.emi,
          paid: false
        });
      }
    }

    const loan = new LoanApplication({
      applicant: applicant._id,
      requestedAmount: loanData.requestedAmount,
      loanPurpose: loanData.loanPurpose,
      repaymentPeriod: loanData.repaymentPeriod,
      collateralType: loanData.collateralType,
      collateralValue: loanData.collateralValue,
      additionalIncome: loanData.additionalIncome,
      coApplicant: loanData.coApplicant,
      coApplicantIncome: loanData.coApplicantIncome,
      status: result.eligible ? 'approved' : 'rejected',
      result,
      repaymentSchedule,
      active: result.eligible
    });

    await loan.save();
    res.status(201).json(result);
  } catch (err) {
    console.error('Loan application error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Get all loan applications for the logged-in user
router.get('/history', auth, async (req, res) => {
  try {
    const loans = await LoanApplication.find({ applicant: req.userId }).sort({ createdAt: -1 });
    res.json(loans);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all active loans and repayment schedules for the logged-in user
router.get('/active', auth, async (req, res) => {
  try {
    const loans = await LoanApplication.find({ applicant: req.userId, active: true, status: 'approved' });
    res.json(loans);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Mark an EMI as paid
router.post('/repayment/:loanId/:emiIndex', auth, async (req, res) => {
  try {
    const { loanId, emiIndex } = req.params;
    const loan = await LoanApplication.findOne({ _id: loanId, applicant: req.userId });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    if (!loan.repaymentSchedule || !loan.repaymentSchedule[emiIndex]) {
      return res.status(400).json({ error: 'Invalid EMI index' });
    }
    loan.repaymentSchedule[emiIndex].paid = true;
    loan.repaymentSchedule[emiIndex].paidDate = new Date();
    // If all EMIs are paid, mark loan as closed
    if (loan.repaymentSchedule.every(e => e.paid)) {
      loan.active = false;
      loan.closedDate = new Date();
    }
    await loan.save();
    res.json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
