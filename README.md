# ☁️ Amazon Review Toolkit 2.0

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Tampermonkey-orange.svg)

A professional-grade, AI-enhanced writing studio for Amazon reviewers. This toolkit transforms the standard Amazon review interface into a high-performance editorial suite, leveraging advanced AI, cloud synchronization, and sophisticated text styling.

---

## ✨ Key Features

### 🤖 AI-Powered Writing Assistant
*   **Multi-Provider Engine**: Seamlessly switch between **Google Gemini** (pro-tier quality) and **Local LLMs** (via LM Studio/Oobabooga) for private, offline generation.
*   **Vision Support (VLM)**: Analyze uploaded product photos to generate context-aware descriptions and critiques.
*   **Contextual Scraper**: Automatically pulls product details (bullets, descriptions, titles) to provide the AI with deep product knowledge.
*   **Smart Tone & Length**: Tailor your review with rating-aware tones (from "Highly Critical" to "Enthusiastic") and precise length targets.

### ✍️ Professional Editorial Toolbar
*   **Unicode Styling**: Apply **Bold**, *Italic*, 𝒮𝑒𝓇𝒾𝒻, 𝓒𝓾𝓻𝓼𝓲𝓿𝓮, `Monospace`, and Ｗｉｄｅ text effects that work directly in Amazon's review fields.
*   **Smart Lists**: Manage bullet points and auto-incrementing numbered lists with intelligent line-handling.
*   **Templates & Phrases**: Build a library of reusable review structures and "Power Phrases" for consistent, high-quality output.

### ☁️ Cloud Sync & Recovery
*   **Pastebin Integration**: Securely backup your templates, phrases, and draft reviews to the cloud.
*   **Multi-Device Link**: Use the **Recovery Paste ID** system to sync your configuration across different browsers or computers without re-entering credentials.
*   **Per-ASIN Drafts**: Every product gets its own auto-saved draft, tied directly to the Amazon ASIN.

### 🖼️ Media & UX Enhancements
*   **Drag-and-Drop + Paste**: Drop files or paste images directly from your clipboard into the Amazon media uploader.
*   **Review Candidate Dashboard**: A streamlined view of your pending purchases with direct links and health indicators.
*   **UI Scaling**: Fully adjustable interface scale to fit your monitor and personal preference.

---

## 🚀 Installation

1.  **Install a Userscript Manager**:
    *   [Tampermonkey](https://www.tampermonkey.net/) (Recommended)
    *   [Violentmonkey](https://violentmonkey.github.io/)
2.  **Install the Script**:
    *   Download or copy the raw content of `dist/amazon-review-studio.user.js`.
    *   Create a new script in your manager and paste the code, or simply click the "Raw" button if viewing on GitHub.
3.  **Navigate to Amazon**: Head to your "Review Purchases" page or any "Create Review" page to see the Studio in action.

---

## ⚙️ Configuration

### AI Setup
*   **Google Gemini**: Enter your API key in the Settings Dashboard.
*   **Local LLM**: Point the toolkit to your local endpoint (e.g., `http://localhost:1234/v1`).

### Cloud Sync Setup
1.  Enter your Pastebin API Dev Key in the Cloud Sync settings.
2.  Click **Generate User Key** to link your account.
3.  **Backup to Cloud**: Save your key to the cloud to generate a **Recovery ID**. Save this ID! It's all you need to restore your setup on a new machine.

---

## 🛡️ Privacy & Security
*   **No Central Server**: All data flows directly between your browser, Amazon, Google/LM Studio, and Pastebin.
*   **Key Obfuscation**: Your Pastebin tokens are Base64 encoded and stored in **Unlisted** pastes to prevent public discovery while allowing easy recovery.

---

## 📄 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Acknowledgments
*   Built with **React 19**, **Vite**, and **Tailwind CSS**.
*   Built by **Prismaris** 2026.
