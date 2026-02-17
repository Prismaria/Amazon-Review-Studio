
export type UnicodeStyle =
    | 'bold'
    | 'italic'
    | 'serif'
    | 'cursive'
    | 'superscript'
    | 'underline'
    | 'monospace'
    | 'wide'
    | 'strikethrough';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const makeAlphabetMap = (target: string, source: string = ALPHABET) => {
    const map: Record<string, string> = {};
    const targetChars = [...target];
    const sourceChars = [...source];
    targetChars.forEach((ch, i) => {
        if (sourceChars[i]) map[sourceChars[i]] = ch;
    });
    return map;
};

const makeCombiningMap = (mark: string) => {
    const map: Record<string, string> = {};
    [...ALPHABET].forEach(ch => map[ch] = ch + mark);
    return map;
};

const UNICODE_MAPS: Record<string, Record<string, string>> = {
    bold: makeAlphabetMap("𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"),
    boldserif: makeAlphabetMap("𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"),
    italic: makeAlphabetMap("𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻"),
    bolditalic: makeAlphabetMap("𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯"),
    serif: makeAlphabetMap("𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧"),
    serifitalic: makeAlphabetMap("𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧"),
    serifbolditalic: makeAlphabetMap("𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛"),
    cursive: makeAlphabetMap("𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏"),
    cursivebold: makeAlphabetMap("𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃"),
    superscript: makeAlphabetMap("ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᴿˢᵀᵁⱽᵂˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹", ALPHABET.replace(/[Qq]/g, "")),
    underline: makeCombiningMap("͟"),
    monospace: makeAlphabetMap("𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"),
    wide: makeAlphabetMap("ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９"),
    strikethrough: makeCombiningMap("̶")
};

const STYLE_COMBINATIONS: { styles: UnicodeStyle[], key: string }[] = [
    { styles: ['superscript'], key: 'superscript' },
    { styles: ['underline'], key: 'underline' },
    { styles: ['monospace'], key: 'monospace' },
    { styles: ['wide'], key: 'wide' },
    { styles: ['strikethrough'], key: 'strikethrough' },
    { styles: ['cursive', 'bold'], key: 'cursivebold' },
    { styles: ['cursive'], key: 'cursive' },
    { styles: ['serif', 'bold', 'italic'], key: 'serifbolditalic' },
    { styles: ['serif', 'bold'], key: 'boldserif' },
    { styles: ['serif', 'italic'], key: 'serifitalic' },
    { styles: ['serif'], key: 'serif' },
    { styles: ['bold', 'italic'], key: 'bolditalic' },
    { styles: ['bold'], key: 'bold' },
    { styles: ['italic'], key: 'italic' }
];

export class TextFormattingService {
    private characterToMapKey: Map<string, string> | null = null;
    private charToAscii: Map<string, string> | null = null;

    private initMaps() {
        if (this.characterToMapKey) return;
        this.characterToMapKey = new Map();
        this.charToAscii = new Map();

        // Priority order for character detection: more specific/rare styles first
        const priorityOrder = [
            'cursivebold', 'cursive', 'monospace', 'wide', 'superscript',
            'serifbolditalic', 'boldserif', 'serif', 'serifitalic',
            'bolditalic', 'bold', 'italic', 'underline', 'strikethrough'
        ];

        for (const styleName of priorityOrder) {
            const styleMap = UNICODE_MAPS[styleName];
            if (!styleMap) continue;

            for (const [ascii, unicode] of Object.entries(styleMap)) {
                this.charToAscii.set(unicode, ascii);

                // Only let the first (highest priority) map key "own" the character for detection
                if (!this.characterToMapKey.has(unicode)) {
                    this.characterToMapKey.set(unicode, styleName);
                }

                if (styleName === 'underline' || styleName === 'strikethrough') {
                    const mark = unicode.slice(ascii.length);
                    if (mark && !this.characterToMapKey.has(mark)) {
                        this.characterToMapKey.set(mark, styleName);
                    }
                }
            }
        }
    }

    private getStylesForKey(key: string): UnicodeStyle[] {
        const combo = STYLE_COMBINATIONS.find(c => c.key === key);
        if (combo) return combo.styles;

        // Fallback for simple keys
        const simpleKeys = ['bold', 'italic', 'serif', 'cursive', 'superscript', 'underline', 'monospace', 'wide', 'strikethrough'];
        if (simpleKeys.includes(key)) {
            return [key as UnicodeStyle];
        }
        return [];
    }

    /**
     * Applies the given set of styles to the text.
     */
    applyStyles(text: string, activeStyles: Set<UnicodeStyle>): string {
        const plainText = this.toPlainText(text);
        if (activeStyles.size === 0) return plainText;

        for (const combo of STYLE_COMBINATIONS) {
            if (combo.styles.every(s => activeStyles.has(s)) && combo.styles.length === activeStyles.size) {
                const map = UNICODE_MAPS[combo.key];
                if (!map) return plainText;
                return [...plainText].map(ch => map[ch] || ch).join('');
            }
        }
        return plainText;
    }

    /**
     * Detects which styles are currently applied to the text.
     */
    detectStyles(text: string): Set<UnicodeStyle> {
        this.initMaps();
        const detectedStyles = new Set<UnicodeStyle>();
        const chars = [...text]; // Use spread to iterate over code points correctly

        for (let i = 0; i < chars.length; i++) {
            const ch = chars[i];

            // Check for combining marks by looking ahead
            const nextCh = chars[i + 1];
            if (nextCh) {
                const combined = ch + nextCh;
                const mapKey = this.characterToMapKey!.get(combined);
                if (mapKey) {
                    this.getStylesForKey(mapKey).forEach(s => detectedStyles.add(s));
                    i++; // Skip the mark
                    continue;
                }
            }

            // Check single character
            const mapKey = this.characterToMapKey!.get(ch);
            if (mapKey) {
                this.getStylesForKey(mapKey).forEach(s => detectedStyles.add(s));
            }
        }
        return detectedStyles;
    }

    /**
     * Converts formatted text back to plain ASCII.
     */
    toPlainText(text: string): string {
        this.initMaps();
        let result = "";
        for (let i = 0; i < text.length; i++) {
            const chunk2 = text.substring(i, i + 2);
            if (this.charToAscii!.has(chunk2)) {
                result += this.charToAscii!.get(chunk2);
                i++;
                continue;
            }

            const chunk1 = text[i];
            if (this.charToAscii!.has(chunk1)) {
                result += this.charToAscii!.get(chunk1);
                continue;
            }
            result += chunk1;
        }
        return result;
    }

    /**
     * Converts markdown syntax to unicode formatting.
     */
    convertMarkdownToUnicode(markdown: string): string {
        if (!markdown) return '';
        const lines = markdown.split('\n');

        const processedLines = lines.map(line => {
            let processed = line;

            const h1Match = processed.match(/^#\s+(.+)$/);
            if (h1Match) return this.applyStyles(h1Match[1], new Set(['wide']));

            const hMultiMatch = processed.match(/^#{2,6}\s+(.+)$/);
            if (hMultiMatch) return this.applyStyles(hMultiMatch[1].toUpperCase(), new Set(['bold']));

            if (/^(\s*)[-*]\s+(.+)/.test(processed)) {
                processed = processed.replace(/^(\s*)[-*]\s+/, '$1• ');
            }

            let current = processed;
            current = current.replace(/\*\*(.+?)\*\*/g, (_, c) => this.applyStyles(c, new Set(['bold'])));
            current = current.replace(/__(.+?)__/g, (_, c) => this.applyStyles(c, new Set(['bold'])));
            current = current.replace(/\*([^\s*].*?)\*/g, (_, c) => this.applyStyles(c, new Set(['italic'])));
            current = current.replace(/\b_([^_]+)_\b/g, (_, c) => this.applyStyles(c, new Set(['italic'])));
            current = current.replace(/~~(.+?)~~/g, (_, c) => this.applyStyles(c, new Set(['strikethrough'])));
            current = current.replace(/`([^`]+)`/g, (_, c) => this.applyStyles(c, new Set(['monospace'])));

            return current;
        });

        return processedLines.join('\n');
    }
}

export const textFormattingService = new TextFormattingService();
