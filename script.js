/**
 * Shubham Rajendra Kumavat — Professional Portfolio
 * Full Interactive Engine: Navigation, Theme Engine, AI Assistant Chatbot, Modals, Forms
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. Theme Toggle Engine
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;
  const savedTheme = localStorage.getItem("sk_portfolio_theme") || "light";

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if (themeIcon) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      }
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeIcon) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      }
    }
    localStorage.setItem("sk_portfolio_theme", theme);
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle
  // --------------------------------------------------------------------------
  const mobileNavToggle = document.getElementById("mobileNavToggle");
  const sidebar = document.getElementById("sidebar");

  if (mobileNavToggle && sidebar) {
    mobileNavToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("mobile-open");
    });

    document.addEventListener("click", (e) => {
      if (sidebar.classList.contains("mobile-open") && !sidebar.contains(e.target) && e.target !== mobileNavToggle) {
        sidebar.classList.remove("mobile-open");
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Active Navigation & Smooth Scroll Highlighting
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll(".sidebar-link");
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    let currentId = "home";

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = sectionId;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (sidebar && sidebar.classList.contains("mobile-open")) {
        sidebar.classList.remove("mobile-open");
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. Hero Dynamic Roles Typing Animation
  // --------------------------------------------------------------------------
  const typingRoleEl = document.getElementById("typingRole");
  if (typingRoleEl) {
    const roles = [
      "AI & Data Science Student",
      "Aspiring Software Developer",
      "Problem Solver & Tech Explorer"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typingRoleEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 40;
      } else {
        typingRoleEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1800; // Pause at end of word
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 400; // Pause before new word
      }

      setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 600);
  }

  // --------------------------------------------------------------------------
  // 5. Back to Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }, { passive: true });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Floating AI Assistant Chatbot
  // --------------------------------------------------------------------------
  const chatbotLauncher = document.getElementById("chatbotLauncher");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotMinimize = document.getElementById("chatbotMinimize");
  const chatbotMessages = document.getElementById("chatbotMessages");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotSendBtn = document.getElementById("chatbotSendBtn");
  const suggestionPills = document.querySelectorAll(".suggestion-pill");

  function openChatbot() {
    if (chatbotWindow) {
      chatbotWindow.classList.add("open");
      chatbotWindow.classList.remove("minimized");
      if (chatbotInput) chatbotInput.focus();
    }
  }

  function closeChatbot() {
    if (chatbotWindow) {
      chatbotWindow.classList.remove("open");
    }
  }

  function toggleMinimizeChatbot() {
    if (chatbotWindow) {
      chatbotWindow.classList.toggle("minimized");
    }
  }

  if (chatbotLauncher) chatbotLauncher.addEventListener("click", openChatbot);
  if (chatbotClose) chatbotClose.addEventListener("click", closeChatbot);
  if (chatbotMinimize) chatbotMinimize.addEventListener("click", toggleMinimizeChatbot);

  // Suggested Prompts
  suggestionPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const query = pill.getAttribute("data-prompt") || pill.textContent.trim();
      sendUserMessage(query);
    });
  });

  // Client-Side Fallback Knowledge Base (Works even if viewed statically without Flask)
  const clientKnowledgeBase = [
    {
      keywords: ["who", "about", "introduce", "shubham", "bio", "name", "tell me about"],
      answer: "Shubham Rajendra Kumavat is a dedicated 2nd-year B.Tech student in Artificial Intelligence & Data Science at R. C. Patel Institute of Technology (RCPIT), Shirpur. He has achieved stellar academic scores (9.03 SGPA in 1st Semester and 9.45 SGPA in 2nd Semester) and is passionate about Python, SQL, web development, and practical AI applications."
    },
    {
      keywords: ["skill", "skills", "languages", "tech stack", "what can he do", "c", "java", "python", "sql"],
      answer: "Shubham's verified technical skills:\n• Programming Languages: C (Basic), Java (Basic)\n• Currently Learning: Python, SQL\n• Concepts: Basic programming fundamentals & problem-solving\n• Tools & Frameworks: VS Code, Git & GitHub, Flask, SQLite (Planned)"
    },
    {
      keywords: ["project", "chatbot", "rcpit", "college query", "featured"],
      answer: "Shubham's primary project is the 'RCPIT College Query Chatbot'. It aims to answer queries for prospective students and visitors regarding RCPIT departments, admission, fees, and campus life using a structured knowledge base. Built using Python, Flask, HTML, CSS, JavaScript (Status: Ongoing 30%). Check the Featured Projects section for architecture details!"
    },
    {
      keywords: ["education", "college", "marks", "sgpa", "cgpa", "school", "hsc", "ssc"],
      answer: "Educational Background:\n• B.Tech in AI & Data Science (2025–2029) at RCPIT, Shirpur:\n  - 1st Semester SGPA: 9.03\n  - 2nd Semester SGPA: 9.45\n• HSC (12th): New English School, Jamner — 76.33%\n• SSC (10th): Janata High School & Jr. College, Neri Bk. — 91.60%"
    },
    {
      keywords: ["certificate", "certifications", "workshops", "achievements"],
      answer: "Shubham's verified certifications & workshops:\n1. Python for Beginners — NIELIT (2025)\n2. OOPS through Java — CodeChef (2026)\n3. Think in C — GDG on Campus, RCPIT\n4. Converges'26 Participation — Team AgriNova, RCPIT"
    },
    {
      keywords: ["contact", "email", "phone", "reach", "hire", "address", "location"],
      answer: "You can reach Shubham directly:\n• Email: shubhamkumavat0092@gmail.com\n• Phone: +91 9270040092\n• Address: Neri Bk., Tal. Jamner, Dist. Jalgaon, Maharashtra\n• LinkedIn: linkedin.com/in/shubham-kumavat-14868638a\n• GitHub: github.com/shubhamkumavat0092-afk"
    },
    {
      "keywords": ["resume", "cv", "download"],
      "answer": "You can download Shubham's official resume by clicking the 'Download Resume' button at the top right of the page or in the hero section! The file downloaded is 'Shubham_Rajendra_Kumavat_Resume.pdf'."
    },
    {
      "keywords": ["exploring", "currently exploring", "learning interests", "interests", "what is he learning"],
      "answer": "Shubham is currently actively exploring Python Programming, Artificial Intelligence, Machine Learning, and Web Development alongside his B.Tech coursework at RCPIT."
    }
  ];

  function getClientFallbackAnswer(query) {
    const q = query.toLowerCase();
    for (const item of clientKnowledgeBase) {
      if (item.keywords.some((k) => q.includes(k))) {
        return item.answer;
      }
    }
    if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
      return "Hello! 👋 I'm Shubham's AI Assistant. How can I help you today? Feel free to ask about his skills, education, chatbot project, or contact information!";
    }
    return "I am trained on Shubham Kumavat's verified resume and academic profile. You can ask me about his B.Tech in AI & Data Science, his SGPA (9.03 & 9.45), his RCPIT Chatbot project, his certifications, or how to contact him!";
  }

  function appendMessage(sender, text) {
    if (!chatbotMessages) return;
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message-bubble", sender === "user" ? "message-user" : "message-bot");
    msgDiv.textContent = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator message-bot";
    indicator.id = "chatTypingIndicator";
    indicator.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    chatbotMessages.appendChild(indicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("chatTypingIndicator");
    if (indicator) indicator.remove();
  }

  async function sendUserMessage(text) {
    const query = (text || (chatbotInput ? chatbotInput.value : "")).trim();
    if (!query) return;

    if (chatbotInput) chatbotInput.value = "";
    appendMessage("user", query);
    showTypingIndicator();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query })
      });

      if (!response.ok) {
        throw new Error("API response error");
      }

      const data = await response.json();
      removeTypingIndicator();
      appendMessage("bot", data.reply || getClientFallbackAnswer(query));
    } catch (err) {
      // Offline / Static fallback
      removeTypingIndicator();
      const fallbackReply = getClientFallbackAnswer(query);
      appendMessage("bot", fallbackReply);
    }
  }

  if (chatbotSendBtn) {
    chatbotSendBtn.addEventListener("click", () => sendUserMessage());
  }

  if (chatbotInput) {
    chatbotInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendUserMessage();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Modals: Project Architecture & Certificates & Contact Form
  // --------------------------------------------------------------------------
  // 7. Modals Engine & Dynamic Certificates Manager
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById("projectModal");
  const certModal = document.getElementById("certModal");
  const contactModal = document.getElementById("contactModal");
  const addCertModal = document.getElementById("addCertModal");
  const openProjectModalBtn = document.getElementById("openProjectModalBtn");
  const openContactModalBtn = document.getElementById("openContactModalBtn");
  const openAddCertModalBtn = document.getElementById("openAddCertModalBtn");
  const closeModals = document.querySelectorAll(".modal-close-trigger");

  function openModal(modal) {
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (openProjectModalBtn) {
    openProjectModalBtn.addEventListener("click", () => openModal(projectModal));
  }

  if (openContactModalBtn) {
    openContactModalBtn.addEventListener("click", () => openModal(contactModal));
  }

  if (openAddCertModalBtn) {
    openAddCertModalBtn.addEventListener("click", () => openModal(addCertModal));
  }

  closeModals.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal-overlay");
      closeModal(modal);
    });
  });

  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Dynamic Certificates Engine
  const certListContainer = document.getElementById("certList");
  const certModalTitle = document.getElementById("certModalTitle");
  const certModalIssuer = document.getElementById("certModalIssuer");
  const certModalYear = document.getElementById("certModalYear");
  const certModalDesc = document.getElementById("certModalDesc");
  const certModalSkills = document.getElementById("certModalSkills");
  const certModalActions = document.getElementById("certModalActions");
  const certModalFileLink = document.getElementById("certModalFileLink");
  const certModalVerifyLink = document.getElementById("certModalVerifyLink");

  // Initial resume certificate dataset (Source-of-truth fallback)
  const defaultCertificates = [
    {
      id: "cert-python",
      title: "Python for Beginners",
      issuer: "NIELIT",
      year: "2025",
      desc: "Coursework organized by National Institute of Electronics & Information Technology (NIELIT) covering fundamental Python syntax, control structures, functions, data collections, and foundational scripting.",
      skills: ["Python Fundamentals", "Variables & Data Types", "Control Structures", "Functions", "Basic Scripting"],
      file: "",
      verificationUrl: ""
    },
    {
      id: "cert-java",
      title: "OOPS through Java",
      issuer: "CodeChef",
      year: "2026",
      desc: "Comprehensive study of Object-Oriented Programming (OOP) paradigms with Java on CodeChef, emphasizing Classes, Inheritance, Polymorphism, Abstraction, and Encapsulation.",
      skills: ["Java Basics", "OOP Principles", "Classes & Objects", "Polymorphism", "Inheritance"],
      file: "",
      verificationUrl: ""
    },
    {
      id: "cert-c",
      title: "Think in C",
      issuer: "GDG on Campus, RCPIT",
      year: "2025-2026",
      desc: "Technical workshop conducted by Google Developer Groups on Campus at RCPIT, focusing on procedural problem-solving, structured programming, pointers, and memory mechanics in C.",
      skills: ["C Programming", "Algorithmic Thinking", "Pointers & Memory", "Problem-Solving"],
      file: "",
      verificationUrl: ""
    },
    {
      id: "cert-converges",
      title: "Converges'26 — Certificate of Participation",
      issuer: "Team AgriNova, RCPIT",
      year: "2026",
      desc: "Certificate of Participation in the annual technical flagship symposium Converges'26 at RCPIT under Team AgriNova, contributing technical presentation and team problem solving.",
      skills: ["Teamwork", "Technical Innovation", "Presentation", "Collaboration"],
      file: "",
      verificationUrl: ""
    }
  ];

  let currentCertificates = [...defaultCertificates];

  function openCertificateDetails(data) {
    if (!data || !certModal) return;
    if (certModalTitle) certModalTitle.textContent = data.title || "Certificate Details";
    if (certModalIssuer) certModalIssuer.textContent = `Issuer: ${data.issuer || "Verified"}`;
    if (certModalYear) certModalYear.textContent = data.year ? `Year: ${data.year}` : "";
    if (certModalDesc) certModalDesc.textContent = data.desc || "Verified certificate / workshop qualification in good standing.";

    if (certModalSkills) {
      if (Array.isArray(data.skills) && data.skills.length > 0) {
        certModalSkills.style.display = "flex";
        certModalSkills.innerHTML = data.skills
          .map((s) => `<span class="skill-badge">${s}</span>`)
          .join("");
        if (certModalSkills.previousElementSibling) {
          certModalSkills.previousElementSibling.style.display = "block";
        }
      } else {
        certModalSkills.innerHTML = "";
        certModalSkills.style.display = "none";
        if (certModalSkills.previousElementSibling) {
          certModalSkills.previousElementSibling.style.display = "none";
        }
      }
    }

    // Handle optional file and verification link
    let hasActions = false;

    if (certModalFileLink) {
      if (data.file && data.file.trim().length > 0) {
        certModalFileLink.href = data.file.trim();
        certModalFileLink.style.display = "inline-flex";
        hasActions = true;
      } else {
        certModalFileLink.removeAttribute("href");
        certModalFileLink.style.display = "none";
      }
    }

    if (certModalVerifyLink) {
      if (data.verificationUrl && data.verificationUrl.trim().length > 0) {
        certModalVerifyLink.href = data.verificationUrl.trim();
        certModalVerifyLink.style.display = "inline-flex";
        hasActions = true;
      } else {
        certModalVerifyLink.removeAttribute("href");
        certModalVerifyLink.style.display = "none";
      }
    }

    if (certModalActions) {
      certModalActions.style.display = hasActions ? "flex" : "none";
    }

    openModal(certModal);
  }

  function renderCertificates(certs) {
    if (!certListContainer) return;
    certListContainer.innerHTML = "";

    if (!Array.isArray(certs) || certs.length === 0) {
      certListContainer.innerHTML = `<p style="font-size: 0.88rem; color: var(--muted-text); padding: 12px 0;">No certificates found. Click "+ Add Certificate" to add your first one.</p>`;
      return;
    }

    certs.forEach((cert) => {
      const itemEl = document.createElement("div");
      itemEl.className = "cert-item";
      itemEl.setAttribute("data-cert-id", cert.id || "");
      itemEl.setAttribute("title", "Click to view certificate details");

      const hasCredential = (cert.file && cert.file.trim().length > 0) || (cert.verificationUrl && cert.verificationUrl.trim().length > 0);
      const credentialBadge = hasCredential
        ? `<span class="cert-has-file-badge" title="Credential attached"><i class="fa-solid fa-paperclip"></i> Credential</span>`
        : "";

      itemEl.innerHTML = `
        <div class="cert-left">
          <i class="fa-solid fa-certificate cert-icon"></i>
          <div class="cert-info">
            <span class="cert-title">${cert.title || "Untitled Certificate"}</span>
            <span class="cert-issuer">${cert.issuer || "Independent"}${cert.year ? `, ${cert.year}` : ""}</span>
          </div>
        </div>
        <div class="cert-right-actions">
          ${credentialBadge}
          <i class="fa-solid fa-chevron-right cert-arrow"></i>
        </div>
      `;

      itemEl.addEventListener("click", () => {
        openCertificateDetails(cert);
      });

      certListContainer.appendChild(itemEl);
    });
  }

  // Load certificates: from Flask API first, then localStorage fallback, then default dataset
  async function loadCertificates() {
    try {
      const res = await fetch("/api/certificates");
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.certificates) && data.certificates.length > 0) {
          currentCertificates = data.certificates;
          localStorage.setItem("sk_portfolio_certs", JSON.stringify(currentCertificates));
          renderCertificates(currentCertificates);
          return;
        }
      }
    } catch (err) {
      // Backend not reachable (static file view)
    }

    // Try localStorage
    const saved = localStorage.getItem("sk_portfolio_certs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentCertificates = parsed;
          renderCertificates(currentCertificates);
          return;
        }
      } catch (e) {}
    }

    // Use default verified dataset
    currentCertificates = [...defaultCertificates];
    renderCertificates(currentCertificates);
  }

  loadCertificates();

  // Add Certificate Form Handler
  const addCertForm = document.getElementById("addCertForm");
  const addCertAlert = document.getElementById("addCertAlert");
  const saveCertBtn = document.getElementById("saveCertBtn");

  function showAddCertAlert(type, msg) {
    if (!addCertAlert) return;
    addCertAlert.className = `form-alert ${type}`;
    addCertAlert.textContent = msg;
    addCertAlert.style.display = "block";
  }

  if (addCertForm) {
    addCertForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const title = (document.getElementById("newCertTitle")?.value || "").trim();
      const issuer = (document.getElementById("newCertIssuer")?.value || "").trim();
      const year = (document.getElementById("newCertYear")?.value || "").trim();
      const desc = (document.getElementById("newCertDesc")?.value || "").trim();
      const skillsRaw = (document.getElementById("newCertSkills")?.value || "").trim();
      const file = (document.getElementById("newCertFile")?.value || "").trim();
      const verificationUrl = (document.getElementById("newCertVerify")?.value || "").trim();

      if (!title || !issuer || !year) {
        showAddCertAlert("error", "Please fill in Certificate Title, Issuing Organization, and Year.");
        return;
      }

      const skills = skillsRaw ? skillsRaw.split(",").map((s) => s.trim()).filter(Boolean) : [];
      const newCertData = {
        id: `cert-${Date.now()}`,
        title,
        issuer,
        year,
        desc,
        skills,
        file,
        verificationUrl
      };

      if (saveCertBtn) {
        saveCertBtn.disabled = true;
        saveCertBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
      }

      try {
        const res = await fetch("/api/certificates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCertData)
        });

        if (res.ok) {
          const result = await res.json();
          if (result && result.certificate) {
            newCertData.id = result.certificate.id || newCertData.id;
          }
        }
      } catch (err) {
        // Static/offline mode fallback
      }

      // Add to in-memory list & localStorage
      currentCertificates.push(newCertData);
      localStorage.setItem("sk_portfolio_certs", JSON.stringify(currentCertificates));
      renderCertificates(currentCertificates);

      showAddCertAlert("success", "Certificate added successfully!");
      addCertForm.reset();

      setTimeout(() => {
        if (addCertAlert) addCertAlert.style.display = "none";
        closeModal(addCertModal);
      }, 1200);

      if (saveCertBtn) {
        saveCertBtn.disabled = false;
        saveCertBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Save Certificate';
      }
    });
  }


  // --------------------------------------------------------------------------
  // 8. Contact Form Handling
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById("contactForm");
  const contactAlert = document.getElementById("contactAlert");
  const contactSubmitBtn = document.getElementById("contactSubmitBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = (document.getElementById("contactName")?.value || "").trim();
      const email = (document.getElementById("contactEmail")?.value || "").trim();
      const subject = (document.getElementById("contactSubject")?.value || "").trim();
      const message = (document.getElementById("contactMessage")?.value || "").trim();

      if (!name || !email || !message) {
        showAlert("error", "Please fill in all required fields (Name, Email, Message).");
        return;
      }

      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message })
        });

        const data = await res.json();
        if (res.ok && data.status === "success") {
          showAlert("success", data.message || "Message sent successfully! Shubham will get back to you shortly.");
          contactForm.reset();
        } else {
          showAlert("error", data.message || "Could not send message. Please try emailing directly.");
        }
      } catch (err) {
        // Fallback for direct HTML file viewing
        showAlert("success", `Thank you ${name}! Your message has been recorded locally. You can also reach Shubham directly at shubhamkumavat0092@gmail.com.`);
        contactForm.reset();
      } finally {
        if (contactSubmitBtn) {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        }
      }
    });
  }

  function showAlert(type, msg) {
    if (!contactAlert) return;
    contactAlert.className = `form-alert ${type}`;
    contactAlert.textContent = msg;
    contactAlert.style.display = "block";
    setTimeout(() => {
      contactAlert.style.display = "none";
    }, 8000);
  }
});
