# 🏥 CareCommand — Fatigue-Aware Patient Handover Dashboard

## 📌 Overview

CareCommand is a patient dashboard designed to reduce **cognitive overload and fatigue during clinical handovers**.

During shift changes, clinicians are required to process large volumes of patient data quickly — often leading to missed details, delayed actions, and increased mental strain.

This project focuses on transforming raw patient data into **clear, prioritized, and actionable insights**.

---

## 🎯 Problem

Clinical handovers are high-risk moments where:

* Critical information can be overlooked
* Alerts become overwhelming (alert fatigue)
* Time-sensitive actions are missed
* Clinicians experience decision fatigue

CareCommand addresses this by **highlighting what matters most, when it matters most**.

---

## 💡 Solution

A dashboard that:

* Prioritizes patients based on urgency
* Surfaces critical alerts intelligently
* Summarizes key patient information
* Visualizes time-sensitive events
* Reduces unnecessary cognitive load

---

## ⚙️ Features

### 🧠 Fatigue-Aware Design

* Priority-based patient sorting
* Visual risk indicators (color-coded severity)
* Focused, minimal UI to reduce overload

### 🚨 Smart Alerts

* Triage alerts with severity levels
* Reduced alert clutter (designed for future filtering/deduplication)

### ⏱️ Time-Sensitive Tracking

* Post-operative countdown timers
* Highlighting of imminent tasks

### 📊 Patient Monitoring

* Vitals visualization
* Key metrics at a glance

### 🧾 Handover Summaries

* Condensed, readable patient summaries
* Designed for quick scanning under pressure

---

## 🏗️ Tech Stack

* **Frontend:** React + TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Data:** Mock data (simulating real clinical scenarios)

---

## 📂 Project Structure

```bash
src/
│── components/        # Reusable UI components
│   ├── HandoverCard
│   ├── PatientCard
│   ├── TriageAlertItem
│   ├── PostOpCountdown
│   └── VitalsChart
│
│── data/              # Mock datasets
│   ├── mockPatients.ts
│   ├── mockAlerts.ts
│   └── mockHandover.ts
│
│── hooks/             # Custom React hooks
│   └── useTriageAlerts.ts
│
│── pages/             # Main views
│
│── utils/             # Helper functions
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/carecommand.git
cd carecommand
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🌍 Deployment

To build for production:

```bash
npm run build
```

The output will be in the `dist/` folder, ready for deployment on platforms like Vercel or Netlify.

---

## 🔬 Future Improvements

* AI-generated patient summaries
* Risk prediction models
* Alert deduplication and smart filtering
* Integration with real clinical data sources
* User-specific customization (role-based views)
* Fatigue tracking metrics

---

## 🧠 Design Philosophy

This project is built around one core principle:

> **“Don’t show more data — show better decisions.”**

Every feature aims to reduce:

* Time to understand a patient
* Mental effort required to prioritize
* Risk of missing critical information

---


---

## 🤝 Contributing

This is currently a personal project, but suggestions and feedback are always welcome.

---

## 📄 License

MIT License

---

## ✨ Author

Built as part of a project exploring **health tech, human-centered design, and decision support systems**.
