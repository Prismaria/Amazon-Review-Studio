/* Global definitions for GreaseMonkey/Tampermonkey APIs */

declare function GM_getValue<T>(name: string, defaultValue?: T): T;
declare function GM_setValue(name: string, value: any): void;
declare function GM_deleteValue(name: string): void;
declare function GM_listValues(): string[];
declare function GM_xmlhttpRequest(details: any): any;
declare function GM_addStyle(css: string): HTMLStyleElement;
declare function GM_getResourceText(name: string): string;
declare function GM_getResourceURL(name: string): string;
declare function GM_registerMenuCommand(name: string, fn: () => void): number;
declare function GM_unregisterMenuCommand(id: number): void;
declare function GM_setClipboard(data: string, info: any): void;
declare function GM_notification(details: any, ondone: any): void;
declare function GM_openInTab(url: string, options: any): any;
declare var unsafeWindow: Window & any;
declare const __IS_PERSONAL_BUILD__: boolean;
