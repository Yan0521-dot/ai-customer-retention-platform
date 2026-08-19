# 🤖 AI Customer Retention Platform


An AI-powered customer retention platform that helps businesses identify customers at risk of churning and connects them with verified solution partners to improve customer retention.


Built during the **TalentLabs Hackathon 2026**.


---


# 📖 Overview


Customer retention is often more cost-effective than acquiring new customers, yet many SMEs struggle to identify which customers are likely to leave.


This platform leverages **Google Gemini 3.6 Flash** to analyze customer datasets, predict churn risk, explain why customers may leave, recommend retention strategies, and connect businesses with verified solution providers.


---


# 🎯 Problem Statement


Many businesses:


- Lack insights into customer churn.
- Store customer data without extracting meaningful insights.
- Do not know which retention strategies work best.
- Have difficulty finding trusted service providers to improve customer engagement.


Without actionable insights, businesses risk losing customers and revenue.


---


# ✨ Features


## 🧠 AI Customer Churn Analysis


- Upload customer datasets in CSV format.
- AI analyzes customer behaviour.
- Predicts customer churn risk.
- Explains why customers are likely to churn.
- Generates actionable retention recommendations.
- Recommends relevant solution partner categories.


---


## 📊 Interactive Dashboard


- Customer churn overview
- Revenue insights
- Customer engagement analytics
- Churn statistics
- AI-generated business summary


---


## 🤝 Solution Partner Marketplace


Verified businesses can register as solution partners.


Examples include:


- Marketing Agencies
- CRM Providers
- Loyalty Program Vendors
- Customer Support Services
- Analytics Providers
- Automation Services
- Business Consultants


Businesses receive recommendations based on their AI analysis results.


---


## 🔐 Authentication


- Secure email/password authentication
- Email verification
- Business accounts
- Solution Partner accounts
- Separate dashboards for businesses and partners


---


## ☁ Cloud Database

app/
├── api/
├── dashboard/
├── login/
├── partner/
├── register/
├── upload/

components/
lib/
public/
screenshots/



Clone the repository

git clone https://github.com/Yan0521-dot/ai-customer-retention-platform.git

Navigate into the project

cd ai-customer-retention-platform

Install dependencies

npm install

Create a .env.local file

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url


NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key


GEMINI_API_KEY=your_gemini_api_key

Start the development server

npm run dev

Open

http://localhost:3000



👥 Team Members
Aathityan
Amira
Hamesh
Omar





🔮 Future Improvements
Real-time churn prediction
Fine-tuned machine learning models
CRM integrations
Email marketing automation
WhatsApp customer engagement
Subscription payment integration
Multi-language support
Advanced analytics dashboard
Real-time notifications



🌍 Target Users
Small and Medium Enterprises (SMEs)
Restaurants
Cafés
Retail Businesses
E-commerce Stores
Service Providers
Marketing Agencies




💡 Why Our Solution?

Unlike traditional dashboards that only visualize customer data, our platform:

Uses AI to predict customer churn.
Explains why customers may leave.
Provides actionable retention recommendations.
Connects businesses with verified solution partners.
Combines AI analytics and business networking in a single platform.




📄 License

This project was developed for the TalentLabs Hackathon 2026 for educational and demonstration purposes.



I think this version is **presentation-ready (around 9.8/10)** for a hackathon submission. The only thing missing would be replacing the screenshot placeholders with your actual screenshots if the filenames differ.
