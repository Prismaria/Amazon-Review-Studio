# Privacy Policy for Amazon Review Studio

**Last Updated: March 10, 2026**

Amazon Review Studio ("the Extension") is a browser extension that enhances the Amazon review writing experience. This privacy policy explains how user data is collected, handled, stored, and shared.

## 1. Data Collection

The Extension accesses the following data on Amazon web pages:

- **Review text and titles** that the user types into the Amazon review editor.
- **Product information** (product title, ASIN) from the Amazon review page, used to associate saved drafts with the correct product.
- **Amazon Vine account statistics** (review counts, insightfulness score, media percentage, evaluation countdown, order counts) scraped from the user's own Vine account pages to display in the extension's dashboard popup.

The Extension does **not** collect:
- Personally identifiable information (name, email, address)
- Browsing history or activity outside of Amazon review pages
- Financial or payment information
- Authentication credentials (passwords, tokens for Amazon itself)
- Location data
- Health information

## 2. Data Handling

All data accessed by the Extension is processed **locally within the user's browser**. No data is transmitted to the developer or any developer-controlled server. There is no analytics, telemetry, or usage tracking of any kind.

When the user explicitly chooses to use optional third-party integrations (see Section 4), data is transmitted **directly from the user's browser to the third-party service**. The developer does not act as an intermediary and has no access to this data in transit or at rest.

## 3. Data Storage

All user data is stored **locally** on the user's device using the browser's built-in `chrome.storage` API. This includes:

- Saved review drafts (linked to product ASINs)
- Custom review templates and saved phrases
- User preferences and settings (UI theme, scaling, AI configuration)
- Cached Vine dashboard statistics (refreshed periodically)
- Pastebin API keys (if the user configures Cloud Sync)

No data is stored on any external server controlled by the developer.

## 4. Data Sharing

The Extension does **not** sell, transfer, or share any user data with third parties for any purpose, including advertising, analytics, or creditworthiness determination.

The following optional features, when explicitly configured and initiated by the user, transmit data directly to third-party services:

- **Cloud Sync (Pastebin):** If the user provides their own Pastebin API key and initiates a sync, review drafts, templates, and phrases are uploaded as "Unlisted" pastes to the user's personal Pastebin account. The developer has no access to the user's Pastebin account or its contents.
- **Image Hosting (Catbox.moe):** If the user chooses to upload images through the extension, those images are sent directly to Catbox.moe from the user's browser.
- **AI Writing Assistant (Google Gemini):** If the user provides their own Google Gemini API key and requests AI-generated content, the product title and user-provided instructions are sent directly to the Google Gemini API. The developer has no access to the user's API key or generated content.
- **AI Writing Assistant (Local LLM):** If the user connects to a locally-hosted AI model (e.g., Ollama or LM Studio), all data remains entirely on the user's own computer and never leaves their local network.

## 5. Security

- User-provided API keys (Pastebin, Gemini) are stored locally in the browser's extension storage and are never transmitted to the developer.
- Cloud Sync tokens are Base64-encoded and stored as Unlisted Pastebin pastes to prevent public discovery.
- All network requests to Amazon and third-party services use HTTPS encryption.

## 6. Changes to This Policy

Any updates to this privacy policy will be reflected in this document within the project repository. Users are encouraged to review this policy periodically.

## 7. Contact

If you have questions about this privacy policy or the Extension's data practices, you may review the full source code in the project's public repository or contact the developer through the Chrome Web Store listing.
