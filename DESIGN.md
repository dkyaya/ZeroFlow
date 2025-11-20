# ZeroFlow — Design Document

ZeroFlow is a nutrition-tracking application built using Next.js 14 with the App Router.  
This design document explains the system architecture, major technical choices, database schema, and reasoning behind the final project structure.

---

# 1. Overview

The purpose of this final project is to build a clean, modern, and efficient calorie-tracking tool that:
- authenticates users
- logs food entries
- computes daily calorie targets
- displays progress in an intuitive dashboard
- provides a weekly summary view

The system is intentionally modular so that new features (macro tracking, athlete presets, meal recommendations, coach mode) can be added later without refactoring the core.

---

# 2. Tech Stack and Rationale

### **Next.js 14 (App Router)**
Chosen because:
- it unifies frontend and backend into one framework
- API routes run server-side using the same directory structure
- excellent file-based routing
- React components are automatically optimized
- perfect for rapid development and easy deployment

### **Prisma ORM**
Chosen because:
- schema-first development
- makes SQLite easy to use
- prevents SQL injection and simplifies queries
- generates a type-safe client

### **SQLite**
Used because:
- CS50 projects must be self-contained
- no external services required
- Prisma works well with SQLite for development-scale applications

### **Tailwind CSS**
Chosen for:
- fast UI development
- responsive layouts with minimal boilerplate
- consistent design system

### **JavaScript**
Chosen for simplicity and compatibility with the full Next.js stack.

---

# 3. Architecture

ZeroFlow uses a clean separation of concerns:
- app/ (frontend pages + layouts)
- api/ (backend logic)
- prisma/ (database schema)
- styles/ (global stylesheet)
- public/ (images)


### Pages
- `/` → landing page  
- `/login` → login screen  
- `/register` → registration screen  
- `/dashboard` → main user dashboard  

### API Routes
Each API route handles one responsibility.

| Route | Purpose |
|-------|---------|
| `/api/auth/register` | Register new users |
| `/api/auth/login` | Authenticate users |
| `/api/food/search` | Look up foods in database |
| `/api/food/log` | Add/remove logged foods |
| `/api/summary` | Generate weekly summary |
| `/api/athlete/calculate` | (Not used in this final build) Placeholder |

---

# 4. Database Schema

The Prisma schema contains three core models:

### **User**
Stores profile and authentication data.

### **Food**
Stores local database of foods (name, calories).

### **FoodLog**
Stores individual food entries tied to user and day.

A simplified schema:

model User {
    id Int @id @default(autoincrement())
    email String @unique
    password String
    height Int?
    weight Int?
    goal String?
    logs FoodLog[]
}

model Food {
    id Int @id @default(autoincrement())
    name String
    calories Int
}

model FoodLog {
    id Int @id @default(autoincrement())
    userId Int
    foodId Int
    date DateTime
    servings Float
    user User @relation(fields: [userId], references: [id])
    food Food @relation(fields: [foodId], references: [id])
}


This schema supports:
- adding foods
- logging multiple foods per day
- calculating daily totals
- weekly summaries

---

# 5. Core Logic

### **Authentication**
Passwords are hashed with bcrypt server-side.  
Sessions use HTTP-only cookies for safety.

### **Daily Calorie Target**
A simplified TDEE formula is used:

- TDEE = 10weight + 6.25height - 5*age + 5


Adjusted based on selected goal:
- Lose: −300 to −500
- Maintain: baseline
- Gain: +300 to +500

### **Food Logging**
To log a food:
1. user selects food from local database  
2. chooses servings  
3. API creates a FoodLog entry  

Deleting logs is also supported.

### **Dashboard UI**
The dashboard queries:
- total calories consumed today
- daily target
- remaining calories

### **Weekly Summary**
The `/api/summary` route:
- groups logs by date
- totals daily calories
- returns a 7-day dataset

Displayed as:
- list view
- simple bar-like visualization

---

# 6. UI Design

The UI uses:
- card-based components
- clear calorie ring/progress bar
- simple search bar
- consistent spacing
- light/minimal interface

All pages share a global layout.

---

# 7. Future-Proofing

While the final project only implements the required features, the structure intentionally leaves room for:

- modular dashboard cards
- athlete-specific analytics
- coach/athlete account roles
- richer food database integrations
- macro tracking
- meal recommendations
- barcode scanning APIs

The `/api/athlete/*` route folder exists for future extensions but is inactive in this final version.

---

# 8. Why This Design Works

- The project fulfills all CS50 final project expectations.
- The architecture is clean, scalable, and realistic.
- The code is readable, maintainable, and well-structured.
- The UI is intuitive for everyday users.
- New features can be added without rewriting the core.

---

# 9. Conclusion

ZeroFlow is a complete, fully functional nutrition tracker built with modern web technologies and designed for extensibility.  
The final project implementation delivers a polishßed MVP while establishing a solid foundation for future development beyond the course.

