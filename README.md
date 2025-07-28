# Micro Credit App

## ✅ MongoDB Access

MongoDB Atlas access is provided to **Cartrabbit** team:

- **Username**: `cartrabbit`
- **Password**: `CreditAccess123`
- **Cluster**: MongoDB Cluster0
- **Database Name**: `micro_credit`

---

## 🚀 How to Run the Project (Step-by-Step Execution Guide)

### 📁 Project Structure

```
One_last_time/
├── backend/
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── uploads/
│   └── src/
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   └── validationMiddleware.js
│       ├── models/
│       │   ├── Applicant.js
│       │   └── LoanApplication.js
│       ├── routes/
│       │   ├── applicantRoutes.js
│       │   └── loanRoutes.js
│       └── services/
│           └── loanAlgo.js
├── frontend/
│   └── micro-credit-app/
│       ├── package.json
│       ├── package-lock.json
│       ├── public/
│       └── src/
│           ├── App.js
│           ├── index.js
│           ├── index.css
│           ├── css/
│           ├── api/
│           ├── context/
│           └── components/
│               ├── auth/
│               ├── common/
│               ├── dashboard/
│               ├── loan/
│               └── user/
└── README.md
```

---

### 🔧 Backend Setup

1. Go into backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add a `.env` file:
   ```ini
   MONGO_URI=mongodb+srv://cartrabbit:CreditAccess123@cluster0.dz6g8wp.mongodb.net/micro_credit?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=supersecretkey123
   PORT=5000
   ```
4. Start backend server:
   ```bash
   npm start
   ```
   > ✅ Server runs on `http://localhost:5000/api`

---

### 💻 Frontend Setup

1. Open a new terminal and go into frontend folder:
   ```bash
   cd frontend
   cd micro-credit-app
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start frontend app:
   ```bash
   npm start
   ```
   > ✅ Frontend runs on `http://localhost:3000`

---

## 📊 Sample Data for Testing

### ✅ Successful Loan Approval – Applicant JSON:
```json
{
  "email": "approved@example.com",
  "mobile": "9999999999",
  "password": "Test123!",
  "fullName": "Eligible Hero",
  "currentSalary": 80000,
  "groceryExpense": 6000,
  "rentAmount": 10000,
  "currentEMIs": 5000,
  "utilityBills": 2000,
  "dependents": 1,
  "employmentDuration": 3,
  "alcoholSmoker": false,
  "avgMonthlySavings": 15000,
  "avgCreditCardBill": 3000,
  "hasEmergencyFund": true,
  "requestedAmount": 250000
}
```

### ❌ Loan Rejection – Applicant JSON:
```json
{
  "email": "rejected@example.com",
  "mobile": "8888888888",
  "password": "Test123!",
  "fullName": "Risky Guy",
  "currentSalary": 15000,
  "groceryExpense": 4000,
  "rentAmount": 7000,
  "currentEMIs": 2000,
  "utilityBills": 1500,
  "dependents": 4,
  "employmentDuration": 0.5,
  "alcoholSmoker": true,
  "avgMonthlySavings": 1000,
  "avgCreditCardBill": 4000,
  "hasEmergencyFund": false,
  "requestedAmount": 200000
}
```

---

## 🔑 API Endpoints Summary

| Method | Endpoint                      | Description                  |
|--------|-------------------------------|------------------------------|
| POST   | `/api/applicant/register`     | Register new applicant       |
| POST   | `/api/applicant/login`        | Login & get JWT token        |
| GET    | `/api/applicant/profile`      | Get applicant profile        |
| POST   | `/api/applicant/profile`      | Update applicant profile     |
| POST   | `/api/applicant/loan/apply`   | Apply for loan               |

---

## 🧪 Testing Credentials

You can register and login with the above sample accounts or use your own email/password.

---

## 👨‍💻 Author

**Name**: Jaisurya M  
**Email**: jaisurya6392@gmail.com  
jaisurya.cb22@bitsathy.ac.in  
**Phone**: +91-9042089951  
**GitHub Repo**: github.com/JAISURYA10/micro-credit-app  
