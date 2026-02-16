
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

const UNICODE_MAPS: Record<string, Record<string, string>> = {
    bold: {
        A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧', U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭',
        a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
        0: '𝟬', 1: '𝟭', 2: '𝟮', 3: '𝟯', 4: '𝟰', 5: '𝟱', 6: '𝟲', 7: '𝟳', 8: '𝟴', 9: '𝟵'
    },
    boldserif: {
        A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉', K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙',
        a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳',
        0: '𝟎', 1: '𝟏', 2: '𝟐', 3: '𝟑', 4: '𝟒', 5: '𝟓', 6: '𝟔', 7: '𝟕', 8: '𝟖', 9: '𝟗'
    },
    italic: {
        A: '𝘐', B: '𝘉', C: '𝘊', D: '𝘋', E: '𝘌', F: '𝘍', G: '𝘎', H: '𝘏', I: '𝘐', J: '𝘑', K: '𝘒', L: '𝘓', M: '𝘔', N: '𝘕', O: '𝘖', P: '𝘗', Q: '𝘘', R: '𝘙', S: '𝘚', T: '𝘛', U: '𝘜', V: '𝘝', W: '𝘞', X: '𝘟', Y: '𝘠', Z: '𝘡',
        a: '𝘢', b: '𝘣', c: '𝘤', d: '𝘥', e: '𝘦', f: '𝘧', g: '𝘨', h: '𝘩', i: '𝘪', j: '𝘫', k: '𝘬', l: '𝘭', m: '𝘮', n: '𝘯', o: '𝘰', p: '𝘱', q: '𝘲', r: '𝘳', s: '𝘴', t: '𝘵', u: '𝘶', v: '𝘷', w: '𝘸', x: '𝘹', y: '𝘺', z: '𝘻'
    },
    bolditalic: {
        A: '𝘼', B: '𝘽', C: '𝘾', D: '𝘿', E: '𝙀', F: '𝙁', G: '𝙂', H: '𝙃', I: '𝙄', J: '𝙅', K: '𝙆', L: '𝙇', M: '𝙈', N: '𝙉', O: '𝙊', P: '𝙋', Q: '𝙌', R: '𝙍', S: '𝙎', T: '𝙏', U: '𝙐', V: '𝙑', W: '𝙒', X: '𝙓', Y: '𝙔', Z: '𝙕',
        a: '𝙖', b: '𝙗', c: '𝙘', d: '𝙙', e: '𝙚', f: '𝙛', g: '𝙜', h: '𝙝', i: '𝙞', j: '𝙟', k: '𝙠', l: '𝙡', m: '𝙢', n: '𝙣', o: '𝙤', p: '𝙥', q: '𝙦', r: '𝙧', s: '𝙨', t: '𝙩', u: '𝙪', v: '𝙫', w: '𝙬', x: '𝙭', y: '𝙮', z: '𝙯'
    },
    serif: {
        A: '𝐴', B: '𝐵', C: '𝐶', D: '𝐷', E: '𝐸', F: '𝐹', G: '𝐺', H: '𝐻', I: '𝐼', J: '𝐽', K: '𝐾', L: '𝐿', M: '𝑀', N: '𝑁', O: '𝑂', P: '𝑃', Q: '𝑄', R: '𝑅', S: '𝑆', T: '𝑇', U: '𝑈', V: '𝑉', W: '𝑊', X: '𝑋', Y: '𝑌', Z: '𝑍',
        a: '𝑎', b: '𝑏', c: '𝑐', d: '𝑑', e: '𝑒', f: '𝑓', g: '𝑔', h: 'ℎ', i: '𝑖', j: '𝑗', k: '𝑘', l: '𝑙', m: '𝑚', n: '𝑛', o: '𝑜', p: '𝑝', q: '𝑞', r: '𝑟', s: '𝑠', t: '𝑡', u: '𝑢', v: '𝑣', w: '𝑤', x: '𝑥', y: '𝑦', z: '𝑧'
    },
    serifitalic: {
        A: '𝐴', B: '𝐵', C: '𝐶', D: '𝐷', E: '𝐸', F: '𝐹', G: '𝐺', H: '𝐻', I: '𝐼', J: '𝐽', K: '𝐾', L: '𝐿', M: '𝑀', N: '𝑁', O: '𝑂', P: '𝑃', Q: '𝑄', R: '𝑅', S: '𝑆', T: '𝑇', U: '𝑈', V: '𝑉', W: '𝑊', X: '𝑋', Y: '𝑌', Z: '𝑍',
        a: '𝑎', b: '𝑏', c: '𝑐', d: '𝑑', e: '𝑒', f: '𝑓', g: '𝑔', h: 'ℎ', i: '𝑖', j: '𝑗', k: '𝑘', l: '𝑙', m: '𝑚', n: '𝑛', o: '𝑜', p: '𝑝', q: '𝑞', r: '𝑟', s: '𝑠', t: '𝑡', u: '𝑢', v: '𝑣', w: '𝑤', x: '𝑥', y: '𝑦', z: '𝑧'
    },
    serifbolditalic: {
        A: '𝑨', B: '𝑩', C: '𝑪', D: '𝑫', E: '𝑬', F: '𝑭', G: '𝑮', H: '𝑯', I: '𝑰', J: '𝑱', K: '𝑲', L: '𝑳', M: '𝑴', N: '𝑵', O: '𝑶', P: '𝑷', Q: '𝑸', R: '𝑹', S: '𝑺', T: '𝑻', U: '𝑼', V: '𝑽', W: '𝑾', X: '𝑿', Y: '𝒀', Z: '𝒁',
        a: '𝒂', b: '𝒃', c: '𝒄', d: '𝒅', e: '𝒆', f: '𝒇', g: '𝒈', h: '𝒉', i: '𝒊', j: '𝒋', k: '𝒌', l: '𝒍', m: '𝒎', n: '𝒏', o: '𝒐', p: '𝒑', q: '𝒒', r: '𝒓', s: '𝒔', t: '𝒕', u: '𝒖', v: '𝒗', w: '𝒘', x: '𝒙', y: '𝒚', z: '𝒛'
    },
    cursive: {
        A: '𝓐', B: '𝓑', C: '𝓒', D: '𝓓', E: '𝓔', F: '𝓕', G: '𝓖', H: '𝓗', I: '𝓘', J: '𝓙', K: '𝓚', L: '𝓛', M: '𝓜', N: '𝓝', O: '𝓞', P: '𝓟', Q: '𝓠', R: '𝓡', S: '𝓢', T: '𝓣', U: '𝓤', V: '𝓥', W: '𝓦', X: '𝓧', Y: '𝓨', Z: '𝓩',
        a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: '𝑒', f: '𝒻', g: '𝑔', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: '𝑜', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉', u: '𝓾', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏'
    },
    cursivebold: {
        A: '𝓐', B: '𝓑', C: '𝓒', D: '𝓓', E: '𝓔', F: '𝓕', G: '𝓖', H: '𝓗', I: '𝓘', J: '𝓙', K: '𝓚', L: '𝓛', M: '𝓜', N: '𝓝', O: '𝓞', P: '𝓟', Q: '𝓠', R: '𝓡', S: '𝓢', T: '𝓣', U: '𝓤', V: '𝓥', W: '𝓦', X: '𝓧', Y: '𝓨', Z: '𝓩',
        a: '𝓪', b: '𝓫', c: '𝓬', d: '𝓭', e: '𝓮', f: '𝓯', g: '𝓰', h: '𝓱', i: '𝓲', j: '𝓳', k: '𝓴', l: '𝓵', m: '𝓶', n: '𝓷', o: '𝓸', p: '𝓹', q: '𝓺', r: '𝓻', s: '𝓼', t: '𝓽', u: '𝓾', v: '𝓿', w: '𝔀', x: '𝔁', y: '𝔂', z: '𝔃'
    },
    superscript: {
        A: 'ᴬ', B: 'ᴮ', C: 'ᶜ', D: 'ᴰ', E: 'ᴱ', F: 'ᶠ', G: 'ᴳ', H: 'ᴴ', I: 'ᴵ', J: 'ᴶ', K: 'ᴷ', L: 'ᴸ', M: 'ᴹ', N: 'ᴺ', O: 'ᴼ', P: 'ᴾ', R: 'ᴿ', S: 'ˢ', T: 'ᵀ', U: 'ᵁ', V: 'ⱽ', W: 'ᵂ', X: 'ˣ', Y: 'ʸ', Z: 'ᶻ',
        a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ᶦ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ',
        0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹'
    },
    underline: {
        A: 'A͟', B: 'B͟', C: 'C͟', D: 'D͟', E: 'E͟', F: 'F͟', G: 'G͟', H: 'H͟', I: 'I͟', J: 'J͟', K: 'K͟', L: 'L͟', M: 'M͟', N: 'N͟', O: 'O͟', P: 'P͟', Q: 'Q͟', R: 'R͟', S: 'S͟', T: 'T͟', U: 'U͟', V: 'V͟', W: 'W͟', X: 'X͟', Y: 'Y͟', Z: 'Z͟',
        a: 'a͟', b: 'b͟', c: 'c͟', d: 'd͟', e: 'e͟', f: 'f͟', g: 'g͟', h: 'h͟', i: 'i͟', j: 'j͟', k: 'k͟', l: 'l͟', m: 'm͟', n: 'n͟', o: 'o͟', p: 'p͟', q: 'q͟', r: 'r͟', s: 's͟', t: 't͟', u: 'u͟', v: 'v͟', w: 'w͟', x: 'x͟', y: 'y͟', z: 'z͟'
    },
    monospace: {
        A: '𝙰', B: '𝙱', C: '𝙲', D: '𝙳', E: '𝙴', F: '𝙵', G: '𝙶', H: '𝙷', I: '𝙸', J: '𝙹', K: '𝙺', L: '𝙻', M: '𝙼', N: '𝙽', O: '𝙾', P: '𝙿', Q: '𝚀', R: '𝚁', S: '𝚂', T: '𝚃', U: '𝚄', V: '𝚅', W: '𝚆', X: '𝚇', Y: '𝚈', Z: '𝚉',
        a: '𝚊', b: '𝚋', c: '𝚌', d: '𝚍', e: '𝚎', f: '𝚏', g: '𝚐', h: '𝚑', i: '𝚒', j: '𝚓', k: '𝚔', l: '𝚕', m: '𝚖', n: '𝚗', o: '𝚘', p: '𝚙', q: '𝚚', r: '𝚛', s: '𝚜', t: '𝚝', u: '𝚞', v: '𝚟', w: '𝚠', x: '𝚡', y: '𝚢', z: '𝚣',
        0: '0', 1: '𝟷', 2: '𝟸', 3: '𝟹', 4: '𝟺', 5: '𝟻', 6: '𝟼', 7: '𝟽', 8: '𝟾', 9: '𝟿'
    },
    wide: {
        A: 'Ａ', B: 'Ｂ', C: 'Ｃ', D: 'Ｄ', E: 'Ｅ', F: 'Ｆ', G: 'Ｇ', H: 'Ｈ', I: 'Ｉ', J: 'Ｊ', K: 'Ｋ', L: 'Ｌ', M: 'Ｍ', N: 'Ｎ', O: 'Ｏ', P: 'Ｐ', Q: 'Ｑ', R: 'Ｒ', S: 'Ｓ', T: 'Ｔ', U: 'Ｕ', V: 'Ｖ', W: 'Ｗ', X: 'Ｘ', Y: 'Ｙ', Z: 'Ｚ',
        a: 'ａ', b: 'ｂ', c: 'ｃ', d: 'ｄ', e: 'ｅ', f: 'ｆ', g: 'ｇ', h: 'ｈ', i: 'ｉ', j: 'ｊ', k: 'ｋ', l: 'ｌ', m: 'ｍ', n: 'ｎ', o: 'ｏ', p: 'ｐ', q: 'ｑ', r: 'ｒ', s: 'ｓ', t: 'ｔ', u: 'ｕ', v: 'ｖ', w: 'ｗ', x: 'ｘ', y: 'ｙ', z: 'ｚ',
        0: '０', 1: '１', 2: '２', 3: '３', 4: '４', 5: '５', 6: '６', 7: '７', 8: '８', 9: '９'
    },
    strikethrough: {
        A: 'A̶', B: 'B̶', C: 'C̶', D: 'D̶', E: 'E̶', F: 'F̶', G: 'G̶', H: 'H̶', I: 'I̶', J: 'J̶', K: 'K̶', L: 'L̶', M: 'M̶', N: 'N̶', O: 'O̶', P: 'P̶', Q: 'Q̶', R: 'R̶', S: 'S̶', T: 'T̶', U: 'U̶', V: 'V̶', W: 'W̶', X: 'X̶', Y: 'Y̶', Z: 'Z̶',
        a: 'a̶', b: 'b̶', c: 'c̶', d: 'd̶', e: 'e̶', f: 'f̶', g: 'g̶', h: 'h̶', i: 'i̶', j: 'j̶', k: 'k̶', l: 'l̶', m: 'm̶', n: 'n̶', o: 'o̶', p: 'p̶', q: 'q̶', r: 'r̶', s: 's̶', t: 't̶', u: 'u̶', v: 'v̶', w: 'w̶', x: 'x̶', y: 'y̶', z: 'z̶'
    }
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
    /**
     * Applies the given set of styles to the text.
     */
    applyStyles(text: string, activeStyles: Set<UnicodeStyle>): string {
        // First convert back to plain text to avoid double-encoding
        const plainText = this.toPlainText(text);

        if (activeStyles.size === 0) return plainText;

        for (const combo of STYLE_COMBINATIONS) {
            // Check if this combination matches the active styles
            // Note: Exact match logic from original script
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
        const detectedStyles = new Set<UnicodeStyle>();

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const two_chars = text.substring(i, i + 2);
            let styleFound = false;

            for (const [styleName, styleMap] of Object.entries(UNICODE_MAPS)) {
                for (const [, unicode] of Object.entries(styleMap)) {
                    let match = false;
                    if (unicode.length === 1 && char === unicode) {
                        match = true;
                    } else if (unicode.length > 1 && two_chars === unicode) {
                        match = true;
                    }

                    if (match) {
                        if (unicode.length > 1) i++; // Skip extra char for multi-char unicode (like underline)

                        if (styleName === 'bold') detectedStyles.add('bold');
                        else if (styleName === 'italic') detectedStyles.add('italic');
                        else if (styleName === 'serif') detectedStyles.add('serif');
                        else if (styleName === 'cursive') detectedStyles.add('cursive');
                        else if (styleName === 'superscript') detectedStyles.add('superscript');
                        else if (styleName === 'underline') detectedStyles.add('underline');
                        else if (styleName === 'monospace') detectedStyles.add('monospace');
                        else if (styleName === 'wide') detectedStyles.add('wide');
                        else if (styleName === 'strikethrough') detectedStyles.add('strikethrough');
                        else if (styleName === 'boldserif') {
                            detectedStyles.add('bold');
                            detectedStyles.add('serif');
                        } else if (styleName === 'bolditalic') {
                            detectedStyles.add('bold');
                            detectedStyles.add('italic');
                        } else if (styleName === 'serifitalic') {
                            detectedStyles.add('serif');
                            detectedStyles.add('italic');
                        } else if (styleName === 'serifbolditalic') {
                            detectedStyles.add('serif');
                            detectedStyles.add('bold');
                            detectedStyles.add('italic');
                        } else if (styleName === 'cursivebold') {
                            detectedStyles.add('cursive');
                            detectedStyles.add('bold');
                        }
                        styleFound = true;
                        break;
                    }
                }
                if (styleFound) break;
            }
        }
        return detectedStyles;
    }

    /**
     * Converts formatted text back to plain ASCII.
     */
    toPlainText(text: string): string {
        let plainText = text;
        for (const [, map] of Object.entries(UNICODE_MAPS)) {
            for (const [ascii, uni] of Object.entries(map)) {
                plainText = plainText.replace(new RegExp(uni.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), ascii);
            }
        }
        return plainText;
    }

    /**
     * Converts markdown syntax to unicode formatting.
     * - # Header -> Wide
     * - ##+ Header -> Bold + Uppercase
     * - **bold** -> Bold
     * - *italic* -> Italic
     * - `code` -> Monospace
     * - ~~strike~~ -> Strikethrough
     */
    convertMarkdownToUnicode(markdown: string): string {
        if (!markdown) return '';
        
        // Split by lines to handle headers
        const lines = markdown.split('\n');
        
        const processedLines = lines.map(line => {
            let processed = line;
            
            // 1. Headers
            // Level 1 (# Header) -> Wide Text
            // User req: "Big header uses wide text while all smaller headers are bold all caps"
            const h1Match = processed.match(/^#\s+(.+)$/);
            if (h1Match) {
                const content = h1Match[1];
                return this.applyStyles(content, new Set(['wide']));
            }
            
            // Level 2+ (## Header) -> Bold + All Caps
            const hMultiMatch = processed.match(/^#{2,6}\s+(.+)$/);
            if (hMultiMatch) {
                const content = hMultiMatch[1].toUpperCase();
                return this.applyStyles(content, new Set(['bold']));
            }

            // 2. Lists (simple bullet normalization)
            // - Item or * Item -> • Item
            if (/^(\s*)[-*]\s+(.+)/.test(processed)) {
                processed = processed.replace(/^(\s*)[-*]\s+/, '$1• ');
            }
            
            // 3. Inline formatting
            // Bold (**text** or __text__)
            // Improved regex: handle non-greedy match, ensure it captures multiple occurrences
            let current = processed;
            
            // Bold: **text**
            current = current.replace(/\*\*(.+?)\*\*/g, (_, content) => {
                return this.applyStyles(content, new Set(['bold']));
            });
            // Bold: __text__
            current = current.replace(/__(.+?)__/g, (_, content) => {
                return this.applyStyles(content, new Set(['bold']));
            });
            
            // Italic (*text* or _text_)
            // Note: We use a simpler regex for italics to avoid capturing underscores in variable_names
            // Only match *text* or _text_ where _ is boundary
            // We need to handle cases where bold was already replaced (unicode chars).
            // But usually bold uses different chars, so it won't trigger * match unless our bold replacement contains *.
            // Our bold replacement uses unicode math sans, no *.
            
            // Italic: *text*
            current = current.replace(/\*([^\s*].*?)\*/g, (_, content) => {
                return this.applyStyles(content, new Set(['italic']));
            });
            // Italic: _text_ (ensure boundary to avoid underscores in words)
            current = current.replace(/\b_([^_]+)_\b/g, (_, content) => {
                return this.applyStyles(content, new Set(['italic']));
            });
            
            // Strikethrough (~~text~~)
            current = current.replace(/~~(.+?)~~/g, (_, content) => {
                return this.applyStyles(content, new Set(['strikethrough']));
            });
            
            // Monospace (`text`)
            current = current.replace(/`([^`]+)`/g, (_, content) => {
                return this.applyStyles(content, new Set(['monospace']));
            });
            
            return current;
        });
        
        return processedLines.join('\n');
    }
}

export const textFormattingService = new TextFormattingService();
