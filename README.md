# ☁️ Amazon Review Toolkit 2.0

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Tampermonkey-orange.svg)

**The review editor Amazon *should* have built.**

Amazon Review Toolkit 2.0 is a professional-grade editorial suite that transforms the standard Amazon review interface into a high-performance studio. It fixes the clunky, archaic parts of the review process while adding powerful editorial and AI tools for the more serious (or lazy) reviewers out there.

---

## ✨ Key Features

### 🏆 Essential Improvements (QoL)
*   **The "Review Candidate" Dashboard**: Instead of digging through endless order history, get a single, clean grid of everything you've bought that's waiting for a review. It’s the overview Amazon refuses to give you.
*   **Clipboard Image Paste (`Ctrl+V`)**: You shouldn't have to save a screenshot to your Downloads folder just to upload it for 5 seconds. Now you can just paste images directly from your clipboard like a modern human.
*   **Drag-and-Drop Media**: If you *do* have files, just toss them onto the editor. No more "Browse File" dialogs from 2005.
*   **Per-ASIN Draft Recovery**: Never lose a single word again. The toolkit remembers exactly what you were writing for *every* unique product. If your browser crashes or you close the tab, your draft is right where you left it.
*   **Full UI Scaling**: Whether you're on a 4K monitor or a laptop, adjust the toolkit from 50% to 150% so it looks exactly how you want it.
*   **Enhanced Editor**: A larger, resizable textarea synced perfectly with the native Amazon form.

### 📚 Template & Phrase Library
*   **Reusable Blueprints (Templates)**: If you always review tech with sections for "Build Quality" and "Performance," or houseware with "Durability," you can save those outlines and load them in one click. No more typing the same headers over and over.
*   **Power Snippets (Phrases)**: Your personal library of common snippets and "power words." Tired of typing *"The packaging was minimal and eco-friendly"*? Save it once, and insert it with a click whenever you need it.
*   **One-Click Insertion**: Instantly populate your review with your pre-defined structures and snippets.

### ✍️ Text Formatting Toolbar
*   **Unicode Styling**: Amazon only allows plain text, but we don't. Use **Bold**, *Italic*, and `Monospace` styles that actually show up on the live site by leveraging Unicode magic.
*   **Smart Lists**: Bullet points and numbered lists that actually work. Hit Enter, and the list continues. Hit Enter twice, and it stops. It’s the simple things that matter.

### ☁️ Cloud Sync & Recovery
*   **Secure Cloud Backup**: Sync your templates, phrases, and settings to the cloud (via Pastebin) so you're never starting from scratch on a new computer.
*   **Zero-Password Link**: No accounts to create. Use a unique "Recovery ID" to link your devices instantly.
*   **Account Discovery**: Already have a backup? The "Find ID" tool will hunt down your latest cloud token automatically.

### 🤖 AI-Powered Writing Studio (Optional)
*   **Flexible AI Providers**: Use world-class models like **Google Gemini** or connect to completely private, **Local LLMs** (via LM Studio/Ollama) to help beat writer's block.
*   **Vision-Language Analysis**: Stuck on how to describe a product? The AI can "look" at your product photos and offer objective critiques and descriptions.
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
