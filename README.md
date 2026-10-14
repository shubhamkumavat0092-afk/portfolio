# Shubham Kumavat — Personal Portfolio & AI Assistant Website

> **Competition-Ready, Premium Personal Portfolio Website** for **Shubham Rajendra Kumavat**, B.Tech student in Artificial Intelligence & Data Science at **R. C. Patel Institute of Technology (RCPIT), Shirpur**.

Designed to faithfully mirror the provided modern reference UI layout featuring a dark navy fixed sidebar, orbital portrait animation, light-blue rounded card grid, functional floating AI assistant chatbot, and resume download.

---

## 🌟 Key Highlights & Implemented Features

1. **Pixel-Accurate Reference Design Alignment**:
   - Fixed dark navy sidebar (`#0B1B36`) on the left with circular profile avatar, display name, navigation links, and motivational quote: *"Small steps every day build big dreams."*
   - Light blue and crisp white card workspace (`#F8FAFD`, `#EAF3FF`, `#FFFFFF`).
   - Circular portrait with animated rotating orbital ring and the artistic slogan *"Better Code Bigger Dreams"*.
   - Six structured, rounded cards: **About Me**, **Education**, **Skills**, **Certificates & Workshops**, **Featured Projects**, and **Contact**.

2. **Source-of-Truth Identity & Academic Accuracy**:
   - Verified details from the official resume:
     - **B.Tech in Artificial Intelligence & Data Science (2025–2029)** at RCPIT, Shirpur.
     - **1st Semester SGPA: 9.03** | **2nd Semester SGPA: 9.45** (accurately labeled semester SGPA).
     - **HSC (12th)** at New English School, Jamner: **76.33%**.
     - **SSC (10th)** at Janata High School & Jr. College, Neri Bk.: **91.60%**.
     - Verified skills: C (Basic), Java (Basic), Python (Learning), SQL (Learning).
     - Verified certifications: NIELIT Python (2025), CodeChef OOPS through Java (2026), GDG Think in C, Converges'26.

3. **Featured Project — RCPIT College Query Chatbot**:
   - Status: **Ongoing (30% Complete)**.
   - Exact GitHub Repository: `https://github.com/shubhamkumavat0092-afk/RCPIT-College-Query-Chatbot`.
   - Team members acknowledged: Shubham Rajendra Kumavat, Jidnyesha Bharat Patil, Soham Kailas Borole, Sneha Manoj Barade.
   - Interactive modal with Problem Statement, Solution, and Architecture Flow Diagram (Student Query → Frontend UI → Flask API → Knowledge Base → SQLite Database).

4. **Functional Floating AI Assistant Chatbot**:
   - Compact launcher at bottom-right with pulsating online indicator.
   - Expandable chat window matching the navy header and light-blue theme.
   - Pre-configured suggestion pills (*About Shubham*, *Skills*, *RCPIT Chatbot*, *Education*, *Certificates*, *Contact*).
   - Powered by a Flask backend (`/api/chat`) and backed by a full client-side fallback matching engine if viewed statically.

4. **Real Contact System & Resume Download**:
   - Contact form with client-side validation and backend submission (`/api/contact`) recording inquiries in a local SQLite database (`data/inquiries.db`).
   - Direct download button serving `Shubham_Rajendra_Kumavat_Resume.pdf`.

5. **Dynamic & Addable Certificates System**:
   - Organized certificate data structure separated from HTML layout (`data/certificates.json`).
   - Dynamically generated cards for every valid certificate entry.
   - Built-in **"+ Add Certificate"** modal form with backend persistence via `/api/certificates` and `localStorage` fallback.
   - Displays "View Certificate Document" and "Verify Credential Online" buttons **only** when an actual file or verification URL is provided.
   - Zero broken links, zero placeholder files.

6. **Night Theme — Faded Sky Blue & Deep Navy Atmosphere**:
   - Deep navy background (`#0B1728` - `#0E1E34`) with soft atmospheric sky-blue tint.
   - Cards in slightly lighter navy (`#122239`) with subtle sky-blue borders (`rgba(135, 206, 235, 0.18)`).
   - Soft sky-blue primary accent (`#87CEEB`), muted blue secondary accent (`#A9CFF5`).
   - Soft white main text (`#F1F6FC`) and muted blue-gray secondary text (`#B7C7D9`) for optimal readability.
   - Sky-blue accent buttons with high-contrast text (`#0B1728`) and subtle hover glows.
   - Coordinated chatbot and portrait orbital glow.
   - Fully persistent Light / Dark mode toggle in `localStorage`.

---

## 📁 Project Structure

```text
sk_portfolio/
├── app.py                      # Flask backend application (API routes, DB, static serving)
├── index.html                  # Standalone frontend entry (can be double-clicked directly!)
├── requirements.txt            # Python dependencies (Flask, Werkzeug)
├── README.md                   # Complete documentation and run instructions
├── data/
│   ├── certificates.json       # Dynamic certificates data store
│   ├── knowledge_base.json     # Structured knowledge base for the AI Assistant
│   └── inquiries.db            # SQLite database for contact form submissions
├── static/
│   ├── css/
│   │   └── style.css           # Premium stylesheet with Faded Sky Blue & Navy palette
│   ├── js/
│   │   └── script.js           # Interactive engine (Dynamic Certs, Chatbot, Theme, Modals)
│   ├── images/
│   │   ├── profile.jpg         # Shubham's actual profile portrait
│   │   └── reference_design.jpg # Visual reference screenshot
│   └── files/
│       └── Shubham_Rajendra_Kumavat_Resume.pdf # Shubham's official resume PDF
└── templates/
    └── index.html              # Jinja2 template served by Flask
```

---

## 📜 How to Add New Certificates Later

You can add certificates using **either** of these methods:

### Method 1: Using the Website Interface (Easiest)
1. Open the website at [http://127.0.0.1:5000](http://127.0.0.1:5000).
2. Scroll to the **Certificates & Workshops** section.
3. Click the **"+ Add Certificate"** button in the top right of the card.
4. Fill in:
   - **Title**: (e.g., `Machine Learning Specialization`)
   - **Issuing Organization**: (e.g., `Coursera / Stanford Online`)
   - **Year / Date**: (e.g., `2026`)
   - **Description**: *(Optional)*
   - **Key Skills**: *(Optional, comma-separated, e.g. `Python, Neural Networks`)*
   - **File Path**: *(Optional, e.g. `/static/files/ml_cert.pdf`)*
   - **Verification URL**: *(Optional, e.g. `https://coursera.org/verify/...`)*
5. Click **"Save Certificate"**. The new card is generated instantly and saved to `data/certificates.json`!

### Method 2: Editing `data/certificates.json` Directly
Open `data/certificates.json` and append an entry to the JSON list:
```json
{
  "id": "cert-aws-cloud-foundations",
  "title": "AWS Academy Cloud Foundations",
  "issuer": "Amazon Web Services",
  "year": "2026",
  "desc": "Hands-on fundamentals of cloud computing, storage, IAM, EC2, and S3 architectures.",
  "skills": ["Cloud Computing", "AWS EC2", "AWS S3", "IAM"],
  "file": "",
  "verificationUrl": ""
}
```
Reload your browser — the new certificate appears automatically!

---

## 🚀 How to Run the Website Locally

You have **two easy ways** to run this portfolio:

### Option A: Run with Flask (Recommended — Full Backend & DB)

1. Open **PowerShell** or **Command Prompt**.
2. Navigate to the project directory:
   ```powershell
   cd "C:\Users\Student.DESKTOP-H08PT5V\.gemini\antigravity\scratch\sk_portfolio"
   ```
   *(or if copied to Desktop)*:
   ```powershell
   cd "C:\Users\Student.DESKTOP-H08PT5V\Desktop\sk_portfolio"
   ```
3. Install required packages (if not already installed):
   ```powershell
   python -m pip install -r requirements.txt
   ```
4. Start the Flask application:
   ```powershell
   python app.py
   ```
5. Open your web browser and go to:
   **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

---

### Option B: Open Directly Without Python (Zero Setup)

You can also run this website without starting any terminal or server:
1. Open File Explorer and navigate to:
   `C:\Users\Student.DESKTOP-H08PT5V\.gemini\antigravity\scratch\sk_portfolio`
   *(or Desktop: `C:\Users\Student.DESKTOP-H08PT5V\Desktop\sk_portfolio`)*
2. Double-click on `index.html`.
3. It will open in Google Chrome, Microsoft Edge, or your default browser! All styling, images, resume download, modals, dark mode, and even the offline AI assistant will work seamlessly!

---

## 🔄 How to Replace Profile Photo & Resume Later

- **To update the profile picture**:
  Replace `static/images/profile.jpg` with your new picture (keep the filename `profile.jpg`).
- **To update your resume**:
  Replace `static/files/Shubham_Rajendra_Kumavat_Resume.pdf` with your new PDF (keep the filename `Shubham_Rajendra_Kumavat_Resume.pdf`).

---

## 🧪 Testing Checklist Verified

- [x] Profile photograph appears in both sidebar and hero sections.
- [x] Hero displays "Shubham Kumavat", formal details and footer display "Shubham Rajendra Kumavat".
- [x] Semester-wise SGPA (Sem 1: 9.03, Sem 2: 9.45) correctly labeled.
- [x] All 7 sidebar navigation links smoothly scroll to corresponding sections.
- [x] Download Resume button correctly downloads `Shubham_Rajendra_Kumavat_Resume.pdf`.
- [x] Dark/Light mode toggle smoothly changes colors and preserves preference in local storage.
- [x] External links to GitHub (`https://github.com/shubhamkumavat0092-afk`) and LinkedIn (`https://www.linkedin.com/in/shubham-kumavat-14868638a`) work with secure `rel="noopener noreferrer"`.
- [x] RCPIT College Query Chatbot displays accurate ongoing status (30%) and links to GitHub.
- [x] Interactive modals for Project Architecture and Certificates open and close smoothly.
- [x] AI Assistant Chatbot opens, responds intelligently to suggested and custom queries, and handles offline states.
- [x] Contact form validates inputs and records inquiries to SQLite database.
