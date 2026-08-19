# 🤖 AI Customer Retention Platform

An AI-powered customer retention platform that helps businesses identify customers at risk of churning and connects them with verified solution partners to improve customer retention.

Built during the **TalentLabs Hackathon 2026**.

---

## 📖 Overview

Customer retention is often more cost-effective than acquiring new customers, yet many SMEs struggle to identify which customers are likely to leave.

Our platform leverages **Google Gemini AI** to analyze customer datasets, predict churn risk, explain why customers may leave, and recommend actionable retention strategies.

Additionally, businesses can connect with verified solution providers such as marketing agencies, CRM consultants, and loyalty program providers to help solve identified issues.

---

## 🎯 Problem Statement

Many businesses:

- Lack insights into customer churn.
- Store customer data without extracting meaningful information.
- Do not know which retention strategies work best.
- Have difficulty finding trusted service providers to improve customer engagement.

Without actionable insights, businesses lose customers and revenue.

---

# ✨ Features

### 🧠 AI Customer Churn Analysis
- Upload customer datasets in CSV format.
- AI analyzes customer behaviour.
- Detects customers at risk of leaving.
- Generates explanations using Google Gemini AI.

### 📊 Interactive Dashboard
- Customer risk overview
- Revenue insights
- Engagement charts
- Churn statistics
- AI-generated summaries

### 🤝 Solution Partner Marketplace
Verified businesses can register as solution partners.

Examples:

- Marketing Agencies
- CRM Providers
- Loyalty Program Vendors
- Business Consultants

Businesses receive recommendations based on their analysis results.

### 🔐 Authentication
- Secure email/password authentication
- Email verification
- Separate Business and Partner dashboards

### ☁ Cloud Database
All uploaded analyses and user information are securely stored using Supabase.

---

# 🛠 Tech Stack

### Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes

### Database
- Supabase
  - Authentication
  - PostgreSQL Database
  - Storage

### AI
- Google Gemini API

### Deployment
- Vercel

---

# 🏗 System Architecture

```text
Business User
      │
      ▼
Upload CSV Dataset
      │
      ▼
Next.js API
      │
      ▼
Google Gemini AI
      │
      ▼
Customer Risk Analysis
      │
      ▼
Supabase Database
      │
      ▼
Business Dashboard
      │
      ▼
Recommended Solution Partners
```

---

# 📂 Project Structure

```text
app/
components/
lib/
public/

├── Dashboard
├── Upload
├── Login
├── Register
├── Partner Dashboard
├── API Routes
└── Landing Page
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Yan0521-dot/ai-customer-retention-platform.git
```

Move into the project

```bash
cd ai-customer-retention-platform
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

# 🔑 Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

GEMINI_API_KEY=your_gemini_api_key
```

---

# 📷 Screenshots

## Landing Page

Add screenshot here.

```
/screenshots/landing.png
```

---

## Dashboard

Add screenshot here.

```
/screenshots/dashboard.png
```

---

## AI Analysis

Add screenshot here.

```
/screenshots/analysis.png
```

---

## Partner Dashboard

Add screenshot here.

```
/screenshots/partner-dashboard.png
```

---

# 👥 Team Members

- **Aathityan**
- **Yan**

---

# 🔮 Future Improvements

- Real-time churn prediction
- Machine learning model training
- CRM integrations
- Email marketing automation
- WhatsApp customer engagement
- Subscription payment integration
- Multi-language support
- Advanced analytics dashboard

---

# 🌍 Target Users

- Small and Medium Enterprises (SMEs)
- Restaurants
- Cafés
- Retail Businesses
- E-commerce Stores
- Service Providers
- Marketing Agencies

---

# 💡 Why Our Solution?

Unlike traditional dashboards that only visualize customer data, our platform:

- Uses AI to explain *why* customers may churn.
- Provides actionable recommendations.
- Connects businesses with verified solution partners.
- Combines analytics and business networking into one platform.

---

# 📄 License

This project was developed for the **TalentLabs Hackathon 2026** for educational and demonstration purposes.
