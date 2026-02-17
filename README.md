# ☁️ Amazon Review Studio

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Tampermonkey-orange.svg)

**The review editor Amazon *should* have built.**

Amazon Review Studio is a professional-grade editorial suite that transforms the standard Amazon review interface into a high-performance studio. It fixes the clunky, archaic parts of the review process while adding powerful editorial and AI tools for the more serious (or lazy) reviewers out there.

---

## ✨ Key Features

### 🏆 Essential Improvements (QoL)
*   **Modernized Interface**: A total visual overhaul that replaces Amazon's dated inputs with a sleek, premium editorial suite.
*   **Auto-Save Reviews**: This should’ve been an Amazon feature a decade ago. Every single character you type now is saved locally to its specific product (ASIN). If your browser crashes or you accidentally close the tab, your draft is right where you left it the second you open the review page for that product again.
*   **Clipboard Image Paste (`Ctrl+V`)**: You shouldn't have to save a screenshot to your Downloads folder just to upload it for 5 seconds. Now you can just paste images directly from your clipboard like a modern human.
*   **Drag-and-Drop Media**: If you *do* have files, just toss them onto the editor. No more "Browse File" dialogs from 2005.
*   **The Review Dashboard**: Instead of digging through endless order history, get a single, clean grid of everything you've bought recently that's waiting to be reviewed. 
*   **Full UI Scaling**: Whether you're on a 4K monitor or a laptop, adjust the toolkit from 50% to 100% so it looks exactly how you want it.

### 📚 Templates & Phrases

*   **What are Templates?:** Think of these as "Reusable Blueprints." For example, if you always review tech with sections for "Build Quality" and "Performance," or houseware with "Durability," you can now save those outlines and load them in one click. No more typing the same headers over and over.
*   **What are Phrases?:** Your personal library of common text snippets. Tired of typing "The packaging was minimal and eco-friendly"? Save it once and insert it with a click whenever you need it.
*   **One-Click Insertion**: Instantly populate your review with your pre-defined structures and snippets.

### ✍️ Text Formatting Toolbar
*   **Unicode Styling**: Amazon only allows plain text, but we don't. Use **Bold**, *Italic*, and `Monospace` styles that actually show up on the live site by leveraging Unicode voodoo magic.
*   **Smart Lists**: Bullet points and numbered lists that actually work. Hit Enter, and the list continues. Hit Enter twice, and it stops. 

### ☁️ Cloud Sync

*   **Decentralized Pastebin Integration**: Leverages your personal Pastebin account as a secure, decentralized storage backend. 
*   **On-Demand Review Backup**: Save and fetch review drafts (including titles) directly to the cloud. Drafts are linked to the product's unique ASIN, allowing you to seamlessly move between devices while keeping your work-in-progress synced.
*   **Multi-Device Synchronization**: Automatically syncs your library of custom templates and saved phrases across different browsers and computers.
*   **Built-in Quota Management**: Tracks Pastebin's daily API upload limits (20 pastes/day) and provides status warnings to prevent synchronization failures when reaching account caps.

### 🤖 AI-Powered Writing Studio (Optional)
*   **Flexible AI Providers**: Use world-class models like **Google Gemini** or connect to completely private, **Local LLMs** (via LM Studio/Ollama) to help beat writer's block.
*   **Authentic Headlines**: Generate titles that sound like they were written by a real customer, not a marketing robot.

---

## 🚀 Installation

1.  **Install a Userscript Manager**:
    *   [Tampermonkey](https://www.tampermonkey.net/) (Recommended)
    *   [Violentmonkey](https://violentmonkey.github.io/)
2.  **Install the Script**:
    *   Download or copy the raw content of `dist/amazon-review-studio.user.js` and add it to your manager.
3.  **Navigate to Amazon**: Head to your "Review Purchases" page or any "Create Review" page to see the Studio in action.

---

## ⚙️ Configuration

*   **UI Scaling**: Adjust the toolkit's size in the Settings dashboard.
*   **AI Setup**: Configure Gemini API keys or Local LLM endpoints in the AI Settings.
*   **Cloud Sync**: Enter your Pastebin API Dev Key to enable account-wide synchronization.

---

## 🛡️ Privacy & Security
*   **No Central Server**: All data flows directly between your browser, Amazon, Google/LM Studio, and Pastebin.
*   **Secure Obfuscation**: Your Pastebin tokens are Base64 encoded and stored as **Unlisted** pastes to prevent public discovery while allowing easy recovery.

---

## 📄 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Acknowledgments
*   Built with **React 19**, **Vite**, and **Tailwind CSS**.
*   Built by **Prismaris** 2026.
