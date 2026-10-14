import os
import re
import json
import sqlite3
from datetime import datetime
from flask import Flask, render_template, request, jsonify, send_from_directory, send_file

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
STATIC_DIR = os.path.join(BASE_DIR, "static")
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
DB_PATH = os.path.join(DATA_DIR, "inquiries.db")
KB_PATH = os.path.join(DATA_DIR, "knowledge_base.json")
CERTS_PATH = os.path.join(DATA_DIR, "certificates.json")

app = Flask(__name__, template_folder=TEMPLATES_DIR, static_folder=STATIC_DIR)

# Initialize SQLite database for contact inquiries
def init_db():
    try:
        os.makedirs(DATA_DIR, exist_ok=True)
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS inquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT,
                message TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                ip_address TEXT
            )
        ''')
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Database initialization note: {e}")

init_db()

# Load Knowledge Base
def load_kb():
    if os.path.exists(KB_PATH):
        try:
            with open(KB_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading knowledge base: {e}")
    return {}

KB = load_kb()

# Load & Save Certificates
def load_certs():
    if os.path.exists(CERTS_PATH):
        try:
            with open(CERTS_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading certificates: {e}")
    return []

def save_certs(certs):
    try:
        os.makedirs(DATA_DIR, exist_ok=True)
        with open(CERTS_PATH, "w", encoding="utf-8") as f:
            json.dump(certs, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Error saving certificates: {e}")
        return False

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/download-resume")
def download_resume():
    resume_path = os.path.join(STATIC_DIR, "files", "Shubham_Rajendra_Kumavat_Resume.pdf")
    if os.path.exists(resume_path):
        try:
            return send_file(
                resume_path,
                as_attachment=True,
                download_name="Shubham_Rajendra_Kumavat_Resume.pdf",
                mimetype="application/pdf"
            )
        except TypeError:
            return send_file(
                resume_path,
                as_attachment=True,
                attachment_filename="Shubham_Rajendra_Kumavat_Resume.pdf",
                mimetype="application/pdf"
            )
    return jsonify({"error": "Resume file not found"}), 404

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or request.form.to_dict()
    if not data:
        return jsonify({"status": "error", "message": "No data provided"}), 400

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    subject = (data.get("subject") or "General Inquiry").strip()
    message = (data.get("message") or "").strip()

    if not name or len(name) < 2:
        return jsonify({"status": "error", "message": "Please provide a valid name (at least 2 characters)."}), 400

    email_regex = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
    if not email or not re.match(email_regex, email):
        return jsonify({"status": "error", "message": "Please provide a valid email address."}), 400

    if not message or len(message) < 5:
        return jsonify({"status": "error", "message": "Please write a message with at least 5 characters."}), 400

    # Save to SQLite database
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        client_ip = request.remote_addr or "unknown"
        cursor.execute(
            "INSERT INTO inquiries (name, email, subject, message, timestamp, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
            (name, email, subject, message, datetime.now().strftime("%Y-%m-%d %H:%M:%S"), client_ip)
        )
        conn.commit()
        conn.close()
        return jsonify({
            "status": "success",
            "message": f"Thank you {name}! Your message has been sent successfully. Shubham will respond to {email} shortly."
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Failed to record message due to a server error. Please email directly at shubhamkumavat0092@gmail.com."
        }), 500

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True)
    if not data or "message" not in data:
        return jsonify({"status": "error", "reply": "Please provide a message."}), 400

    user_query = str(data.get("message", "")).strip()
    if not user_query:
        return jsonify({"status": "error", "reply": "Query cannot be empty."}), 400

    if len(user_query) > 500:
        return jsonify({"status": "error", "reply": "Message is too long. Please keep questions under 500 characters."}), 400

    query_lower = user_query.lower()
    kb = load_kb()

    # Smart response matching
    reply = None
    suggestions = [
        "Tell me about Shubham",
        "What are his technical skills?",
        "Explain the RCPIT College Query Chatbot",
        "What is his educational background?",
        "Which certificates has he completed?",
        "How can I contact him?"
    ]

    # Keyword check against FAQ list
    best_score = 0
    matched_answer = None

    for item in kb.get("faq", []):
        keywords = item.get("keywords", [])
        score = sum(1 for kw in keywords if kw in query_lower)
        if score > best_score:
            best_score = score
            matched_answer = item.get("answer")

    if best_score > 0 and matched_answer:
        reply = matched_answer
    else:
        # Fallback intent matching
        if any(w in query_lower for w in ["hi", "hello", "hey", "greetings"]):
            reply = "Hello! 👋 I'm Shubham's AI Assistant. How can I assist you with details regarding Shubham's projects, skills, education at RCPIT, or contact information?"
        elif any(w in query_lower for w in ["name", "who"]):
            reply = "I am representing Shubham Rajendra Kumavat, a 2nd-year B.Tech student in Artificial Intelligence & Data Science at R. C. Patel Institute of Technology, Shirpur."
        elif any(w in query_lower for w in ["sgpa", "cgpa", "marks", "score", "grade"]):
            reply = "Shubham has an impressive academic record:\n• 1st Semester SGPA: 9.03\n• 2nd Semester SGPA: 9.45\n• HSC (12th): 76.33%\n• SSC (10th): 91.60%"
        elif any(w in query_lower for w in ["bot", "rcpit", "query chatbot", "chatbot"]):
            reply = "Shubham is developing the 'RCPIT College Query Chatbot' with Python, Flask, HTML, CSS, and an organized knowledge base to assist prospective students with admissions, fees, and campus life queries. Status: Ongoing (30% complete)."
        elif any(w in query_lower for w in ["c", "java", "python", "sql", "code", "programming"]):
            reply = "Shubham's verified programming capabilities:\n• C (Basic)\n• Java (Basic with OOP concepts)\n• Currently Learning: Python and SQL\n• Tools: VS Code, Git & GitHub, Flask"
        elif any(w in query_lower for w in ["mail", "email", "phone", "number", "call", "reach"]):
            reply = "You can contact Shubham at:\n• Email: shubhamkumavat0092@gmail.com\n• Phone: +91 9270040092\n• Address: Neri Bk., Tal. Jamner, Maharashtra"
        else:
            reply = "I am trained on Shubham Kumavat's verified resume and academic profile. You can ask me about his B.Tech in AI & Data Science, his SGPA (9.03 & 9.45), his RCPIT Chatbot project, his certifications, or how to contact him!"

    return jsonify({
        "status": "success",
        "reply": reply,
        "suggestions": suggestions
    })

@app.route("/api/certificates", methods=["GET"])
def get_certificates():
    certs = load_certs()
    return jsonify({"status": "success", "certificates": certs})

@app.route("/api/certificates", methods=["POST"])
def add_certificate():
    data = request.get_json(silent=True) or request.form.to_dict()
    if not data:
        return jsonify({"status": "error", "message": "No certificate data provided."}), 400

    title = (data.get("title") or "").strip()
    issuer = (data.get("issuer") or "").strip()
    year = (data.get("year") or "").strip()
    desc = (data.get("desc") or "").strip()
    file_path = (data.get("file") or "").strip()
    verification_url = (data.get("verificationUrl") or "").strip()
    skills_raw = data.get("skills") or []

    if isinstance(skills_raw, str):
        skills = [s.strip() for s in skills_raw.split(",") if s.strip()]
    elif isinstance(skills_raw, list):
        skills = [str(s).strip() for s in skills_raw if str(s).strip()]
    else:
        skills = []

    if not title:
        return jsonify({"status": "error", "message": "Certificate title is required."}), 400
    if not issuer:
        return jsonify({"status": "error", "message": "Issuing organization is required."}), 400
    if not year:
        return jsonify({"status": "error", "message": "Issue date or year is required."}), 400

    clean_slug = re.sub(r'[^a-zA-Z0-9]+', '-', title.lower()).strip('-')
    new_id = f"cert-{clean_slug}-{int(datetime.now().timestamp())}"

    new_cert = {
        "id": new_id,
        "title": title,
        "issuer": issuer,
        "year": year,
        "desc": desc,
        "skills": skills,
        "file": file_path,
        "verificationUrl": verification_url
    }

    certs = load_certs()
    certs.append(new_cert)
    if save_certs(certs):
        return jsonify({
            "status": "success",
            "message": "Certificate added successfully!",
            "certificate": new_cert
        }), 201
    else:
        return jsonify({"status": "error", "message": "Failed to persist certificate."}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"* Shubham Kumavat's Portfolio Server running on http://127.0.0.1:{port}")
    app.run(host="127.0.0.1", port=port, debug=False)
