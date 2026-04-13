# 🌿 KeenKeeper

> **Your personal shelf of meaningful connections.**  
> Browse, tend, and nurture the relationships that matter most.

---

## 📖 Description

KeenKeeper is a relationship management web app that helps you stay connected with the people who matter most in your life. Track your last interactions, set contact goals, and never let an important friendship fade away — all in one clean, intuitive dashboard.

---

## 🚀 Live Demo

🔗 [keenkeeper.vercel.app](https://keenkeeper.vercel.app) *(update this after deployment)*

---

## ✨ Key Features

### 🎯 Smart Friend Tracking
Monitor every friendship with status indicators — **On-Track**, **Almost Due**, and **Overdue** — so you always know who needs your attention before it's too late.

### ⚡ Quick Check-In System
Log a **Call**, **Text**, or **Video** interaction with a single click from any friend's detail page. Every interaction is instantly recorded to your personal Timeline with a timestamp and toast notification.

### 📊 Friendship Analytics
Visualize your interaction habits through a beautiful **Recharts Pie Chart** on the Stats page — broken down by Call, Text, and Video — so you can reflect on how you're staying connected.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router |
| **React 19** | Component-based UI |
| **Tailwind CSS** | Utility-first styling |
| **DaisyUI** | Tailwind component library |
| **Recharts** | Interactive pie chart for analytics |
| **Lucide React** | Clean, consistent icons |
| **React Icons** | Social media icons in footer |

---

## 📁 Project Structure

```
kin-keeper-main/
├── public/
│   └── friends.json        # Friend data source
├── src/
│   └── app/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── Footer.jsx
│       ├── friends/
│       │   └── [id]/
│       │       └── page.jsx    # Friend detail page
│       ├── timeline/
│       │   └── page.jsx        # Timeline page
│       ├── stats/
│       │   └── page.jsx        # Analytics page
│       ├── layout.js
│       ├── page.js             # Home page
│       └── not-found.jsx       # 404 page
```

---

## 📦 Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/kin-keeper-main.git

# Navigate to project folder
cd kin-keeper-main

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Pages Overview

| Page | Route | Description |
|---|---|---|
| **Home** | `/` | Friend grid with stats summary |
| **Friend Details** | `/friends/[id]` | Profile, goals, quick check-in |
| **Timeline** | `/timeline` | Interaction history with filter |
| **Stats** | `/stats` | Pie chart analytics |
| **404** | `*` | Custom not found page |

---

## 🎨 Design Highlights

- **Responsive** — Works on mobile, tablet, and desktop
- **Loading animations** — Spinner and skeleton cards while fetching data
- **Toast notifications** — Instant feedback on every check-in
- **Active navbar** — Highlights the current page automatically
- **Status colors** — Red for overdue, yellow for almost due, green for on-track

---

## 👤 Author

**Your Name**  
📧 your.email@example.com  
🐙 [github.com/your-username](https://github.com/your-username)

---

<div align="center">
  <p>Made with ❤️ to keep friendships alive</p>
  <p><strong>KeenKeeper</strong> — © 2026 All rights reserved.</p>
</div>
