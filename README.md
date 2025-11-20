# ZeroFlow

ZeroFlow is a web-based calorie and nutrition tracking application built with Next.js 14, React, Prisma, and SQLite.  
The goal of the final project is to provide users with a clean, simple, and accurate way to log food, track daily calories, and monitor progress over time.

ZeroFlow focuses on three priorities:
1. A smooth and intuitive logging experience
2. Clear and helpful daily feedback
3. A clean visual interface without ads or clutter

This final project includes user authentication, a dashboard showing daily calorie data, a food search + logging workflow, and a weekly summary page.

---

## Features

### 1. Authentication
- Register an account  
- Log in and out securely  
- Passwords hashed using industry-standard methods  

### 2. Daily Calorie Target Calculation
- Basic TDEE estimation
- Goal selector: lose weight, maintain, gain
- Automatic daily calorie target displayed on the dashboard

### 3. Food Logging
- Users can:
  - Search the local food database
  - Add foods with serving sizes
  - View calories consumed for the current day
  - Delete entries

### 4. Dashboard
- Shows:
  - Calories consumed today
  - Calories remaining
  - Simple progress bar visualization

### 5. Weekly Summary
- Displays total calories logged each day
- Computes weekly averages

### 6. Clean, Modern UI
- Built with Next.js App Router
- Styled using Tailwind CSS
- Fully responsive on laptop and mobile

---

## Technologies Used

**Frontend & Backend Framework**
- Next.js 14 (App Router)

**Language**
- JavaScript

**Styling**
- Tailwind CSS

**Database**
- Prisma ORM
- SQLite (local file for CS50 submission)

**API Routes**
- Handle auth, food logging, summaries, and athlete calculations (athlete routes are unused in this final version but included for scalability)

---

## File Structure

├── DESIGN.md
├── README.md
├── app
│   ├── api
│   │   ├── athlete
│   │   │   └── calculate
│   │   │       └── route.js
│   │   ├── auth
│   │   │   ├── login
│   │   │   │   └── route.js
│   │   │   └── register
│   │   │       └── route.js
│   │   ├── food
│   │   │   ├── log
│   │   │   │   └── route.js
│   │   │   └── search
│   │   │       └── route.js
│   │   └── summary
│   │       └── route.js
│   ├── dashboard
│   │   └── page.jsx
│   ├── layout.jsx
│   ├── login
│   │   └── page.jsx
│   ├── page.jsx
│   └── register
│       └── page.jsx
├── next.config.js
├── package.json
├── prisma
│   └── schema.prisma
├── public
│   └── images
└── styles
    └── globals.css

---

## How to Run

1. Download the project zip or clone the repository.
2. Install dependencies:
- npm install

3. Initialize the database:
- npx prisma migrate dev --name init

4. Start the development server:
- npm run dev

5. Open the app at:
- http://localhost:3000


---

## Video Demo

[VideoLink]

Include:  
- Name  
- Year  
- Concentration  
- Project title  
- Quick walkthrough  

---

## Additional Notes

This final project includes structural space for future expansion (athlete-specific features, coach modes, modular dashboards), but the submitted implementation focuses on the required core functionality for CS50.  
Only the features shown above are implemented in this final version.


