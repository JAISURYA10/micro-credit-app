# 🏦 AI-Powered Micro Credit Application

A sophisticated micro-credit application that uses advanced AI algorithms to analyze spending patterns, lifestyle factors, and financial behavior to provide instant loan eligibility decisions for salaried individuals.

## 🚀 Features

### 🤖 AI-Driven Loan Eligibility System
- **Advanced Risk Assessment**: Multi-factor analysis including financial stability, spending patterns, lifestyle risks, employment stability, and behavioral factors
- **Spending Pattern Analysis**: Analyzes mall visits, restaurant spending, and overall spending discipline
- **Real-time Scoring**: Instant risk scoring with detailed breakdown of eligibility factors
- **Dynamic Interest Rates**: Interest rates adjusted based on risk assessment (10% - 18% p.a.)

### 📊 Comprehensive Profile Management
- **Detailed Data Collection**: 40+ data points including personal, employment, financial, and lifestyle information
- **Profile Picture Upload**: User profile pictures with secure file handling
- **Smart Validation**: Client-side and server-side validation for all fields
- **Progress Tracking**: Real-time profile completion percentage with weighted scoring

### 💳 Enhanced Loan Application
- **Multiple Loan Purposes**: Home renovation, education, medical emergency, business investment, vehicle purchase, wedding, vacation, debt consolidation
- **Collateral Support**: Optional collateral information (property, vehicle, gold, fixed deposits, insurance policies)
- **Co-Applicant Support**: Additional income sources and co-applicant information
- **Instant EMI Calculation**: Real-time EMI and total repayment calculations
- **Comprehensive Results**: Detailed analysis with risk scores and recommendations

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Theme Switching**: Light and dark mode with persistent storage
- **Mobile Navigation**: Hamburger menu with vertical sidebar for mobile devices
- **Smooth Animations**: CSS transitions and hover effects throughout
- **Accessibility**: Proper ARIA labels and keyboard navigation

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for password security
- **File Upload Security**: Secure profile picture uploads with validation
- **CORS Protection**: Cross-origin resource sharing protection

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing and navigation
- **Axios**: HTTP client for API communication
- **CSS3**: Custom CSS with CSS variables for theming
- **Local Storage**: Client-side data persistence

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing and verification
- **multer**: File upload handling
- **CORS**: Cross-origin resource sharing

## 📋 AI Algorithm Details

### Risk Assessment Categories (Weighted Scoring)

#### 1. Financial Stability (30% weight)
- **Income Analysis**: Monthly salary assessment with tiered scoring
- **Debt-to-Income Ratio**: Current EMIs and credit card bills analysis
- **Savings Pattern**: Monthly savings ratio evaluation
- **Emergency Fund**: Availability of emergency funds
- **Health Insurance**: Insurance coverage assessment

#### 2. Spending Patterns (25% weight)
- **Mall Spending**: Key indicator for discretionary spending
- **Restaurant Visits**: Dining out frequency and spending
- **Overall Spending Discipline**: Total spending to income ratio
- **Lifestyle Expenses**: Entertainment, travel, shopping patterns

#### 3. Lifestyle Risk (20% weight)
- **Health Habits**: Smoking and alcohol consumption
- **Gambling Habits**: Risk assessment for gambling behavior
- **Dependents**: Number of dependents impact
- **Housing Stability**: Home ownership vs. renting

#### 4. Employment Stability (15% weight)
- **Employment Duration**: Years of service assessment
- **Salary Growth**: Previous vs. current salary analysis
- **Industry Stability**: Stable vs. volatile industry classification
- **Job Security**: Employment history evaluation

#### 5. Behavioral Risk (10% weight)
- **Social Media Usage**: Digital lifestyle assessment
- **Online Shopping**: E-commerce behavior analysis
- **Credit Card Usage**: Financial discipline evaluation
- **Investment Portfolio**: Financial planning assessment

### Loan Purpose Risk Multipliers
- **Home Renovation**: 0.9x (Lower risk)
- **Education**: 0.85x (Lower risk)
- **Medical Emergency**: 0.8x (Lower risk)
- **Business Investment**: 1.2x (Higher risk)
- **Vehicle Purchase**: 1.1x (Moderate risk)
- **Wedding**: 1.3x (Higher risk)
- **Vacation**: 1.4x (Highest risk)
- **Debt Consolidation**: 1.0x (Neutral)

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend/micro-credit-app
npm install
npm start
```

### Environment Variables
Create `.env` file in backend directory:
```env
JWT_SECRET=your_jwt_secret_here
MONGO_URI=mongodb://localhost:27017/micro-credit-app
PORT=5000
```

## 📱 Application Flow

### 1. User Registration
- Email and mobile number validation
- Profile picture upload (optional)
- Password security requirements

### 2. Profile Completion
- **Personal Information**: Name, address, PAN, demographics
- **Employment Details**: Company, salary, duration, industry
- **Financial Information**: Bank details, savings, EMIs, credit score
- **Housing Information**: Ownership status, rent, utilities
- **Lifestyle Patterns**: Spending habits, mall visits, restaurant usage
- **Risk Factors**: Dependents, insurance, emergency funds
- **Behavioral Data**: Social media usage, online shopping, credit card usage

### 3. Loan Application
- Loan amount and purpose selection
- Repayment period choice (6-60 months)
- Collateral information (optional)
- Additional income sources
- Co-applicant details (optional)

### 4. AI Analysis & Results
- Instant eligibility determination
- Risk score calculation (0-100)
- Granted amount calculation
- EMI and interest rate determination
- Detailed analysis breakdown
- Recommendations and reasoning

## 🎯 Key Features Explained

### Mall Spending Analysis
As mentioned in the client requirements, mall spending is a key indicator:
- **Low Risk**: ≤5% of monthly income
- **Moderate Risk**: 5-15% of monthly income
- **High Risk**: >15% of monthly income

Example: A person with ₹20,000 salary visiting malls 4 times/month with ₹2,000-4,000 spending would have 40-80% of income going to mall expenses, indicating poor financial discipline.

### Profile Completion Weighting
- **Required Fields (70% weight)**: Essential information for loan assessment
- **Optional Fields (30% weight)**: Additional data for better risk assessment

### Real-time EMI Calculation
```javascript
EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
Where:
P = Principal amount
r = Monthly interest rate
n = Number of months
```

## 🔧 API Endpoints

### Authentication
- `POST /api/applicant/register` - User registration
- `POST /api/applicant/login` - User login
- `GET /api/applicant/profile-picture/:filename` - Serve profile pictures

### Profile Management
- `GET /api/applicant/profile` - Get user profile
- `POST /api/applicant/profile` - Update user profile

### Loan Application
- `POST /api/applicant/loan/apply` - Submit loan application

## 🎨 UI Components

### Responsive Navigation
- Desktop: Horizontal navigation with theme toggle
- Mobile: Hamburger menu with vertical sidebar
- Smooth transitions and animations

### Form Components
- Comprehensive profile form with 6 sections
- Enhanced loan application form
- Real-time validation and error handling
- Loading states and progress indicators

### Dashboard
- Profile completion progress
- Quick action cards
- Profile summary with key metrics
- User welcome section with profile picture

## 🔒 Security Features

### Authentication
- JWT token-based authentication
- Secure password hashing with bcrypt
- Token expiration and refresh mechanisms

### File Upload
- Secure profile picture uploads
- File type and size validation
- Secure file serving with proper headers

### Data Protection
- Input validation and sanitization
- CORS protection
- Environment variable management

## 📊 Database Schema

### Applicant Model
- Basic information (email, mobile, password, name)
- Personal details (address, PAN, demographics)
- Employment information (company, salary, duration)
- Financial data (bank, savings, EMIs, credit score)
- Housing information (ownership, rent, utilities)
- Lifestyle patterns (spending, mall visits, restaurants)
- Risk factors (dependents, insurance, habits)
- Behavioral data (social media, shopping, credit usage)
- AI-calculated scores (risk scores, completion percentage)

### Loan Application Model
- Loan details (amount, purpose, period)
- Collateral information (type, value)
- Additional income sources
- AI analysis results (eligibility, scores, reasoning)
- Application tracking and metadata

## 🚀 Deployment

### Backend Deployment
```bash
# Production build
npm run build

# Environment setup
NODE_ENV=production
JWT_SECRET=your_production_secret
MONGO_URI=your_production_mongodb_uri
```

### Frontend Deployment
```bash
# Production build
npm run build

# Serve static files
serve -s build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- **Machine Learning Integration**: Advanced ML models for better risk prediction
- **Credit Bureau Integration**: Real-time credit score verification
- **Document Upload**: KYC document management
- **Payment Integration**: EMI payment processing
- **Admin Dashboard**: Loan management and analytics
- **Mobile App**: React Native mobile application
- **Multi-language Support**: Internationalization
- **Advanced Analytics**: Business intelligence dashboard

## 📞 Support

For support and questions, please contact the development team.

---

**Built with ❤️ using modern web technologies and AI-driven algorithms** 