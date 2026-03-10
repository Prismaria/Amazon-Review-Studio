# Privacy Policy for Amazon Review Studio

**Last Updated: March 9, 2026**

Amazon Review Studio is designed with a "Privacy-First" architecture. We believe that your reviews, drafts, and account statistics are your business, not ours.

## 1. Data Collection and Usage
Amazon Review Studio **does not collect, store, or transmit** any personal data to the developer or any central servers. 

*   **Review Drafts:** When you type a review, the text is saved locally in your browser's storage (using the `chrome.storage` API). This data never leaves your device unless you explicitly use the "Cloud Sync" feature.
*   **Vine Statistics:** The extension's dashboard periodically scrapes your Vine account metrics (such as evaluation countdowns and review ratios) for display in the popup. This information is stored only in your browser's local cache and is never shared.
*   **Media:** Images you paste or drag into the editor are handled entirely within your browser session.

## 2. Third-Party Integrations (Optional)
The extension provides optional features that interact with third-party services. These only activate if you provide your own API keys or accounts:

*   **Cloud Sync (Pastebin):** If configured, your drafts and templates are synced to your personal Pastebin account as "Unlisted" pastes. We do not have access to your Pastebin account or its contents.
*   **Image Hosting (Catbox.moe):** If used, images are uploaded directly from your browser to Catbox.moe. 
*   **AI Writing Assistant (Google Gemini / Local LLM):** 
    *   If using **Google Gemini**, the text you explicitly send for generation is transmitted directly to Google. 
    *   If using **Local LLMs** (Ollama/LM Studio), all AI processing happens entirely on your own computer and never touches the internet.

## 3. Permissions
The extension requests only the minimum permissions necessary to function:
*   `storage`: To save your drafts and settings locally.
*   `alarms`: To update your dashboard stats in the background.
*   `declarativeNetRequest`: To allow image uploads to your chosen hosting service.
*   `host_permissions`: To allow the extension to function on Amazon domains and communicate with your chosen sync/AI endpoints.

## 4. No Tracking
We do not use analytics, tracking pixels, or any telemetry to monitor your usage of the extension.

## 5. Changes to This Policy
Because this extension has no central server and does not collect data, any future changes to this policy will be minor and will be reflected here in the project repository.

## 6. Contact
If you have any questions regarding your privacy, you can view the source code of this extension directly on our GitHub repository to verify our data handling practices.
