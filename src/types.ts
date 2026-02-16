export interface AppSettings {
    // AI Configuration
    amazon_ai_enabled: boolean;
    amazon_ai_tos_accepted: boolean;
    amazon_ai_provider: 'local' | 'gemini';
    amazon_ai_llm_server_url: string;
    amazon_ai_gemini_key: string;
    amazon_ai_gemini_model: string;
    amazon_ai_local_text_model: string;
    amazon_ai_local_vlm_model: string;
    amazon_ai_gemini_min_interval_ms: number;

    // Timeouts & Retries
    amazon_ai_timeout_llm: number;
    amazon_ai_timeout_connect: number;
    amazon_ai_timeout_vision_image: number;
    amazon_ai_timeout_vision_total: number;
    amazon_ai_main_retries: number;
    amazon_ai_main_backoff: number;

    // Features
    amazon_ai_vision_autoskip: boolean;
    amazon_ai_skip_length_on_retry: boolean;
    amazon_ai_disable_corruption_detection: boolean;
    amazon_ai_detailed_snowball_enabled: boolean;
    amazon_ai_convert_markdown: boolean;
    amazon_ai_include_images_default: boolean;

    // UI Preferences
    amazon_review_title_style: 'normal' | 'uppercase' | 'titlecase';

    // Custom Templates & Phrases (Stored as JSON strings in localStorage, but parsed here)
    amazon_review_templates: ReviewTemplate[];
    amazon_review_phrases: string[];

    // Pastebin Configuration
    amazon_pastebin_api_dev_key: string;
    amazon_pastebin_api_user_name: string;
    amazon_pastebin_api_user_password: string;
    amazon_pastebin_api_user_key: string;
    amazon_pastebin_recovery_id: string;
    amazon_auto_sync_templates: boolean;
    amazon_auto_sync_phrases: boolean;
    amazon_ui_lights_off: boolean;
    amazon_editor_auto_resize: boolean;
    amazon_ui_scale: number;
    amazon_bullet_style: string;
    debug_mode: boolean;
    debug_unhide_native: boolean;
}

export interface ReviewTemplate {
    id: string;
    name: string;
    content: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
    amazon_ai_enabled: false,
    amazon_ai_tos_accepted: false,
    amazon_ai_provider: 'local',
    amazon_ai_llm_server_url: 'http://localhost:1234',
    amazon_ai_gemini_key: '',
    amazon_ai_gemini_model: 'gemini-3-flash-preview',
    amazon_ai_local_text_model: '',
    amazon_ai_local_vlm_model: 'huihui-qwen3-vl-8b-instruct-abliterated',
    amazon_ai_gemini_min_interval_ms: 0,

    amazon_ai_timeout_llm: 45000,
    amazon_ai_timeout_connect: 7000,
    amazon_ai_timeout_vision_image: 20000,
    amazon_ai_timeout_vision_total: 45000,
    amazon_ai_main_retries: 2,
    amazon_ai_main_backoff: 1500,

    amazon_ai_vision_autoskip: true,
    amazon_ai_skip_length_on_retry: false,
    amazon_ai_disable_corruption_detection: false,
    amazon_ai_detailed_snowball_enabled: false,
    amazon_ai_convert_markdown: true,
    amazon_ai_include_images_default: true,

    amazon_review_title_style: 'normal',
    amazon_review_templates: [],
    amazon_review_phrases: [],

    amazon_pastebin_api_dev_key: '',
    amazon_pastebin_api_user_name: '',
    amazon_pastebin_api_user_password: '',
    amazon_pastebin_api_user_key: '',
    amazon_pastebin_recovery_id: '',
    amazon_auto_sync_templates: true,
    amazon_auto_sync_phrases: false,
    amazon_ui_lights_off: false,
    amazon_editor_auto_resize: false,
    amazon_ui_scale: 1.0,
    amazon_bullet_style: '•',
    debug_mode: false,
    debug_unhide_native: false
};
