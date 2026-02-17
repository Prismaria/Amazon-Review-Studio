import { settingsService } from './settings';

export interface AIResponse {
    text: string;
    error?: string;
}

export class AIService {
    private get settings() {
        return settingsService.getAll();
    }

    /**
     * Generates a review based on the provided prompt and optional image context.
     */
    async generateReview(prompt: string, images?: string[]): Promise<AIResponse> {
        const { amazon_ai_provider } = this.settings;

        try {
            if (amazon_ai_provider === 'gemini') {
                return await this.generateWithGemini(prompt, images);
            } else {
                return await this.generateWithLocalLLM(prompt, images);
            }
        } catch (error) {
            console.error('AI Generation Error:', error);
            return { text: '', error: (error as Error).message };
        }
    }

    /**
     * Generates a title based on the review body content.
     */
    async generateTitle(reviewBody: string, productTitle: string, starRating?: number): Promise<AIResponse> {
        const { amazon_review_title_style } = this.settings;

        const variationElements = [
            "Focus on the most surprising or unexpected aspect mentioned",
            "Emphasize the personal experience described",
            "Highlight the key decision factor mentioned in the review",
            "Focus on the practical utility or performance reported",
            "Reflect the overall sentiment and emotional tone"
        ];
        const randomVariation = variationElements[Math.floor(Math.random() * variationElements.length)];

        let toneInstructions = '';
        if (starRating) {
            const starText = starRating === 1 ? 'very negative' :
                starRating === 2 ? 'negative' :
                    starRating === 3 ? 'neutral/mixed' :
                        starRating === 4 ? 'positive' : 'very positive';
            toneInstructions = `TONE: Match the sentiment of a ${starRating}-star (${starText}) review. Being honest and direct based on the content provided.`;
        }

        const prompt = `You are an expert at creating concise Amazon review titles that sound like real customers. Based on the review body below, generate a title that captures the reviewer's authentic voice and experience.

REVIEW CONTENT:
"${reviewBody}"

PRODUCT:
${productTitle}

${toneInstructions}

REQUIREMENTS:
- The title must be faithful to the specific content and opinion expressed in the review.
- Absolutely NO marketing language. Avoid phrases like "game changer", "must have", "look no further", "It's not X, it's Y", or rhetorical questions. 
- You must never use em dashes (—).
- Capture the main sentiment honestly, using natural and conversational language.
- Avoid being too clinical or matter-of-fact
- STYLE: The title should be ${amazon_review_title_style === 'short' ? 'brief (3-6 words)' : 'descriptive (6-12 words)'}.
- ${amazon_review_title_style === 'titlecase' ? 'Format in Title Case.' : amazon_review_title_style === 'uppercase' ? 'Format in ALL CAPS.' : 'Format in standard sentence case.'}
- IMPORTANT: ${randomVariation}.
- ONLY return the title text. No conversational filler or quotes.

RESPONSE FORMAT: Return ONLY the title text.`;

        return this.generateReview(prompt);
    }

    private async generateWithLocalLLM(prompt: string, images?: string[]): Promise<AIResponse> {
        const {
            amazon_ai_llm_server_url,
            amazon_ai_local_text_model,
            amazon_ai_timeout_llm
        } = this.settings;

        // Note: For Local LLMs, vision support depends on the server (e.g. LM Studio / Ollama)
        // If it's a multimodal model, it might accept images in the messages array.
        // For now, we'll try sending an OpenAI-compatible multimodal request.

        const messages: any[] = [];
        const content: any[] = [{ type: 'text', text: prompt }];

        if (images && images.length > 0) {
            images.forEach(dataUrl => {
                content.push({
                    type: 'image_url',
                    image_url: {
                        url: dataUrl
                    }
                });
            });
        }

        messages.push({ role: 'user', content });

        const requestBody = {
            model: amazon_ai_local_text_model || 'local-model', // Fallback if not set
            messages: messages,
            temperature: 0.7,
            max_tokens: 1000
        };

        try {
            const response = await fetch(`${amazon_ai_llm_server_url}/v1/chat/completions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
                signal: AbortSignal.timeout(amazon_ai_timeout_llm)
            });

            if (!response.ok) {
                throw new Error(`Local LLM Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return { text: data.choices[0]?.message?.content || '' };
        } finally {
            // AbortSignal.timeout handles cleanup automatically, no need for clearTimeout
        }
    }

    private async generateWithGemini(prompt: string, images?: string[]): Promise<AIResponse> {
        const {
            amazon_ai_gemini_key,
            amazon_ai_gemini_model,
            amazon_ai_timeout_llm
        } = this.settings;

        if (!amazon_ai_gemini_key) {
            return { text: '', error: 'Gemini API key not found' };
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${amazon_ai_gemini_model}:generateContent?key=${amazon_ai_gemini_key}`;

        const parts: any[] = [{ text: prompt }];

        if (images && images.length > 0) {
            images.forEach(dataUrl => {
                const [header, data] = dataUrl.split(';base64,');
                const mimeType = header.replace('data:', '');
                parts.push({
                    inline_data: {
                        mime_type: mimeType,
                        data: data
                    }
                });
            });
        }

        const requestBody = {
            contents: [{
                parts: parts
            }]
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
                signal: AbortSignal.timeout(amazon_ai_timeout_llm)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || `Gemini API Error: ${response.status}`);
            }

            const data = await response.json();
            return { text: data.candidates?.[0]?.content?.parts?.[0]?.text || '' };
        } finally {
            // AbortSignal.timeout handles cleanup automatically
        }
    }

    /**
     * Tests connectivity to the selected AI provider.
     */
    async testConnection(): Promise<boolean> {
        try {
            const result = await this.generateReview('Hello, are you there?');
            return !result.error;
        } catch {
            return false;
        }
    }
}

export const aiService = new AIService();
