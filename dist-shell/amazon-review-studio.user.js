// ==UserScript==
// @name         Amazon Review Toolkit 2.0
// @namespace    https://github.com/Prismaria/Amazon-Review-Studio
// @version      2.0.7
// @author       Prismaris
// @description  Complete review writing tookit for Amazon.
// @match        *://*.amazon.com/*
// @match        *://*.amazon.ca/*
// @match        *://*.amazon.co.uk/*
// @match        *://*.amazon.de/*
// @match        *://*.amazon.fr/*
// @match        *://*.amazon.it/*
// @match        *://*.amazon.es/*
// @match        *://*.amazon.co.jp/*
// @match        *://*.amazon.in/*
// @match        *://*.amazon.com.au/*
// @require      https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js
// @require      https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11.10/dist/sweetalert2.all.min.js
// @connect      pastebin.com
// @connect      localhost
// @connect      127.0.0.1
// @connect      generativelanguage.googleapis.com
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function (React__default, ReactDOM, Swal) {
  'use strict';

  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const React__default__namespace = _interopNamespaceDefault(React__default);

  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();
  const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  const toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );
  const toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  const hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
    return false;
  };
  const Icon = React__default.forwardRef(
    ({
      color: color2 = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode,
      ...rest
    }, ref) => React__default.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color2,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => React__default.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );
  const createLucideIcon = (iconName, iconNode) => {
    const Component2 = React__default.forwardRef(
      ({ className, ...props }, ref) => React__default.createElement(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
    );
    Component2.displayName = toPascalCase(iconName);
    return Component2;
  };
  const __iconNode$P = [
    [
      "path",
      { d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8", key: "mg9rjx" }
    ]
  ];
  const Bold = createLucideIcon("bold", __iconNode$P);
  const __iconNode$O = [
    ["path", { d: "M12 20v-9", key: "1qisl0" }],
    ["path", { d: "M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z", key: "uouzyp" }],
    ["path", { d: "M14.12 3.88 16 2", key: "qol33r" }],
    ["path", { d: "M21 21a4 4 0 0 0-3.81-4", key: "1b0z45" }],
    ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97", key: "5cxbf6" }],
    ["path", { d: "M22 13h-4", key: "1jl80f" }],
    ["path", { d: "M3 21a4 4 0 0 1 3.81-4", key: "1fjd4g" }],
    ["path", { d: "M3 5a4 4 0 0 0 3.55 3.97", key: "1d7oge" }],
    ["path", { d: "M6 13H2", key: "82j7cp" }],
    ["path", { d: "m8 2 1.88 1.88", key: "fmnt4t" }],
    ["path", { d: "M9 7.13V6a3 3 0 1 1 6 0v1.13", key: "1vgav8" }]
  ];
  const Bug = createLucideIcon("bug", __iconNode$O);
  const __iconNode$N = [
    ["path", { d: "M8 2v4", key: "1cmpym" }],
    ["path", { d: "M16 2v4", key: "4m81vk" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
    ["path", { d: "M3 10h18", key: "8toen8" }]
  ];
  const Calendar = createLucideIcon("calendar", __iconNode$N);
  const __iconNode$M = [
    [
      "path",
      {
        d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
        key: "18u6gg"
      }
    ],
    ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
  ];
  const Camera = createLucideIcon("camera", __iconNode$M);
  const __iconNode$L = [
    ["path", { d: "M5 21v-6", key: "1hz6c0" }],
    ["path", { d: "M12 21V3", key: "1lcnhd" }],
    ["path", { d: "M19 21V9", key: "unv183" }]
  ];
  const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$L);
  const __iconNode$K = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
  const Check = createLucideIcon("check", __iconNode$K);
  const __iconNode$J = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
  const ChevronRight = createLucideIcon("chevron-right", __iconNode$J);
  const __iconNode$I = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
  ];
  const CircleAlert = createLucideIcon("circle-alert", __iconNode$I);
  const __iconNode$H = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
  ];
  const CircleCheck = createLucideIcon("circle-check", __iconNode$H);
  const __iconNode$G = [
    [
      "path",
      {
        d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
        key: "kmsa83"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
  ];
  const CirclePlay = createLucideIcon("circle-play", __iconNode$G);
  const __iconNode$F = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }]
  ];
  const CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode$F);
  const __iconNode$E = [
    ["path", { d: "M11 14h10", key: "1w8e9d" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v1.344", key: "1e62lh" }],
    ["path", { d: "m17 18 4-4-4-4", key: "z2g111" }],
    ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113", key: "bjbb7m" }],
    ["rect", { x: "8", y: "2", width: "8", height: "4", rx: "1", key: "ublpy" }]
  ];
  const ClipboardPaste = createLucideIcon("clipboard-paste", __iconNode$E);
  const __iconNode$D = [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
    [
      "path",
      {
        d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
        key: "116196"
      }
    ]
  ];
  const Clipboard = createLucideIcon("clipboard", __iconNode$D);
  const __iconNode$C = [
    ["path", { d: "M12 13v8l-4-4", key: "1f5nwf" }],
    ["path", { d: "m12 21 4-4", key: "1lfcce" }],
    ["path", { d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284", key: "ui1hmy" }]
  ];
  const CloudDownload = createLucideIcon("cloud-download", __iconNode$C);
  const __iconNode$B = [
    ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
  ];
  const Cloud = createLucideIcon("cloud", __iconNode$B);
  const __iconNode$A = [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ];
  const Copy = createLucideIcon("copy", __iconNode$A);
  const __iconNode$z = [
    ["path", { d: "M12 20v2", key: "1lh1kg" }],
    ["path", { d: "M12 2v2", key: "tus03m" }],
    ["path", { d: "M17 20v2", key: "1rnc9c" }],
    ["path", { d: "M17 2v2", key: "11trls" }],
    ["path", { d: "M2 12h2", key: "1t8f8n" }],
    ["path", { d: "M2 17h2", key: "7oei6x" }],
    ["path", { d: "M2 7h2", key: "asdhe0" }],
    ["path", { d: "M20 12h2", key: "1q8mjw" }],
    ["path", { d: "M20 17h2", key: "1fpfkl" }],
    ["path", { d: "M20 7h2", key: "1o8tra" }],
    ["path", { d: "M7 20v2", key: "4gnj0m" }],
    ["path", { d: "M7 2v2", key: "1i4yhu" }],
    ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
    ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
  ];
  const Cpu = createLucideIcon("cpu", __iconNode$z);
  const __iconNode$y = [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ];
  const Download = createLucideIcon("download", __iconNode$y);
  const __iconNode$x = [
    [
      "path",
      {
        d: "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",
        key: "g5wo59"
      }
    ],
    ["path", { d: "m5.082 11.09 8.828 8.828", key: "1wx5vj" }]
  ];
  const Eraser = createLucideIcon("eraser", __iconNode$x);
  const __iconNode$w = [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ];
  const ExternalLink = createLucideIcon("external-link", __iconNode$w);
  const __iconNode$v = [
    [
      "path",
      {
        d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
        key: "ct8e1f"
      }
    ],
    ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
    [
      "path",
      {
        d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
        key: "13bj9a"
      }
    ],
    ["path", { d: "m2 2 20 20", key: "1ooewy" }]
  ];
  const EyeOff = createLucideIcon("eye-off", __iconNode$v);
  const __iconNode$u = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
  ];
  const Eye = createLucideIcon("eye", __iconNode$u);
  const __iconNode$t = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }]
  ];
  const FileText = createLucideIcon("file-text", __iconNode$t);
  const __iconNode$s = [
    ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
    ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
    ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
    ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
    ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
    ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
  ];
  const GripVertical = createLucideIcon("grip-vertical", __iconNode$s);
  const __iconNode$r = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
  ];
  const Image$1 = createLucideIcon("image", __iconNode$r);
  const __iconNode$q = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ];
  const Info = createLucideIcon("info", __iconNode$q);
  const __iconNode$p = [
    ["line", { x1: "19", x2: "10", y1: "4", y2: "4", key: "15jd3p" }],
    ["line", { x1: "14", x2: "5", y1: "20", y2: "20", key: "bu0au3" }],
    ["line", { x1: "15", x2: "9", y1: "4", y2: "20", key: "uljnxc" }]
  ];
  const Italic = createLucideIcon("italic", __iconNode$p);
  const __iconNode$o = [
    ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
    ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
    ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
  ];
  const Key = createLucideIcon("key", __iconNode$o);
  const __iconNode$n = [
    ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
    ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
    ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
    ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
  ];
  const LayoutGrid = createLucideIcon("layout-grid", __iconNode$n);
  const __iconNode$m = [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ];
  const Link2 = createLucideIcon("link-2", __iconNode$m);
  const __iconNode$l = [
    ["path", { d: "M11 5h10", key: "1cz7ny" }],
    ["path", { d: "M11 12h10", key: "1438ji" }],
    ["path", { d: "M11 19h10", key: "11t30w" }],
    ["path", { d: "M4 4h1v5", key: "10yrso" }],
    ["path", { d: "M4 9h2", key: "r1h2o0" }],
    ["path", { d: "M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02", key: "xtkcd5" }]
  ];
  const ListOrdered = createLucideIcon("list-ordered", __iconNode$l);
  const __iconNode$k = [
    ["path", { d: "M3 5h.01", key: "18ugdj" }],
    ["path", { d: "M3 12h.01", key: "nlz23k" }],
    ["path", { d: "M3 19h.01", key: "noohij" }],
    ["path", { d: "M8 5h13", key: "1pao27" }],
    ["path", { d: "M8 12h13", key: "1za7za" }],
    ["path", { d: "M8 19h13", key: "m83p4d" }]
  ];
  const List = createLucideIcon("list", __iconNode$k);
  const __iconNode$j = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
  const LoaderCircle = createLucideIcon("loader-circle", __iconNode$j);
  const __iconNode$i = [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p"
      }
    ]
  ];
  const MessageSquare = createLucideIcon("message-square", __iconNode$i);
  const __iconNode$h = [
    [
      "path",
      {
        d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
        key: "kfwtm"
      }
    ]
  ];
  const Moon = createLucideIcon("moon", __iconNode$h);
  const __iconNode$g = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M3 9h18", key: "1pudct" }],
    ["path", { d: "M9 21V9", key: "1oto5p" }]
  ];
  const PanelsTopLeft = createLucideIcon("panels-top-left", __iconNode$g);
  const __iconNode$f = [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu"
      }
    ]
  ];
  const Pen = createLucideIcon("pen", __iconNode$f);
  const __iconNode$e = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ];
  const Plus = createLucideIcon("plus", __iconNode$e);
  const __iconNode$d = [
    ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
    ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
    ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
    ["path", { d: "M8 16H3v5", key: "1cv678" }]
  ];
  const RefreshCw = createLucideIcon("refresh-cw", __iconNode$d);
  const __iconNode$c = [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ];
  const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$c);
  const __iconNode$b = [
    [
      "path",
      {
        d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
        key: "1c8476"
      }
    ],
    ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
    ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
  ];
  const Save = createLucideIcon("save", __iconNode$b);
  const __iconNode$a = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ];
  const Search = createLucideIcon("search", __iconNode$a);
  const __iconNode$9 = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3"
      }
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
  ];
  const Send = createLucideIcon("send", __iconNode$9);
  const __iconNode$8 = [
    [
      "path",
      {
        d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
        key: "1i5ecw"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
  ];
  const Settings = createLucideIcon("settings", __iconNode$8);
  const __iconNode$7 = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
  ];
  const ShieldCheck = createLucideIcon("shield-check", __iconNode$7);
  const __iconNode$6 = [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
        key: "1s2grr"
      }
    ],
    ["path", { d: "M20 2v4", key: "1rf3ol" }],
    ["path", { d: "M22 4h-4", key: "gwowj6" }],
    ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
  ];
  const Sparkles = createLucideIcon("sparkles", __iconNode$6);
  const __iconNode$5 = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s"
      }
    ]
  ];
  const Star = createLucideIcon("star", __iconNode$5);
  const __iconNode$4 = [
    ["path", { d: "M16 4H9a3 3 0 0 0-2.83 4", key: "43sutm" }],
    ["path", { d: "M14 12a4 4 0 0 1 0 8H6", key: "nlfj13" }],
    ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }]
  ];
  const Strikethrough = createLucideIcon("strikethrough", __iconNode$4);
  const __iconNode$3 = [
    [
      "path",
      {
        d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
        key: "vktsd0"
      }
    ],
    ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
  ];
  const Tag = createLucideIcon("tag", __iconNode$3);
  const __iconNode$2 = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ];
  const Trash2 = createLucideIcon("trash-2", __iconNode$2);
  const __iconNode$1 = [
    ["path", { d: "M6 4v6a6 6 0 0 0 12 0V4", key: "9kb039" }],
    ["line", { x1: "4", x2: "20", y1: "20", y2: "20", key: "nun2al" }]
  ];
  const Underline = createLucideIcon("underline", __iconNode$1);
  const __iconNode = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  const X = createLucideIcon("x", __iconNode);
  const SELECTORS = {
    form: "#in-context-ryp-form, form.in-context-ryp-form-desktop, form.ryp__review-form",
    textarea: '#reviewText, textarea[name="reviewText"], textarea[name="reviewBody"]',
    title: '#reviewTitle, input[name="reviewTitle"]',
    media: '#media, input[name="media"][type="file"]',
    thumbnails: ".in-context-ryp__form-field__thumbnails",
    thumbnailWrapper: ".in-context-ryp__form-field__thumbnail-wrapper",
    thumbnailImage: ".in-context-ryp__form-field___thumbnails--image",
    mediaDelete: ".in-context-ryp__media-delete",
    starRating: ".in-context-ryp__form-field--starRating",
    starClear: ".in-context-ryp__form-field--starRating--clear",
    profileAvatar: ".a-profile-avatar img, .ryp__profile__info img",
    profileName: ".a-profile-name, .ryp__profile__info .a-profile-content span",
    profileEditLink: '#ryp__profile__edit-link, [data-hook="ryp-profile-edit-link"]',
    productImage: ".in-context-ryp__product-header img",
    productTitle: ".in-context-ryp__product-title",
    productName: ".in-context-ryp__product-name, .ryp__product-title",
    submitBtn: '.ryp-submit-button-desktop input[type="submit"], .ryp__submit-button input[type="submit"]'
  };
  function query(selector, root = document) {
    return root.querySelector(selector);
  }
  function queryAll(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }
  const emptyProfile = { avatarSrc: "", name: "", editLinkHref: "#" };
  const emptyProduct = { imageSrc: "", title: "How was the item?", name: "", productUrl: "" };
  function getAmazonBaseUrl() {
    try {
      const url = document.querySelector('link[rel="canonical"]')?.href ?? window.location.href;
      return new URL(url).origin;
    } catch {
      return window.location.origin;
    }
  }
  function getProductUrlFromPage(root) {
    const doc = root instanceof Document ? root : root.ownerDocument ?? document;
    const win = doc.defaultView ?? window;
    const asinFromUrl = win.location.href.match(/[?&]asin=([A-Z0-9]{10})|\/dp\/([A-Z0-9]{10})|\/gp\/product\/([A-Z0-9]{10})/);
    if (asinFromUrl) {
      const asin = asinFromUrl[1] ?? asinFromUrl[2] ?? asinFromUrl[3];
      if (asin) return `${getAmazonBaseUrl()}/dp/${asin}`;
    }
    const canonical = doc.querySelector('link[rel="canonical"][href*="/dp/"]');
    if (canonical?.href) return canonical.href.split("?")[0];
    const productLink = doc.querySelector('a[href*="/dp/"][href*="amazon"]');
    if (productLink?.href) return productLink.href.split("?")[0];
    const ogUrl = doc.querySelector('meta[property="og:url"][content*="/dp/"]');
    if (ogUrl?.content) return ogUrl.content.split("?")[0];
    return "";
  }
  function getAsinFromPage() {
    const asinMatch = window.location.href.match(/[?&]asin=([A-Z0-9]{10})|\/dp\/([A-Z0-9]{10})|\/gp\/product\/([A-Z0-9]{10})/);
    return asinMatch ? asinMatch[1] ?? asinMatch[2] ?? asinMatch[3] : null;
  }
  const nativeValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  const nativeTextareaSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
  function syncToElement(el, value) {
    if (!el) return;
    const setter = el instanceof HTMLTextAreaElement ? nativeTextareaSetter : nativeValueSetter;
    if (setter && value !== el.value) {
      setter.call(el, value);
    } else {
      el.value = value;
    }
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true }));
    el.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));
    el.dispatchEvent(new Event("blur", { bubbles: true }));
  }
  function setAmazonStarRating(rating, container) {
    if (rating === 0) {
      console.log("[ARS] Clearing star rating...");
      const clearBtn = query(SELECTORS.starClear, container);
      if (clearBtn) {
        console.log("[ARS] Clicking native clear button:", clearBtn);
        clearBtn.click();
        const mouseEventProps = { bubbles: true, cancelable: true, view: window };
        clearBtn.dispatchEvent(new MouseEvent("mousedown", mouseEventProps));
        clearBtn.dispatchEvent(new MouseEvent("mouseup", mouseEventProps));
        clearBtn.querySelector("span")?.click();
      } else {
        console.warn("[ARS] Native clear button not found");
      }
      return;
    }
    const wrapper = query(SELECTORS.starRating, container) || query(".in-context-ryp__form-field--starRating", container);
    if (!wrapper) {
      console.warn("[ARS] Star rating wrapper not found");
      return;
    }
    const currentRating = getAmazonStarRating(container);
    if (currentRating === rating) {
      console.log(`[ARS] Star rating already set to ${rating}, skipping click`);
      return;
    }
    console.log(`[ARS] Setting star rating to ${rating}...`);
    const starSpans = queryAll(
      ".in-context-ryp__form-field--starRating-single",
      wrapper
    );
    if (starSpans.length >= rating) {
      const targetSpan = starSpans[rating - 1];
      console.log("[ARS] Clicking star span:", targetSpan);
      targetSpan.click();
      const mouseEventProps = { bubbles: true, cancelable: true, view: window };
      targetSpan.dispatchEvent(new MouseEvent("mousedown", mouseEventProps));
      targetSpan.dispatchEvent(new MouseEvent("mouseup", mouseEventProps));
      const img = targetSpan.querySelector("img");
      if (img) {
        img.click();
        img.dispatchEvent(new MouseEvent("mousedown", mouseEventProps));
        img.dispatchEvent(new MouseEvent("mouseup", mouseEventProps));
      }
      return;
    }
    const stars = queryAll(
      '[data-rating], [aria-label*="star"], button, span[role="button"], .a-icon',
      wrapper
    );
    if (stars.length >= rating) {
      const target = stars[rating - 1];
      target?.click();
      return;
    }
    console.warn("[ARS] Could not find star element to click for rating:", rating);
  }
  function getAmazonStarRating(container) {
    const wrapper = query(".in-context-ryp__form-field--starRating", container);
    if (!wrapper) return 0;
    const filledStars = wrapper.querySelectorAll('[data-testid$="-filled"]').length;
    if (filledStars > 0) return filledStars;
    return 0;
  }
  function useAmazonForm() {
    const [isReady, setIsReady] = React__default.useState(false);
    const [profile, setProfile] = React__default.useState(emptyProfile);
    const [product, setProduct] = React__default.useState(emptyProduct);
    const [state, setState] = React__default.useState({
      reviewText: "",
      reviewTitle: "",
      starRating: 0,
      mediaThumbnails: []
    });
    const elementsRef = React__default.useRef({
      form: null,
      textarea: null,
      titleInput: null,
      mediaInput: null,
      submitBtn: null
    });
    const [syncStatus, setSyncStatus] = React__default.useState("idle");
    const [lastSaved, setLastSaved] = React__default.useState(null);
    const saveTimeoutRef = React__default.useRef(null);
    const asinRef = React__default.useRef(null);
    const isInitializedRef = React__default.useRef(false);
    const amazonSubmitHandlerRef = React__default.useRef(null);
    const stateRef = React__default.useRef(state);
    stateRef.current = state;
    const rootRef = React__default.useRef(document);
    const discover = React__default.useCallback(() => {
      const root = document;
      rootRef.current = root;
      const form = query(SELECTORS.form, root);
      const textarea = query(SELECTORS.textarea, root);
      const titleInput = query(SELECTORS.title, root);
      const mediaInput = query(SELECTORS.media, root);
      const submitBtn = query(SELECTORS.submitBtn, root);
      if (!submitBtn) {
        console.warn("[ARS] Submit button not found with primary selector. Trying loose search...");
      }
      elementsRef.current = { form, textarea, titleInput, mediaInput, submitBtn };
      if (submitBtn && !amazonSubmitHandlerRef.current) {
        try {
          const buttonKeys = Object.keys(submitBtn);
          const btnContainer = submitBtn.closest(".a-button");
          for (const key of buttonKeys) {
            if (key.startsWith("__reactProps") || key.startsWith("__reactEvents")) {
              const obj = submitBtn[key];
              console.log(`[ARS] Checking ${key}:`, obj);
              if (obj?.onClick) {
                amazonSubmitHandlerRef.current = obj.onClick.bind(submitBtn);
                console.log("[ARS] Captured onClick from button via:", key);
                break;
              }
            }
          }
          if (!amazonSubmitHandlerRef.current && btnContainer) {
            const containerKeys = Object.keys(btnContainer);
            for (const key of containerKeys) {
              if (key.startsWith("__reactProps") || key.startsWith("__reactEvents")) {
                const obj = btnContainer[key];
                if (obj?.onClick) {
                  amazonSubmitHandlerRef.current = obj.onClick.bind(btnContainer);
                  console.log("[ARS] Captured onClick from container via:", key);
                  break;
                }
              }
            }
          }
          if (!amazonSubmitHandlerRef.current && form) {
            const formKeys = Object.keys(form);
            for (const key of formKeys) {
              if (key.startsWith("__reactProps") || key.startsWith("__reactEvents")) {
                const obj = form[key];
                if (obj?.onSubmit) {
                  amazonSubmitHandlerRef.current = obj.onSubmit.bind(form);
                  console.log("[ARS] Captured onSubmit from form via:", key);
                  break;
                }
              }
            }
          }
        } catch (e) {
          console.warn("[ARS] Could not capture Amazon submit handler:", e);
        }
      }
      if (form) {
        const asin = getAsinFromPage();
        asinRef.current = asin;
        if (!isInitializedRef.current) {
          console.log("[Amazon Review Studio] Initializing form state and recovering drafts...");
          let reviewText = textarea?.value ?? "";
          let reviewTitle = titleInput?.value ?? "";
          let starRating = getAmazonStarRating(root);
          if (asin) {
            const textDraft = localStorage.getItem(`amazon_review_draft_${asin}`);
            const titleDraft = localStorage.getItem(`amazon_review_title_draft_${asin}`);
            const ratingDraft = localStorage.getItem(`amazon_review_rating_draft_${asin}`);
            if (textDraft && !reviewText) reviewText = textDraft;
            if (titleDraft && !reviewTitle) reviewTitle = titleDraft;
            if (ratingDraft && !starRating) starRating = parseInt(ratingDraft, 10);
            if (textDraft) syncToElement(textarea, textDraft);
            if (titleDraft) syncToElement(titleInput, titleDraft);
            if (starRating) setAmazonStarRating(starRating, root);
          }
          setState((s) => ({
            ...s,
            reviewText: reviewText || s.reviewText,
            reviewTitle: reviewTitle || s.reviewTitle,
            starRating: starRating || s.starRating
          }));
          isInitializedRef.current = true;
        }
        setIsReady(true);
      } else {
        setIsReady(false);
        isInitializedRef.current = false;
      }
      const scrapeThumbnails = () => {
        const container = query(SELECTORS.thumbnails, root);
        if (!container) return [];
        const wrappers = queryAll(SELECTORS.thumbnailWrapper, container);
        return wrappers.map((wrapper) => {
          const img = query(SELECTORS.thumbnailImage, wrapper);
          if (!img) return "";
          const bg = img.style.backgroundImage;
          const match = bg.match(/url\(["']?(.*?)["']?\)/);
          return match ? match[1] : "";
        }).filter(Boolean);
      };
      const currentMedia = scrapeThumbnails();
      const currentStars = getAmazonStarRating(root);
      setState((s) => {
        const thumbnailsMatch = s.mediaThumbnails.length === currentMedia.length && s.mediaThumbnails.every((val, index) => val === currentMedia[index]);
        const starsMatch = s.starRating === currentStars;
        if (thumbnailsMatch && (starsMatch || currentStars === 0)) return s;
        return {
          ...s,
          mediaThumbnails: currentMedia,
          starRating: currentStars || s.starRating
        };
      });
      const avatarImg = query(SELECTORS.profileAvatar, root);
      const nameEl = query(SELECTORS.profileName, root);
      const editLink = query(SELECTORS.profileEditLink, root);
      setProfile({
        avatarSrc: avatarImg?.src ?? "",
        name: nameEl?.textContent?.trim() ?? "",
        editLinkHref: editLink?.href ?? "#"
      });
      const productImg = query(SELECTORS.productImage, root);
      const titleEl = query(SELECTORS.productTitle, root);
      const nameElProduct = query(".in-context-ryp__product-name", root) ?? query(SELECTORS.productName, root) ?? query("#productTitle", root);
      const productUrl = getProductUrlFromPage(root);
      setProduct({
        imageSrc: productImg?.src ?? productImg?.getAttribute?.("data-a-hires") ?? "",
        title: titleEl?.textContent?.trim() ?? "How was the item?",
        name: nameElProduct?.textContent?.trim() ?? "",
        productUrl,
        asin: getAsinFromPage()
      });
    }, []);
    React__default.useEffect(() => {
      discover();
      const observer2 = new MutationObserver(() => {
        discover();
      });
      observer2.observe(document.body, { childList: true, subtree: true });
      const interval = setInterval(discover, 2e3);
      return () => {
        observer2.disconnect();
        clearInterval(interval);
      };
    }, [discover]);
    const saveDrafts = React__default.useCallback((text, title, rating) => {
      const asin = asinRef.current;
      if (!asin) return;
      setSyncStatus("saving");
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        try {
          localStorage.setItem(`amazon_review_draft_${asin}`, text);
          localStorage.setItem(`amazon_review_title_draft_${asin}`, title);
          localStorage.setItem(`amazon_review_rating_draft_${asin}`, String(rating));
          setSyncStatus("saved");
          setLastSaved( new Date());
          setTimeout(() => setSyncStatus("idle"), 3e3);
        } catch (e) {
          console.error("Failed to save draft:", e);
          setSyncStatus("error");
        }
      }, 1e3);
    }, []);
    const setStarRating = React__default.useCallback((rating) => {
      setState((s) => {
        const newState = { ...s, starRating: rating };
        saveDrafts(newState.reviewText, newState.reviewTitle, newState.starRating);
        return newState;
      });
      setAmazonStarRating(rating, rootRef.current);
    }, [saveDrafts]);
    const setReviewText = React__default.useCallback((value) => {
      setState((s) => {
        const newState = { ...s, reviewText: value };
        saveDrafts(newState.reviewText, newState.reviewTitle, newState.starRating);
        return newState;
      });
      syncToElement(elementsRef.current.textarea, value);
    }, [saveDrafts]);
    const setReviewTitle = React__default.useCallback((value) => {
      setState((s) => {
        const newState = { ...s, reviewTitle: value };
        saveDrafts(newState.reviewText, newState.reviewTitle, newState.starRating);
        return newState;
      });
      syncToElement(elementsRef.current.titleInput, value);
    }, [saveDrafts]);
    const triggerMediaUpload = React__default.useCallback(() => {
      elementsRef.current.mediaInput?.click();
    }, []);
    const setMediaFiles = React__default.useCallback((files) => {
      const mediaInput = elementsRef.current.mediaInput;
      if (!mediaInput) return;
      const dt = new DataTransfer();
      if (files instanceof FileList) {
        Array.from(files).forEach((file) => dt.items.add(file));
      } else {
        files.forEach((file) => dt.items.add(file));
      }
      mediaInput.files = dt.files;
      mediaInput.dispatchEvent(new Event("change", { bubbles: true }));
    }, []);
    const removeMedia = React__default.useCallback((index) => {
      const root = document;
      const container = query(SELECTORS.thumbnails, root);
      if (!container) return;
      const wrappers = queryAll(SELECTORS.thumbnailWrapper, container);
      const target = wrappers[index];
      if (target) {
        const deleteBtn = query(SELECTORS.mediaDelete, target);
        deleteBtn?.click();
      }
    }, []);
    const getImageFileFromClipboard = React__default.useCallback(
      async (pasteEvent) => {
        if (pasteEvent?.clipboardData?.items) {
          for (let i = 0; i < pasteEvent.clipboardData.items.length; i++) {
            const item = pasteEvent.clipboardData.items[i];
            if (item.type.startsWith("image/")) {
              const file = item.getAsFile();
              if (file) return file;
            }
          }
          return null;
        }
        const items = await navigator.clipboard.read();
        for (const item of items) {
          if (item.types.includes("image/png") || item.types.includes("image/jpeg")) {
            const type = item.types.includes("image/png") ? "image/png" : "image/jpeg";
            const blob = await item.getType(type);
            const ext = type === "image/png" ? "png" : "jpg";
            return new File([blob], `clipboard-image.${ext}`, { type: blob.type });
          }
        }
        return null;
      },
      []
    );
    const pasteImageFromClipboard = React__default.useCallback(
      async (pasteEvent) => {
        const mediaInput = elementsRef.current.mediaInput;
        if (!mediaInput) return "error";
        try {
          const file = await getImageFileFromClipboard(pasteEvent);
          if (!file) return "no_image";
          const dt = new DataTransfer();
          dt.items.add(file);
          mediaInput.files = dt.files;
          mediaInput.dispatchEvent(new Event("change", { bubbles: true }));
          return "ok";
        } catch (err) {
          const e = err;
          if (e?.name === "NotAllowedError") return "denied";
          if (e?.name === "NotSupportedError") return "error";
          return "error";
        }
      },
      [getImageFileFromClipboard]
    );
    const submit = React__default.useCallback(() => {
      const { form, textarea, titleInput, submitBtn } = elementsRef.current;
      const s = stateRef.current;
      console.log("[ARS] Submit triggered. Form found?", !!form, "Button found?", !!submitBtn);
      if (!form) {
        console.error("[ARS] Cannot submit: Form element not found in DOM.");
        return;
      }
      console.log("[ARS] Syncing values to Amazon DOM before submit...");
      syncToElement(textarea, s.reviewText);
      syncToElement(titleInput, s.reviewTitle);
      setAmazonStarRating(s.starRating, rootRef.current);
      const asin = asinRef.current;
      if (asin) {
        localStorage.removeItem(`amazon_review_draft_${asin}`);
        localStorage.removeItem(`amazon_review_title_draft_${asin}`);
        localStorage.removeItem(`amazon_review_rating_draft_${asin}`);
      }
      if (submitBtn) {
        console.log("[ARS] Submit button details:", {
          disabled: submitBtn.disabled,
          type: submitBtn.type,
          name: submitBtn.name,
          value: submitBtn.value,
          form: submitBtn.form === form,
          hasCapturedHandler: !!amazonSubmitHandlerRef.current
        });
        if (submitBtn.disabled) {
          console.warn("[ARS] Native submit button is DISABLED. Form may be invalid.");
        }
        if (amazonSubmitHandlerRef.current) {
          console.log("[ARS] Invoking captured Amazon submit handler...");
          try {
            const fakeEvent = {
              type: "click",
              target: submitBtn,
              currentTarget: submitBtn,
              preventDefault: () => {
              },
              stopPropagation: () => {
              },
              nativeEvent: {},
              isTrusted: true
            };
            amazonSubmitHandlerRef.current.call(submitBtn, fakeEvent);
            console.log("[ARS] Successfully invoked captured handler");
            return;
          } catch (e) {
            console.error("[ARS] Captured handler invocation failed:", e);
          }
        }
        console.log("[ARS] Clicking native submit button with mouse events...");
        const mouseEventProps = { bubbles: true, cancelable: true, view: window };
        submitBtn.dispatchEvent(new MouseEvent("mousedown", mouseEventProps));
        submitBtn.dispatchEvent(new MouseEvent("mouseup", mouseEventProps));
        submitBtn.click();
        setTimeout(() => {
          const btnContainer = submitBtn.closest(".a-button");
          if (btnContainer && btnContainer instanceof HTMLElement) {
            console.log("[ARS] Clicking button container fallback...");
            btnContainer.dispatchEvent(new MouseEvent("mousedown", mouseEventProps));
            btnContainer.dispatchEvent(new MouseEvent("mouseup", mouseEventProps));
            btnContainer.click();
          }
        }, 100);
        setTimeout(() => {
          console.log("[ARS] Trying form.requestSubmit(submitBtn)...");
          try {
            form.requestSubmit(submitBtn);
          } catch (e) {
            console.error("[ARS] form.requestSubmit() failed:", e);
          }
        }, 200);
        setTimeout(() => {
          console.log("[ARS] Dispatching submit event on form...");
          form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        }, 300);
      } else {
        console.log("[ARS] No native button found. Calling form.requestSubmit()...");
        form.requestSubmit();
      }
    }, []);
    return {
      isReady,
      profile,
      product,
      state,
      setReviewText,
      setReviewTitle,
      setStarRating,
      triggerMediaUpload,
      setMediaFiles,
      removeMedia,
      pasteImageFromClipboard,
      submit,
      elements: elementsRef.current,
      syncStatus,
      lastSaved
    };
  }
  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const DEFAULT_SETTINGS = {
    amazon_ai_enabled: false,
    amazon_ai_tos_accepted: false,
    amazon_ai_provider: "local",
    amazon_ai_llm_server_url: "http://localhost:1234",
    amazon_ai_gemini_key: "",
    amazon_ai_gemini_model: "gemini-3-flash-preview",
    amazon_ai_local_text_model: "",
    amazon_ai_local_vlm_model: "huihui-qwen3-vl-8b-instruct-abliterated",
    amazon_ai_gemini_min_interval_ms: 0,
    amazon_ai_timeout_llm: 45e3,
    amazon_ai_timeout_connect: 7e3,
    amazon_ai_timeout_vision_image: 2e4,
    amazon_ai_timeout_vision_total: 45e3,
    amazon_ai_main_retries: 2,
    amazon_ai_main_backoff: 1500,
    amazon_ai_vision_autoskip: true,
    amazon_ai_skip_length_on_retry: false,
    amazon_ai_disable_corruption_detection: false,
    amazon_ai_detailed_snowball_enabled: false,
    amazon_ai_convert_markdown: true,
    amazon_ai_include_images_default: true,
    amazon_review_title_style: "normal",
    amazon_review_templates: [],
    amazon_review_phrases: [],
    amazon_pastebin_api_dev_key: "",
    amazon_pastebin_api_user_name: "",
    amazon_pastebin_api_user_password: "",
    amazon_pastebin_api_user_key: "",
    amazon_pastebin_recovery_id: "",
    amazon_pastebin_privacy_mode: false,
    amazon_auto_sync_templates: true,
    amazon_auto_sync_phrases: false,
    amazon_ui_lights_off: false,
    amazon_editor_auto_resize: false,
    amazon_ui_scale: 1,
    amazon_bullet_style: "•",
    debug_mode: false,
    debug_unhide_native: false,
    debug_native_side_by_side: false,
    dark_mode: false,
    show_demo_settings: false,
    demo_enabled: false,
    demo_pfp_url: "",
    demo_name: "",
    demo_review_body: "",
    demo_review_title: "",
    demo_typing_delay: 2,
    demo_typing_speed: "normal"
  };
  class SettingsService {
get(key) {
      const rawValue = localStorage.getItem(key);
      if (rawValue === null) {
        return DEFAULT_SETTINGS[key];
      }
      const defaultValue = DEFAULT_SETTINGS[key];
      const type = typeof defaultValue;
      if (type === "number") {
        const num = Number(rawValue);
        return Number.isNaN(num) ? defaultValue : num;
      }
      if (type === "boolean") {
        return rawValue === "true";
      }
      if (key === "amazon_review_templates" || key === "amazon_review_phrases") {
        try {
          return JSON.parse(rawValue);
        } catch (e) {
          console.warn(`Failed to parse setting ${key}:`, e);
          return defaultValue;
        }
      }
      return rawValue;
    }
set(key, value) {
      if (typeof value === "object" && value !== null) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, String(value));
      }
    }
getAll() {
      const settings = { ...DEFAULT_SETTINGS };
      Object.keys(DEFAULT_SETTINGS).forEach((key) => {
        settings[key] = this.get(key);
      });
      return settings;
    }
  }
  const settingsService = new SettingsService();
  const SettingsContext = React__default.createContext(void 0);
  const DEFAULT_PHRASES = [
    { id: "p1", label: "Highly Recommended", content: "I highly recommend this product!" },
    { id: "p2", label: "Game Changer", content: "This item is a total game changer." },
    { id: "p3", label: "Good Value", content: "Great quality for the price." },
    { id: "p4", label: "Pros/Cons Intro", content: "Here are the pros and cons based on my experience:" }
  ];
  const SettingsProvider = ({ children }) => {
    const [settings, setSettingsState] = React__default.useState(settingsService.getAll());
    const [templates, setTemplatesState] = React__default.useState([]);
    const [phrases, setPhrasesState] = React__default.useState([]);
    const [isLoaded, setIsLoaded] = React__default.useState(false);
    React__default.useEffect(() => {
      const savedT = localStorage.getItem("amazon_review_templates");
      if (savedT) setTemplatesState(JSON.parse(savedT));
      const savedP = localStorage.getItem("amazon_review_phrases");
      if (savedP) {
        setPhrasesState(JSON.parse(savedP));
      } else {
        setPhrasesState(DEFAULT_PHRASES);
        localStorage.setItem("amazon_review_phrases", JSON.stringify(DEFAULT_PHRASES));
      }
      setIsLoaded(true);
      const handleStorageChange = () => {
        setSettingsState(settingsService.getAll());
        const updatedT = localStorage.getItem("amazon_review_templates");
        if (updatedT) setTemplatesState(JSON.parse(updatedT));
        const updatedP = localStorage.getItem("amazon_review_phrases");
        if (updatedP) setPhrasesState(JSON.parse(updatedP));
      };
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }, []);
    const setSetting = React__default.useCallback((key, value) => {
      settingsService.set(key, value);
      setSettingsState((prev) => ({ ...prev, [key]: value }));
    }, []);
    const setTemplates = React__default.useCallback((t) => {
      localStorage.setItem("amazon_review_templates", JSON.stringify(t));
      setTemplatesState(t);
    }, []);
    const setPhrases = React__default.useCallback((p) => {
      localStorage.setItem("amazon_review_phrases", JSON.stringify(p));
      setPhrasesState(p);
    }, []);
    return React__default.createElement(SettingsContext.Provider, { value: {
      settings,
      setSetting,
      templates,
      phrases,
      isLoaded,
      setTemplates,
      setPhrases
    } }, children);
  };
  const useSettingsContext = () => {
    const context = React__default.useContext(SettingsContext);
    if (!context) {
      throw new Error("useSettingsContext must be used within a SettingsProvider");
    }
    return context;
  };
  function useSettings() {
    return useSettingsContext();
  }
  const ProfileSection = ({
    avatarSrc,
    name,
    className
  }) => {
    const { settings } = useSettings();
    const displayAvatar = settings.demo_enabled && settings.demo_pfp_url ? settings.demo_pfp_url : avatarSrc;
    const displayName = settings.demo_enabled && settings.demo_name ? settings.demo_name : name;
    return React__default.createElement("div", { className: cn("ars-profile-section", className) }, React__default.createElement("div", { className: "ars-profile-container" }, React__default.createElement("div", { className: "ars-profile-info" }, React__default.createElement("div", { className: "ars-profile-avatar-wrapper" }, React__default.createElement("a", { href: "/gp/profile", className: "ars-profile-avatar", target: "_blank", rel: "noopener noreferrer" }, displayAvatar ? React__default.createElement("img", { src: displayAvatar, alt: "" }) : React__default.createElement("span", { className: "ars-profile-avatar-placeholder" }, displayName.charAt(0).toUpperCase() || "?"))), React__default.createElement("span", { className: "ars-profile-name" }, displayName))));
  };
  const ProductHeader = ({
    imageSrc,
    title,
    name,
    productUrl,
    className
  }) => {
    const imageNode = imageSrc ? React__default.createElement(
      "img",
      {
        className: "ars-product-image",
        src: imageSrc,
        alt: "",
        width: 64,
        height: 64
      }
    ) : null;
    return React__default.createElement("div", { className: cn("ars-product-header", className) }, imageNode && (productUrl ? React__default.createElement("a", { href: productUrl, target: "_blank", rel: "noopener noreferrer", className: "ars-product-image-link" }, imageNode) : imageNode), React__default.createElement("div", { className: "ars-product-info" }, React__default.createElement("span", { className: "ars-product-title" }, title), React__default.createElement("span", { className: "ars-product-name" }, name)));
  };
  const StarRating = ({ value, onChange, className, hideClear }) => {
    const [hoverValue, setHoverValue] = React__default.useState(0);
    const displayValue = hoverValue || value;
    return React__default.createElement("div", { className: cn("ars-star-rating", className) }, React__default.createElement(
      "div",
      {
        className: "ars-star-rating-stars",
        onMouseLeave: () => setHoverValue(0)
      },
      [1, 2, 3, 4, 5].map((rating) => React__default.createElement(
        "button",
        {
          key: rating,
          type: "button",
          className: cn(
            "ars-star-button",
            rating <= displayValue && "ars-star-button--filled"
          ),
          onClick: () => onChange(rating),
          onMouseEnter: () => setHoverValue(rating),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onChange(rating);
            }
          },
          "aria-label": `${rating} star${rating > 1 ? "s" : ""}`,
          "aria-pressed": rating <= value
        },
React__default.createElement(Star, { size: 28, strokeWidth: 1.5, fill: "currentColor" })
      ))
    ), !hideClear && React__default.createElement(
      "button",
      {
        type: "button",
        className: "ars-star-clear",
        onClick: () => onChange(0),
        tabIndex: 0
      },
      "Clear"
    ));
  };
  const PreviewThumbnail = ({ src, onRemove }) => React__default.createElement("div", { className: "ars-media-thumbnail" }, React__default.createElement(
    "div",
    {
      className: "ars-media-thumbnail-image",
      style: { backgroundImage: `url(${src})` }
    }
  ), React__default.createElement(
    "button",
    {
      type: "button",
      className: "ars-media-thumbnail-remove",
      onClick: (e) => {
        e.stopPropagation();
        onRemove();
      },
      title: "Remove media"
    },
React__default.createElement(X, { size: 14 })
  ));
  const MediaUpload = ({
    onTrigger,
    onPasteFromClipboard,
    onPasteSuccess,
    onFilesDropped,
    thumbnails = [],
    onRemove,
    showPasteFeedback = false,
    placeholder = "Drag-and-drop or Crtl+V your images here!",
    className
  }) => {
    const [isDragging2, setIsDragging] = React__default.useState(false);
    const handleClick = (e) => {
      if (e.target.closest(".ars-media-upload-paste-btn")) return;
      onTrigger();
    };
    const handleKeyDown = (e) => {
      if (e.target.closest(".ars-media-upload-paste-btn")) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onTrigger();
      }
    };
    const handlePasteClick = async (e) => {
      e.stopPropagation();
      if (!onPasteFromClipboard) return;
      try {
        const result = await onPasteFromClipboard();
        if (result === "ok") {
          onPasteSuccess?.();
        } else if (result === "no_image") {
          window.alert("No image found in clipboard! Please copy an image first.");
        } else if (result === "denied") {
          window.alert("Clipboard access denied. Please grant clipboard permissions and try again.");
        } else if (result === "error") {
          window.alert("Clipboard access failed. Please try using Ctrl+V to paste the image.");
        }
      } catch (err) {
        console.error("Paste from clipboard error:", err);
        window.alert("Error processing clipboard image. Please try copying the image again.");
      }
    };
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };
    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files && files.length > 0 && onFilesDropped) {
        onFilesDropped(files);
      }
    };
    return React__default.createElement("div", { className: "ars-media-upload-wrapper" }, React__default.createElement("div", { className: "ars-media-thumbnails" }, thumbnails.map((src, i) => React__default.createElement(
      PreviewThumbnail,
      {
        key: `${src}-${i}`,
        src,
        onRemove: () => onRemove?.(i)
      }
    )), React__default.createElement(
      "div",
      {
        className: cn(
          "ars-media-upload",
          thumbnails.length > 0 && "ars-media-upload--compact",
          showPasteFeedback && "ars-media-upload--uploading",
          isDragging2 && "ars-media-upload--dragging",
          className
        ),
        role: "button",
        tabIndex: 0,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        "aria-label": "Share a video or photo"
      },
      showPasteFeedback ? React__default.createElement("div", { className: "ars-media-upload-feedback" }, thumbnails.length > 0 ? "..." : "Image pasted! Uploading...") : React__default.createElement("div", { className: "ars-media-upload-content" }, isDragging2 ? React__default.createElement("div", { className: "ars-media-upload-dragging-content" }, React__default.createElement(Camera, { size: thumbnails.length > 0 ? 24 : 32, className: "ars-media-upload-icon animate-bounce" }), thumbnails.length === 0 && React__default.createElement("span", { className: "ars-media-upload-placeholder font-bold" }, "Drop files to upload")) : React__default.createElement(React__default.Fragment, null, React__default.createElement(Camera, { size: thumbnails.length > 0 ? 24 : 32, className: "ars-media-upload-icon" }), thumbnails.length === 0 && React__default.createElement("span", { className: "ars-media-upload-placeholder" }, placeholder)))
    )), React__default.createElement("div", { className: "ars-media-upload-actions" }, onPasteFromClipboard && React__default.createElement(
      "button",
      {
        type: "button",
        className: "ars-media-upload-action-btn ars-media-upload-paste-btn",
        onClick: handlePasteClick,
        title: "Paste image from clipboard"
      },
React__default.createElement(ClipboardPaste, { size: 18 }),
      "Paste from Clipboard..."
    ), React__default.createElement(
      "a",
      {
        href: "https://photos.google.com/",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "ars-media-upload-action-btn ars-media-upload-google-btn",
        title: "Open Google Photos"
      },
React__default.createElement(Image$1, { size: 18 }),
      "Google Photos"
    ), React__default.createElement(
      "a",
      {
        href: "https://www.icloud.com/photos",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "ars-media-upload-action-btn ars-media-upload-icloud-btn",
        title: "Open iCloud Photos"
      },
React__default.createElement(Cloud, { size: 18 }),
      "iCloud Photos"
    )));
  };
  const Button = React__default.forwardRef(
    ({ className, variant = "primary", size = "md", isLoading, icon, children, disabled, ...props }, ref) => {
      return React__default.createElement(
        "button",
        {
          ref,
          className: cn(
            "ars-button",
            `ars-button--${variant}`,
            `ars-button--${size}`,
            isLoading && "ars-button--loading",
            className
          ),
          disabled: disabled || isLoading,
          ...props
        },
        isLoading && React__default.createElement(LoaderCircle, { className: "ars-button__loader", size: 16 }),
        !isLoading && icon && React__default.createElement("span", { className: "ars-button__icon" }, icon),
        children
      );
    }
  );
  Button.displayName = "Button";
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  var hasRequiredReactJsxRuntime_production_min;
  function requireReactJsxRuntime_production_min() {
    if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
    hasRequiredReactJsxRuntime_production_min = 1;
    var f = React__default, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
    function q(c, a, g) {
      var b, d = {}, e = null, h = null;
      void 0 !== g && (e = "" + g);
      void 0 !== a.key && (e = "" + a.key);
      void 0 !== a.ref && (h = a.ref);
      for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
      if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
      return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
    }
    reactJsxRuntime_production_min.Fragment = l;
    reactJsxRuntime_production_min.jsx = q;
    reactJsxRuntime_production_min.jsxs = q;
    return reactJsxRuntime_production_min;
  }
  var hasRequiredJsxRuntime;
  function requireJsxRuntime() {
    if (hasRequiredJsxRuntime) return jsxRuntime.exports;
    hasRequiredJsxRuntime = 1;
    {
      jsxRuntime.exports = requireReactJsxRuntime_production_min();
    }
    return jsxRuntime.exports;
  }
  var jsxRuntimeExports = requireJsxRuntime();
  const LayoutGroupContext = React__default.createContext({});
  function useConstant(init) {
    const ref = React__default.useRef(null);
    if (ref.current === null) {
      ref.current = init();
    }
    return ref.current;
  }
  const isBrowser$1 = typeof window !== "undefined";
  const useIsomorphicLayoutEffect = isBrowser$1 ? React__default.useLayoutEffect : React__default.useEffect;
  const PresenceContext = React__default.createContext(null);
  function addUniqueItem(arr, item) {
    if (arr.indexOf(item) === -1)
      arr.push(item);
  }
  function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1)
      arr.splice(index, 1);
  }
  const clamp = (min, max, v) => {
    if (v > max)
      return max;
    if (v < min)
      return min;
    return v;
  };
  let invariant = () => {
  };
  const MotionGlobalConfig = {};
  const isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);
  function isObject(value) {
    return typeof value === "object" && value !== null;
  }
  const isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);
function memo(callback) {
    let result;
    return () => {
      if (result === void 0)
        result = callback();
      return result;
    };
  }
  const noop = (any) => any;
  const combineFunctions = (a, b) => (v) => b(a(v));
  const pipe = (...transformers) => transformers.reduce(combineFunctions);
  const progress = (from, to, value) => {
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
  };
  class SubscriptionManager {
    constructor() {
      this.subscriptions = [];
    }
    add(handler) {
      addUniqueItem(this.subscriptions, handler);
      return () => removeItem(this.subscriptions, handler);
    }
    notify(a, b, c) {
      const numSubscriptions = this.subscriptions.length;
      if (!numSubscriptions)
        return;
      if (numSubscriptions === 1) {
        this.subscriptions[0](a, b, c);
      } else {
        for (let i = 0; i < numSubscriptions; i++) {
          const handler = this.subscriptions[i];
          handler && handler(a, b, c);
        }
      }
    }
    getSize() {
      return this.subscriptions.length;
    }
    clear() {
      this.subscriptions.length = 0;
    }
  }
  const secondsToMilliseconds = (seconds) => seconds * 1e3;
  const millisecondsToSeconds = (milliseconds) => milliseconds / 1e3;
  function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1e3 / frameDuration) : 0;
  }
  const calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
  const subdivisionPrecision = 1e-7;
  const subdivisionMaxIterations = 12;
  function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
    let currentX;
    let currentT;
    let i = 0;
    do {
      currentT = lowerBound + (upperBound - lowerBound) / 2;
      currentX = calcBezier(currentT, mX1, mX2) - x;
      if (currentX > 0) {
        upperBound = currentT;
      } else {
        lowerBound = currentT;
      }
    } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
    return currentT;
  }
  function cubicBezier(mX1, mY1, mX2, mY2) {
    if (mX1 === mY1 && mX2 === mY2)
      return noop;
    const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
    return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
  }
  const mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
  const reverseEasing = (easing) => (p) => 1 - easing(1 - p);
  const backOut = cubicBezier(0.33, 1.53, 0.69, 0.99);
  const backIn = reverseEasing(backOut);
  const backInOut = mirrorEasing(backIn);
  const anticipate = (p) => (p *= 2) < 1 ? 0.5 * backIn(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
  const circIn = (p) => 1 - Math.sin(Math.acos(p));
  const circOut = reverseEasing(circIn);
  const circInOut = mirrorEasing(circIn);
  const easeIn = cubicBezier(0.42, 0, 1, 1);
  const easeOut = cubicBezier(0, 0, 0.58, 1);
  const easeInOut = cubicBezier(0.42, 0, 0.58, 1);
  const isEasingArray = (ease2) => {
    return Array.isArray(ease2) && typeof ease2[0] !== "number";
  };
  const isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";
  const easingLookup = {
    linear: noop,
    easeIn,
    easeInOut,
    easeOut,
    circIn,
    circInOut,
    circOut,
    backIn,
    backInOut,
    backOut,
    anticipate
  };
  const isValidEasing = (easing) => {
    return typeof easing === "string";
  };
  const easingDefinitionToFunction = (definition) => {
    if (isBezierDefinition(definition)) {
      invariant(definition.length === 4);
      const [x1, y1, x2, y2] = definition;
      return cubicBezier(x1, y1, x2, y2);
    } else if (isValidEasing(definition)) {
      return easingLookup[definition];
    }
    return definition;
  };
  const stepsOrder = [
    "setup",
"read",
"resolveKeyframes",
"preUpdate",
"update",
"preRender",
"render",
"postRender"
];
  function createRenderStep(runNextFrame, stepName) {
    let thisFrame = new Set();
    let nextFrame = new Set();
    let isProcessing = false;
    let flushNextFrame = false;
    const toKeepAlive = new WeakSet();
    let latestFrameData = {
      delta: 0,
      timestamp: 0,
      isProcessing: false
    };
    function triggerCallback(callback) {
      if (toKeepAlive.has(callback)) {
        step.schedule(callback);
        runNextFrame();
      }
      callback(latestFrameData);
    }
    const step = {
schedule: (callback, keepAlive = false, immediate = false) => {
        const addToCurrentFrame = immediate && isProcessing;
        const queue = addToCurrentFrame ? thisFrame : nextFrame;
        if (keepAlive)
          toKeepAlive.add(callback);
        if (!queue.has(callback))
          queue.add(callback);
        return callback;
      },
cancel: (callback) => {
        nextFrame.delete(callback);
        toKeepAlive.delete(callback);
      },
process: (frameData2) => {
        latestFrameData = frameData2;
        if (isProcessing) {
          flushNextFrame = true;
          return;
        }
        isProcessing = true;
        [thisFrame, nextFrame] = [nextFrame, thisFrame];
        thisFrame.forEach(triggerCallback);
        thisFrame.clear();
        isProcessing = false;
        if (flushNextFrame) {
          flushNextFrame = false;
          step.process(frameData2);
        }
      }
    };
    return step;
  }
  const maxElapsed = 40;
  function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
    let runNextFrame = false;
    let useDefaultElapsed = true;
    const state = {
      delta: 0,
      timestamp: 0,
      isProcessing: false
    };
    const flagRunNextFrame = () => runNextFrame = true;
    const steps = stepsOrder.reduce((acc, key) => {
      acc[key] = createRenderStep(flagRunNextFrame);
      return acc;
    }, {});
    const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps;
    const processBatch = () => {
      const timestamp = MotionGlobalConfig.useManualTiming ? state.timestamp : performance.now();
      runNextFrame = false;
      if (!MotionGlobalConfig.useManualTiming) {
        state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
      }
      state.timestamp = timestamp;
      state.isProcessing = true;
      setup.process(state);
      read.process(state);
      resolveKeyframes.process(state);
      preUpdate.process(state);
      update.process(state);
      preRender.process(state);
      render.process(state);
      postRender.process(state);
      state.isProcessing = false;
      if (runNextFrame && allowKeepAlive) {
        useDefaultElapsed = false;
        scheduleNextBatch(processBatch);
      }
    };
    const wake = () => {
      runNextFrame = true;
      useDefaultElapsed = true;
      if (!state.isProcessing) {
        scheduleNextBatch(processBatch);
      }
    };
    const schedule = stepsOrder.reduce((acc, key) => {
      const step = steps[key];
      acc[key] = (process, keepAlive = false, immediate = false) => {
        if (!runNextFrame)
          wake();
        return step.schedule(process, keepAlive, immediate);
      };
      return acc;
    }, {});
    const cancel = (process) => {
      for (let i = 0; i < stepsOrder.length; i++) {
        steps[stepsOrder[i]].cancel(process);
      }
    };
    return { schedule, cancel, state, steps };
  }
  const { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);
  let now;
  function clearTime() {
    now = void 0;
  }
  const time = {
    now: () => {
      if (now === void 0) {
        time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
      }
      return now;
    },
    set: (newTime) => {
      now = newTime;
      queueMicrotask(clearTime);
    }
  };
  const checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
  const isCSSVariableName = checkStringStartsWith("--");
  const startsAsVariableToken = checkStringStartsWith("var(--");
  const isCSSVariableToken = (value) => {
    const startsWithToken = startsAsVariableToken(value);
    if (!startsWithToken)
      return false;
    return singleCssVariableRegex.test(value.split("/*")[0].trim());
  };
  const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
  function containsCSSVariable(value) {
    if (typeof value !== "string")
      return false;
    return value.split("/*")[0].includes("var(--");
  }
  const number = {
    test: (v) => typeof v === "number",
    parse: parseFloat,
    transform: (v) => v
  };
  const alpha = {
    ...number,
    transform: (v) => clamp(0, 1, v)
  };
  const scale = {
    ...number,
    default: 1
  };
  const sanitize = (v) => Math.round(v * 1e5) / 1e5;
  const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
  function isNullish(v) {
    return v == null;
  }
  const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
  const isColorString = (type, testProp) => (v) => {
    return Boolean(typeof v === "string" && singleColorRegex.test(v) && v.startsWith(type) || testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp));
  };
  const splitColor = (aName, bName, cName) => (v) => {
    if (typeof v !== "string")
      return v;
    const [a, b, c, alpha2] = v.match(floatRegex);
    return {
      [aName]: parseFloat(a),
      [bName]: parseFloat(b),
      [cName]: parseFloat(c),
      alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
    };
  };
  const clampRgbUnit = (v) => clamp(0, 255, v);
  const rgbUnit = {
    ...number,
    transform: (v) => Math.round(clampRgbUnit(v))
  };
  const rgba = {
    test: isColorString("rgb", "red"),
    parse: splitColor("red", "green", "blue"),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
  };
  function parseHex(v) {
    let r = "";
    let g = "";
    let b = "";
    let a = "";
    if (v.length > 5) {
      r = v.substring(1, 3);
      g = v.substring(3, 5);
      b = v.substring(5, 7);
      a = v.substring(7, 9);
    } else {
      r = v.substring(1, 2);
      g = v.substring(2, 3);
      b = v.substring(3, 4);
      a = v.substring(4, 5);
      r += r;
      g += g;
      b += b;
      a += a;
    }
    return {
      red: parseInt(r, 16),
      green: parseInt(g, 16),
      blue: parseInt(b, 16),
      alpha: a ? parseInt(a, 16) / 255 : 1
    };
  }
  const hex = {
    test: isColorString("#"),
    parse: parseHex,
    transform: rgba.transform
  };
  const createUnitType = (unit) => ({
    test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
    parse: parseFloat,
    transform: (v) => `${v}${unit}`
  });
  const degrees = createUnitType("deg");
  const percent = createUnitType("%");
  const px = createUnitType("px");
  const vh = createUnitType("vh");
  const vw = createUnitType("vw");
  const progressPercentage = (() => ({
    ...percent,
    parse: (v) => percent.parse(v) / 100,
    transform: (v) => percent.transform(v * 100)
  }))();
  const hsla = {
    test: isColorString("hsl", "hue"),
    parse: splitColor("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
      return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
    }
  };
  const color = {
    test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
    parse: (v) => {
      if (rgba.test(v)) {
        return rgba.parse(v);
      } else if (hsla.test(v)) {
        return hsla.parse(v);
      } else {
        return hex.parse(v);
      }
    },
    transform: (v) => {
      return typeof v === "string" ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
    },
    getAnimatableNone: (v) => {
      const parsed = color.parse(v);
      parsed.alpha = 0;
      return color.transform(parsed);
    }
  };
  const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
  function test(v) {
    return isNaN(v) && typeof v === "string" && (v.match(floatRegex)?.length || 0) + (v.match(colorRegex)?.length || 0) > 0;
  }
  const NUMBER_TOKEN = "number";
  const COLOR_TOKEN = "color";
  const VAR_TOKEN = "var";
  const VAR_FUNCTION_TOKEN = "var(";
  const SPLIT_TOKEN = "${}";
  const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
  function analyseComplexValue(value) {
    const originalValue = value.toString();
    const values = [];
    const indexes = {
      color: [],
      number: [],
      var: []
    };
    const types = [];
    let i = 0;
    const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
      if (color.test(parsedValue)) {
        indexes.color.push(i);
        types.push(COLOR_TOKEN);
        values.push(color.parse(parsedValue));
      } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
        indexes.var.push(i);
        types.push(VAR_TOKEN);
        values.push(parsedValue);
      } else {
        indexes.number.push(i);
        types.push(NUMBER_TOKEN);
        values.push(parseFloat(parsedValue));
      }
      ++i;
      return SPLIT_TOKEN;
    });
    const split = tokenised.split(SPLIT_TOKEN);
    return { values, split, indexes, types };
  }
  function parseComplexValue(v) {
    return analyseComplexValue(v).values;
  }
  function createTransformer(source) {
    const { split, types } = analyseComplexValue(source);
    const numSections = split.length;
    return (v) => {
      let output = "";
      for (let i = 0; i < numSections; i++) {
        output += split[i];
        if (v[i] !== void 0) {
          const type = types[i];
          if (type === NUMBER_TOKEN) {
            output += sanitize(v[i]);
          } else if (type === COLOR_TOKEN) {
            output += color.transform(v[i]);
          } else {
            output += v[i];
          }
        }
      }
      return output;
    };
  }
  const convertNumbersToZero = (v) => typeof v === "number" ? 0 : color.test(v) ? color.getAnimatableNone(v) : v;
  function getAnimatableNone$1(v) {
    const parsed = parseComplexValue(v);
    const transformer = createTransformer(v);
    return transformer(parsed.map(convertNumbersToZero));
  }
  const complex = {
    test,
    parse: parseComplexValue,
    createTransformer,
    getAnimatableNone: getAnimatableNone$1
  };
  function hueToRgb(p, q, t) {
    if (t < 0)
      t += 1;
    if (t > 1)
      t -= 1;
    if (t < 1 / 6)
      return p + (q - p) * 6 * t;
    if (t < 1 / 2)
      return q;
    if (t < 2 / 3)
      return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
      red = green = blue = lightness;
    } else {
      const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
      const p = 2 * lightness - q;
      red = hueToRgb(p, q, hue + 1 / 3);
      green = hueToRgb(p, q, hue);
      blue = hueToRgb(p, q, hue - 1 / 3);
    }
    return {
      red: Math.round(red * 255),
      green: Math.round(green * 255),
      blue: Math.round(blue * 255),
      alpha: alpha2
    };
  }
  function mixImmediate(a, b) {
    return (p) => p > 0 ? b : a;
  }
  const mixNumber$1 = (from, to, progress2) => {
    return from + (to - from) * progress2;
  };
  const mixLinearColor = (from, to, v) => {
    const fromExpo = from * from;
    const expo = v * (to * to - fromExpo) + fromExpo;
    return expo < 0 ? 0 : Math.sqrt(expo);
  };
  const colorTypes = [hex, rgba, hsla];
  const getColorType = (v) => colorTypes.find((type) => type.test(v));
  function asRGBA(color2) {
    const type = getColorType(color2);
    if (!Boolean(type))
      return false;
    let model = type.parse(color2);
    if (type === hsla) {
      model = hslaToRgba(model);
    }
    return model;
  }
  const mixColor = (from, to) => {
    const fromRGBA = asRGBA(from);
    const toRGBA = asRGBA(to);
    if (!fromRGBA || !toRGBA) {
      return mixImmediate(from, to);
    }
    const blended = { ...fromRGBA };
    return (v) => {
      blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
      blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
      blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
      blended.alpha = mixNumber$1(fromRGBA.alpha, toRGBA.alpha, v);
      return rgba.transform(blended);
    };
  };
  const invisibleValues = new Set(["none", "hidden"]);
  function mixVisibility(origin, target) {
    if (invisibleValues.has(origin)) {
      return (p) => p <= 0 ? origin : target;
    } else {
      return (p) => p >= 1 ? target : origin;
    }
  }
  function mixNumber(a, b) {
    return (p) => mixNumber$1(a, b, p);
  }
  function getMixer(a) {
    if (typeof a === "number") {
      return mixNumber;
    } else if (typeof a === "string") {
      return isCSSVariableToken(a) ? mixImmediate : color.test(a) ? mixColor : mixComplex;
    } else if (Array.isArray(a)) {
      return mixArray;
    } else if (typeof a === "object") {
      return color.test(a) ? mixColor : mixObject;
    }
    return mixImmediate;
  }
  function mixArray(a, b) {
    const output = [...a];
    const numValues = output.length;
    const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
    return (p) => {
      for (let i = 0; i < numValues; i++) {
        output[i] = blendValue[i](p);
      }
      return output;
    };
  }
  function mixObject(a, b) {
    const output = { ...a, ...b };
    const blendValue = {};
    for (const key in output) {
      if (a[key] !== void 0 && b[key] !== void 0) {
        blendValue[key] = getMixer(a[key])(a[key], b[key]);
      }
    }
    return (v) => {
      for (const key in blendValue) {
        output[key] = blendValue[key](v);
      }
      return output;
    };
  }
  function matchOrder(origin, target) {
    const orderedOrigin = [];
    const pointers = { color: 0, var: 0, number: 0 };
    for (let i = 0; i < target.values.length; i++) {
      const type = target.types[i];
      const originIndex = origin.indexes[type][pointers[type]];
      const originValue = origin.values[originIndex] ?? 0;
      orderedOrigin[i] = originValue;
      pointers[type]++;
    }
    return orderedOrigin;
  }
  const mixComplex = (origin, target) => {
    const template = complex.createTransformer(target);
    const originStats = analyseComplexValue(origin);
    const targetStats = analyseComplexValue(target);
    const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
    if (canInterpolate) {
      if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) {
        return mixVisibility(origin, target);
      }
      return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
    } else {
      return mixImmediate(origin, target);
    }
  };
  function mix(from, to, p) {
    if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
      return mixNumber$1(from, to, p);
    }
    const mixer = getMixer(from);
    return mixer(from, to);
  }
  const frameloopDriver = (update) => {
    const passTimestamp = ({ timestamp }) => update(timestamp);
    return {
      start: (keepAlive = true) => frame.update(passTimestamp, keepAlive),
      stop: () => cancelFrame(passTimestamp),
now: () => frameData.isProcessing ? frameData.timestamp : time.now()
    };
  };
  const generateLinearEasing = (easing, duration, resolution = 10) => {
    let points = "";
    const numPoints = Math.max(Math.round(duration / resolution), 2);
    for (let i = 0; i < numPoints; i++) {
      points += Math.round(easing(i / (numPoints - 1)) * 1e4) / 1e4 + ", ";
    }
    return `linear(${points.substring(0, points.length - 2)})`;
  };
  const maxGeneratorDuration = 2e4;
  function calcGeneratorDuration(generator) {
    let duration = 0;
    const timeStep = 50;
    let state = generator.next(duration);
    while (!state.done && duration < maxGeneratorDuration) {
      duration += timeStep;
      state = generator.next(duration);
    }
    return duration >= maxGeneratorDuration ? Infinity : duration;
  }
  function createGeneratorEasing(options, scale2 = 100, createGenerator) {
    const generator = createGenerator({ ...options, keyframes: [0, scale2] });
    const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
    return {
      type: "keyframes",
      ease: (progress2) => {
        return generator.next(duration * progress2).value / scale2;
      },
      duration: millisecondsToSeconds(duration)
    };
  }
  const velocitySampleDuration = 5;
  function calcGeneratorVelocity(resolveValue, t, current) {
    const prevT = Math.max(t - velocitySampleDuration, 0);
    return velocityPerSecond(current - resolveValue(prevT), t - prevT);
  }
  const springDefaults = {
stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
duration: 800,
bounce: 0.3,
    visualDuration: 0.3,

restSpeed: {
      granular: 0.01,
      default: 2
    },
    restDelta: {
      granular: 5e-3,
      default: 0.5
    },
minDuration: 0.01,
maxDuration: 10,
minDamping: 0.05,
    maxDamping: 1
  };
  const safeMin = 1e-3;
  function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
    let envelope;
    let derivative;
    let dampingRatio = 1 - bounce;
    dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
    duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, millisecondsToSeconds(duration));
    if (dampingRatio < 1) {
      envelope = (undampedFreq2) => {
        const exponentialDecay = undampedFreq2 * dampingRatio;
        const delta = exponentialDecay * duration;
        const a = exponentialDecay - velocity;
        const b = calcAngularFreq(undampedFreq2, dampingRatio);
        const c = Math.exp(-delta);
        return safeMin - a / b * c;
      };
      derivative = (undampedFreq2) => {
        const exponentialDecay = undampedFreq2 * dampingRatio;
        const delta = exponentialDecay * duration;
        const d = delta * velocity + velocity;
        const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
        const f = Math.exp(-delta);
        const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
        const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
        return factor * ((d - e) * f) / g;
      };
    } else {
      envelope = (undampedFreq2) => {
        const a = Math.exp(-undampedFreq2 * duration);
        const b = (undampedFreq2 - velocity) * duration + 1;
        return -safeMin + a * b;
      };
      derivative = (undampedFreq2) => {
        const a = Math.exp(-undampedFreq2 * duration);
        const b = (velocity - undampedFreq2) * (duration * duration);
        return a * b;
      };
    }
    const initialGuess = 5 / duration;
    const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = secondsToMilliseconds(duration);
    if (isNaN(undampedFreq)) {
      return {
        stiffness: springDefaults.stiffness,
        damping: springDefaults.damping,
        duration
      };
    } else {
      const stiffness = Math.pow(undampedFreq, 2) * mass;
      return {
        stiffness,
        damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
        duration
      };
    }
  }
  const rootIterations = 12;
  function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for (let i = 1; i < rootIterations; i++) {
      result = result - envelope(result) / derivative(result);
    }
    return result;
  }
  function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
  }
  const durationKeys = ["duration", "bounce"];
  const physicsKeys = ["stiffness", "damping", "mass"];
  function isSpringType(options, keys) {
    return keys.some((key) => options[key] !== void 0);
  }
  function getSpringOptions(options) {
    let springOptions = {
      velocity: springDefaults.velocity,
      stiffness: springDefaults.stiffness,
      damping: springDefaults.damping,
      mass: springDefaults.mass,
      isResolvedFromDuration: false,
      ...options
    };
    if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
      if (options.visualDuration) {
        const visualDuration = options.visualDuration;
        const root = 2 * Math.PI / (visualDuration * 1.2);
        const stiffness = root * root;
        const damping = 2 * clamp(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
        springOptions = {
          ...springOptions,
          mass: springDefaults.mass,
          stiffness,
          damping
        };
      } else {
        const derived = findSpring(options);
        springOptions = {
          ...springOptions,
          ...derived,
          mass: springDefaults.mass
        };
        springOptions.isResolvedFromDuration = true;
      }
    }
    return springOptions;
  }
  function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
    const options = typeof optionsOrVisualDuration !== "object" ? {
      visualDuration: optionsOrVisualDuration,
      keyframes: [0, 1],
      bounce
    } : optionsOrVisualDuration;
    let { restSpeed, restDelta } = options;
    const origin = options.keyframes[0];
    const target = options.keyframes[options.keyframes.length - 1];
    const state = { done: false, value: origin };
    const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
      ...options,
      velocity: - millisecondsToSeconds(options.velocity || 0)
    });
    const initialVelocity = velocity || 0;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const initialDelta = target - origin;
    const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
    const isGranularScale = Math.abs(initialDelta) < 5;
    restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
    restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
    let resolveSpring;
    if (dampingRatio < 1) {
      const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = (t) => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        const freqForT = Math.min(dampedAngularFreq * t, 300);
        return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      };
    }
    const generator = {
      calculatedDuration: isResolvedFromDuration ? duration || null : null,
      next: (t) => {
        const current = resolveSpring(t);
        if (!isResolvedFromDuration) {
          let currentVelocity = t === 0 ? initialVelocity : 0;
          if (dampingRatio < 1) {
            currentVelocity = t === 0 ? secondsToMilliseconds(initialVelocity) : calcGeneratorVelocity(resolveSpring, t, current);
          }
          const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
          const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
          state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
        } else {
          state.done = t >= duration;
        }
        state.value = state.done ? target : current;
        return state;
      },
      toString: () => {
        const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
        const easing = generateLinearEasing((progress2) => generator.next(calculatedDuration * progress2).value, calculatedDuration, 30);
        return calculatedDuration + "ms " + easing;
      },
      toTransition: () => {
      }
    };
    return generator;
  }
  spring.applyToOptions = (options) => {
    const generatorOptions = createGeneratorEasing(options, 100, spring);
    options.ease = generatorOptions.ease;
    options.duration = secondsToMilliseconds(generatorOptions.duration);
    options.type = "keyframes";
    return options;
  };
  function inertia({ keyframes: keyframes2, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
    const origin = keyframes2[0];
    const state = {
      done: false,
      value: origin
    };
    const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
    const nearestBoundary = (v) => {
      if (min === void 0)
        return max;
      if (max === void 0)
        return min;
      return Math.abs(min - v) < Math.abs(max - v) ? min : max;
    };
    let amplitude = power * velocity;
    const ideal = origin + amplitude;
    const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
    if (target !== ideal)
      amplitude = target - origin;
    const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
    const calcLatest = (t) => target + calcDelta(t);
    const applyFriction = (t) => {
      const delta = calcDelta(t);
      const latest = calcLatest(t);
      state.done = Math.abs(delta) <= restDelta;
      state.value = state.done ? target : latest;
    };
    let timeReachedBoundary;
    let spring$1;
    const checkCatchBoundary = (t) => {
      if (!isOutOfBounds(state.value))
        return;
      timeReachedBoundary = t;
      spring$1 = spring({
        keyframes: [state.value, nearestBoundary(state.value)],
        velocity: calcGeneratorVelocity(calcLatest, t, state.value),
damping: bounceDamping,
        stiffness: bounceStiffness,
        restDelta,
        restSpeed
      });
    };
    checkCatchBoundary(0);
    return {
      calculatedDuration: null,
      next: (t) => {
        let hasUpdatedFrame = false;
        if (!spring$1 && timeReachedBoundary === void 0) {
          hasUpdatedFrame = true;
          applyFriction(t);
          checkCatchBoundary(t);
        }
        if (timeReachedBoundary !== void 0 && t >= timeReachedBoundary) {
          return spring$1.next(t - timeReachedBoundary);
        } else {
          !hasUpdatedFrame && applyFriction(t);
          return state;
        }
      }
    };
  }
  function createMixers(output, ease2, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
    const numMixers = output.length - 1;
    for (let i = 0; i < numMixers; i++) {
      let mixer = mixerFactory(output[i], output[i + 1]);
      if (ease2) {
        const easingFunction = Array.isArray(ease2) ? ease2[i] || noop : ease2;
        mixer = pipe(easingFunction, mixer);
      }
      mixers.push(mixer);
    }
    return mixers;
  }
  function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
    const inputLength = input.length;
    invariant(inputLength === output.length);
    if (inputLength === 1)
      return () => output[0];
    if (inputLength === 2 && output[0] === output[1])
      return () => output[1];
    const isZeroDeltaRange = input[0] === input[1];
    if (input[0] > input[inputLength - 1]) {
      input = [...input].reverse();
      output = [...output].reverse();
    }
    const mixers = createMixers(output, ease2, mixer);
    const numMixers = mixers.length;
    const interpolator = (v) => {
      if (isZeroDeltaRange && v < input[0])
        return output[0];
      let i = 0;
      if (numMixers > 1) {
        for (; i < input.length - 2; i++) {
          if (v < input[i + 1])
            break;
        }
      }
      const progressInRange = progress(input[i], input[i + 1], v);
      return mixers[i](progressInRange);
    };
    return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
  }
  function fillOffset(offset, remaining) {
    const min = offset[offset.length - 1];
    for (let i = 1; i <= remaining; i++) {
      const offsetProgress = progress(0, remaining, i);
      offset.push(mixNumber$1(min, 1, offsetProgress));
    }
  }
  function defaultOffset(arr) {
    const offset = [0];
    fillOffset(offset, arr.length - 1);
    return offset;
  }
  function convertOffsetToTimes(offset, duration) {
    return offset.map((o) => o * duration);
  }
  function defaultEasing(values, easing) {
    return values.map(() => easing || easeInOut).splice(0, values.length - 1);
  }
  function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease2 = "easeInOut" }) {
    const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
    const state = {
      done: false,
      value: keyframeValues[0]
    };
    const absoluteTimes = convertOffsetToTimes(

times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
      duration
    );
    const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
      ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
    });
    return {
      calculatedDuration: duration,
      next: (t) => {
        state.value = mapTimeToKeyframe(t);
        state.done = t >= duration;
        return state;
      }
    };
  }
  const isNotNull$1 = (value) => value !== null;
  function getFinalKeyframe$1(keyframes2, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
    const resolvedKeyframes = keyframes2.filter(isNotNull$1);
    const useFirstKeyframe = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1;
    const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
    return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
  }
  const transitionTypeMap = {
    decay: inertia,
    inertia,
    tween: keyframes,
    keyframes,
    spring
  };
  function replaceTransitionType(transition) {
    if (typeof transition.type === "string") {
      transition.type = transitionTypeMap[transition.type];
    }
  }
  class WithPromise {
    constructor() {
      this.updateFinished();
    }
    get finished() {
      return this._finished;
    }
    updateFinished() {
      this._finished = new Promise((resolve) => {
        this.resolve = resolve;
      });
    }
    notifyFinished() {
      this.resolve();
    }
then(onResolve, onReject) {
      return this.finished.then(onResolve, onReject);
    }
  }
  const percentToProgress = (percent2) => percent2 / 100;
  class JSAnimation extends WithPromise {
    constructor(options) {
      super();
      this.state = "idle";
      this.startTime = null;
      this.isStopped = false;
      this.currentTime = 0;
      this.holdTime = null;
      this.playbackSpeed = 1;
      this.stop = () => {
        const { motionValue: motionValue2 } = this.options;
        if (motionValue2 && motionValue2.updatedAt !== time.now()) {
          this.tick(time.now());
        }
        this.isStopped = true;
        if (this.state === "idle")
          return;
        this.teardown();
        this.options.onStop?.();
      };
      this.options = options;
      this.initAnimation();
      this.play();
      if (options.autoplay === false)
        this.pause();
    }
    initAnimation() {
      const { options } = this;
      replaceTransitionType(options);
      const { type = keyframes, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
      let { keyframes: keyframes$1 } = options;
      const generatorFactory = type || keyframes;
      if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
        this.mixKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
        keyframes$1 = [0, 100];
      }
      const generator = generatorFactory({ ...options, keyframes: keyframes$1 });
      if (repeatType === "mirror") {
        this.mirroredGenerator = generatorFactory({
          ...options,
          keyframes: [...keyframes$1].reverse(),
          velocity: -velocity
        });
      }
      if (generator.calculatedDuration === null) {
        generator.calculatedDuration = calcGeneratorDuration(generator);
      }
      const { calculatedDuration } = generator;
      this.calculatedDuration = calculatedDuration;
      this.resolvedDuration = calculatedDuration + repeatDelay;
      this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
      this.generator = generator;
    }
    updateTime(timestamp) {
      const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
      if (this.holdTime !== null) {
        this.currentTime = this.holdTime;
      } else {
        this.currentTime = animationTime;
      }
    }
    tick(timestamp, sample = false) {
      const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
      if (this.startTime === null)
        return generator.next(0);
      const { delay: delay2 = 0, keyframes: keyframes2, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
      if (this.speed > 0) {
        this.startTime = Math.min(this.startTime, timestamp);
      } else if (this.speed < 0) {
        this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
      }
      if (sample) {
        this.currentTime = timestamp;
      } else {
        this.updateTime(timestamp);
      }
      const timeWithoutDelay = this.currentTime - delay2 * (this.playbackSpeed >= 0 ? 1 : -1);
      const isInDelayPhase = this.playbackSpeed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
      this.currentTime = Math.max(timeWithoutDelay, 0);
      if (this.state === "finished" && this.holdTime === null) {
        this.currentTime = totalDuration;
      }
      let elapsed = this.currentTime;
      let frameGenerator = generator;
      if (repeat) {
        const progress2 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
        let currentIteration = Math.floor(progress2);
        let iterationProgress = progress2 % 1;
        if (!iterationProgress && progress2 >= 1) {
          iterationProgress = 1;
        }
        iterationProgress === 1 && currentIteration--;
        currentIteration = Math.min(currentIteration, repeat + 1);
        const isOddIteration = Boolean(currentIteration % 2);
        if (isOddIteration) {
          if (repeatType === "reverse") {
            iterationProgress = 1 - iterationProgress;
            if (repeatDelay) {
              iterationProgress -= repeatDelay / resolvedDuration;
            }
          } else if (repeatType === "mirror") {
            frameGenerator = mirroredGenerator;
          }
        }
        elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
      }
      const state = isInDelayPhase ? { done: false, value: keyframes2[0] } : frameGenerator.next(elapsed);
      if (mixKeyframes) {
        state.value = mixKeyframes(state.value);
      }
      let { done } = state;
      if (!isInDelayPhase && calculatedDuration !== null) {
        done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
      }
      const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
      if (isAnimationFinished && type !== inertia) {
        state.value = getFinalKeyframe$1(keyframes2, this.options, finalKeyframe, this.speed);
      }
      if (onUpdate) {
        onUpdate(state.value);
      }
      if (isAnimationFinished) {
        this.finish();
      }
      return state;
    }
then(resolve, reject) {
      return this.finished.then(resolve, reject);
    }
    get duration() {
      return millisecondsToSeconds(this.calculatedDuration);
    }
    get iterationDuration() {
      const { delay: delay2 = 0 } = this.options || {};
      return this.duration + millisecondsToSeconds(delay2);
    }
    get time() {
      return millisecondsToSeconds(this.currentTime);
    }
    set time(newTime) {
      newTime = secondsToMilliseconds(newTime);
      this.currentTime = newTime;
      if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) {
        this.holdTime = newTime;
      } else if (this.driver) {
        this.startTime = this.driver.now() - newTime / this.playbackSpeed;
      }
      this.driver?.start(false);
    }
    get speed() {
      return this.playbackSpeed;
    }
    set speed(newSpeed) {
      this.updateTime(time.now());
      const hasChanged = this.playbackSpeed !== newSpeed;
      this.playbackSpeed = newSpeed;
      if (hasChanged) {
        this.time = millisecondsToSeconds(this.currentTime);
      }
    }
    play() {
      if (this.isStopped)
        return;
      const { driver = frameloopDriver, startTime } = this.options;
      if (!this.driver) {
        this.driver = driver((timestamp) => this.tick(timestamp));
      }
      this.options.onPlay?.();
      const now2 = this.driver.now();
      if (this.state === "finished") {
        this.updateFinished();
        this.startTime = now2;
      } else if (this.holdTime !== null) {
        this.startTime = now2 - this.holdTime;
      } else if (!this.startTime) {
        this.startTime = startTime ?? now2;
      }
      if (this.state === "finished" && this.speed < 0) {
        this.startTime += this.calculatedDuration;
      }
      this.holdTime = null;
      this.state = "running";
      this.driver.start();
    }
    pause() {
      this.state = "paused";
      this.updateTime(time.now());
      this.holdTime = this.currentTime;
    }
    complete() {
      if (this.state !== "running") {
        this.play();
      }
      this.state = "finished";
      this.holdTime = null;
    }
    finish() {
      this.notifyFinished();
      this.teardown();
      this.state = "finished";
      this.options.onComplete?.();
    }
    cancel() {
      this.holdTime = null;
      this.startTime = 0;
      this.tick(0);
      this.teardown();
      this.options.onCancel?.();
    }
    teardown() {
      this.state = "idle";
      this.stopDriver();
      this.startTime = this.holdTime = null;
    }
    stopDriver() {
      if (!this.driver)
        return;
      this.driver.stop();
      this.driver = void 0;
    }
    sample(sampleTime) {
      this.startTime = 0;
      return this.tick(sampleTime, true);
    }
    attachTimeline(timeline) {
      if (this.options.allowFlatten) {
        this.options.type = "keyframes";
        this.options.ease = "linear";
        this.initAnimation();
      }
      this.driver?.stop();
      return timeline.observe(this);
    }
  }
  function fillWildcards(keyframes2) {
    for (let i = 1; i < keyframes2.length; i++) {
      keyframes2[i] ?? (keyframes2[i] = keyframes2[i - 1]);
    }
  }
  const radToDeg = (rad) => rad * 180 / Math.PI;
  const rotate = (v) => {
    const angle = radToDeg(Math.atan2(v[1], v[0]));
    return rebaseAngle(angle);
  };
  const matrix2dParsers = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (v) => (Math.abs(v[0]) + Math.abs(v[3])) / 2,
    rotate,
    rotateZ: rotate,
    skewX: (v) => radToDeg(Math.atan(v[1])),
    skewY: (v) => radToDeg(Math.atan(v[2])),
    skew: (v) => (Math.abs(v[1]) + Math.abs(v[2])) / 2
  };
  const rebaseAngle = (angle) => {
    angle = angle % 360;
    if (angle < 0)
      angle += 360;
    return angle;
  };
  const rotateZ = rotate;
  const scaleX = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  const scaleY = (v) => Math.sqrt(v[4] * v[4] + v[5] * v[5]);
  const matrix3dParsers = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX,
    scaleY,
    scale: (v) => (scaleX(v) + scaleY(v)) / 2,
    rotateX: (v) => rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
    rotateY: (v) => rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
    rotateZ,
    rotate: rotateZ,
    skewX: (v) => radToDeg(Math.atan(v[4])),
    skewY: (v) => radToDeg(Math.atan(v[1])),
    skew: (v) => (Math.abs(v[1]) + Math.abs(v[4])) / 2
  };
  function defaultTransformValue(name) {
    return name.includes("scale") ? 1 : 0;
  }
  function parseValueFromTransform(transform, name) {
    if (!transform || transform === "none") {
      return defaultTransformValue(name);
    }
    const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let parsers;
    let match;
    if (matrix3dMatch) {
      parsers = matrix3dParsers;
      match = matrix3dMatch;
    } else {
      const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
      parsers = matrix2dParsers;
      match = matrix2dMatch;
    }
    if (!match) {
      return defaultTransformValue(name);
    }
    const valueParser = parsers[name];
    const values = match[1].split(",").map(convertTransformToNumber);
    return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
  }
  const readTransformValue = (instance, name) => {
    const { transform = "none" } = getComputedStyle(instance);
    return parseValueFromTransform(transform, name);
  };
  function convertTransformToNumber(value) {
    return parseFloat(value.trim());
  }
  const transformPropOrder = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY"
  ];
  const transformProps = (() => new Set(transformPropOrder))();
  const isNumOrPxType = (v) => v === number || v === px;
  const transformKeys = new Set(["x", "y", "z"]);
  const nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
  function removeNonTranslationalTransform(visualElement) {
    const removedTransforms = [];
    nonTranslationalTransformKeys.forEach((key) => {
      const value = visualElement.getValue(key);
      if (value !== void 0) {
        removedTransforms.push([key, value.get()]);
        value.set(key.startsWith("scale") ? 1 : 0);
      }
    });
    return removedTransforms;
  }
  const positionalValues = {
width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
    height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
    top: (_bbox, { top }) => parseFloat(top),
    left: (_bbox, { left }) => parseFloat(left),
    bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
    right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
x: (_bbox, { transform }) => parseValueFromTransform(transform, "x"),
    y: (_bbox, { transform }) => parseValueFromTransform(transform, "y")
  };
  positionalValues.translateX = positionalValues.x;
  positionalValues.translateY = positionalValues.y;
  const toResolve = new Set();
  let isScheduled = false;
  let anyNeedsMeasurement = false;
  let isForced = false;
  function measureAllKeyframes() {
    if (anyNeedsMeasurement) {
      const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
      const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
      const transformsToRestore = new Map();
      elementsToMeasure.forEach((element) => {
        const removedTransforms = removeNonTranslationalTransform(element);
        if (!removedTransforms.length)
          return;
        transformsToRestore.set(element, removedTransforms);
        element.render();
      });
      resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
      elementsToMeasure.forEach((element) => {
        element.render();
        const restore = transformsToRestore.get(element);
        if (restore) {
          restore.forEach(([key, value]) => {
            element.getValue(key)?.set(value);
          });
        }
      });
      resolversToMeasure.forEach((resolver) => resolver.measureEndState());
      resolversToMeasure.forEach((resolver) => {
        if (resolver.suspendedScrollY !== void 0) {
          window.scrollTo(0, resolver.suspendedScrollY);
        }
      });
    }
    anyNeedsMeasurement = false;
    isScheduled = false;
    toResolve.forEach((resolver) => resolver.complete(isForced));
    toResolve.clear();
  }
  function readAllKeyframes() {
    toResolve.forEach((resolver) => {
      resolver.readKeyframes();
      if (resolver.needsMeasurement) {
        anyNeedsMeasurement = true;
      }
    });
  }
  function flushKeyframeResolvers() {
    isForced = true;
    readAllKeyframes();
    measureAllKeyframes();
    isForced = false;
  }
  class KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue2, element, isAsync = false) {
      this.state = "pending";
      this.isAsync = false;
      this.needsMeasurement = false;
      this.unresolvedKeyframes = [...unresolvedKeyframes];
      this.onComplete = onComplete;
      this.name = name;
      this.motionValue = motionValue2;
      this.element = element;
      this.isAsync = isAsync;
    }
    scheduleResolve() {
      this.state = "scheduled";
      if (this.isAsync) {
        toResolve.add(this);
        if (!isScheduled) {
          isScheduled = true;
          frame.read(readAllKeyframes);
          frame.resolveKeyframes(measureAllKeyframes);
        }
      } else {
        this.readKeyframes();
        this.complete();
      }
    }
    readKeyframes() {
      const { unresolvedKeyframes, name, element, motionValue: motionValue2 } = this;
      if (unresolvedKeyframes[0] === null) {
        const currentValue = motionValue2?.get();
        const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
        if (currentValue !== void 0) {
          unresolvedKeyframes[0] = currentValue;
        } else if (element && name) {
          const valueAsRead = element.readValue(name, finalKeyframe);
          if (valueAsRead !== void 0 && valueAsRead !== null) {
            unresolvedKeyframes[0] = valueAsRead;
          }
        }
        if (unresolvedKeyframes[0] === void 0) {
          unresolvedKeyframes[0] = finalKeyframe;
        }
        if (motionValue2 && currentValue === void 0) {
          motionValue2.set(unresolvedKeyframes[0]);
        }
      }
      fillWildcards(unresolvedKeyframes);
    }
    setFinalKeyframe() {
    }
    measureInitialState() {
    }
    renderEndStyles() {
    }
    measureEndState() {
    }
    complete(isForcedComplete = false) {
      this.state = "complete";
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
      toResolve.delete(this);
    }
    cancel() {
      if (this.state === "scheduled") {
        toResolve.delete(this);
        this.state = "pending";
      }
    }
    resume() {
      if (this.state === "pending")
        this.scheduleResolve();
    }
  }
  const isCSSVar = (name) => name.startsWith("--");
  function setStyle(element, name, value) {
    isCSSVar(name) ? element.style.setProperty(name, value) : element.style[name] = value;
  }
  const supportsScrollTimeline = memo(() => window.ScrollTimeline !== void 0);
  const supportsFlags = {};
  function memoSupports(callback, supportsFlag) {
    const memoized = memo(callback);
    return () => supportsFlags[supportsFlag] ?? memoized();
  }
  const supportsLinearEasing = memoSupports(() => {
    try {
      document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch (e) {
      return false;
    }
    return true;
  }, "linearEasing");
  const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
  const supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: cubicBezierAsString([0, 0.65, 0.55, 1]),
    circOut: cubicBezierAsString([0.55, 0, 1, 0.45]),
    backIn: cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
    backOut: cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
  };
  function mapEasingToNativeEasing(easing, duration) {
    if (!easing) {
      return void 0;
    } else if (typeof easing === "function") {
      return supportsLinearEasing() ? generateLinearEasing(easing, duration) : "ease-out";
    } else if (isBezierDefinition(easing)) {
      return cubicBezierAsString(easing);
    } else if (Array.isArray(easing)) {
      return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
    } else {
      return supportedWaapiEasing[easing];
    }
  }
  function startWaapiAnimation(element, valueName, keyframes2, { delay: delay2 = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease2 = "easeOut", times } = {}, pseudoElement = void 0) {
    const keyframeOptions = {
      [valueName]: keyframes2
    };
    if (times)
      keyframeOptions.offset = times;
    const easing = mapEasingToNativeEasing(ease2, duration);
    if (Array.isArray(easing))
      keyframeOptions.easing = easing;
    const options = {
      delay: delay2,
      duration,
      easing: !Array.isArray(easing) ? easing : "linear",
      fill: "both",
      iterations: repeat + 1,
      direction: repeatType === "reverse" ? "alternate" : "normal"
    };
    if (pseudoElement)
      options.pseudoElement = pseudoElement;
    const animation = element.animate(keyframeOptions, options);
    return animation;
  }
  function isGenerator(type) {
    return typeof type === "function" && "applyToOptions" in type;
  }
  function applyGeneratorOptions({ type, ...options }) {
    if (isGenerator(type) && supportsLinearEasing()) {
      return type.applyToOptions(options);
    } else {
      options.duration ?? (options.duration = 300);
      options.ease ?? (options.ease = "easeOut");
    }
    return options;
  }
  class NativeAnimation extends WithPromise {
    constructor(options) {
      super();
      this.finishedTime = null;
      this.isStopped = false;
      this.manualStartTime = null;
      if (!options)
        return;
      const { element, name, keyframes: keyframes2, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
      this.isPseudoElement = Boolean(pseudoElement);
      this.allowFlatten = allowFlatten;
      this.options = options;
      invariant(typeof options.type !== "string");
      const transition = applyGeneratorOptions(options);
      this.animation = startWaapiAnimation(element, name, keyframes2, transition, pseudoElement);
      if (transition.autoplay === false) {
        this.animation.pause();
      }
      this.animation.onfinish = () => {
        this.finishedTime = this.time;
        if (!pseudoElement) {
          const keyframe = getFinalKeyframe$1(keyframes2, this.options, finalKeyframe, this.speed);
          if (this.updateMotionValue) {
            this.updateMotionValue(keyframe);
          } else {
            setStyle(element, name, keyframe);
          }
          this.animation.cancel();
        }
        onComplete?.();
        this.notifyFinished();
      };
    }
    play() {
      if (this.isStopped)
        return;
      this.manualStartTime = null;
      this.animation.play();
      if (this.state === "finished") {
        this.updateFinished();
      }
    }
    pause() {
      this.animation.pause();
    }
    complete() {
      this.animation.finish?.();
    }
    cancel() {
      try {
        this.animation.cancel();
      } catch (e) {
      }
    }
    stop() {
      if (this.isStopped)
        return;
      this.isStopped = true;
      const { state } = this;
      if (state === "idle" || state === "finished") {
        return;
      }
      if (this.updateMotionValue) {
        this.updateMotionValue();
      } else {
        this.commitStyles();
      }
      if (!this.isPseudoElement)
        this.cancel();
    }
commitStyles() {
      const element = this.options?.element;
      if (!this.isPseudoElement && element?.isConnected) {
        this.animation.commitStyles?.();
      }
    }
    get duration() {
      const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
      return millisecondsToSeconds(Number(duration));
    }
    get iterationDuration() {
      const { delay: delay2 = 0 } = this.options || {};
      return this.duration + millisecondsToSeconds(delay2);
    }
    get time() {
      return millisecondsToSeconds(Number(this.animation.currentTime) || 0);
    }
    set time(newTime) {
      this.manualStartTime = null;
      this.finishedTime = null;
      this.animation.currentTime = secondsToMilliseconds(newTime);
    }
get speed() {
      return this.animation.playbackRate;
    }
    set speed(newSpeed) {
      if (newSpeed < 0)
        this.finishedTime = null;
      this.animation.playbackRate = newSpeed;
    }
    get state() {
      return this.finishedTime !== null ? "finished" : this.animation.playState;
    }
    get startTime() {
      return this.manualStartTime ?? Number(this.animation.startTime);
    }
    set startTime(newStartTime) {
      this.manualStartTime = this.animation.startTime = newStartTime;
    }
attachTimeline({ timeline, observe }) {
      if (this.allowFlatten) {
        this.animation.effect?.updateTiming({ easing: "linear" });
      }
      this.animation.onfinish = null;
      if (timeline && supportsScrollTimeline()) {
        this.animation.timeline = timeline;
        return noop;
      } else {
        return observe(this);
      }
    }
  }
  const unsupportedEasingFunctions = {
    anticipate,
    backInOut,
    circInOut
  };
  function isUnsupportedEase(key) {
    return key in unsupportedEasingFunctions;
  }
  function replaceStringEasing(transition) {
    if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) {
      transition.ease = unsupportedEasingFunctions[transition.ease];
    }
  }
  const sampleDelta = 10;
  class NativeAnimationExtended extends NativeAnimation {
    constructor(options) {
      replaceStringEasing(options);
      replaceTransitionType(options);
      super(options);
      if (options.startTime !== void 0) {
        this.startTime = options.startTime;
      }
      this.options = options;
    }
updateMotionValue(value) {
      const { motionValue: motionValue2, onUpdate, onComplete, element, ...options } = this.options;
      if (!motionValue2)
        return;
      if (value !== void 0) {
        motionValue2.set(value);
        return;
      }
      const sampleAnimation = new JSAnimation({
        ...options,
        autoplay: false
      });
      const sampleTime = Math.max(sampleDelta, time.now() - this.startTime);
      const delta = clamp(0, sampleDelta, sampleTime - sampleDelta);
      motionValue2.setWithVelocity(sampleAnimation.sample(Math.max(0, sampleTime - delta)).value, sampleAnimation.sample(sampleTime).value, delta);
      sampleAnimation.stop();
    }
  }
  const isAnimatable = (value, name) => {
    if (name === "zIndex")
      return false;
    if (typeof value === "number" || Array.isArray(value))
      return true;
    if (typeof value === "string" &&
(complex.test(value) || value === "0") &&
!value.startsWith("url(")) {
      return true;
    }
    return false;
  };
  function hasKeyframesChanged(keyframes2) {
    const current = keyframes2[0];
    if (keyframes2.length === 1)
      return true;
    for (let i = 0; i < keyframes2.length; i++) {
      if (keyframes2[i] !== current)
        return true;
    }
  }
  function canAnimate(keyframes2, name, type, velocity) {
    const originKeyframe = keyframes2[0];
    if (originKeyframe === null) {
      return false;
    }
    if (name === "display" || name === "visibility")
      return true;
    const targetKeyframe = keyframes2[keyframes2.length - 1];
    const isOriginAnimatable = isAnimatable(originKeyframe, name);
    const isTargetAnimatable = isAnimatable(targetKeyframe, name);
    if (!isOriginAnimatable || !isTargetAnimatable) {
      return false;
    }
    return hasKeyframesChanged(keyframes2) || (type === "spring" || isGenerator(type)) && velocity;
  }
  function makeAnimationInstant(options) {
    options.duration = 0;
    options.type = "keyframes";
  }
  const acceleratedValues = new Set([
    "opacity",
    "clipPath",
    "filter",
    "transform"

]);
  const supportsWaapi = memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
  function supportsBrowserAnimation(options) {
    const { motionValue: motionValue2, name, repeatDelay, repeatType, damping, type } = options;
    const subject = motionValue2?.owner?.current;
    if (!(subject instanceof HTMLElement)) {
      return false;
    }
    const { onUpdate, transformTemplate } = motionValue2.owner.getProps();
    return supportsWaapi() && name && acceleratedValues.has(name) && (name !== "transform" || !transformTemplate) &&
!onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
  }
  const MAX_RESOLVE_DELAY = 40;
  class AsyncMotionValueAnimation extends WithPromise {
    constructor({ autoplay = true, delay: delay2 = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes: keyframes2, name, motionValue: motionValue2, element, ...options }) {
      super();
      this.stop = () => {
        if (this._animation) {
          this._animation.stop();
          this.stopTimeline?.();
        }
        this.keyframeResolver?.cancel();
      };
      this.createdAt = time.now();
      const optionsWithDefaults = {
        autoplay,
        delay: delay2,
        type,
        repeat,
        repeatDelay,
        repeatType,
        name,
        motionValue: motionValue2,
        element,
        ...options
      };
      const KeyframeResolver$1 = element?.KeyframeResolver || KeyframeResolver;
      this.keyframeResolver = new KeyframeResolver$1(keyframes2, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue2, element);
      this.keyframeResolver?.scheduleResolve();
    }
    onKeyframesResolved(keyframes2, finalKeyframe, options, sync) {
      this.keyframeResolver = void 0;
      const { name, type, velocity, delay: delay2, isHandoff, onUpdate } = options;
      this.resolvedAt = time.now();
      if (!canAnimate(keyframes2, name, type, velocity)) {
        if (MotionGlobalConfig.instantAnimations || !delay2) {
          onUpdate?.(getFinalKeyframe$1(keyframes2, options, finalKeyframe));
        }
        keyframes2[0] = keyframes2[keyframes2.length - 1];
        makeAnimationInstant(options);
        options.repeat = 0;
      }
      const startTime = sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0;
      const resolvedOptions = {
        startTime,
        finalKeyframe,
        ...options,
        keyframes: keyframes2
      };
      const useWaapi = !isHandoff && supportsBrowserAnimation(resolvedOptions);
      const element = resolvedOptions.motionValue?.owner?.current;
      const animation = useWaapi ? new NativeAnimationExtended({
        ...resolvedOptions,
        element
      }) : new JSAnimation(resolvedOptions);
      animation.finished.then(() => {
        this.notifyFinished();
      }).catch(noop);
      if (this.pendingTimeline) {
        this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
        this.pendingTimeline = void 0;
      }
      this._animation = animation;
    }
    get finished() {
      if (!this._animation) {
        return this._finished;
      } else {
        return this.animation.finished;
      }
    }
    then(onResolve, _onReject) {
      return this.finished.finally(onResolve).then(() => {
      });
    }
    get animation() {
      if (!this._animation) {
        this.keyframeResolver?.resume();
        flushKeyframeResolvers();
      }
      return this._animation;
    }
    get duration() {
      return this.animation.duration;
    }
    get iterationDuration() {
      return this.animation.iterationDuration;
    }
    get time() {
      return this.animation.time;
    }
    set time(newTime) {
      this.animation.time = newTime;
    }
    get speed() {
      return this.animation.speed;
    }
    get state() {
      return this.animation.state;
    }
    set speed(newSpeed) {
      this.animation.speed = newSpeed;
    }
    get startTime() {
      return this.animation.startTime;
    }
    attachTimeline(timeline) {
      if (this._animation) {
        this.stopTimeline = this.animation.attachTimeline(timeline);
      } else {
        this.pendingTimeline = timeline;
      }
      return () => this.stop();
    }
    play() {
      this.animation.play();
    }
    pause() {
      this.animation.pause();
    }
    complete() {
      this.animation.complete();
    }
    cancel() {
      if (this._animation) {
        this.animation.cancel();
      }
      this.keyframeResolver?.cancel();
    }
  }
  function calcChildStagger(children, child, delayChildren, staggerChildren = 0, staggerDirection = 1) {
    const index = Array.from(children).sort((a, b) => a.sortNodePosition(b)).indexOf(child);
    const numChildren = children.size;
    const maxStaggerDuration = (numChildren - 1) * staggerChildren;
    const delayIsFunction = typeof delayChildren === "function";
    return delayIsFunction ? delayChildren(index, numChildren) : staggerDirection === 1 ? index * staggerChildren : maxStaggerDuration - index * staggerChildren;
  }
  const splitCSSVariableRegex = (
/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
  );
  function parseCSSVariable(current) {
    const match = splitCSSVariableRegex.exec(current);
    if (!match)
      return [,];
    const [, token1, token2, fallback] = match;
    return [`--${token1 ?? token2}`, fallback];
  }
  function getVariableValue(current, element, depth = 1) {
    const [token, fallback] = parseCSSVariable(current);
    if (!token)
      return;
    const resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
      const trimmed = resolved.trim();
      return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
    }
    return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
  }
  const underDampedSpring = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
  };
  const criticallyDampedSpring = (target) => ({
    type: "spring",
    stiffness: 550,
    damping: target === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10
  });
  const keyframesTransition = {
    type: "keyframes",
    duration: 0.8
  };
  const ease = {
    type: "keyframes",
    ease: [0.25, 0.1, 0.35, 1],
    duration: 0.3
  };
  const getDefaultTransition = (valueKey, { keyframes: keyframes2 }) => {
    if (keyframes2.length > 2) {
      return keyframesTransition;
    } else if (transformProps.has(valueKey)) {
      return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes2[1]) : underDampedSpring;
    }
    return ease;
  };
  const isNotNull = (value) => value !== null;
  function getFinalKeyframe(keyframes2, { repeat, repeatType = "loop" }, finalKeyframe) {
    const resolvedKeyframes = keyframes2.filter(isNotNull);
    const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
    return resolvedKeyframes[index];
  }
  function resolveTransition(transition, parentTransition) {
    if (transition?.inherit && parentTransition) {
      const { inherit: _, ...rest } = transition;
      return { ...parentTransition, ...rest };
    }
    return transition;
  }
  function getValueTransition(transition, key) {
    const valueTransition = transition?.[key] ?? transition?.["default"] ?? transition;
    if (valueTransition !== transition) {
      return resolveTransition(valueTransition, transition);
    }
    return valueTransition;
  }
  function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
    return !!Object.keys(transition).length;
  }
  const animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
    const valueTransition = getValueTransition(transition, name) || {};
    const delay2 = valueTransition.delay || transition.delay || 0;
    let { elapsed = 0 } = transition;
    elapsed = elapsed - secondsToMilliseconds(delay2);
    const options = {
      keyframes: Array.isArray(target) ? target : [null, target],
      ease: "easeOut",
      velocity: value.getVelocity(),
      ...valueTransition,
      delay: -elapsed,
      onUpdate: (v) => {
        value.set(v);
        valueTransition.onUpdate && valueTransition.onUpdate(v);
      },
      onComplete: () => {
        onComplete();
        valueTransition.onComplete && valueTransition.onComplete();
      },
      name,
      motionValue: value,
      element: isHandoff ? void 0 : element
    };
    if (!isTransitionDefined(valueTransition)) {
      Object.assign(options, getDefaultTransition(name, options));
    }
    options.duration && (options.duration = secondsToMilliseconds(options.duration));
    options.repeatDelay && (options.repeatDelay = secondsToMilliseconds(options.repeatDelay));
    if (options.from !== void 0) {
      options.keyframes[0] = options.from;
    }
    let shouldSkip = false;
    if (options.type === false || options.duration === 0 && !options.repeatDelay) {
      makeAnimationInstant(options);
      if (options.delay === 0) {
        shouldSkip = true;
      }
    }
    if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations || element?.shouldSkipAnimations) {
      shouldSkip = true;
      makeAnimationInstant(options);
      options.delay = 0;
    }
    options.allowFlatten = !valueTransition.type && !valueTransition.ease;
    if (shouldSkip && !isHandoff && value.get() !== void 0) {
      const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
      if (finalKeyframe !== void 0) {
        frame.update(() => {
          options.onUpdate(finalKeyframe);
          options.onComplete();
        });
        return;
      }
    }
    return valueTransition.isSync ? new JSAnimation(options) : new AsyncMotionValueAnimation(options);
  };
  function getValueState(visualElement) {
    const state = [{}, {}];
    visualElement?.values.forEach((value, key) => {
      state[0][key] = value.get();
      state[1][key] = value.getVelocity();
    });
    return state;
  }
  function resolveVariantFromProps(props, definition, custom, visualElement) {
    if (typeof definition === "function") {
      const [current, velocity] = getValueState(visualElement);
      definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
    }
    if (typeof definition === "string") {
      definition = props.variants && props.variants[definition];
    }
    if (typeof definition === "function") {
      const [current, velocity] = getValueState(visualElement);
      definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
    }
    return definition;
  }
  function resolveVariant(visualElement, definition, custom) {
    const props = visualElement.getProps();
    return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
  }
  const positionalKeys = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...transformPropOrder
  ]);
  const MAX_VELOCITY_DELTA = 30;
  const isFloat = (value) => {
    return !isNaN(parseFloat(value));
  };
  class MotionValue {
constructor(init, options = {}) {
      this.canTrackVelocity = null;
      this.events = {};
      this.updateAndNotify = (v) => {
        const currentTime = time.now();
        if (this.updatedAt !== currentTime) {
          this.setPrevFrameValue();
        }
        this.prev = this.current;
        this.setCurrent(v);
        if (this.current !== this.prev) {
          this.events.change?.notify(this.current);
          if (this.dependents) {
            for (const dependent of this.dependents) {
              dependent.dirty();
            }
          }
        }
      };
      this.hasAnimated = false;
      this.setCurrent(init);
      this.owner = options.owner;
    }
    setCurrent(current) {
      this.current = current;
      this.updatedAt = time.now();
      if (this.canTrackVelocity === null && current !== void 0) {
        this.canTrackVelocity = isFloat(this.current);
      }
    }
    setPrevFrameValue(prevFrameValue = this.current) {
      this.prevFrameValue = prevFrameValue;
      this.prevUpdatedAt = this.updatedAt;
    }
onChange(subscription) {
      return this.on("change", subscription);
    }
    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = new SubscriptionManager();
      }
      const unsubscribe = this.events[eventName].add(callback);
      if (eventName === "change") {
        return () => {
          unsubscribe();
          frame.read(() => {
            if (!this.events.change.getSize()) {
              this.stop();
            }
          });
        };
      }
      return unsubscribe;
    }
    clearListeners() {
      for (const eventManagers in this.events) {
        this.events[eventManagers].clear();
      }
    }
attach(passiveEffect, stopPassiveEffect) {
      this.passiveEffect = passiveEffect;
      this.stopPassiveEffect = stopPassiveEffect;
    }
set(v) {
      if (!this.passiveEffect) {
        this.updateAndNotify(v);
      } else {
        this.passiveEffect(v, this.updateAndNotify);
      }
    }
    setWithVelocity(prev, current, delta) {
      this.set(current);
      this.prev = void 0;
      this.prevFrameValue = prev;
      this.prevUpdatedAt = this.updatedAt - delta;
    }
jump(v, endAnimation = true) {
      this.updateAndNotify(v);
      this.prev = v;
      this.prevUpdatedAt = this.prevFrameValue = void 0;
      endAnimation && this.stop();
      if (this.stopPassiveEffect)
        this.stopPassiveEffect();
    }
    dirty() {
      this.events.change?.notify(this.current);
    }
    addDependent(dependent) {
      if (!this.dependents) {
        this.dependents = new Set();
      }
      this.dependents.add(dependent);
    }
    removeDependent(dependent) {
      if (this.dependents) {
        this.dependents.delete(dependent);
      }
    }
get() {
      return this.current;
    }
getPrevious() {
      return this.prev;
    }
getVelocity() {
      const currentTime = time.now();
      if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
        return 0;
      }
      const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
      return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
    }
start(startAnimation) {
      this.stop();
      return new Promise((resolve) => {
        this.hasAnimated = true;
        this.animation = startAnimation(resolve);
        if (this.events.animationStart) {
          this.events.animationStart.notify();
        }
      }).then(() => {
        if (this.events.animationComplete) {
          this.events.animationComplete.notify();
        }
        this.clearAnimation();
      });
    }
stop() {
      if (this.animation) {
        this.animation.stop();
        if (this.events.animationCancel) {
          this.events.animationCancel.notify();
        }
      }
      this.clearAnimation();
    }
isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      delete this.animation;
    }
destroy() {
      this.dependents?.clear();
      this.events.destroy?.notify();
      this.clearListeners();
      this.stop();
      if (this.stopPassiveEffect) {
        this.stopPassiveEffect();
      }
    }
  }
  function motionValue(init, options) {
    return new MotionValue(init, options);
  }
  const isKeyframesTarget = (v) => {
    return Array.isArray(v);
  };
  function setMotionValue(visualElement, key, value) {
    if (visualElement.hasValue(key)) {
      visualElement.getValue(key).set(value);
    } else {
      visualElement.addValue(key, motionValue(value));
    }
  }
  function resolveFinalValueInKeyframes(v) {
    return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
  }
  function setTarget(visualElement, definition) {
    const resolved = resolveVariant(visualElement, definition);
    let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
    target = { ...target, ...transitionEnd };
    for (const key in target) {
      const value = resolveFinalValueInKeyframes(target[key]);
      setMotionValue(visualElement, key, value);
    }
  }
  const isMotionValue = (value) => Boolean(value && value.getVelocity);
  function isWillChangeMotionValue(value) {
    return Boolean(isMotionValue(value) && value.add);
  }
  function addValueToWillChange(visualElement, key) {
    const willChange = visualElement.getValue("willChange");
    if (isWillChangeMotionValue(willChange)) {
      return willChange.add(key);
    } else if (!willChange && MotionGlobalConfig.WillChange) {
      const newWillChange = new MotionGlobalConfig.WillChange("auto");
      visualElement.addValue("willChange", newWillChange);
      newWillChange.add(key);
    }
  }
  function camelToDash(str) {
    return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
  }
  const optimizedAppearDataId = "framerAppearId";
  const optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);
  function getOptimisedAppearId(visualElement) {
    return visualElement.props[optimizedAppearDataAttribute];
  }
  function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
    const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
    needsAnimating[key] = false;
    return shouldBlock;
  }
  function animateTarget(visualElement, targetAndTransition, { delay: delay2 = 0, transitionOverride, type } = {}) {
    let { transition, transitionEnd, ...target } = targetAndTransition;
    const defaultTransition = visualElement.getDefaultTransition();
    transition = transition ? resolveTransition(transition, defaultTransition) : defaultTransition;
    const reduceMotion = transition?.reduceMotion;
    if (transitionOverride)
      transition = transitionOverride;
    const animations2 = [];
    const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
    for (const key in target) {
      const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
      const valueTarget = target[key];
      if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
        continue;
      }
      const valueTransition = {
        delay: delay2,
        ...getValueTransition(transition || {}, key)
      };
      const currentValue = value.get();
      if (currentValue !== void 0 && !value.isAnimating && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) {
        continue;
      }
      let isHandoff = false;
      if (window.MotionHandoffAnimation) {
        const appearId = getOptimisedAppearId(visualElement);
        if (appearId) {
          const startTime = window.MotionHandoffAnimation(appearId, key, frame);
          if (startTime !== null) {
            valueTransition.startTime = startTime;
            isHandoff = true;
          }
        }
      }
      addValueToWillChange(visualElement, key);
      const shouldReduceMotion = reduceMotion ?? visualElement.shouldReduceMotion;
      value.start(animateMotionValue(key, value, valueTarget, shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
      const animation = value.animation;
      if (animation) {
        animations2.push(animation);
      }
    }
    if (transitionEnd) {
      const applyTransitionEnd = () => frame.update(() => {
        transitionEnd && setTarget(visualElement, transitionEnd);
      });
      if (animations2.length) {
        Promise.all(animations2).then(applyTransitionEnd);
      } else {
        applyTransitionEnd();
      }
    }
    return animations2;
  }
  function animateVariant(visualElement, variant, options = {}) {
    const resolved = resolveVariant(visualElement, variant, options.type === "exit" ? visualElement.presenceContext?.custom : void 0);
    let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
    if (options.transitionOverride) {
      transition = options.transitionOverride;
    }
    const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
    const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
      const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
      return animateChildren(visualElement, variant, forwardDelay, delayChildren, staggerChildren, staggerDirection, options);
    } : () => Promise.resolve();
    const { when } = transition;
    if (when) {
      const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
      return first().then(() => last());
    } else {
      return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
    }
  }
  function animateChildren(visualElement, variant, delay2 = 0, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
    const animations2 = [];
    for (const child of visualElement.variantChildren) {
      child.notify("AnimationStart", variant);
      animations2.push(animateVariant(child, variant, {
        ...options,
        delay: delay2 + (typeof delayChildren === "function" ? 0 : delayChildren) + calcChildStagger(visualElement.variantChildren, child, delayChildren, staggerChildren, staggerDirection)
      }).then(() => child.notify("AnimationComplete", variant)));
    }
    return Promise.all(animations2);
  }
  function animateVisualElement(visualElement, definition, options = {}) {
    visualElement.notify("AnimationStart", definition);
    let animation;
    if (Array.isArray(definition)) {
      const animations2 = definition.map((variant) => animateVariant(visualElement, variant, options));
      animation = Promise.all(animations2);
    } else if (typeof definition === "string") {
      animation = animateVariant(visualElement, definition, options);
    } else {
      const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
      animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
    }
    return animation.then(() => {
      visualElement.notify("AnimationComplete", definition);
    });
  }
  const auto = {
    test: (v) => v === "auto",
    parse: (v) => v
  };
  const testValueType = (v) => (type) => type.test(v);
  const dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
  const findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));
  function isNone(value) {
    if (typeof value === "number") {
      return value === 0;
    } else if (value !== null) {
      return value === "none" || value === "0" || isZeroValueString(value);
    } else {
      return true;
    }
  }
  const maxDefaults = new Set(["brightness", "contrast", "saturate", "opacity"]);
  function applyDefaultFilter(v) {
    const [name, value] = v.slice(0, -1).split("(");
    if (name === "drop-shadow")
      return v;
    const [number2] = value.match(floatRegex) || [];
    if (!number2)
      return v;
    const unit = value.replace(number2, "");
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number2 !== value)
      defaultValue *= 100;
    return name + "(" + defaultValue + unit + ")";
  }
  const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
  const filter = {
    ...complex,
    getAnimatableNone: (v) => {
      const functions = v.match(functionRegex);
      return functions ? functions.map(applyDefaultFilter).join(" ") : v;
    }
  };
  const int = {
    ...number,
    transform: Math.round
  };
  const transformValueTypes = {
    rotate: degrees,
    rotateX: degrees,
    rotateY: degrees,
    rotateZ: degrees,
    scale,
    scaleX: scale,
    scaleY: scale,
    scaleZ: scale,
    skew: degrees,
    skewX: degrees,
    skewY: degrees,
    distance: px,
    translateX: px,
    translateY: px,
    translateZ: px,
    x: px,
    y: px,
    z: px,
    perspective: px,
    transformPerspective: px,
    opacity: alpha,
    originX: progressPercentage,
    originY: progressPercentage,
    originZ: px
  };
  const numberValueTypes = {
borderWidth: px,
    borderTopWidth: px,
    borderRightWidth: px,
    borderBottomWidth: px,
    borderLeftWidth: px,
    borderRadius: px,
    borderTopLeftRadius: px,
    borderTopRightRadius: px,
    borderBottomRightRadius: px,
    borderBottomLeftRadius: px,
width: px,
    maxWidth: px,
    height: px,
    maxHeight: px,
    top: px,
    right: px,
    bottom: px,
    left: px,
    inset: px,
    insetBlock: px,
    insetBlockStart: px,
    insetBlockEnd: px,
    insetInline: px,
    insetInlineStart: px,
    insetInlineEnd: px,
padding: px,
    paddingTop: px,
    paddingRight: px,
    paddingBottom: px,
    paddingLeft: px,
    paddingBlock: px,
    paddingBlockStart: px,
    paddingBlockEnd: px,
    paddingInline: px,
    paddingInlineStart: px,
    paddingInlineEnd: px,
    margin: px,
    marginTop: px,
    marginRight: px,
    marginBottom: px,
    marginLeft: px,
    marginBlock: px,
    marginBlockStart: px,
    marginBlockEnd: px,
    marginInline: px,
    marginInlineStart: px,
    marginInlineEnd: px,
fontSize: px,
backgroundPositionX: px,
    backgroundPositionY: px,
    ...transformValueTypes,
    zIndex: int,
fillOpacity: alpha,
    strokeOpacity: alpha,
    numOctaves: int
  };
  const defaultValueTypes = {
    ...numberValueTypes,
color,
    backgroundColor: color,
    outlineColor: color,
    fill: color,
    stroke: color,
borderColor: color,
    borderTopColor: color,
    borderRightColor: color,
    borderBottomColor: color,
    borderLeftColor: color,
    filter,
    WebkitFilter: filter
  };
  const getDefaultValueType = (key) => defaultValueTypes[key];
  function getAnimatableNone(key, value) {
    let defaultValueType = getDefaultValueType(key);
    if (defaultValueType !== filter)
      defaultValueType = complex;
    return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
  }
  const invalidTemplates = new Set(["auto", "none", "0"]);
  function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
    let i = 0;
    let animatableTemplate = void 0;
    while (i < unresolvedKeyframes.length && !animatableTemplate) {
      const keyframe = unresolvedKeyframes[i];
      if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) {
        animatableTemplate = unresolvedKeyframes[i];
      }
      i++;
    }
    if (animatableTemplate && name) {
      for (const noneIndex of noneKeyframeIndexes) {
        unresolvedKeyframes[noneIndex] = getAnimatableNone(name, animatableTemplate);
      }
    }
  }
  class DOMKeyframesResolver extends KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue2, element) {
      super(unresolvedKeyframes, onComplete, name, motionValue2, element, true);
    }
    readKeyframes() {
      const { unresolvedKeyframes, element, name } = this;
      if (!element || !element.current)
        return;
      super.readKeyframes();
      for (let i = 0; i < unresolvedKeyframes.length; i++) {
        let keyframe = unresolvedKeyframes[i];
        if (typeof keyframe === "string") {
          keyframe = keyframe.trim();
          if (isCSSVariableToken(keyframe)) {
            const resolved = getVariableValue(keyframe, element.current);
            if (resolved !== void 0) {
              unresolvedKeyframes[i] = resolved;
            }
            if (i === unresolvedKeyframes.length - 1) {
              this.finalKeyframe = keyframe;
            }
          }
        }
      }
      this.resolveNoneKeyframes();
      if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
        return;
      }
      const [origin, target] = unresolvedKeyframes;
      const originType = findDimensionValueType(origin);
      const targetType = findDimensionValueType(target);
      const originHasVar = containsCSSVariable(origin);
      const targetHasVar = containsCSSVariable(target);
      if (originHasVar !== targetHasVar && positionalValues[name]) {
        this.needsMeasurement = true;
        return;
      }
      if (originType === targetType)
        return;
      if (isNumOrPxType(originType) && isNumOrPxType(targetType)) {
        for (let i = 0; i < unresolvedKeyframes.length; i++) {
          const value = unresolvedKeyframes[i];
          if (typeof value === "string") {
            unresolvedKeyframes[i] = parseFloat(value);
          }
        }
      } else if (positionalValues[name]) {
        this.needsMeasurement = true;
      }
    }
    resolveNoneKeyframes() {
      const { unresolvedKeyframes, name } = this;
      const noneKeyframeIndexes = [];
      for (let i = 0; i < unresolvedKeyframes.length; i++) {
        if (unresolvedKeyframes[i] === null || isNone(unresolvedKeyframes[i])) {
          noneKeyframeIndexes.push(i);
        }
      }
      if (noneKeyframeIndexes.length) {
        makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
      }
    }
    measureInitialState() {
      const { element, unresolvedKeyframes, name } = this;
      if (!element || !element.current)
        return;
      if (name === "height") {
        this.suspendedScrollY = window.pageYOffset;
      }
      this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
      unresolvedKeyframes[0] = this.measuredOrigin;
      const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
      if (measureKeyframe !== void 0) {
        element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
      }
    }
    measureEndState() {
      const { element, name, unresolvedKeyframes } = this;
      if (!element || !element.current)
        return;
      const value = element.getValue(name);
      value && value.jump(this.measuredOrigin, false);
      const finalKeyframeIndex = unresolvedKeyframes.length - 1;
      const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
      unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
      if (finalKeyframe !== null && this.finalKeyframe === void 0) {
        this.finalKeyframe = finalKeyframe;
      }
      if (this.removedTransforms?.length) {
        this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
          element.getValue(unsetTransformName).set(unsetTransformValue);
        });
      }
      this.resolveNoneKeyframes();
    }
  }
  function resolveElements(elementOrSelector, scope, selectorCache) {
    if (elementOrSelector == null) {
      return [];
    }
    if (elementOrSelector instanceof EventTarget) {
      return [elementOrSelector];
    } else if (typeof elementOrSelector === "string") {
      let root = document;
      const elements = root.querySelectorAll(elementOrSelector);
      return elements ? Array.from(elements) : [];
    }
    return Array.from(elementOrSelector).filter((element) => element != null);
  }
  const getValueAsType = (value, type) => {
    return type && typeof value === "number" ? type.transform(value) : value;
  };
  function isHTMLElement(element) {
    return isObject(element) && "offsetHeight" in element;
  }
  const { schedule: microtask } = createRenderBatcher(queueMicrotask, false);
  const isDragging = {
    x: false,
    y: false
  };
  function isDragActive() {
    return isDragging.x || isDragging.y;
  }
  function setDragLock(axis) {
    if (axis === "x" || axis === "y") {
      if (isDragging[axis]) {
        return null;
      } else {
        isDragging[axis] = true;
        return () => {
          isDragging[axis] = false;
        };
      }
    } else {
      if (isDragging.x || isDragging.y) {
        return null;
      } else {
        isDragging.x = isDragging.y = true;
        return () => {
          isDragging.x = isDragging.y = false;
        };
      }
    }
  }
  function setupGesture(elementOrSelector, options) {
    const elements = resolveElements(elementOrSelector);
    const gestureAbortController = new AbortController();
    const eventOptions = {
      passive: true,
      ...options,
      signal: gestureAbortController.signal
    };
    const cancel = () => gestureAbortController.abort();
    return [elements, eventOptions, cancel];
  }
  function isValidHover(event) {
    return !(event.pointerType === "touch" || isDragActive());
  }
  function hover(elementOrSelector, onHoverStart, options = {}) {
    const [elements, eventOptions, cancel] = setupGesture(elementOrSelector, options);
    elements.forEach((element) => {
      let isPressed = false;
      let deferredHoverEnd = false;
      let hoverEndCallback;
      const removePointerLeave = () => {
        element.removeEventListener("pointerleave", onPointerLeave);
      };
      const endHover = (event) => {
        if (hoverEndCallback) {
          hoverEndCallback(event);
          hoverEndCallback = void 0;
        }
        removePointerLeave();
      };
      const onPointerUp = (event) => {
        isPressed = false;
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
        if (deferredHoverEnd) {
          deferredHoverEnd = false;
          endHover(event);
        }
      };
      const onPointerDown = () => {
        isPressed = true;
        window.addEventListener("pointerup", onPointerUp, eventOptions);
        window.addEventListener("pointercancel", onPointerUp, eventOptions);
      };
      const onPointerLeave = (leaveEvent) => {
        if (leaveEvent.pointerType === "touch")
          return;
        if (isPressed) {
          deferredHoverEnd = true;
          return;
        }
        endHover(leaveEvent);
      };
      const onPointerEnter = (enterEvent) => {
        if (!isValidHover(enterEvent))
          return;
        deferredHoverEnd = false;
        const onHoverEnd = onHoverStart(element, enterEvent);
        if (typeof onHoverEnd !== "function")
          return;
        hoverEndCallback = onHoverEnd;
        element.addEventListener("pointerleave", onPointerLeave, eventOptions);
      };
      element.addEventListener("pointerenter", onPointerEnter, eventOptions);
      element.addEventListener("pointerdown", onPointerDown, eventOptions);
    });
    return cancel;
  }
  const isNodeOrChild = (parent, child) => {
    if (!child) {
      return false;
    } else if (parent === child) {
      return true;
    } else {
      return isNodeOrChild(parent, child.parentElement);
    }
  };
  const isPrimaryPointer = (event) => {
    if (event.pointerType === "mouse") {
      return typeof event.button !== "number" || event.button <= 0;
    } else {
      return event.isPrimary !== false;
    }
  };
  const keyboardAccessibleElements = new Set([
    "BUTTON",
    "INPUT",
    "SELECT",
    "TEXTAREA",
    "A"
  ]);
  function isElementKeyboardAccessible(element) {
    return keyboardAccessibleElements.has(element.tagName) || element.isContentEditable === true;
  }
  const textInputElements = new Set(["INPUT", "SELECT", "TEXTAREA"]);
  function isElementTextInput(element) {
    return textInputElements.has(element.tagName) || element.isContentEditable === true;
  }
  const isPressing = new WeakSet();
  function filterEvents(callback) {
    return (event) => {
      if (event.key !== "Enter")
        return;
      callback(event);
    };
  }
  function firePointerEvent(target, type) {
    target.dispatchEvent(new PointerEvent("pointer" + type, { isPrimary: true, bubbles: true }));
  }
  const enableKeyboardPress = (focusEvent, eventOptions) => {
    const element = focusEvent.currentTarget;
    if (!element)
      return;
    const handleKeydown = filterEvents(() => {
      if (isPressing.has(element))
        return;
      firePointerEvent(element, "down");
      const handleKeyup = filterEvents(() => {
        firePointerEvent(element, "up");
      });
      const handleBlur = () => firePointerEvent(element, "cancel");
      element.addEventListener("keyup", handleKeyup, eventOptions);
      element.addEventListener("blur", handleBlur, eventOptions);
    });
    element.addEventListener("keydown", handleKeydown, eventOptions);
    element.addEventListener("blur", () => element.removeEventListener("keydown", handleKeydown), eventOptions);
  };
  function isValidPressEvent(event) {
    return isPrimaryPointer(event) && !isDragActive();
  }
  const claimedPointerDownEvents = new WeakSet();
  function press(targetOrSelector, onPressStart, options = {}) {
    const [targets, eventOptions, cancelEvents] = setupGesture(targetOrSelector, options);
    const startPress = (startEvent) => {
      const target = startEvent.currentTarget;
      if (!isValidPressEvent(startEvent))
        return;
      if (claimedPointerDownEvents.has(startEvent))
        return;
      isPressing.add(target);
      if (options.stopPropagation) {
        claimedPointerDownEvents.add(startEvent);
      }
      const onPressEnd = onPressStart(target, startEvent);
      const onPointerEnd = (endEvent, success) => {
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerCancel);
        if (isPressing.has(target)) {
          isPressing.delete(target);
        }
        if (!isValidPressEvent(endEvent)) {
          return;
        }
        if (typeof onPressEnd === "function") {
          onPressEnd(endEvent, { success });
        }
      };
      const onPointerUp = (upEvent) => {
        onPointerEnd(upEvent, target === window || target === document || options.useGlobalTarget || isNodeOrChild(target, upEvent.target));
      };
      const onPointerCancel = (cancelEvent) => {
        onPointerEnd(cancelEvent, false);
      };
      window.addEventListener("pointerup", onPointerUp, eventOptions);
      window.addEventListener("pointercancel", onPointerCancel, eventOptions);
    };
    targets.forEach((target) => {
      const pointerDownTarget = options.useGlobalTarget ? window : target;
      pointerDownTarget.addEventListener("pointerdown", startPress, eventOptions);
      if (isHTMLElement(target)) {
        target.addEventListener("focus", (event) => enableKeyboardPress(event, eventOptions));
        if (!isElementKeyboardAccessible(target) && !target.hasAttribute("tabindex")) {
          target.tabIndex = 0;
        }
      }
    });
    return cancelEvents;
  }
  function isSVGElement(element) {
    return isObject(element) && "ownerSVGElement" in element;
  }
  const resizeHandlers = new WeakMap();
  let observer$1;
  const getSize = (borderBoxAxis, svgAxis, htmlAxis) => (target, borderBoxSize) => {
    if (borderBoxSize && borderBoxSize[0]) {
      return borderBoxSize[0][borderBoxAxis + "Size"];
    } else if (isSVGElement(target) && "getBBox" in target) {
      return target.getBBox()[svgAxis];
    } else {
      return target[htmlAxis];
    }
  };
  const getWidth = getSize("inline", "width", "offsetWidth");
  const getHeight = getSize("block", "height", "offsetHeight");
  function notifyTarget({ target, borderBoxSize }) {
    resizeHandlers.get(target)?.forEach((handler) => {
      handler(target, {
        get width() {
          return getWidth(target, borderBoxSize);
        },
        get height() {
          return getHeight(target, borderBoxSize);
        }
      });
    });
  }
  function notifyAll(entries) {
    entries.forEach(notifyTarget);
  }
  function createResizeObserver() {
    if (typeof ResizeObserver === "undefined")
      return;
    observer$1 = new ResizeObserver(notifyAll);
  }
  function resizeElement(target, handler) {
    if (!observer$1)
      createResizeObserver();
    const elements = resolveElements(target);
    elements.forEach((element) => {
      let elementHandlers = resizeHandlers.get(element);
      if (!elementHandlers) {
        elementHandlers = new Set();
        resizeHandlers.set(element, elementHandlers);
      }
      elementHandlers.add(handler);
      observer$1?.observe(element);
    });
    return () => {
      elements.forEach((element) => {
        const elementHandlers = resizeHandlers.get(element);
        elementHandlers?.delete(handler);
        if (!elementHandlers?.size) {
          observer$1?.unobserve(element);
        }
      });
    };
  }
  const windowCallbacks = new Set();
  let windowResizeHandler;
  function createWindowResizeHandler() {
    windowResizeHandler = () => {
      const info = {
        get width() {
          return window.innerWidth;
        },
        get height() {
          return window.innerHeight;
        }
      };
      windowCallbacks.forEach((callback) => callback(info));
    };
    window.addEventListener("resize", windowResizeHandler);
  }
  function resizeWindow(callback) {
    windowCallbacks.add(callback);
    if (!windowResizeHandler)
      createWindowResizeHandler();
    return () => {
      windowCallbacks.delete(callback);
      if (!windowCallbacks.size && typeof windowResizeHandler === "function") {
        window.removeEventListener("resize", windowResizeHandler);
        windowResizeHandler = void 0;
      }
    };
  }
  function resize(a, b) {
    return typeof a === "function" ? resizeWindow(a) : resizeElement(a, b);
  }
  function isSVGSVGElement(element) {
    return isSVGElement(element) && element.tagName === "svg";
  }
  const valueTypes = [...dimensionValueTypes, color, complex];
  const findValueType = (v) => valueTypes.find(testValueType(v));
  const createAxisDelta = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0
  });
  const createDelta = () => ({
    x: createAxisDelta(),
    y: createAxisDelta()
  });
  const createAxis = () => ({ min: 0, max: 0 });
  const createBox = () => ({
    x: createAxis(),
    y: createAxis()
  });
  const prefersReducedMotion = { current: null };
  const hasReducedMotionListener = { current: false };
  const isBrowser = typeof window !== "undefined";
  function initPrefersReducedMotion() {
    hasReducedMotionListener.current = true;
    if (!isBrowser)
      return;
    if (window.matchMedia) {
      const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
      const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
      motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
      setReducedMotionPreferences();
    } else {
      prefersReducedMotion.current = false;
    }
  }
  const visualElementStore = new WeakMap();
  function isAnimationControls(v) {
    return v !== null && typeof v === "object" && typeof v.start === "function";
  }
  function isVariantLabel(v) {
    return typeof v === "string" || Array.isArray(v);
  }
  const variantPriorityOrder = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit"
  ];
  const variantProps = ["initial", ...variantPriorityOrder];
  function isControllingVariants(props) {
    return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
  }
  function isVariantNode(props) {
    return Boolean(isControllingVariants(props) || props.variants);
  }
  function updateMotionValuesFromProps(element, next, prev) {
    for (const key in next) {
      const nextValue = next[key];
      const prevValue = prev[key];
      if (isMotionValue(nextValue)) {
        element.addValue(key, nextValue);
      } else if (isMotionValue(prevValue)) {
        element.addValue(key, motionValue(nextValue, { owner: element }));
      } else if (prevValue !== nextValue) {
        if (element.hasValue(key)) {
          const existingValue = element.getValue(key);
          if (existingValue.liveStyle === true) {
            existingValue.jump(nextValue);
          } else if (!existingValue.hasAnimated) {
            existingValue.set(nextValue);
          }
        } else {
          const latestValue = element.getStaticValue(key);
          element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
        }
      }
    }
    for (const key in prev) {
      if (next[key] === void 0)
        element.removeValue(key);
    }
    return next;
  }
  const propEventHandlers = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete"
  ];
  let featureDefinitions = {};
  function setFeatureDefinitions(definitions) {
    featureDefinitions = definitions;
  }
  function getFeatureDefinitions() {
    return featureDefinitions;
  }
  class VisualElement {
scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
      return {};
    }
    constructor({ parent, props, presenceContext, reducedMotionConfig, skipAnimations, blockInitialAnimation, visualState }, options = {}) {
      this.current = null;
      this.children = new Set();
      this.isVariantNode = false;
      this.isControllingVariants = false;
      this.shouldReduceMotion = null;
      this.shouldSkipAnimations = false;
      this.values = new Map();
      this.KeyframeResolver = KeyframeResolver;
      this.features = {};
      this.valueSubscriptions = new Map();
      this.prevMotionValues = {};
      this.hasBeenMounted = false;
      this.events = {};
      this.propEventSubscriptions = {};
      this.notifyUpdate = () => this.notify("Update", this.latestValues);
      this.render = () => {
        if (!this.current)
          return;
        this.triggerBuild();
        this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
      };
      this.renderScheduledAt = 0;
      this.scheduleRender = () => {
        const now2 = time.now();
        if (this.renderScheduledAt < now2) {
          this.renderScheduledAt = now2;
          frame.render(this.render, false, true);
        }
      };
      const { latestValues, renderState } = visualState;
      this.latestValues = latestValues;
      this.baseTarget = { ...latestValues };
      this.initialValues = props.initial ? { ...latestValues } : {};
      this.renderState = renderState;
      this.parent = parent;
      this.props = props;
      this.presenceContext = presenceContext;
      this.depth = parent ? parent.depth + 1 : 0;
      this.reducedMotionConfig = reducedMotionConfig;
      this.skipAnimationsConfig = skipAnimations;
      this.options = options;
      this.blockInitialAnimation = Boolean(blockInitialAnimation);
      this.isControllingVariants = isControllingVariants(props);
      this.isVariantNode = isVariantNode(props);
      if (this.isVariantNode) {
        this.variantChildren = new Set();
      }
      this.manuallyAnimateOnMount = Boolean(parent && parent.current);
      const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
      for (const key in initialMotionValues) {
        const value = initialMotionValues[key];
        if (latestValues[key] !== void 0 && isMotionValue(value)) {
          value.set(latestValues[key]);
        }
      }
    }
    mount(instance) {
      if (this.hasBeenMounted) {
        for (const key in this.initialValues) {
          this.values.get(key)?.jump(this.initialValues[key]);
          this.latestValues[key] = this.initialValues[key];
        }
      }
      this.current = instance;
      visualElementStore.set(instance, this);
      if (this.projection && !this.projection.instance) {
        this.projection.mount(instance);
      }
      if (this.parent && this.isVariantNode && !this.isControllingVariants) {
        this.removeFromVariantTree = this.parent.addVariantChild(this);
      }
      this.values.forEach((value, key) => this.bindToMotionValue(key, value));
      if (this.reducedMotionConfig === "never") {
        this.shouldReduceMotion = false;
      } else if (this.reducedMotionConfig === "always") {
        this.shouldReduceMotion = true;
      } else {
        if (!hasReducedMotionListener.current) {
          initPrefersReducedMotion();
        }
        this.shouldReduceMotion = prefersReducedMotion.current;
      }
      this.shouldSkipAnimations = this.skipAnimationsConfig ?? false;
      this.parent?.addChild(this);
      this.update(this.props, this.presenceContext);
      this.hasBeenMounted = true;
    }
    unmount() {
      this.projection && this.projection.unmount();
      cancelFrame(this.notifyUpdate);
      cancelFrame(this.render);
      this.valueSubscriptions.forEach((remove) => remove());
      this.valueSubscriptions.clear();
      this.removeFromVariantTree && this.removeFromVariantTree();
      this.parent?.removeChild(this);
      for (const key in this.events) {
        this.events[key].clear();
      }
      for (const key in this.features) {
        const feature = this.features[key];
        if (feature) {
          feature.unmount();
          feature.isMounted = false;
        }
      }
      this.current = null;
    }
    addChild(child) {
      this.children.add(child);
      this.enteringChildren ?? (this.enteringChildren = new Set());
      this.enteringChildren.add(child);
    }
    removeChild(child) {
      this.children.delete(child);
      this.enteringChildren && this.enteringChildren.delete(child);
    }
    bindToMotionValue(key, value) {
      if (this.valueSubscriptions.has(key)) {
        this.valueSubscriptions.get(key)();
      }
      const valueIsTransform = transformProps.has(key);
      if (valueIsTransform && this.onBindTransform) {
        this.onBindTransform();
      }
      const removeOnChange = value.on("change", (latestValue) => {
        this.latestValues[key] = latestValue;
        this.props.onUpdate && frame.preRender(this.notifyUpdate);
        if (valueIsTransform && this.projection) {
          this.projection.isTransformDirty = true;
        }
        this.scheduleRender();
      });
      let removeSyncCheck;
      if (typeof window !== "undefined" && window.MotionCheckAppearSync) {
        removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
      }
      this.valueSubscriptions.set(key, () => {
        removeOnChange();
        if (removeSyncCheck)
          removeSyncCheck();
        if (value.owner)
          value.stop();
      });
    }
    sortNodePosition(other) {
      if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
        return 0;
      }
      return this.sortInstanceNodePosition(this.current, other.current);
    }
    updateFeatures() {
      let key = "animation";
      for (key in featureDefinitions) {
        const featureDefinition = featureDefinitions[key];
        if (!featureDefinition)
          continue;
        const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
        if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
          this.features[key] = new FeatureConstructor(this);
        }
        if (this.features[key]) {
          const feature = this.features[key];
          if (feature.isMounted) {
            feature.update();
          } else {
            feature.mount();
            feature.isMounted = true;
          }
        }
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.props);
    }
measureViewportBox() {
      return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
    }
    getStaticValue(key) {
      return this.latestValues[key];
    }
    setStaticValue(key, value) {
      this.latestValues[key] = value;
    }
update(props, presenceContext) {
      if (props.transformTemplate || this.props.transformTemplate) {
        this.scheduleRender();
      }
      this.prevProps = this.props;
      this.props = props;
      this.prevPresenceContext = this.presenceContext;
      this.presenceContext = presenceContext;
      for (let i = 0; i < propEventHandlers.length; i++) {
        const key = propEventHandlers[i];
        if (this.propEventSubscriptions[key]) {
          this.propEventSubscriptions[key]();
          delete this.propEventSubscriptions[key];
        }
        const listenerName = "on" + key;
        const listener = props[listenerName];
        if (listener) {
          this.propEventSubscriptions[key] = this.on(key, listener);
        }
      }
      this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps || {}, this), this.prevMotionValues);
      if (this.handleChildMotionValue) {
        this.handleChildMotionValue();
      }
    }
    getProps() {
      return this.props;
    }
getVariant(name) {
      return this.props.variants ? this.props.variants[name] : void 0;
    }
getDefaultTransition() {
      return this.props.transition;
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
      return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
    }
addVariantChild(child) {
      const closestVariantNode = this.getClosestVariantNode();
      if (closestVariantNode) {
        closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
        return () => closestVariantNode.variantChildren.delete(child);
      }
    }
addValue(key, value) {
      const existingValue = this.values.get(key);
      if (value !== existingValue) {
        if (existingValue)
          this.removeValue(key);
        this.bindToMotionValue(key, value);
        this.values.set(key, value);
        this.latestValues[key] = value.get();
      }
    }
removeValue(key) {
      this.values.delete(key);
      const unsubscribe = this.valueSubscriptions.get(key);
      if (unsubscribe) {
        unsubscribe();
        this.valueSubscriptions.delete(key);
      }
      delete this.latestValues[key];
      this.removeValueFromRenderState(key, this.renderState);
    }
hasValue(key) {
      return this.values.has(key);
    }
    getValue(key, defaultValue) {
      if (this.props.values && this.props.values[key]) {
        return this.props.values[key];
      }
      let value = this.values.get(key);
      if (value === void 0 && defaultValue !== void 0) {
        value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
        this.addValue(key, value);
      }
      return value;
    }
readValue(key, target) {
      let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
      if (value !== void 0 && value !== null) {
        if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
          value = parseFloat(value);
        } else if (!findValueType(value) && complex.test(target)) {
          value = getAnimatableNone(key, target);
        }
        this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
      }
      return isMotionValue(value) ? value.get() : value;
    }
setBaseTarget(key, value) {
      this.baseTarget[key] = value;
    }
getBaseTarget(key) {
      const { initial } = this.props;
      let valueFromInitial;
      if (typeof initial === "string" || typeof initial === "object") {
        const variant = resolveVariantFromProps(this.props, initial, this.presenceContext?.custom);
        if (variant) {
          valueFromInitial = variant[key];
        }
      }
      if (initial && valueFromInitial !== void 0) {
        return valueFromInitial;
      }
      const target = this.getBaseTargetFromProps(this.props, key);
      if (target !== void 0 && !isMotionValue(target))
        return target;
      return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
    }
    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = new SubscriptionManager();
      }
      return this.events[eventName].add(callback);
    }
    notify(eventName, ...args) {
      if (this.events[eventName]) {
        this.events[eventName].notify(...args);
      }
    }
    scheduleRenderMicrotask() {
      microtask.render(this.render);
    }
  }
  class DOMVisualElement extends VisualElement {
    constructor() {
      super(...arguments);
      this.KeyframeResolver = DOMKeyframesResolver;
    }
    sortInstanceNodePosition(a, b) {
      return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(props, key) {
      const style2 = props.style;
      return style2 ? style2[key] : void 0;
    }
    removeValueFromRenderState(key, { vars, style: style2 }) {
      delete vars[key];
      delete style2[key];
    }
    handleChildMotionValue() {
      if (this.childSubscription) {
        this.childSubscription();
        delete this.childSubscription;
      }
      const { children } = this.props;
      if (isMotionValue(children)) {
        this.childSubscription = children.on("change", (latest) => {
          if (this.current) {
            this.current.textContent = `${latest}`;
          }
        });
      }
    }
  }
  class Feature {
    constructor(node) {
      this.isMounted = false;
      this.node = node;
    }
    update() {
    }
  }
  function convertBoundingBoxToBox({ top, left, right, bottom }) {
    return {
      x: { min: left, max: right },
      y: { min: top, max: bottom }
    };
  }
  function convertBoxToBoundingBox({ x, y }) {
    return { top: y.min, right: x.max, bottom: y.max, left: x.min };
  }
  function transformBoxPoints(point, transformPoint2) {
    if (!transformPoint2)
      return point;
    const topLeft = transformPoint2({ x: point.left, y: point.top });
    const bottomRight = transformPoint2({ x: point.right, y: point.bottom });
    return {
      top: topLeft.y,
      left: topLeft.x,
      bottom: bottomRight.y,
      right: bottomRight.x
    };
  }
  function isIdentityScale(scale2) {
    return scale2 === void 0 || scale2 === 1;
  }
  function hasScale({ scale: scale2, scaleX: scaleX2, scaleY: scaleY2 }) {
    return !isIdentityScale(scale2) || !isIdentityScale(scaleX2) || !isIdentityScale(scaleY2);
  }
  function hasTransform(values) {
    return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
  }
  function has2DTranslate(values) {
    return is2DTranslate(values.x) || is2DTranslate(values.y);
  }
  function is2DTranslate(value) {
    return value && value !== "0%";
  }
  function scalePoint(point, scale2, originPoint) {
    const distanceFromOrigin = point - originPoint;
    const scaled = scale2 * distanceFromOrigin;
    return originPoint + scaled;
  }
  function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
    if (boxScale !== void 0) {
      point = scalePoint(point, boxScale, originPoint);
    }
    return scalePoint(point, scale2, originPoint) + translate;
  }
  function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
    axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
    axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
  }
  function applyBoxDelta(box, { x, y }) {
    applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
    applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
  }
  const TREE_SCALE_SNAP_MIN = 0.999999999999;
  const TREE_SCALE_SNAP_MAX = 1.0000000000001;
  function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
    const treeLength = treePath.length;
    if (!treeLength)
      return;
    treeScale.x = treeScale.y = 1;
    let node;
    let delta;
    for (let i = 0; i < treeLength; i++) {
      node = treePath[i];
      delta = node.projectionDelta;
      const { visualElement } = node.options;
      if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") {
        continue;
      }
      if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
        transformBox(box, {
          x: -node.scroll.offset.x,
          y: -node.scroll.offset.y
        });
      }
      if (delta) {
        treeScale.x *= delta.x.scale;
        treeScale.y *= delta.y.scale;
        applyBoxDelta(box, delta);
      }
      if (isSharedTransition && hasTransform(node.latestValues)) {
        transformBox(box, node.latestValues);
      }
    }
    if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) {
      treeScale.x = 1;
    }
    if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) {
      treeScale.y = 1;
    }
  }
  function translateAxis(axis, distance2) {
    axis.min = axis.min + distance2;
    axis.max = axis.max + distance2;
  }
  function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
    const originPoint = mixNumber$1(axis.min, axis.max, axisOrigin);
    applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
  }
  function transformBox(box, transform) {
    transformAxis(box.x, transform.x, transform.scaleX, transform.scale, transform.originX);
    transformAxis(box.y, transform.y, transform.scaleY, transform.scale, transform.originY);
  }
  function measureViewportBox(instance, transformPoint2) {
    return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
  }
  function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
    const viewportBox = measureViewportBox(element, transformPagePoint);
    const { scroll } = rootProjectionNode2;
    if (scroll) {
      translateAxis(viewportBox.x, scroll.offset.x);
      translateAxis(viewportBox.y, scroll.offset.y);
    }
    return viewportBox;
  }
  const translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
  };
  const numTransforms = transformPropOrder.length;
  function buildTransform(latestValues, transform, transformTemplate) {
    let transformString = "";
    let transformIsDefault = true;
    for (let i = 0; i < numTransforms; i++) {
      const key = transformPropOrder[i];
      const value = latestValues[key];
      if (value === void 0)
        continue;
      let valueIsDefault = true;
      if (typeof value === "number") {
        valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
      } else {
        const parsed = parseFloat(value);
        valueIsDefault = key.startsWith("scale") ? parsed === 1 : parsed === 0;
      }
      if (!valueIsDefault || transformTemplate) {
        const valueAsType = getValueAsType(value, numberValueTypes[key]);
        if (!valueIsDefault) {
          transformIsDefault = false;
          const transformName = translateAlias[key] || key;
          transformString += `${transformName}(${valueAsType}) `;
        }
        if (transformTemplate) {
          transform[key] = valueAsType;
        }
      }
    }
    transformString = transformString.trim();
    if (transformTemplate) {
      transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    } else if (transformIsDefault) {
      transformString = "none";
    }
    return transformString;
  }
  function buildHTMLStyles(state, latestValues, transformTemplate) {
    const { style: style2, vars, transformOrigin } = state;
    let hasTransform2 = false;
    let hasTransformOrigin = false;
    for (const key in latestValues) {
      const value = latestValues[key];
      if (transformProps.has(key)) {
        hasTransform2 = true;
        continue;
      } else if (isCSSVariableName(key)) {
        vars[key] = value;
        continue;
      } else {
        const valueAsType = getValueAsType(value, numberValueTypes[key]);
        if (key.startsWith("origin")) {
          hasTransformOrigin = true;
          transformOrigin[key] = valueAsType;
        } else {
          style2[key] = valueAsType;
        }
      }
    }
    if (!latestValues.transform) {
      if (hasTransform2 || transformTemplate) {
        style2.transform = buildTransform(latestValues, state.transform, transformTemplate);
      } else if (style2.transform) {
        style2.transform = "none";
      }
    }
    if (hasTransformOrigin) {
      const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
      style2.transformOrigin = `${originX} ${originY} ${originZ}`;
    }
  }
  function renderHTML(element, { style: style2, vars }, styleProp, projection) {
    const elementStyle = element.style;
    let key;
    for (key in style2) {
      elementStyle[key] = style2[key];
    }
    projection?.applyProjectionStyles(elementStyle, styleProp);
    for (key in vars) {
      elementStyle.setProperty(key, vars[key]);
    }
  }
  function pixelsToPercent(pixels, axis) {
    if (axis.max === axis.min)
      return 0;
    return pixels / (axis.max - axis.min) * 100;
  }
  const correctBorderRadius = {
    correct: (latest, node) => {
      if (!node.target)
        return latest;
      if (typeof latest === "string") {
        if (px.test(latest)) {
          latest = parseFloat(latest);
        } else {
          return latest;
        }
      }
      const x = pixelsToPercent(latest, node.target.x);
      const y = pixelsToPercent(latest, node.target.y);
      return `${x}% ${y}%`;
    }
  };
  const correctBoxShadow = {
    correct: (latest, { treeScale, projectionDelta }) => {
      const original = latest;
      const shadow = complex.parse(latest);
      if (shadow.length > 5)
        return original;
      const template = complex.createTransformer(latest);
      const offset = typeof shadow[0] !== "number" ? 1 : 0;
      const xScale = projectionDelta.x.scale * treeScale.x;
      const yScale = projectionDelta.y.scale * treeScale.y;
      shadow[0 + offset] /= xScale;
      shadow[1 + offset] /= yScale;
      const averageScale = mixNumber$1(xScale, yScale, 0.5);
      if (typeof shadow[2 + offset] === "number")
        shadow[2 + offset] /= averageScale;
      if (typeof shadow[3 + offset] === "number")
        shadow[3 + offset] /= averageScale;
      return template(shadow);
    }
  };
  const scaleCorrectors = {
    borderRadius: {
      ...correctBorderRadius,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius"
      ]
    },
    borderTopLeftRadius: correctBorderRadius,
    borderTopRightRadius: correctBorderRadius,
    borderBottomLeftRadius: correctBorderRadius,
    borderBottomRightRadius: correctBorderRadius,
    boxShadow: correctBoxShadow
  };
  function isForcedMotionValue(key, { layout: layout2, layoutId }) {
    return transformProps.has(key) || key.startsWith("origin") || (layout2 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
  }
  function scrapeMotionValuesFromProps$1(props, prevProps, visualElement) {
    const style2 = props.style;
    const prevStyle = prevProps?.style;
    const newValues = {};
    if (!style2)
      return newValues;
    for (const key in style2) {
      if (isMotionValue(style2[key]) || prevStyle && isMotionValue(prevStyle[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) {
        newValues[key] = style2[key];
      }
    }
    return newValues;
  }
  function getComputedStyle$1(element) {
    return window.getComputedStyle(element);
  }
  class HTMLVisualElement extends DOMVisualElement {
    constructor() {
      super(...arguments);
      this.type = "html";
      this.renderInstance = renderHTML;
    }
    readValueFromInstance(instance, key) {
      if (transformProps.has(key)) {
        return this.projection?.isProjecting ? defaultTransformValue(key) : readTransformValue(instance, key);
      } else {
        const computedStyle = getComputedStyle$1(instance);
        const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
        return typeof value === "string" ? value.trim() : value;
      }
    }
    measureInstanceViewportBox(instance, { transformPagePoint }) {
      return measureViewportBox(instance, transformPagePoint);
    }
    build(renderState, latestValues, props) {
      buildHTMLStyles(renderState, latestValues, props.transformTemplate);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
      return scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
    }
  }
  const dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
  };
  const camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
  };
  function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
    attrs.pathLength = 1;
    const keys = useDashCase ? dashKeys : camelKeys;
    attrs[keys.offset] = `${-offset}`;
    attrs[keys.array] = `${length} ${spacing}`;
  }
  const cssMotionPathProperties = [
    "offsetDistance",
    "offsetPath",
    "offsetRotate",
    "offsetAnchor"
  ];
  function buildSVGAttrs(state, {
    attrX,
    attrY,
    attrScale,
    pathLength,
    pathSpacing = 1,
    pathOffset = 0,
...latest
  }, isSVGTag2, transformTemplate, styleProp) {
    buildHTMLStyles(state, latest, transformTemplate);
    if (isSVGTag2) {
      if (state.style.viewBox) {
        state.attrs.viewBox = state.style.viewBox;
      }
      return;
    }
    state.attrs = state.style;
    state.style = {};
    const { attrs, style: style2 } = state;
    if (attrs.transform) {
      style2.transform = attrs.transform;
      delete attrs.transform;
    }
    if (style2.transform || attrs.transformOrigin) {
      style2.transformOrigin = attrs.transformOrigin ?? "50% 50%";
      delete attrs.transformOrigin;
    }
    if (style2.transform) {
      style2.transformBox = styleProp?.transformBox ?? "fill-box";
      delete attrs.transformBox;
    }
    for (const key of cssMotionPathProperties) {
      if (attrs[key] !== void 0) {
        style2[key] = attrs[key];
        delete attrs[key];
      }
    }
    if (attrX !== void 0)
      attrs.x = attrX;
    if (attrY !== void 0)
      attrs.y = attrY;
    if (attrScale !== void 0)
      attrs.scale = attrScale;
    if (pathLength !== void 0) {
      buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
    }
  }
  const camelCaseAttributes = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust"
  ]);
  const isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";
  function renderSVG(element, renderState, _styleProp, projection) {
    renderHTML(element, renderState, void 0, projection);
    for (const key in renderState.attrs) {
      element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
    }
  }
  function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const newValues = scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
    for (const key in props) {
      if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
        const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
        newValues[targetKey] = props[key];
      }
    }
    return newValues;
  }
  class SVGVisualElement extends DOMVisualElement {
    constructor() {
      super(...arguments);
      this.type = "svg";
      this.isSVGTag = false;
      this.measureInstanceViewportBox = createBox;
    }
    getBaseTargetFromProps(props, key) {
      return props[key];
    }
    readValueFromInstance(instance, key) {
      if (transformProps.has(key)) {
        const defaultType = getDefaultValueType(key);
        return defaultType ? defaultType.default || 0 : 0;
      }
      key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
      return instance.getAttribute(key);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
      return scrapeMotionValuesFromProps(props, prevProps, visualElement);
    }
    build(renderState, latestValues, props) {
      buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
    }
    renderInstance(instance, renderState, styleProp, projection) {
      renderSVG(instance, renderState, styleProp, projection);
    }
    mount(instance) {
      this.isSVGTag = isSVGTag(instance.tagName);
      super.mount(instance);
    }
  }
  const numVariantProps = variantProps.length;
  function getVariantContext(visualElement) {
    if (!visualElement)
      return void 0;
    if (!visualElement.isControllingVariants) {
      const context2 = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
      if (visualElement.props.initial !== void 0) {
        context2.initial = visualElement.props.initial;
      }
      return context2;
    }
    const context = {};
    for (let i = 0; i < numVariantProps; i++) {
      const name = variantProps[i];
      const prop = visualElement.props[name];
      if (isVariantLabel(prop) || prop === false) {
        context[name] = prop;
      }
    }
    return context;
  }
  function shallowCompare(next, prev) {
    if (!Array.isArray(prev))
      return false;
    const prevLength = prev.length;
    if (prevLength !== next.length)
      return false;
    for (let i = 0; i < prevLength; i++) {
      if (prev[i] !== next[i])
        return false;
    }
    return true;
  }
  const reversePriorityOrder = [...variantPriorityOrder].reverse();
  const numAnimationTypes = variantPriorityOrder.length;
  function createAnimateFunction(visualElement) {
    return (animations2) => {
      return Promise.all(animations2.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
    };
  }
  function createAnimationState(visualElement) {
    let animate = createAnimateFunction(visualElement);
    let state = createState();
    let isInitialRender = true;
    const buildResolvedTypeValues = (type) => (acc, definition) => {
      const resolved = resolveVariant(visualElement, definition, type === "exit" ? visualElement.presenceContext?.custom : void 0);
      if (resolved) {
        const { transition, transitionEnd, ...target } = resolved;
        acc = { ...acc, ...target, ...transitionEnd };
      }
      return acc;
    };
    function setAnimateFunction(makeAnimator) {
      animate = makeAnimator(visualElement);
    }
    function animateChanges(changedActiveType) {
      const { props } = visualElement;
      const context = getVariantContext(visualElement.parent) || {};
      const animations2 = [];
      const removedKeys = new Set();
      let encounteredKeys = {};
      let removedVariantIndex = Infinity;
      for (let i = 0; i < numAnimationTypes; i++) {
        const type = reversePriorityOrder[i];
        const typeState = state[type];
        const prop = props[type] !== void 0 ? props[type] : context[type];
        const propIsVariant = isVariantLabel(prop);
        const activeDelta = type === changedActiveType ? typeState.isActive : null;
        if (activeDelta === false)
          removedVariantIndex = i;
        let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
        if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
          isInherited = false;
        }
        typeState.protectedKeys = { ...encounteredKeys };
        if (
!typeState.isActive && activeDelta === null ||
!prop && !typeState.prevProp ||
isAnimationControls(prop) || typeof prop === "boolean"
        ) {
          continue;
        }
        const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
        let shouldAnimateType = variantDidChange ||
type === changedActiveType && typeState.isActive && !isInherited && propIsVariant ||
i > removedVariantIndex && propIsVariant;
        let handledRemovedValues = false;
        const definitionList = Array.isArray(prop) ? prop : [prop];
        let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
        if (activeDelta === false)
          resolvedValues = {};
        const { prevResolvedValues = {} } = typeState;
        const allKeys = {
          ...prevResolvedValues,
          ...resolvedValues
        };
        const markToAnimate = (key) => {
          shouldAnimateType = true;
          if (removedKeys.has(key)) {
            handledRemovedValues = true;
            removedKeys.delete(key);
          }
          typeState.needsAnimating[key] = true;
          const motionValue2 = visualElement.getValue(key);
          if (motionValue2)
            motionValue2.liveStyle = false;
        };
        for (const key in allKeys) {
          const next = resolvedValues[key];
          const prev = prevResolvedValues[key];
          if (encounteredKeys.hasOwnProperty(key))
            continue;
          let valueHasChanged = false;
          if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
            valueHasChanged = !shallowCompare(next, prev);
          } else {
            valueHasChanged = next !== prev;
          }
          if (valueHasChanged) {
            if (next !== void 0 && next !== null) {
              markToAnimate(key);
            } else {
              removedKeys.add(key);
            }
          } else if (next !== void 0 && removedKeys.has(key)) {
            markToAnimate(key);
          } else {
            typeState.protectedKeys[key] = true;
          }
        }
        typeState.prevProp = prop;
        typeState.prevResolvedValues = resolvedValues;
        if (typeState.isActive) {
          encounteredKeys = { ...encounteredKeys, ...resolvedValues };
        }
        if (isInitialRender && visualElement.blockInitialAnimation) {
          shouldAnimateType = false;
        }
        const willAnimateViaParent = isInherited && variantDidChange;
        const needsAnimating = !willAnimateViaParent || handledRemovedValues;
        if (shouldAnimateType && needsAnimating) {
          animations2.push(...definitionList.map((animation) => {
            const options = { type };
            if (typeof animation === "string" && isInitialRender && !willAnimateViaParent && visualElement.manuallyAnimateOnMount && visualElement.parent) {
              const { parent } = visualElement;
              const parentVariant = resolveVariant(parent, animation);
              if (parent.enteringChildren && parentVariant) {
                const { delayChildren } = parentVariant.transition || {};
                options.delay = calcChildStagger(parent.enteringChildren, visualElement, delayChildren);
              }
            }
            return {
              animation,
              options
            };
          }));
        }
      }
      if (removedKeys.size) {
        const fallbackAnimation = {};
        if (typeof props.initial !== "boolean") {
          const initialTransition = resolveVariant(visualElement, Array.isArray(props.initial) ? props.initial[0] : props.initial);
          if (initialTransition && initialTransition.transition) {
            fallbackAnimation.transition = initialTransition.transition;
          }
        }
        removedKeys.forEach((key) => {
          const fallbackTarget = visualElement.getBaseTarget(key);
          const motionValue2 = visualElement.getValue(key);
          if (motionValue2)
            motionValue2.liveStyle = true;
          fallbackAnimation[key] = fallbackTarget ?? null;
        });
        animations2.push({ animation: fallbackAnimation });
      }
      let shouldAnimate = Boolean(animations2.length);
      if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) {
        shouldAnimate = false;
      }
      isInitialRender = false;
      return shouldAnimate ? animate(animations2) : Promise.resolve();
    }
    function setActive(type, isActive) {
      if (state[type].isActive === isActive)
        return Promise.resolve();
      visualElement.variantChildren?.forEach((child) => child.animationState?.setActive(type, isActive));
      state[type].isActive = isActive;
      const animations2 = animateChanges(type);
      for (const key in state) {
        state[key].protectedKeys = {};
      }
      return animations2;
    }
    return {
      animateChanges,
      setActive,
      setAnimateFunction,
      getState: () => state,
      reset: () => {
        state = createState();
      }
    };
  }
  function checkVariantsDidChange(prev, next) {
    if (typeof next === "string") {
      return next !== prev;
    } else if (Array.isArray(next)) {
      return !shallowCompare(next, prev);
    }
    return false;
  }
  function createTypeState(isActive = false) {
    return {
      isActive,
      protectedKeys: {},
      needsAnimating: {},
      prevResolvedValues: {}
    };
  }
  function createState() {
    return {
      animate: createTypeState(true),
      whileInView: createTypeState(),
      whileHover: createTypeState(),
      whileTap: createTypeState(),
      whileDrag: createTypeState(),
      whileFocus: createTypeState(),
      exit: createTypeState()
    };
  }
  function copyAxisInto(axis, originAxis) {
    axis.min = originAxis.min;
    axis.max = originAxis.max;
  }
  function copyBoxInto(box, originBox) {
    copyAxisInto(box.x, originBox.x);
    copyAxisInto(box.y, originBox.y);
  }
  function copyAxisDeltaInto(delta, originDelta) {
    delta.translate = originDelta.translate;
    delta.scale = originDelta.scale;
    delta.originPoint = originDelta.originPoint;
    delta.origin = originDelta.origin;
  }
  const SCALE_PRECISION = 1e-4;
  const SCALE_MIN = 1 - SCALE_PRECISION;
  const SCALE_MAX = 1 + SCALE_PRECISION;
  const TRANSLATE_PRECISION = 0.01;
  const TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
  const TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
  function calcLength(axis) {
    return axis.max - axis.min;
  }
  function isNear(value, target, maxDistance) {
    return Math.abs(value - target) <= maxDistance;
  }
  function calcAxisDelta(delta, source, target, origin = 0.5) {
    delta.origin = origin;
    delta.originPoint = mixNumber$1(source.min, source.max, delta.origin);
    delta.scale = calcLength(target) / calcLength(source);
    delta.translate = mixNumber$1(target.min, target.max, delta.origin) - delta.originPoint;
    if (delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX || isNaN(delta.scale)) {
      delta.scale = 1;
    }
    if (delta.translate >= TRANSLATE_MIN && delta.translate <= TRANSLATE_MAX || isNaN(delta.translate)) {
      delta.translate = 0;
    }
  }
  function calcBoxDelta(delta, source, target, origin) {
    calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
    calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
  }
  function calcRelativeAxis(target, relative, parent) {
    target.min = parent.min + relative.min;
    target.max = target.min + calcLength(relative);
  }
  function calcRelativeBox(target, relative, parent) {
    calcRelativeAxis(target.x, relative.x, parent.x);
    calcRelativeAxis(target.y, relative.y, parent.y);
  }
  function calcRelativeAxisPosition(target, layout2, parent) {
    target.min = layout2.min - parent.min;
    target.max = target.min + calcLength(layout2);
  }
  function calcRelativePosition(target, layout2, parent) {
    calcRelativeAxisPosition(target.x, layout2.x, parent.x);
    calcRelativeAxisPosition(target.y, layout2.y, parent.y);
  }
  function removePointDelta(point, translate, scale2, originPoint, boxScale) {
    point -= translate;
    point = scalePoint(point, 1 / scale2, originPoint);
    if (boxScale !== void 0) {
      point = scalePoint(point, 1 / boxScale, originPoint);
    }
    return point;
  }
  function removeAxisDelta(axis, translate = 0, scale2 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
    if (percent.test(translate)) {
      translate = parseFloat(translate);
      const relativeProgress = mixNumber$1(sourceAxis.min, sourceAxis.max, translate / 100);
      translate = relativeProgress - sourceAxis.min;
    }
    if (typeof translate !== "number")
      return;
    let originPoint = mixNumber$1(originAxis.min, originAxis.max, origin);
    if (axis === originAxis)
      originPoint -= translate;
    axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
    axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
  }
  function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
    removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
  }
  const xKeys = ["x", "scaleX", "originX"];
  const yKeys = ["y", "scaleY", "originY"];
  function removeBoxTransforms(box, transforms, originBox, sourceBox) {
    removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
    removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
  }
  function isAxisDeltaZero(delta) {
    return delta.translate === 0 && delta.scale === 1;
  }
  function isDeltaZero(delta) {
    return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
  }
  function axisEquals(a, b) {
    return a.min === b.min && a.max === b.max;
  }
  function boxEquals(a, b) {
    return axisEquals(a.x, b.x) && axisEquals(a.y, b.y);
  }
  function axisEqualsRounded(a, b) {
    return Math.round(a.min) === Math.round(b.min) && Math.round(a.max) === Math.round(b.max);
  }
  function boxEqualsRounded(a, b) {
    return axisEqualsRounded(a.x, b.x) && axisEqualsRounded(a.y, b.y);
  }
  function aspectRatio(box) {
    return calcLength(box.x) / calcLength(box.y);
  }
  function axisDeltaEquals(a, b) {
    return a.translate === b.translate && a.scale === b.scale && a.originPoint === b.originPoint;
  }
  function eachAxis(callback) {
    return [callback("x"), callback("y")];
  }
  function buildProjectionTransform(delta, treeScale, latestTransform) {
    let transform = "";
    const xTranslate = delta.x.translate / treeScale.x;
    const yTranslate = delta.y.translate / treeScale.y;
    const zTranslate = latestTransform?.z || 0;
    if (xTranslate || yTranslate || zTranslate) {
      transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
    }
    if (treeScale.x !== 1 || treeScale.y !== 1) {
      transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
    }
    if (latestTransform) {
      const { transformPerspective, rotate: rotate2, rotateX, rotateY, skewX, skewY } = latestTransform;
      if (transformPerspective)
        transform = `perspective(${transformPerspective}px) ${transform}`;
      if (rotate2)
        transform += `rotate(${rotate2}deg) `;
      if (rotateX)
        transform += `rotateX(${rotateX}deg) `;
      if (rotateY)
        transform += `rotateY(${rotateY}deg) `;
      if (skewX)
        transform += `skewX(${skewX}deg) `;
      if (skewY)
        transform += `skewY(${skewY}deg) `;
    }
    const elementScaleX = delta.x.scale * treeScale.x;
    const elementScaleY = delta.y.scale * treeScale.y;
    if (elementScaleX !== 1 || elementScaleY !== 1) {
      transform += `scale(${elementScaleX}, ${elementScaleY})`;
    }
    return transform || "none";
  }
  const borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
  const numBorders = borders.length;
  const asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
  const isPx = (value) => typeof value === "number" || px.test(value);
  function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
    if (shouldCrossfadeOpacity) {
      target.opacity = mixNumber$1(0, lead.opacity ?? 1, easeCrossfadeIn(progress2));
      target.opacityExit = mixNumber$1(follow.opacity ?? 1, 0, easeCrossfadeOut(progress2));
    } else if (isOnlyMember) {
      target.opacity = mixNumber$1(follow.opacity ?? 1, lead.opacity ?? 1, progress2);
    }
    for (let i = 0; i < numBorders; i++) {
      const borderLabel = `border${borders[i]}Radius`;
      let followRadius = getRadius(follow, borderLabel);
      let leadRadius = getRadius(lead, borderLabel);
      if (followRadius === void 0 && leadRadius === void 0)
        continue;
      followRadius || (followRadius = 0);
      leadRadius || (leadRadius = 0);
      const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
      if (canMix) {
        target[borderLabel] = Math.max(mixNumber$1(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
        if (percent.test(leadRadius) || percent.test(followRadius)) {
          target[borderLabel] += "%";
        }
      } else {
        target[borderLabel] = leadRadius;
      }
    }
    if (follow.rotate || lead.rotate) {
      target.rotate = mixNumber$1(follow.rotate || 0, lead.rotate || 0, progress2);
    }
  }
  function getRadius(values, radiusName) {
    return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
  }
  const easeCrossfadeIn = compress(0, 0.5, circOut);
  const easeCrossfadeOut = compress(0.5, 0.95, noop);
  function compress(min, max, easing) {
    return (p) => {
      if (p < min)
        return 0;
      if (p > max)
        return 1;
      return easing( progress(min, max, p));
    };
  }
  function animateSingleValue(value, keyframes2, options) {
    const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
    motionValue$1.start(animateMotionValue("", motionValue$1, keyframes2, options));
    return motionValue$1.animation;
  }
  function addDomEvent(target, eventName, handler, options = { passive: true }) {
    target.addEventListener(eventName, handler, options);
    return () => target.removeEventListener(eventName, handler);
  }
  const compareByDepth = (a, b) => a.depth - b.depth;
  class FlatTree {
    constructor() {
      this.children = [];
      this.isDirty = false;
    }
    add(child) {
      addUniqueItem(this.children, child);
      this.isDirty = true;
    }
    remove(child) {
      removeItem(this.children, child);
      this.isDirty = true;
    }
    forEach(callback) {
      this.isDirty && this.children.sort(compareByDepth);
      this.isDirty = false;
      this.children.forEach(callback);
    }
  }
  function delay(callback, timeout) {
    const start = time.now();
    const checkElapsed = ({ timestamp }) => {
      const elapsed = timestamp - start;
      if (elapsed >= timeout) {
        cancelFrame(checkElapsed);
        callback(elapsed - timeout);
      }
    };
    frame.setup(checkElapsed, true);
    return () => cancelFrame(checkElapsed);
  }
  function resolveMotionValue(value) {
    return isMotionValue(value) ? value.get() : value;
  }
  class NodeStack {
    constructor() {
      this.members = [];
    }
    add(node) {
      addUniqueItem(this.members, node);
      node.scheduleRender();
    }
    remove(node) {
      removeItem(this.members, node);
      if (node === this.prevLead) {
        this.prevLead = void 0;
      }
      if (node === this.lead) {
        const prevLead = this.members[this.members.length - 1];
        if (prevLead) {
          this.promote(prevLead);
        }
      }
    }
    relegate(node) {
      const indexOfNode = this.members.findIndex((member) => node === member);
      if (indexOfNode === 0)
        return false;
      let prevLead;
      for (let i = indexOfNode; i >= 0; i--) {
        const member = this.members[i];
        if (member.isPresent !== false) {
          prevLead = member;
          break;
        }
      }
      if (prevLead) {
        this.promote(prevLead);
        return true;
      } else {
        return false;
      }
    }
    promote(node, preserveFollowOpacity) {
      const prevLead = this.lead;
      if (node === prevLead)
        return;
      this.prevLead = prevLead;
      this.lead = node;
      node.show();
      if (prevLead) {
        prevLead.instance && prevLead.scheduleRender();
        node.scheduleRender();
        const prevDep = prevLead.options.layoutDependency;
        const nextDep = node.options.layoutDependency;
        const dependencyMatches = prevDep !== void 0 && nextDep !== void 0 && prevDep === nextDep;
        if (!dependencyMatches) {
          node.resumeFrom = prevLead;
          if (preserveFollowOpacity) {
            node.resumeFrom.preserveOpacity = true;
          }
          if (prevLead.snapshot) {
            node.snapshot = prevLead.snapshot;
            node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
          }
          if (node.root && node.root.isUpdating) {
            node.isLayoutDirty = true;
          }
        }
        const { crossfade } = node.options;
        if (crossfade === false) {
          prevLead.hide();
        }
      }
    }
    exitAnimationComplete() {
      this.members.forEach((node) => {
        const { options, resumingFrom } = node;
        options.onExitComplete && options.onExitComplete();
        if (resumingFrom) {
          resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
        }
      });
    }
    scheduleRender() {
      this.members.forEach((node) => {
        node.instance && node.scheduleRender(false);
      });
    }
removeLeadSnapshot() {
      if (this.lead && this.lead.snapshot) {
        this.lead.snapshot = void 0;
      }
    }
  }
  const globalProjectionState = {
hasAnimatedSinceResize: true,
hasEverUpdated: false
  };
  const transformAxes = ["", "X", "Y", "Z"];
  const animationTarget = 1e3;
  let id$1 = 0;
  function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
    const { latestValues } = visualElement;
    if (latestValues[key]) {
      values[key] = latestValues[key];
      visualElement.setStaticValue(key, 0);
      if (sharedAnimationValues) {
        sharedAnimationValues[key] = 0;
      }
    }
  }
  function cancelTreeOptimisedTransformAnimations(projectionNode) {
    projectionNode.hasCheckedOptimisedAppear = true;
    if (projectionNode.root === projectionNode)
      return;
    const { visualElement } = projectionNode.options;
    if (!visualElement)
      return;
    const appearId = getOptimisedAppearId(visualElement);
    if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
      const { layout: layout2, layoutId } = projectionNode.options;
      window.MotionCancelOptimisedAnimation(appearId, "transform", frame, !(layout2 || layoutId));
    }
    const { parent } = projectionNode;
    if (parent && !parent.hasCheckedOptimisedAppear) {
      cancelTreeOptimisedTransformAnimations(parent);
    }
  }
  function createProjectionNode$1({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
    return class ProjectionNode {
      constructor(latestValues = {}, parent = defaultParent?.()) {
        this.id = id$1++;
        this.animationId = 0;
        this.animationCommitId = 0;
        this.children = new Set();
        this.options = {};
        this.isTreeAnimating = false;
        this.isAnimationBlocked = false;
        this.isLayoutDirty = false;
        this.isProjectionDirty = false;
        this.isSharedProjectionDirty = false;
        this.isTransformDirty = false;
        this.updateManuallyBlocked = false;
        this.updateBlockedByResize = false;
        this.isUpdating = false;
        this.isSVG = false;
        this.needsReset = false;
        this.shouldResetTransform = false;
        this.hasCheckedOptimisedAppear = false;
        this.treeScale = { x: 1, y: 1 };
        this.eventHandlers = new Map();
        this.hasTreeAnimated = false;
        this.layoutVersion = 0;
        this.updateScheduled = false;
        this.scheduleUpdate = () => this.update();
        this.projectionUpdateScheduled = false;
        this.checkUpdateFailed = () => {
          if (this.isUpdating) {
            this.isUpdating = false;
            this.clearAllSnapshots();
          }
        };
        this.updateProjection = () => {
          this.projectionUpdateScheduled = false;
          this.nodes.forEach(propagateDirtyNodes);
          this.nodes.forEach(resolveTargetDelta);
          this.nodes.forEach(calcProjection);
          this.nodes.forEach(cleanDirtyNodes);
        };
        this.resolvedRelativeTargetAt = 0;
        this.linkedParentVersion = 0;
        this.hasProjected = false;
        this.isVisible = true;
        this.animationProgress = 0;
        this.sharedNodes = new Map();
        this.latestValues = latestValues;
        this.root = parent ? parent.root || parent : this;
        this.path = parent ? [...parent.path, parent] : [];
        this.parent = parent;
        this.depth = parent ? parent.depth + 1 : 0;
        for (let i = 0; i < this.path.length; i++) {
          this.path[i].shouldResetTransform = true;
        }
        if (this.root === this)
          this.nodes = new FlatTree();
      }
      addEventListener(name, handler) {
        if (!this.eventHandlers.has(name)) {
          this.eventHandlers.set(name, new SubscriptionManager());
        }
        return this.eventHandlers.get(name).add(handler);
      }
      notifyListeners(name, ...args) {
        const subscriptionManager = this.eventHandlers.get(name);
        subscriptionManager && subscriptionManager.notify(...args);
      }
      hasListeners(name) {
        return this.eventHandlers.has(name);
      }
mount(instance) {
        if (this.instance)
          return;
        this.isSVG = isSVGElement(instance) && !isSVGSVGElement(instance);
        this.instance = instance;
        const { layoutId, layout: layout2, visualElement } = this.options;
        if (visualElement && !visualElement.current) {
          visualElement.mount(instance);
        }
        this.root.nodes.add(this);
        this.parent && this.parent.children.add(this);
        if (this.root.hasTreeAnimated && (layout2 || layoutId)) {
          this.isLayoutDirty = true;
        }
        if (attachResizeListener) {
          let cancelDelay;
          let innerWidth = 0;
          const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
          frame.read(() => {
            innerWidth = window.innerWidth;
          });
          attachResizeListener(instance, () => {
            const newInnerWidth = window.innerWidth;
            if (newInnerWidth === innerWidth)
              return;
            innerWidth = newInnerWidth;
            this.root.updateBlockedByResize = true;
            cancelDelay && cancelDelay();
            cancelDelay = delay(resizeUnblockUpdate, 250);
            if (globalProjectionState.hasAnimatedSinceResize) {
              globalProjectionState.hasAnimatedSinceResize = false;
              this.nodes.forEach(finishAnimation);
            }
          });
        }
        if (layoutId) {
          this.root.registerSharedNode(layoutId, this);
        }
        if (this.options.animate !== false && visualElement && (layoutId || layout2)) {
          this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout: newLayout }) => {
            if (this.isTreeAnimationBlocked()) {
              this.target = void 0;
              this.relativeTarget = void 0;
              return;
            }
            const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
            const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
            const hasTargetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout);
            const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeLayoutChanged;
            if (this.options.layoutRoot || this.resumeFrom || hasOnlyRelativeTargetChanged || hasLayoutChanged && (hasTargetChanged || !this.currentAnimation)) {
              if (this.resumeFrom) {
                this.resumingFrom = this.resumeFrom;
                this.resumingFrom.resumingFrom = void 0;
              }
              const animationOptions = {
                ...getValueTransition(layoutTransition, "layout"),
                onPlay: onLayoutAnimationStart,
                onComplete: onLayoutAnimationComplete
              };
              if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
                animationOptions.delay = 0;
                animationOptions.type = false;
              }
              this.startAnimation(animationOptions);
              this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            } else {
              if (!hasLayoutChanged) {
                finishAnimation(this);
              }
              if (this.isLead() && this.options.onExitComplete) {
                this.options.onExitComplete();
              }
            }
            this.targetLayout = newLayout;
          });
        }
      }
      unmount() {
        this.options.layoutId && this.willUpdate();
        this.root.nodes.remove(this);
        const stack = this.getStack();
        stack && stack.remove(this);
        this.parent && this.parent.children.delete(this);
        this.instance = void 0;
        this.eventHandlers.clear();
        cancelFrame(this.updateProjection);
      }
blockUpdate() {
        this.updateManuallyBlocked = true;
      }
      unblockUpdate() {
        this.updateManuallyBlocked = false;
      }
      isUpdateBlocked() {
        return this.updateManuallyBlocked || this.updateBlockedByResize;
      }
      isTreeAnimationBlocked() {
        return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
      }
startUpdate() {
        if (this.isUpdateBlocked())
          return;
        this.isUpdating = true;
        this.nodes && this.nodes.forEach(resetSkewAndRotation);
        this.animationId++;
      }
      getTransformTemplate() {
        const { visualElement } = this.options;
        return visualElement && visualElement.getProps().transformTemplate;
      }
      willUpdate(shouldNotifyListeners = true) {
        this.root.hasTreeAnimated = true;
        if (this.root.isUpdateBlocked()) {
          this.options.onExitComplete && this.options.onExitComplete();
          return;
        }
        if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) {
          cancelTreeOptimisedTransformAnimations(this);
        }
        !this.root.isUpdating && this.root.startUpdate();
        if (this.isLayoutDirty)
          return;
        this.isLayoutDirty = true;
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          node.shouldResetTransform = true;
          node.updateScroll("snapshot");
          if (node.options.layoutRoot) {
            node.willUpdate(false);
          }
        }
        const { layoutId, layout: layout2 } = this.options;
        if (layoutId === void 0 && !layout2)
          return;
        const transformTemplate = this.getTransformTemplate();
        this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
        this.updateSnapshot();
        shouldNotifyListeners && this.notifyListeners("willUpdate");
      }
      update() {
        this.updateScheduled = false;
        const updateWasBlocked = this.isUpdateBlocked();
        if (updateWasBlocked) {
          this.unblockUpdate();
          this.clearAllSnapshots();
          this.nodes.forEach(clearMeasurements);
          return;
        }
        if (this.animationId <= this.animationCommitId) {
          this.nodes.forEach(clearIsLayoutDirty);
          return;
        }
        this.animationCommitId = this.animationId;
        if (!this.isUpdating) {
          this.nodes.forEach(clearIsLayoutDirty);
        } else {
          this.isUpdating = false;
          this.nodes.forEach(resetTransformStyle);
          this.nodes.forEach(updateLayout);
          this.nodes.forEach(notifyLayoutUpdate);
        }
        this.clearAllSnapshots();
        const now2 = time.now();
        frameData.delta = clamp(0, 1e3 / 60, now2 - frameData.timestamp);
        frameData.timestamp = now2;
        frameData.isProcessing = true;
        frameSteps.update.process(frameData);
        frameSteps.preRender.process(frameData);
        frameSteps.render.process(frameData);
        frameData.isProcessing = false;
      }
      didUpdate() {
        if (!this.updateScheduled) {
          this.updateScheduled = true;
          microtask.read(this.scheduleUpdate);
        }
      }
      clearAllSnapshots() {
        this.nodes.forEach(clearSnapshot);
        this.sharedNodes.forEach(removeLeadSnapshots);
      }
      scheduleUpdateProjection() {
        if (!this.projectionUpdateScheduled) {
          this.projectionUpdateScheduled = true;
          frame.preRender(this.updateProjection, false, true);
        }
      }
      scheduleCheckAfterUnmount() {
        frame.postRender(() => {
          if (this.isLayoutDirty) {
            this.root.didUpdate();
          } else {
            this.root.checkUpdateFailed();
          }
        });
      }
updateSnapshot() {
        if (this.snapshot || !this.instance)
          return;
        this.snapshot = this.measure();
        if (this.snapshot && !calcLength(this.snapshot.measuredBox.x) && !calcLength(this.snapshot.measuredBox.y)) {
          this.snapshot = void 0;
        }
      }
      updateLayout() {
        if (!this.instance)
          return;
        this.updateScroll();
        if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
          return;
        }
        if (this.resumeFrom && !this.resumeFrom.instance) {
          for (let i = 0; i < this.path.length; i++) {
            const node = this.path[i];
            node.updateScroll();
          }
        }
        const prevLayout = this.layout;
        this.layout = this.measure(false);
        this.layoutVersion++;
        this.layoutCorrected = createBox();
        this.isLayoutDirty = false;
        this.projectionDelta = void 0;
        this.notifyListeners("measure", this.layout.layoutBox);
        const { visualElement } = this.options;
        visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
      }
      updateScroll(phase = "measure") {
        let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
        if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
          needsMeasurement = false;
        }
        if (needsMeasurement && this.instance) {
          const isRoot = checkIsScrollRoot(this.instance);
          this.scroll = {
            animationId: this.root.animationId,
            phase,
            isRoot,
            offset: measureScroll(this.instance),
            wasRoot: this.scroll ? this.scroll.isRoot : isRoot
          };
        }
      }
      resetTransform() {
        if (!resetTransform)
          return;
        const isResetRequested = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
        const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
        const transformTemplate = this.getTransformTemplate();
        const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
        const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
        if (isResetRequested && this.instance && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
          resetTransform(this.instance, transformTemplateValue);
          this.shouldResetTransform = false;
          this.scheduleRender();
        }
      }
      measure(removeTransform = true) {
        const pageBox = this.measurePageBox();
        let layoutBox = this.removeElementScroll(pageBox);
        if (removeTransform) {
          layoutBox = this.removeTransform(layoutBox);
        }
        roundBox(layoutBox);
        return {
          animationId: this.root.animationId,
          measuredBox: pageBox,
          layoutBox,
          latestValues: {},
          source: this.id
        };
      }
      measurePageBox() {
        const { visualElement } = this.options;
        if (!visualElement)
          return createBox();
        const box = visualElement.measureViewportBox();
        const wasInScrollRoot = this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot);
        if (!wasInScrollRoot) {
          const { scroll } = this.root;
          if (scroll) {
            translateAxis(box.x, scroll.offset.x);
            translateAxis(box.y, scroll.offset.y);
          }
        }
        return box;
      }
      removeElementScroll(box) {
        const boxWithoutScroll = createBox();
        copyBoxInto(boxWithoutScroll, box);
        if (this.scroll?.wasRoot) {
          return boxWithoutScroll;
        }
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          const { scroll, options } = node;
          if (node !== this.root && scroll && options.layoutScroll) {
            if (scroll.wasRoot) {
              copyBoxInto(boxWithoutScroll, box);
            }
            translateAxis(boxWithoutScroll.x, scroll.offset.x);
            translateAxis(boxWithoutScroll.y, scroll.offset.y);
          }
        }
        return boxWithoutScroll;
      }
      applyTransform(box, transformOnly = false) {
        const withTransforms = createBox();
        copyBoxInto(withTransforms, box);
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
            transformBox(withTransforms, {
              x: -node.scroll.offset.x,
              y: -node.scroll.offset.y
            });
          }
          if (!hasTransform(node.latestValues))
            continue;
          transformBox(withTransforms, node.latestValues);
        }
        if (hasTransform(this.latestValues)) {
          transformBox(withTransforms, this.latestValues);
        }
        return withTransforms;
      }
      removeTransform(box) {
        const boxWithoutTransform = createBox();
        copyBoxInto(boxWithoutTransform, box);
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          if (!node.instance)
            continue;
          if (!hasTransform(node.latestValues))
            continue;
          hasScale(node.latestValues) && node.updateSnapshot();
          const sourceBox = createBox();
          const nodeBox = node.measurePageBox();
          copyBoxInto(sourceBox, nodeBox);
          removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
        }
        if (hasTransform(this.latestValues)) {
          removeBoxTransforms(boxWithoutTransform, this.latestValues);
        }
        return boxWithoutTransform;
      }
      setTargetDelta(delta) {
        this.targetDelta = delta;
        this.root.scheduleUpdateProjection();
        this.isProjectionDirty = true;
      }
      setOptions(options) {
        this.options = {
          ...this.options,
          ...options,
          crossfade: options.crossfade !== void 0 ? options.crossfade : true
        };
      }
      clearMeasurements() {
        this.scroll = void 0;
        this.layout = void 0;
        this.snapshot = void 0;
        this.prevTransformTemplateValue = void 0;
        this.targetDelta = void 0;
        this.target = void 0;
        this.isLayoutDirty = false;
      }
      forceRelativeParentToResolveTarget() {
        if (!this.relativeParent)
          return;
        if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) {
          this.relativeParent.resolveTargetDelta(true);
        }
      }
      resolveTargetDelta(forceRecalculation = false) {
        const lead = this.getLead();
        this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
        this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
        const isShared = Boolean(this.resumingFrom) || this !== lead;
        const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize);
        if (canSkip)
          return;
        const { layout: layout2, layoutId } = this.options;
        if (!this.layout || !(layout2 || layoutId))
          return;
        this.resolvedRelativeTargetAt = frameData.timestamp;
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && this.linkedParentVersion !== relativeParent.layoutVersion && !relativeParent.options.layoutRoot) {
          this.removeRelativeTarget();
        }
        if (!this.targetDelta && !this.relativeTarget) {
          if (relativeParent && relativeParent.layout) {
            this.createRelativeTarget(relativeParent, this.layout.layoutBox, relativeParent.layout.layoutBox);
          } else {
            this.removeRelativeTarget();
          }
        }
        if (!this.relativeTarget && !this.targetDelta)
          return;
        if (!this.target) {
          this.target = createBox();
          this.targetWithTransforms = createBox();
        }
        if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
          this.forceRelativeParentToResolveTarget();
          calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
        } else if (this.targetDelta) {
          if (Boolean(this.resumingFrom)) {
            this.target = this.applyTransform(this.layout.layoutBox);
          } else {
            copyBoxInto(this.target, this.layout.layoutBox);
          }
          applyBoxDelta(this.target, this.targetDelta);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        if (this.attemptToResolveRelativeTarget) {
          this.attemptToResolveRelativeTarget = false;
          if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
            this.createRelativeTarget(relativeParent, this.target, relativeParent.target);
          } else {
            this.relativeParent = this.relativeTarget = void 0;
          }
        }
      }
      getClosestProjectingParent() {
        if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) {
          return void 0;
        }
        if (this.parent.isProjecting()) {
          return this.parent;
        } else {
          return this.parent.getClosestProjectingParent();
        }
      }
      isProjecting() {
        return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
      }
      createRelativeTarget(relativeParent, layout2, parentLayout) {
        this.relativeParent = relativeParent;
        this.linkedParentVersion = relativeParent.layoutVersion;
        this.forceRelativeParentToResolveTarget();
        this.relativeTarget = createBox();
        this.relativeTargetOrigin = createBox();
        calcRelativePosition(this.relativeTargetOrigin, layout2, parentLayout);
        copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
      }
      removeRelativeTarget() {
        this.relativeParent = this.relativeTarget = void 0;
      }
      calcProjection() {
        const lead = this.getLead();
        const isShared = Boolean(this.resumingFrom) || this !== lead;
        let canSkip = true;
        if (this.isProjectionDirty || this.parent?.isProjectionDirty) {
          canSkip = false;
        }
        if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
          canSkip = false;
        }
        if (this.resolvedRelativeTargetAt === frameData.timestamp) {
          canSkip = false;
        }
        if (canSkip)
          return;
        const { layout: layout2, layoutId } = this.options;
        this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
        if (!this.isTreeAnimating) {
          this.targetDelta = this.relativeTarget = void 0;
        }
        if (!this.layout || !(layout2 || layoutId))
          return;
        copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
        const prevTreeScaleX = this.treeScale.x;
        const prevTreeScaleY = this.treeScale.y;
        applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
        if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
          lead.target = lead.layout.layoutBox;
          lead.targetWithTransforms = createBox();
        }
        const { target } = lead;
        if (!target) {
          if (this.prevProjectionDelta) {
            this.createProjectionDeltas();
            this.scheduleRender();
          }
          return;
        }
        if (!this.projectionDelta || !this.prevProjectionDelta) {
          this.createProjectionDeltas();
        } else {
          copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x);
          copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y);
        }
        calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
        if (this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) {
          this.hasProjected = true;
          this.scheduleRender();
          this.notifyListeners("projectionUpdate", target);
        }
      }
      hide() {
        this.isVisible = false;
      }
      show() {
        this.isVisible = true;
      }
      scheduleRender(notifyAll2 = true) {
        this.options.visualElement?.scheduleRender();
        if (notifyAll2) {
          const stack = this.getStack();
          stack && stack.scheduleRender();
        }
        if (this.resumingFrom && !this.resumingFrom.instance) {
          this.resumingFrom = void 0;
        }
      }
      createProjectionDeltas() {
        this.prevProjectionDelta = createDelta();
        this.projectionDelta = createDelta();
        this.projectionDeltaWithTransform = createDelta();
      }
      setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
        const snapshot = this.snapshot;
        const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
        const mixedValues = { ...this.latestValues };
        const targetDelta = createDelta();
        if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
          this.relativeTarget = this.relativeTargetOrigin = void 0;
        }
        this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
        const relativeLayout = createBox();
        const snapshotSource = snapshot ? snapshot.source : void 0;
        const layoutSource = this.layout ? this.layout.source : void 0;
        const isSharedLayoutAnimation = snapshotSource !== layoutSource;
        const stack = this.getStack();
        const isOnlyMember = !stack || stack.members.length <= 1;
        const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
        this.animationProgress = 0;
        let prevRelativeTarget;
        this.mixTargetDelta = (latest) => {
          const progress2 = latest / 1e3;
          mixAxisDelta(targetDelta.x, delta.x, progress2);
          mixAxisDelta(targetDelta.y, delta.y, progress2);
          this.setTargetDelta(targetDelta);
          if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
            calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
            mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress2);
            if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) {
              this.isProjectionDirty = false;
            }
            if (!prevRelativeTarget)
              prevRelativeTarget = createBox();
            copyBoxInto(prevRelativeTarget, this.relativeTarget);
          }
          if (isSharedLayoutAnimation) {
            this.animationValues = mixedValues;
            mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
          }
          this.root.scheduleUpdateProjection();
          this.scheduleRender();
          this.animationProgress = progress2;
        };
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
      }
      startAnimation(options) {
        this.notifyListeners("animationStart");
        this.currentAnimation?.stop();
        this.resumingFrom?.currentAnimation?.stop();
        if (this.pendingAnimation) {
          cancelFrame(this.pendingAnimation);
          this.pendingAnimation = void 0;
        }
        this.pendingAnimation = frame.update(() => {
          globalProjectionState.hasAnimatedSinceResize = true;
          this.motionValue || (this.motionValue = motionValue(0));
          this.currentAnimation = animateSingleValue(this.motionValue, [0, 1e3], {
            ...options,
            velocity: 0,
            isSync: true,
            onUpdate: (latest) => {
              this.mixTargetDelta(latest);
              options.onUpdate && options.onUpdate(latest);
            },
            onStop: () => {
            },
            onComplete: () => {
              options.onComplete && options.onComplete();
              this.completeAnimation();
            }
          });
          if (this.resumingFrom) {
            this.resumingFrom.currentAnimation = this.currentAnimation;
          }
          this.pendingAnimation = void 0;
        });
      }
      completeAnimation() {
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = void 0;
          this.resumingFrom.preserveOpacity = void 0;
        }
        const stack = this.getStack();
        stack && stack.exitAnimationComplete();
        this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
        this.notifyListeners("animationComplete");
      }
      finishAnimation() {
        if (this.currentAnimation) {
          this.mixTargetDelta && this.mixTargetDelta(animationTarget);
          this.currentAnimation.stop();
        }
        this.completeAnimation();
      }
      applyTransformsToTarget() {
        const lead = this.getLead();
        let { targetWithTransforms, target, layout: layout2, latestValues } = lead;
        if (!targetWithTransforms || !target || !layout2)
          return;
        if (this !== lead && this.layout && layout2 && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout2.layoutBox)) {
          target = this.target || createBox();
          const xLength = calcLength(this.layout.layoutBox.x);
          target.x.min = lead.target.x.min;
          target.x.max = target.x.min + xLength;
          const yLength = calcLength(this.layout.layoutBox.y);
          target.y.min = lead.target.y.min;
          target.y.max = target.y.min + yLength;
        }
        copyBoxInto(targetWithTransforms, target);
        transformBox(targetWithTransforms, latestValues);
        calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
      }
      registerSharedNode(layoutId, node) {
        if (!this.sharedNodes.has(layoutId)) {
          this.sharedNodes.set(layoutId, new NodeStack());
        }
        const stack = this.sharedNodes.get(layoutId);
        stack.add(node);
        const config = node.options.initialPromotionConfig;
        node.promote({
          transition: config ? config.transition : void 0,
          preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
        });
      }
      isLead() {
        const stack = this.getStack();
        return stack ? stack.lead === this : true;
      }
      getLead() {
        const { layoutId } = this.options;
        return layoutId ? this.getStack()?.lead || this : this;
      }
      getPrevLead() {
        const { layoutId } = this.options;
        return layoutId ? this.getStack()?.prevLead : void 0;
      }
      getStack() {
        const { layoutId } = this.options;
        if (layoutId)
          return this.root.sharedNodes.get(layoutId);
      }
      promote({ needsReset, transition, preserveFollowOpacity } = {}) {
        const stack = this.getStack();
        if (stack)
          stack.promote(this, preserveFollowOpacity);
        if (needsReset) {
          this.projectionDelta = void 0;
          this.needsReset = true;
        }
        if (transition)
          this.setOptions({ transition });
      }
      relegate() {
        const stack = this.getStack();
        if (stack) {
          return stack.relegate(this);
        } else {
          return false;
        }
      }
      resetSkewAndRotation() {
        const { visualElement } = this.options;
        if (!visualElement)
          return;
        let hasDistortingTransform = false;
        const { latestValues } = visualElement;
        if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) {
          hasDistortingTransform = true;
        }
        if (!hasDistortingTransform)
          return;
        const resetValues = {};
        if (latestValues.z) {
          resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
        }
        for (let i = 0; i < transformAxes.length; i++) {
          resetDistortingTransform(`rotate${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
          resetDistortingTransform(`skew${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
        }
        visualElement.render();
        for (const key in resetValues) {
          visualElement.setStaticValue(key, resetValues[key]);
          if (this.animationValues) {
            this.animationValues[key] = resetValues[key];
          }
        }
        visualElement.scheduleRender();
      }
      applyProjectionStyles(targetStyle, styleProp) {
        if (!this.instance || this.isSVG)
          return;
        if (!this.isVisible) {
          targetStyle.visibility = "hidden";
          return;
        }
        const transformTemplate = this.getTransformTemplate();
        if (this.needsReset) {
          this.needsReset = false;
          targetStyle.visibility = "";
          targetStyle.opacity = "";
          targetStyle.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
          targetStyle.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
          return;
        }
        const lead = this.getLead();
        if (!this.projectionDelta || !this.layout || !lead.target) {
          if (this.options.layoutId) {
            targetStyle.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
            targetStyle.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
          }
          if (this.hasProjected && !hasTransform(this.latestValues)) {
            targetStyle.transform = transformTemplate ? transformTemplate({}, "") : "none";
            this.hasProjected = false;
          }
          return;
        }
        targetStyle.visibility = "";
        const valuesToRender = lead.animationValues || lead.latestValues;
        this.applyTransformsToTarget();
        let transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
        if (transformTemplate) {
          transform = transformTemplate(valuesToRender, transform);
        }
        targetStyle.transform = transform;
        const { x, y } = this.projectionDelta;
        targetStyle.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
        if (lead.animationValues) {
          targetStyle.opacity = lead === this ? valuesToRender.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
        } else {
          targetStyle.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
        }
        for (const key in scaleCorrectors) {
          if (valuesToRender[key] === void 0)
            continue;
          const { correct, applyTo, isCSSVariable } = scaleCorrectors[key];
          const corrected = transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
          if (applyTo) {
            const num = applyTo.length;
            for (let i = 0; i < num; i++) {
              targetStyle[applyTo[i]] = corrected;
            }
          } else {
            if (isCSSVariable) {
              this.options.visualElement.renderState.vars[key] = corrected;
            } else {
              targetStyle[key] = corrected;
            }
          }
        }
        if (this.options.layoutId) {
          targetStyle.pointerEvents = lead === this ? resolveMotionValue(styleProp?.pointerEvents) || "" : "none";
        }
      }
      clearSnapshot() {
        this.resumeFrom = this.snapshot = void 0;
      }
resetTree() {
        this.root.nodes.forEach((node) => node.currentAnimation?.stop());
        this.root.nodes.forEach(clearMeasurements);
        this.root.sharedNodes.clear();
      }
    };
  }
  function updateLayout(node) {
    node.updateLayout();
  }
  function notifyLayoutUpdate(node) {
    const snapshot = node.resumeFrom?.snapshot || node.snapshot;
    if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
      const { layoutBox: layout2, measuredBox: measuredLayout } = node.layout;
      const { animationType } = node.options;
      const isShared = snapshot.source !== node.layout.source;
      if (animationType === "size") {
        eachAxis((axis) => {
          const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
          const length = calcLength(axisSnapshot);
          axisSnapshot.min = layout2[axis].min;
          axisSnapshot.max = axisSnapshot.min + length;
        });
      } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout2)) {
        eachAxis((axis) => {
          const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
          const length = calcLength(layout2[axis]);
          axisSnapshot.max = axisSnapshot.min + length;
          if (node.relativeTarget && !node.currentAnimation) {
            node.isProjectionDirty = true;
            node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
          }
        });
      }
      const layoutDelta = createDelta();
      calcBoxDelta(layoutDelta, layout2, snapshot.layoutBox);
      const visualDelta = createDelta();
      if (isShared) {
        calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
      } else {
        calcBoxDelta(visualDelta, layout2, snapshot.layoutBox);
      }
      const hasLayoutChanged = !isDeltaZero(layoutDelta);
      let hasRelativeLayoutChanged = false;
      if (!node.resumeFrom) {
        const relativeParent = node.getClosestProjectingParent();
        if (relativeParent && !relativeParent.resumeFrom) {
          const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
          if (parentSnapshot && parentLayout) {
            const relativeSnapshot = createBox();
            calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
            const relativeLayout = createBox();
            calcRelativePosition(relativeLayout, layout2, parentLayout.layoutBox);
            if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) {
              hasRelativeLayoutChanged = true;
            }
            if (relativeParent.options.layoutRoot) {
              node.relativeTarget = relativeLayout;
              node.relativeTargetOrigin = relativeSnapshot;
              node.relativeParent = relativeParent;
            }
          }
        }
      }
      node.notifyListeners("didUpdate", {
        layout: layout2,
        snapshot,
        delta: visualDelta,
        layoutDelta,
        hasLayoutChanged,
        hasRelativeLayoutChanged
      });
    } else if (node.isLead()) {
      const { onExitComplete } = node.options;
      onExitComplete && onExitComplete();
    }
    node.options.transition = void 0;
  }
  function propagateDirtyNodes(node) {
    if (!node.parent)
      return;
    if (!node.isProjecting()) {
      node.isProjectionDirty = node.parent.isProjectionDirty;
    }
    node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
    node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
  }
  function cleanDirtyNodes(node) {
    node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
  }
  function clearSnapshot(node) {
    node.clearSnapshot();
  }
  function clearMeasurements(node) {
    node.clearMeasurements();
  }
  function clearIsLayoutDirty(node) {
    node.isLayoutDirty = false;
  }
  function resetTransformStyle(node) {
    const { visualElement } = node.options;
    if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
      visualElement.notify("BeforeLayoutMeasure");
    }
    node.resetTransform();
  }
  function finishAnimation(node) {
    node.finishAnimation();
    node.targetDelta = node.relativeTarget = node.target = void 0;
    node.isProjectionDirty = true;
  }
  function resolveTargetDelta(node) {
    node.resolveTargetDelta();
  }
  function calcProjection(node) {
    node.calcProjection();
  }
  function resetSkewAndRotation(node) {
    node.resetSkewAndRotation();
  }
  function removeLeadSnapshots(stack) {
    stack.removeLeadSnapshot();
  }
  function mixAxisDelta(output, delta, p) {
    output.translate = mixNumber$1(delta.translate, 0, p);
    output.scale = mixNumber$1(delta.scale, 1, p);
    output.origin = delta.origin;
    output.originPoint = delta.originPoint;
  }
  function mixAxis(output, from, to, p) {
    output.min = mixNumber$1(from.min, to.min, p);
    output.max = mixNumber$1(from.max, to.max, p);
  }
  function mixBox(output, from, to, p) {
    mixAxis(output.x, from.x, to.x, p);
    mixAxis(output.y, from.y, to.y, p);
  }
  function hasOpacityCrossfade(node) {
    return node.animationValues && node.animationValues.opacityExit !== void 0;
  }
  const defaultLayoutTransition = {
    duration: 0.45,
    ease: [0.4, 0, 0.1, 1]
  };
  const userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
  const roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
  function roundAxis(axis) {
    axis.min = roundPoint(axis.min);
    axis.max = roundPoint(axis.max);
  }
  function roundBox(box) {
    roundAxis(box.x);
    roundAxis(box.y);
  }
  function shouldAnimatePositionOnly(animationType, snapshot, layout2) {
    return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout2), 0.2);
  }
  function checkNodeWasScrollRoot(node) {
    return node !== node.root && node.scroll?.wasRoot;
  }
  const DocumentProjectionNode = createProjectionNode$1({
    attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
      y: document.documentElement.scrollTop || document.body?.scrollTop || 0
    }),
    checkIsScrollRoot: () => true
  });
  const rootProjectionNode = {
    current: void 0
  };
  const HTMLProjectionNode = createProjectionNode$1({
    measureScroll: (instance) => ({
      x: instance.scrollLeft,
      y: instance.scrollTop
    }),
    defaultParent: () => {
      if (!rootProjectionNode.current) {
        const documentNode = new DocumentProjectionNode({});
        documentNode.mount(window);
        documentNode.setOptions({ layoutScroll: true });
        rootProjectionNode.current = documentNode;
      }
      return rootProjectionNode.current;
    },
    resetTransform: (instance, value) => {
      instance.style.transform = value !== void 0 ? value : "none";
    },
    checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
  });
  const MotionConfigContext = React__default.createContext({
    transformPagePoint: (p) => p,
    isStatic: false,
    reducedMotion: "never"
  });
  function setRef(ref, value) {
    if (typeof ref === "function") {
      return ref(value);
    } else if (ref !== null && ref !== void 0) {
      ref.current = value;
    }
  }
  function composeRefs(...refs) {
    return (node) => {
      let hasCleanup = false;
      const cleanups = refs.map((ref) => {
        const cleanup = setRef(ref, node);
        if (!hasCleanup && typeof cleanup === "function") {
          hasCleanup = true;
        }
        return cleanup;
      });
      if (hasCleanup) {
        return () => {
          for (let i = 0; i < cleanups.length; i++) {
            const cleanup = cleanups[i];
            if (typeof cleanup === "function") {
              cleanup();
            } else {
              setRef(refs[i], null);
            }
          }
        };
      }
    };
  }
  function useComposedRefs(...refs) {
    return React__default__namespace.useCallback(composeRefs(...refs), refs);
  }
  class PopChildMeasure extends React__default__namespace.Component {
    getSnapshotBeforeUpdate(prevProps) {
      const element = this.props.childRef.current;
      if (element && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
        const parent = element.offsetParent;
        const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
        const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
        const size = this.props.sizeRef.current;
        size.height = element.offsetHeight || 0;
        size.width = element.offsetWidth || 0;
        size.top = element.offsetTop;
        size.left = element.offsetLeft;
        size.right = parentWidth - size.width - size.left;
        size.bottom = parentHeight - size.height - size.top;
      }
      return null;
    }
componentDidUpdate() {
    }
    render() {
      return this.props.children;
    }
  }
  function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
    const id2 = React__default.useId();
    const ref = React__default.useRef(null);
    const size = React__default.useRef({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    });
    const { nonce } = React__default.useContext(MotionConfigContext);
    const childRef = children.props?.ref ?? children?.ref;
    const composedRef = useComposedRefs(ref, childRef);
    React__default.useInsertionEffect(() => {
      const { width, height, top, left, right, bottom } = size.current;
      if (isPresent || pop === false || !ref.current || !width || !height)
        return;
      const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
      const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
      ref.current.dataset.motionPopId = id2;
      const style2 = document.createElement("style");
      if (nonce)
        style2.nonce = nonce;
      const parent = root ?? document.head;
      parent.appendChild(style2);
      if (style2.sheet) {
        style2.sheet.insertRule(`
          [data-motion-pop-id="${id2}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
      }
      return () => {
        if (parent.contains(style2)) {
          parent.removeChild(style2);
        }
      };
    }, [isPresent]);
    return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : React__default__namespace.cloneElement(children, { ref: composedRef }) });
  }
  const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
    const presenceChildren = useConstant(newChildrenMap);
    const id2 = React__default.useId();
    let isReusedContext = true;
    let context = React__default.useMemo(() => {
      isReusedContext = false;
      return {
        id: id2,
        initial,
        isPresent,
        custom,
        onExitComplete: (childId) => {
          presenceChildren.set(childId, true);
          for (const isComplete of presenceChildren.values()) {
            if (!isComplete)
              return;
          }
          onExitComplete && onExitComplete();
        },
        register: (childId) => {
          presenceChildren.set(childId, false);
          return () => presenceChildren.delete(childId);
        }
      };
    }, [isPresent, presenceChildren, onExitComplete]);
    if (presenceAffectsLayout && isReusedContext) {
      context = { ...context };
    }
    React__default.useMemo(() => {
      presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
    }, [isPresent]);
    React__default__namespace.useEffect(() => {
      !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
    }, [isPresent]);
    children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
    return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
  };
  function newChildrenMap() {
    return new Map();
  }
  function usePresence(subscribe = true) {
    const context = React__default.useContext(PresenceContext);
    if (context === null)
      return [true, null];
    const { isPresent, onExitComplete, register } = context;
    const id2 = React__default.useId();
    React__default.useEffect(() => {
      if (subscribe) {
        return register(id2);
      }
    }, [subscribe]);
    const safeToRemove = React__default.useCallback(() => subscribe && onExitComplete && onExitComplete(id2), [id2, onExitComplete, subscribe]);
    return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
  }
  const getChildKey = (child) => child.key || "";
  function onlyElements(children) {
    const filtered = [];
    React__default.Children.forEach(children, (child) => {
      if (React__default.isValidElement(child))
        filtered.push(child);
    });
    return filtered;
  }
  const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
    const [isParentPresent, safeToRemove] = usePresence(propagate);
    const presentChildren = React__default.useMemo(() => onlyElements(children), [children]);
    const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
    const isInitialRender = React__default.useRef(true);
    const pendingPresentChildren = React__default.useRef(presentChildren);
    const exitComplete = useConstant(() => new Map());
    const exitingComponents = React__default.useRef( new Set());
    const [diffedChildren, setDiffedChildren] = React__default.useState(presentChildren);
    const [renderedChildren, setRenderedChildren] = React__default.useState(presentChildren);
    useIsomorphicLayoutEffect(() => {
      isInitialRender.current = false;
      pendingPresentChildren.current = presentChildren;
      for (let i = 0; i < renderedChildren.length; i++) {
        const key = getChildKey(renderedChildren[i]);
        if (!presentKeys.includes(key)) {
          if (exitComplete.get(key) !== true) {
            exitComplete.set(key, false);
          }
        } else {
          exitComplete.delete(key);
          exitingComponents.current.delete(key);
        }
      }
    }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
    const exitingChildren = [];
    if (presentChildren !== diffedChildren) {
      let nextChildren = [...presentChildren];
      for (let i = 0; i < renderedChildren.length; i++) {
        const child = renderedChildren[i];
        const key = getChildKey(child);
        if (!presentKeys.includes(key)) {
          nextChildren.splice(i, 0, child);
          exitingChildren.push(child);
        }
      }
      if (mode === "wait" && exitingChildren.length) {
        nextChildren = exitingChildren;
      }
      setRenderedChildren(onlyElements(nextChildren));
      setDiffedChildren(presentChildren);
      return null;
    }
    const { forceRender } = React__default.useContext(LayoutGroupContext);
    return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
      const key = getChildKey(child);
      const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
      const onExit = () => {
        if (exitingComponents.current.has(key)) {
          return;
        }
        exitingComponents.current.add(key);
        if (exitComplete.has(key)) {
          exitComplete.set(key, true);
        } else {
          return;
        }
        let isEveryExitComplete = true;
        exitComplete.forEach((isExitComplete) => {
          if (!isExitComplete)
            isEveryExitComplete = false;
        });
        if (isEveryExitComplete) {
          forceRender?.();
          setRenderedChildren(pendingPresentChildren.current);
          propagate && safeToRemove?.();
          onExitComplete && onExitComplete();
        }
      };
      return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
    }) });
  };
  const LazyContext = React__default.createContext({ strict: false });
  const featureProps = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag"
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"]
  };
  let isInitialized = false;
  function initFeatureDefinitions() {
    if (isInitialized)
      return;
    const initialFeatureDefinitions = {};
    for (const key in featureProps) {
      initialFeatureDefinitions[key] = {
        isEnabled: (props) => featureProps[key].some((name) => !!props[name])
      };
    }
    setFeatureDefinitions(initialFeatureDefinitions);
    isInitialized = true;
  }
  function getInitializedFeatureDefinitions() {
    initFeatureDefinitions();
    return getFeatureDefinitions();
  }
  function loadFeatures(features) {
    const featureDefinitions2 = getInitializedFeatureDefinitions();
    for (const key in features) {
      featureDefinitions2[key] = {
        ...featureDefinitions2[key],
        ...features[key]
      };
    }
    setFeatureDefinitions(featureDefinitions2);
  }
  const validMotionProps = new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "propagate",
    "ignoreStrict",
    "viewport"
  ]);
  function isValidMotionProp(key) {
    return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
  }
  let shouldForward = (key) => !isValidMotionProp(key);
  function loadExternalIsValidProp(isValidProp) {
    if (typeof isValidProp !== "function")
      return;
    shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
  }
  try {
    loadExternalIsValidProp(require("@emotion/is-prop-valid").default);
  } catch {
  }
  function filterProps(props, isDom, forwardMotionProps) {
    const filteredProps = {};
    for (const key in props) {
      if (key === "values" && typeof props.values === "object")
        continue;
      if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) ||
props["draggable"] && key.startsWith("onDrag")) {
        filteredProps[key] = props[key];
      }
    }
    return filteredProps;
  }
  const MotionContext = React__default.createContext({});
  function getCurrentTreeVariants(props, context) {
    if (isControllingVariants(props)) {
      const { initial, animate } = props;
      return {
        initial: initial === false || isVariantLabel(initial) ? initial : void 0,
        animate: isVariantLabel(animate) ? animate : void 0
      };
    }
    return props.inherit !== false ? context : {};
  }
  function useCreateMotionContext(props) {
    const { initial, animate } = getCurrentTreeVariants(props, React__default.useContext(MotionContext));
    return React__default.useMemo(() => ({ initial, animate }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
  }
  function variantLabelsAsDependency(prop) {
    return Array.isArray(prop) ? prop.join(" ") : prop;
  }
  const createHtmlRenderState = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {}
  });
  function copyRawValuesOnly(target, source, props) {
    for (const key in source) {
      if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
        target[key] = source[key];
      }
    }
  }
  function useInitialMotionValues({ transformTemplate }, visualState) {
    return React__default.useMemo(() => {
      const state = createHtmlRenderState();
      buildHTMLStyles(state, visualState, transformTemplate);
      return Object.assign({}, state.vars, state.style);
    }, [visualState]);
  }
  function useStyle(props, visualState) {
    const styleProp = props.style || {};
    const style2 = {};
    copyRawValuesOnly(style2, styleProp, props);
    Object.assign(style2, useInitialMotionValues(props, visualState));
    return style2;
  }
  function useHTMLProps(props, visualState) {
    const htmlProps = {};
    const style2 = useStyle(props, visualState);
    if (props.drag && props.dragListener !== false) {
      htmlProps.draggable = false;
      style2.userSelect = style2.WebkitUserSelect = style2.WebkitTouchCallout = "none";
      style2.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
    }
    if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) {
      htmlProps.tabIndex = 0;
    }
    htmlProps.style = style2;
    return htmlProps;
  }
  const createSvgRenderState = () => ({
    ...createHtmlRenderState(),
    attrs: {}
  });
  function useSVGProps(props, visualState, _isStatic, Component2) {
    const visualProps = React__default.useMemo(() => {
      const state = createSvgRenderState();
      buildSVGAttrs(state, visualState, isSVGTag(Component2), props.transformTemplate, props.style);
      return {
        ...state.attrs,
        style: { ...state.style }
      };
    }, [visualState]);
    if (props.style) {
      const rawStyles = {};
      copyRawValuesOnly(rawStyles, props.style, props);
      visualProps.style = { ...rawStyles, ...visualProps.style };
    }
    return visualProps;
  }
  const lowercaseSVGElements = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "switch",
    "symbol",
    "svg",
    "text",
    "tspan",
    "use",
    "view"
  ];
  function isSVGComponent(Component2) {
    if (
typeof Component2 !== "string" ||
Component2.includes("-")
    ) {
      return false;
    } else if (
lowercaseSVGElements.indexOf(Component2) > -1 ||
/[A-Z]/u.test(Component2)
    ) {
      return true;
    }
    return false;
  }
  function useRender(Component2, props, ref, { latestValues }, isStatic, forwardMotionProps = false, isSVG) {
    const useVisualProps = isSVG ?? isSVGComponent(Component2) ? useSVGProps : useHTMLProps;
    const visualProps = useVisualProps(props, latestValues, isStatic, Component2);
    const filteredProps = filterProps(props, typeof Component2 === "string", forwardMotionProps);
    const elementProps = Component2 !== React__default.Fragment ? { ...filteredProps, ...visualProps, ref } : {};
    const { children } = props;
    const renderedChildren = React__default.useMemo(() => isMotionValue(children) ? children.get() : children, [children]);
    return React__default.createElement(Component2, {
      ...elementProps,
      children: renderedChildren
    });
  }
  function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, createRenderState }, props, context, presenceContext) {
    const state = {
      latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps2),
      renderState: createRenderState()
    };
    return state;
  }
  function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
    const values = {};
    const motionValues = scrapeMotionValues(props, {});
    for (const key in motionValues) {
      values[key] = resolveMotionValue(motionValues[key]);
    }
    let { initial, animate } = props;
    const isControllingVariants$1 = isControllingVariants(props);
    const isVariantNode$1 = isVariantNode(props);
    if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
      if (initial === void 0)
        initial = context.initial;
      if (animate === void 0)
        animate = context.animate;
    }
    let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
    isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
    const variantToSet = isInitialAnimationBlocked ? animate : initial;
    if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
      const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
      for (let i = 0; i < list.length; i++) {
        const resolved = resolveVariantFromProps(props, list[i]);
        if (resolved) {
          const { transitionEnd, transition, ...target } = resolved;
          for (const key in target) {
            let valueTarget = target[key];
            if (Array.isArray(valueTarget)) {
              const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
              valueTarget = valueTarget[index];
            }
            if (valueTarget !== null) {
              values[key] = valueTarget;
            }
          }
          for (const key in transitionEnd) {
            values[key] = transitionEnd[key];
          }
        }
      }
    }
    return values;
  }
  const makeUseVisualState = (config) => (props, isStatic) => {
    const context = React__default.useContext(MotionContext);
    const presenceContext = React__default.useContext(PresenceContext);
    const make = () => makeState(config, props, context, presenceContext);
    return isStatic ? make() : useConstant(make);
  };
  const useHTMLVisualState = makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
    createRenderState: createHtmlRenderState
  });
  const useSVGVisualState = makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createSvgRenderState
  });
  const motionComponentSymbol = Symbol.for("motionComponentSymbol");
  function useMotionRef(visualState, visualElement, externalRef) {
    const externalRefContainer = React__default.useRef(externalRef);
    React__default.useInsertionEffect(() => {
      externalRefContainer.current = externalRef;
    });
    const refCleanup = React__default.useRef(null);
    return React__default.useCallback((instance) => {
      if (instance) {
        visualState.onMount?.(instance);
      }
      if (visualElement) {
        instance ? visualElement.mount(instance) : visualElement.unmount();
      }
      const ref = externalRefContainer.current;
      if (typeof ref === "function") {
        if (instance) {
          const cleanup = ref(instance);
          if (typeof cleanup === "function") {
            refCleanup.current = cleanup;
          }
        } else if (refCleanup.current) {
          refCleanup.current();
          refCleanup.current = null;
        } else {
          ref(instance);
        }
      } else if (ref) {
        ref.current = instance;
      }
    }, [visualElement]);
  }
  const SwitchLayoutGroupContext = React__default.createContext({});
  function isRefObject(ref) {
    return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
  }
  function useVisualElement(Component2, visualState, props, createVisualElement, ProjectionNodeConstructor, isSVG) {
    const { visualElement: parent } = React__default.useContext(MotionContext);
    const lazyContext = React__default.useContext(LazyContext);
    const presenceContext = React__default.useContext(PresenceContext);
    const motionConfig = React__default.useContext(MotionConfigContext);
    const reducedMotionConfig = motionConfig.reducedMotion;
    const skipAnimations = motionConfig.skipAnimations;
    const visualElementRef = React__default.useRef(null);
    const hasMountedOnce = React__default.useRef(false);
    createVisualElement = createVisualElement || lazyContext.renderer;
    if (!visualElementRef.current && createVisualElement) {
      visualElementRef.current = createVisualElement(Component2, {
        visualState,
        parent,
        props,
        presenceContext,
        blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
        reducedMotionConfig,
        skipAnimations,
        isSVG
      });
      if (hasMountedOnce.current && visualElementRef.current) {
        visualElementRef.current.manuallyAnimateOnMount = true;
      }
    }
    const visualElement = visualElementRef.current;
    const initialLayoutGroupConfig = React__default.useContext(SwitchLayoutGroupContext);
    if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) {
      createProjectionNode(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
    }
    const isMounted = React__default.useRef(false);
    React__default.useInsertionEffect(() => {
      if (visualElement && isMounted.current) {
        visualElement.update(props, presenceContext);
      }
    });
    const optimisedAppearId = props[optimizedAppearDataAttribute];
    const wantsHandoff = React__default.useRef(Boolean(optimisedAppearId) && !window.MotionHandoffIsComplete?.(optimisedAppearId) && window.MotionHasOptimisedAnimation?.(optimisedAppearId));
    useIsomorphicLayoutEffect(() => {
      hasMountedOnce.current = true;
      if (!visualElement)
        return;
      isMounted.current = true;
      window.MotionIsMounted = true;
      visualElement.updateFeatures();
      visualElement.scheduleRenderMicrotask();
      if (wantsHandoff.current && visualElement.animationState) {
        visualElement.animationState.animateChanges();
      }
    });
    React__default.useEffect(() => {
      if (!visualElement)
        return;
      if (!wantsHandoff.current && visualElement.animationState) {
        visualElement.animationState.animateChanges();
      }
      if (wantsHandoff.current) {
        queueMicrotask(() => {
          window.MotionHandoffMarkAsComplete?.(optimisedAppearId);
        });
        wantsHandoff.current = false;
      }
      visualElement.enteringChildren = void 0;
    });
    return visualElement;
  }
  function createProjectionNode(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
    const { layoutId, layout: layout2, drag: drag2, dragConstraints, layoutScroll, layoutRoot, layoutCrossfade } = props;
    visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(visualElement.parent));
    visualElement.projection.setOptions({
      layoutId,
      layout: layout2,
      alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
      visualElement,
animationType: typeof layout2 === "string" ? layout2 : "both",
      initialPromotionConfig,
      crossfade: layoutCrossfade,
      layoutScroll,
      layoutRoot
    });
  }
  function getClosestProjectingNode(visualElement) {
    if (!visualElement)
      return void 0;
    return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
  }
  function createMotionComponent(Component2, { forwardMotionProps = false, type } = {}, preloadedFeatures, createVisualElement) {
    preloadedFeatures && loadFeatures(preloadedFeatures);
    const isSVG = type ? type === "svg" : isSVGComponent(Component2);
    const useVisualState = isSVG ? useSVGVisualState : useHTMLVisualState;
    function MotionDOMComponent(props, externalRef) {
      let MeasureLayout2;
      const configAndProps = {
        ...React__default.useContext(MotionConfigContext),
        ...props,
        layoutId: useLayoutId(props)
      };
      const { isStatic } = configAndProps;
      const context = useCreateMotionContext(props);
      const visualState = useVisualState(props, isStatic);
      if (!isStatic && isBrowser$1) {
        useStrictMode();
        const layoutProjection = getProjectionFunctionality(configAndProps);
        MeasureLayout2 = layoutProjection.MeasureLayout;
        context.visualElement = useVisualElement(Component2, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode, isSVG);
      }
      return jsxRuntimeExports.jsxs(MotionContext.Provider, { value: context, children: [MeasureLayout2 && context.visualElement ? jsxRuntimeExports.jsx(MeasureLayout2, { visualElement: context.visualElement, ...configAndProps }) : null, useRender(Component2, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, forwardMotionProps, isSVG)] });
    }
    MotionDOMComponent.displayName = `motion.${typeof Component2 === "string" ? Component2 : `create(${Component2.displayName ?? Component2.name ?? ""})`}`;
    const ForwardRefMotionComponent = React__default.forwardRef(MotionDOMComponent);
    ForwardRefMotionComponent[motionComponentSymbol] = Component2;
    return ForwardRefMotionComponent;
  }
  function useLayoutId({ layoutId }) {
    const layoutGroupId = React__default.useContext(LayoutGroupContext).id;
    return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
  }
  function useStrictMode(configAndProps, preloadedFeatures) {
    React__default.useContext(LazyContext).strict;
  }
  function getProjectionFunctionality(props) {
    const featureDefinitions2 = getInitializedFeatureDefinitions();
    const { drag: drag2, layout: layout2 } = featureDefinitions2;
    if (!drag2 && !layout2)
      return {};
    const combined = { ...drag2, ...layout2 };
    return {
      MeasureLayout: drag2?.isEnabled(props) || layout2?.isEnabled(props) ? combined.MeasureLayout : void 0,
      ProjectionNode: combined.ProjectionNode
    };
  }
  function createMotionProxy(preloadedFeatures, createVisualElement) {
    if (typeof Proxy === "undefined") {
      return createMotionComponent;
    }
    const componentCache = new Map();
    const factory = (Component2, options) => {
      return createMotionComponent(Component2, options, preloadedFeatures, createVisualElement);
    };
    const deprecatedFactoryFunction = (Component2, options) => {
      return factory(Component2, options);
    };
    return new Proxy(deprecatedFactoryFunction, {
get: (_target, key) => {
        if (key === "create")
          return factory;
        if (!componentCache.has(key)) {
          componentCache.set(key, createMotionComponent(key, void 0, preloadedFeatures, createVisualElement));
        }
        return componentCache.get(key);
      }
    });
  }
  const createDomVisualElement = (Component2, options) => {
    const isSVG = options.isSVG ?? isSVGComponent(Component2);
    return isSVG ? new SVGVisualElement(options) : new HTMLVisualElement(options, {
      allowProjection: Component2 !== React__default.Fragment
    });
  };
  class AnimationFeature extends Feature {
constructor(node) {
      super(node);
      node.animationState || (node.animationState = createAnimationState(node));
    }
    updateAnimationControlsSubscription() {
      const { animate } = this.node.getProps();
      if (isAnimationControls(animate)) {
        this.unmountControls = animate.subscribe(this.node);
      }
    }
mount() {
      this.updateAnimationControlsSubscription();
    }
    update() {
      const { animate } = this.node.getProps();
      const { animate: prevAnimate } = this.node.prevProps || {};
      if (animate !== prevAnimate) {
        this.updateAnimationControlsSubscription();
      }
    }
    unmount() {
      this.node.animationState.reset();
      this.unmountControls?.();
    }
  }
  let id = 0;
  class ExitAnimationFeature extends Feature {
    constructor() {
      super(...arguments);
      this.id = id++;
    }
    update() {
      if (!this.node.presenceContext)
        return;
      const { isPresent, onExitComplete } = this.node.presenceContext;
      const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
      if (!this.node.animationState || isPresent === prevIsPresent) {
        return;
      }
      const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
      if (onExitComplete && !isPresent) {
        exitAnimation.then(() => {
          onExitComplete(this.id);
        });
      }
    }
    mount() {
      const { register, onExitComplete } = this.node.presenceContext || {};
      if (onExitComplete) {
        onExitComplete(this.id);
      }
      if (register) {
        this.unmount = register(this.id);
      }
    }
    unmount() {
    }
  }
  const animations = {
    animation: {
      Feature: AnimationFeature
    },
    exit: {
      Feature: ExitAnimationFeature
    }
  };
  function extractEventInfo(event) {
    return {
      point: {
        x: event.pageX,
        y: event.pageY
      }
    };
  }
  const addPointerInfo = (handler) => {
    return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
  };
  function addPointerEvent(target, eventName, handler, options) {
    return addDomEvent(target, eventName, addPointerInfo(handler), options);
  }
  const getContextWindow = ({ current }) => {
    return current ? current.ownerDocument.defaultView : null;
  };
  const distance = (a, b) => Math.abs(a - b);
  function distance2D(a, b) {
    const xDelta = distance(a.x, b.x);
    const yDelta = distance(a.y, b.y);
    return Math.sqrt(xDelta ** 2 + yDelta ** 2);
  }
  const overflowStyles = new Set(["auto", "scroll"]);
  class PanSession {
    constructor(event, handlers, { transformPagePoint, contextWindow = window, dragSnapToOrigin = false, distanceThreshold = 3, element } = {}) {
      this.startEvent = null;
      this.lastMoveEvent = null;
      this.lastMoveEventInfo = null;
      this.handlers = {};
      this.contextWindow = window;
      this.scrollPositions = new Map();
      this.removeScrollListeners = null;
      this.onElementScroll = (event2) => {
        this.handleScroll(event2.target);
      };
      this.onWindowScroll = () => {
        this.handleScroll(window);
      };
      this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo))
          return;
        const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
        const isPanStarted = this.startEvent !== null;
        const isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
        if (!isPanStarted && !isDistancePastThreshold)
          return;
        const { point: point2 } = info2;
        const { timestamp: timestamp2 } = frameData;
        this.history.push({ ...point2, timestamp: timestamp2 });
        const { onStart, onMove } = this.handlers;
        if (!isPanStarted) {
          onStart && onStart(this.lastMoveEvent, info2);
          this.startEvent = this.lastMoveEvent;
        }
        onMove && onMove(this.lastMoveEvent, info2);
      };
      this.handlePointerMove = (event2, info2) => {
        this.lastMoveEvent = event2;
        this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
        frame.update(this.updatePoint, true);
      };
      this.handlePointerUp = (event2, info2) => {
        this.end();
        const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
        if (this.dragSnapToOrigin || !this.startEvent) {
          resumeAnimation && resumeAnimation();
        }
        if (!(this.lastMoveEvent && this.lastMoveEventInfo))
          return;
        const panInfo = getPanInfo(event2.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info2, this.transformPagePoint), this.history);
        if (this.startEvent && onEnd) {
          onEnd(event2, panInfo);
        }
        onSessionEnd && onSessionEnd(event2, panInfo);
      };
      if (!isPrimaryPointer(event))
        return;
      this.dragSnapToOrigin = dragSnapToOrigin;
      this.handlers = handlers;
      this.transformPagePoint = transformPagePoint;
      this.distanceThreshold = distanceThreshold;
      this.contextWindow = contextWindow || window;
      const info = extractEventInfo(event);
      const initialInfo = transformPoint(info, this.transformPagePoint);
      const { point } = initialInfo;
      const { timestamp } = frameData;
      this.history = [{ ...point, timestamp }];
      const { onSessionStart } = handlers;
      onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
      this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
      if (element) {
        this.startScrollTracking(element);
      }
    }
startScrollTracking(element) {
      let current = element.parentElement;
      while (current) {
        const style2 = getComputedStyle(current);
        if (overflowStyles.has(style2.overflowX) || overflowStyles.has(style2.overflowY)) {
          this.scrollPositions.set(current, {
            x: current.scrollLeft,
            y: current.scrollTop
          });
        }
        current = current.parentElement;
      }
      this.scrollPositions.set(window, {
        x: window.scrollX,
        y: window.scrollY
      });
      window.addEventListener("scroll", this.onElementScroll, {
        capture: true,
        passive: true
      });
      window.addEventListener("scroll", this.onWindowScroll, {
        passive: true
      });
      this.removeScrollListeners = () => {
        window.removeEventListener("scroll", this.onElementScroll, {
          capture: true
        });
        window.removeEventListener("scroll", this.onWindowScroll);
      };
    }
handleScroll(target) {
      const initial = this.scrollPositions.get(target);
      if (!initial)
        return;
      const isWindow = target === window;
      const current = isWindow ? { x: window.scrollX, y: window.scrollY } : {
        x: target.scrollLeft,
        y: target.scrollTop
      };
      const delta = { x: current.x - initial.x, y: current.y - initial.y };
      if (delta.x === 0 && delta.y === 0)
        return;
      if (isWindow) {
        if (this.lastMoveEventInfo) {
          this.lastMoveEventInfo.point.x += delta.x;
          this.lastMoveEventInfo.point.y += delta.y;
        }
      } else {
        if (this.history.length > 0) {
          this.history[0].x -= delta.x;
          this.history[0].y -= delta.y;
        }
      }
      this.scrollPositions.set(target, current);
      frame.update(this.updatePoint, true);
    }
    updateHandlers(handlers) {
      this.handlers = handlers;
    }
    end() {
      this.removeListeners && this.removeListeners();
      this.removeScrollListeners && this.removeScrollListeners();
      this.scrollPositions.clear();
      cancelFrame(this.updatePoint);
    }
  }
  function transformPoint(info, transformPagePoint) {
    return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
  }
  function subtractPoint(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
  }
  function getPanInfo({ point }, history) {
    return {
      point,
      delta: subtractPoint(point, lastDevicePoint(history)),
      offset: subtractPoint(point, startDevicePoint(history)),
      velocity: getVelocity(history, 0.1)
    };
  }
  function startDevicePoint(history) {
    return history[0];
  }
  function lastDevicePoint(history) {
    return history[history.length - 1];
  }
  function getVelocity(history, timeDelta) {
    if (history.length < 2) {
      return { x: 0, y: 0 };
    }
    let i = history.length - 1;
    let timestampedPoint = null;
    const lastPoint = lastDevicePoint(history);
    while (i >= 0) {
      timestampedPoint = history[i];
      if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
        break;
      }
      i--;
    }
    if (!timestampedPoint) {
      return { x: 0, y: 0 };
    }
    if (timestampedPoint === history[0] && history.length > 2 && lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta) * 2) {
      timestampedPoint = history[1];
    }
    const time2 = millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
    if (time2 === 0) {
      return { x: 0, y: 0 };
    }
    const currentVelocity = {
      x: (lastPoint.x - timestampedPoint.x) / time2,
      y: (lastPoint.y - timestampedPoint.y) / time2
    };
    if (currentVelocity.x === Infinity) {
      currentVelocity.x = 0;
    }
    if (currentVelocity.y === Infinity) {
      currentVelocity.y = 0;
    }
    return currentVelocity;
  }
  function applyConstraints(point, { min, max }, elastic) {
    if (min !== void 0 && point < min) {
      point = elastic ? mixNumber$1(min, point, elastic.min) : Math.max(point, min);
    } else if (max !== void 0 && point > max) {
      point = elastic ? mixNumber$1(max, point, elastic.max) : Math.min(point, max);
    }
    return point;
  }
  function calcRelativeAxisConstraints(axis, min, max) {
    return {
      min: min !== void 0 ? axis.min + min : void 0,
      max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
    };
  }
  function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
    return {
      x: calcRelativeAxisConstraints(layoutBox.x, left, right),
      y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
    };
  }
  function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
    let min = constraintsAxis.min - layoutAxis.min;
    let max = constraintsAxis.max - layoutAxis.max;
    if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
      [min, max] = [max, min];
    }
    return { min, max };
  }
  function calcViewportConstraints(layoutBox, constraintsBox) {
    return {
      x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
      y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
    };
  }
  function calcOrigin(source, target) {
    let origin = 0.5;
    const sourceLength = calcLength(source);
    const targetLength = calcLength(target);
    if (targetLength > sourceLength) {
      origin = progress(target.min, target.max - sourceLength, source.min);
    } else if (sourceLength > targetLength) {
      origin = progress(source.min, source.max - targetLength, target.min);
    }
    return clamp(0, 1, origin);
  }
  function rebaseAxisConstraints(layout2, constraints) {
    const relativeConstraints = {};
    if (constraints.min !== void 0) {
      relativeConstraints.min = constraints.min - layout2.min;
    }
    if (constraints.max !== void 0) {
      relativeConstraints.max = constraints.max - layout2.min;
    }
    return relativeConstraints;
  }
  const defaultElastic = 0.35;
  function resolveDragElastic(dragElastic = defaultElastic) {
    if (dragElastic === false) {
      dragElastic = 0;
    } else if (dragElastic === true) {
      dragElastic = defaultElastic;
    }
    return {
      x: resolveAxisElastic(dragElastic, "left", "right"),
      y: resolveAxisElastic(dragElastic, "top", "bottom")
    };
  }
  function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
    return {
      min: resolvePointElastic(dragElastic, minLabel),
      max: resolvePointElastic(dragElastic, maxLabel)
    };
  }
  function resolvePointElastic(dragElastic, label) {
    return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
  }
  const elementDragControls = new WeakMap();
  class VisualElementDragControls {
    constructor(visualElement) {
      this.openDragLock = null;
      this.isDragging = false;
      this.currentDirection = null;
      this.originPoint = { x: 0, y: 0 };
      this.constraints = false;
      this.hasMutatedConstraints = false;
      this.elastic = createBox();
      this.latestPointerEvent = null;
      this.latestPanInfo = null;
      this.visualElement = visualElement;
    }
    start(originEvent, { snapToCursor = false, distanceThreshold } = {}) {
      const { presenceContext } = this.visualElement;
      if (presenceContext && presenceContext.isPresent === false)
        return;
      const onSessionStart = (event) => {
        if (snapToCursor) {
          this.snapToCursor(extractEventInfo(event).point);
        }
        this.stopAnimation();
      };
      const onStart = (event, info) => {
        const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
        if (drag2 && !dragPropagation) {
          if (this.openDragLock)
            this.openDragLock();
          this.openDragLock = setDragLock(drag2);
          if (!this.openDragLock)
            return;
        }
        this.latestPointerEvent = event;
        this.latestPanInfo = info;
        this.isDragging = true;
        this.currentDirection = null;
        this.resolveConstraints();
        if (this.visualElement.projection) {
          this.visualElement.projection.isAnimationBlocked = true;
          this.visualElement.projection.target = void 0;
        }
        eachAxis((axis) => {
          let current = this.getAxisMotionValue(axis).get() || 0;
          if (percent.test(current)) {
            const { projection } = this.visualElement;
            if (projection && projection.layout) {
              const measuredAxis = projection.layout.layoutBox[axis];
              if (measuredAxis) {
                const length = calcLength(measuredAxis);
                current = length * (parseFloat(current) / 100);
              }
            }
          }
          this.originPoint[axis] = current;
        });
        if (onDragStart) {
          frame.update(() => onDragStart(event, info), false, true);
        }
        addValueToWillChange(this.visualElement, "transform");
        const { animationState } = this.visualElement;
        animationState && animationState.setActive("whileDrag", true);
      };
      const onMove = (event, info) => {
        this.latestPointerEvent = event;
        this.latestPanInfo = info;
        const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
        if (!dragPropagation && !this.openDragLock)
          return;
        const { offset } = info;
        if (dragDirectionLock && this.currentDirection === null) {
          this.currentDirection = getCurrentDirection(offset);
          if (this.currentDirection !== null) {
            onDirectionLock && onDirectionLock(this.currentDirection);
          }
          return;
        }
        this.updateAxis("x", info.point, offset);
        this.updateAxis("y", info.point, offset);
        this.visualElement.render();
        if (onDrag) {
          frame.update(() => onDrag(event, info), false, true);
        }
      };
      const onSessionEnd = (event, info) => {
        this.latestPointerEvent = event;
        this.latestPanInfo = info;
        this.stop(event, info);
        this.latestPointerEvent = null;
        this.latestPanInfo = null;
      };
      const resumeAnimation = () => {
        const { dragSnapToOrigin: snap } = this.getProps();
        if (snap || this.constraints) {
          this.startAnimation({ x: 0, y: 0 });
        }
      };
      const { dragSnapToOrigin } = this.getProps();
      this.panSession = new PanSession(originEvent, {
        onSessionStart,
        onStart,
        onMove,
        onSessionEnd,
        resumeAnimation
      }, {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin,
        distanceThreshold,
        contextWindow: getContextWindow(this.visualElement),
        element: this.visualElement.current
      });
    }
stop(event, panInfo) {
      const finalEvent = event || this.latestPointerEvent;
      const finalPanInfo = panInfo || this.latestPanInfo;
      const isDragging2 = this.isDragging;
      this.cancel();
      if (!isDragging2 || !finalPanInfo || !finalEvent)
        return;
      const { velocity } = finalPanInfo;
      this.startAnimation(velocity);
      const { onDragEnd } = this.getProps();
      if (onDragEnd) {
        frame.postRender(() => onDragEnd(finalEvent, finalPanInfo));
      }
    }
cancel() {
      this.isDragging = false;
      const { projection, animationState } = this.visualElement;
      if (projection) {
        projection.isAnimationBlocked = false;
      }
      this.endPanSession();
      const { dragPropagation } = this.getProps();
      if (!dragPropagation && this.openDragLock) {
        this.openDragLock();
        this.openDragLock = null;
      }
      animationState && animationState.setActive("whileDrag", false);
    }
endPanSession() {
      this.panSession && this.panSession.end();
      this.panSession = void 0;
    }
    updateAxis(axis, _point, offset) {
      const { drag: drag2 } = this.getProps();
      if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      let next = this.originPoint[axis] + offset[axis];
      if (this.constraints && this.constraints[axis]) {
        next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
      }
      axisValue.set(next);
    }
    resolveConstraints() {
      const { dragConstraints, dragElastic } = this.getProps();
      const layout2 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout;
      const prevConstraints = this.constraints;
      if (dragConstraints && isRefObject(dragConstraints)) {
        if (!this.constraints) {
          this.constraints = this.resolveRefConstraints();
        }
      } else {
        if (dragConstraints && layout2) {
          this.constraints = calcRelativeConstraints(layout2.layoutBox, dragConstraints);
        } else {
          this.constraints = false;
        }
      }
      this.elastic = resolveDragElastic(dragElastic);
      if (prevConstraints !== this.constraints && !isRefObject(dragConstraints) && layout2 && this.constraints && !this.hasMutatedConstraints) {
        eachAxis((axis) => {
          if (this.constraints !== false && this.getAxisMotionValue(axis)) {
            this.constraints[axis] = rebaseAxisConstraints(layout2.layoutBox[axis], this.constraints[axis]);
          }
        });
      }
    }
    resolveRefConstraints() {
      const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
      if (!constraints || !isRefObject(constraints))
        return false;
      const constraintsElement = constraints.current;
      const { projection } = this.visualElement;
      if (!projection || !projection.layout)
        return false;
      const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
      let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
      if (onMeasureDragConstraints) {
        const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
        this.hasMutatedConstraints = !!userConstraints;
        if (userConstraints) {
          measuredConstraints = convertBoundingBoxToBox(userConstraints);
        }
      }
      return measuredConstraints;
    }
    startAnimation(velocity) {
      const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
      const constraints = this.constraints || {};
      const momentumAnimations = eachAxis((axis) => {
        if (!shouldDrag(axis, drag2, this.currentDirection)) {
          return;
        }
        let transition = constraints && constraints[axis] || {};
        if (dragSnapToOrigin)
          transition = { min: 0, max: 0 };
        const bounceStiffness = dragElastic ? 200 : 1e6;
        const bounceDamping = dragElastic ? 40 : 1e7;
        const inertia2 = {
          type: "inertia",
          velocity: dragMomentum ? velocity[axis] : 0,
          bounceStiffness,
          bounceDamping,
          timeConstant: 750,
          restDelta: 1,
          restSpeed: 10,
          ...dragTransition,
          ...transition
        };
        return this.startAxisValueAnimation(axis, inertia2);
      });
      return Promise.all(momentumAnimations).then(onDragTransitionEnd);
    }
    startAxisValueAnimation(axis, transition) {
      const axisValue = this.getAxisMotionValue(axis);
      addValueToWillChange(this.visualElement, axis);
      return axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement, false));
    }
    stopAnimation() {
      eachAxis((axis) => this.getAxisMotionValue(axis).stop());
    }
getAxisMotionValue(axis) {
      const dragKey = `_drag${axis.toUpperCase()}`;
      const props = this.visualElement.getProps();
      const externalMotionValue = props[dragKey];
      return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
    }
    snapToCursor(point) {
      eachAxis((axis) => {
        const { drag: drag2 } = this.getProps();
        if (!shouldDrag(axis, drag2, this.currentDirection))
          return;
        const { projection } = this.visualElement;
        const axisValue = this.getAxisMotionValue(axis);
        if (projection && projection.layout) {
          const { min, max } = projection.layout.layoutBox[axis];
          const current = axisValue.get() || 0;
          axisValue.set(point[axis] - mixNumber$1(min, max, 0.5) + current);
        }
      });
    }
scalePositionWithinConstraints() {
      if (!this.visualElement.current)
        return;
      const { drag: drag2, dragConstraints } = this.getProps();
      const { projection } = this.visualElement;
      if (!isRefObject(dragConstraints) || !projection || !this.constraints)
        return;
      this.stopAnimation();
      const boxProgress = { x: 0, y: 0 };
      eachAxis((axis) => {
        const axisValue = this.getAxisMotionValue(axis);
        if (axisValue && this.constraints !== false) {
          const latest = axisValue.get();
          boxProgress[axis] = calcOrigin({ min: latest, max: latest }, this.constraints[axis]);
        }
      });
      const { transformTemplate } = this.visualElement.getProps();
      this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
      this.constraints = false;
      this.resolveConstraints();
      eachAxis((axis) => {
        if (!shouldDrag(axis, drag2, null))
          return;
        const axisValue = this.getAxisMotionValue(axis);
        const { min, max } = this.constraints[axis];
        axisValue.set(mixNumber$1(min, max, boxProgress[axis]));
      });
      this.visualElement.render();
    }
    addListeners() {
      if (!this.visualElement.current)
        return;
      elementDragControls.set(this.visualElement, this);
      const element = this.visualElement.current;
      const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
        const { drag: drag2, dragListener = true } = this.getProps();
        const target = event.target;
        const isClickingTextInputChild = target !== element && isElementTextInput(target);
        if (drag2 && dragListener && !isClickingTextInputChild) {
          this.start(event);
        }
      });
      let stopResizeObservers;
      const measureDragConstraints = () => {
        const { dragConstraints } = this.getProps();
        if (isRefObject(dragConstraints) && dragConstraints.current) {
          this.constraints = this.resolveRefConstraints();
          if (!stopResizeObservers) {
            stopResizeObservers = startResizeObservers(element, dragConstraints.current, () => this.scalePositionWithinConstraints());
          }
        }
      };
      const { projection } = this.visualElement;
      const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
      if (projection && !projection.layout) {
        projection.root && projection.root.updateScroll();
        projection.updateLayout();
      }
      frame.read(measureDragConstraints);
      const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
      const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
        if (this.isDragging && hasLayoutChanged) {
          eachAxis((axis) => {
            const motionValue2 = this.getAxisMotionValue(axis);
            if (!motionValue2)
              return;
            this.originPoint[axis] += delta[axis].translate;
            motionValue2.set(motionValue2.get() + delta[axis].translate);
          });
          this.visualElement.render();
        }
      }));
      return () => {
        stopResizeListener();
        stopPointerListener();
        stopMeasureLayoutListener();
        stopLayoutUpdateListener && stopLayoutUpdateListener();
        stopResizeObservers && stopResizeObservers();
      };
    }
    getProps() {
      const props = this.visualElement.getProps();
      const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
      return {
        ...props,
        drag: drag2,
        dragDirectionLock,
        dragPropagation,
        dragConstraints,
        dragElastic,
        dragMomentum
      };
    }
  }
  function skipFirstCall(callback) {
    let isFirst = true;
    return () => {
      if (isFirst) {
        isFirst = false;
        return;
      }
      callback();
    };
  }
  function startResizeObservers(element, constraintsElement, onResize) {
    const stopElement = resize(element, skipFirstCall(onResize));
    const stopContainer = resize(constraintsElement, skipFirstCall(onResize));
    return () => {
      stopElement();
      stopContainer();
    };
  }
  function shouldDrag(direction, drag2, currentDirection) {
    return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
  }
  function getCurrentDirection(offset, lockThreshold = 10) {
    let direction = null;
    if (Math.abs(offset.y) > lockThreshold) {
      direction = "y";
    } else if (Math.abs(offset.x) > lockThreshold) {
      direction = "x";
    }
    return direction;
  }
  class DragGesture extends Feature {
    constructor(node) {
      super(node);
      this.removeGroupControls = noop;
      this.removeListeners = noop;
      this.controls = new VisualElementDragControls(node);
    }
    mount() {
      const { dragControls } = this.node.getProps();
      if (dragControls) {
        this.removeGroupControls = dragControls.subscribe(this.controls);
      }
      this.removeListeners = this.controls.addListeners() || noop;
    }
    update() {
      const { dragControls } = this.node.getProps();
      const { dragControls: prevDragControls } = this.node.prevProps || {};
      if (dragControls !== prevDragControls) {
        this.removeGroupControls();
        if (dragControls) {
          this.removeGroupControls = dragControls.subscribe(this.controls);
        }
      }
    }
    unmount() {
      this.removeGroupControls();
      this.removeListeners();
      if (!this.controls.isDragging) {
        this.controls.endPanSession();
      }
    }
  }
  const asyncHandler = (handler) => (event, info) => {
    if (handler) {
      frame.update(() => handler(event, info), false, true);
    }
  };
  class PanGesture extends Feature {
    constructor() {
      super(...arguments);
      this.removePointerDownListener = noop;
    }
    onPointerDown(pointerDownEvent) {
      this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
        transformPagePoint: this.node.getTransformPagePoint(),
        contextWindow: getContextWindow(this.node)
      });
    }
    createPanHandlers() {
      const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
      return {
        onSessionStart: asyncHandler(onPanSessionStart),
        onStart: asyncHandler(onPanStart),
        onMove: asyncHandler(onPan),
        onEnd: (event, info) => {
          delete this.session;
          if (onPanEnd) {
            frame.postRender(() => onPanEnd(event, info));
          }
        }
      };
    }
    mount() {
      this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
    }
    update() {
      this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
      this.removePointerDownListener();
      this.session && this.session.end();
    }
  }
  let hasTakenAnySnapshot = false;
  class MeasureLayoutWithContext extends React__default.Component {
componentDidMount() {
      const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
      const { projection } = visualElement;
      if (projection) {
        if (layoutGroup.group)
          layoutGroup.group.add(projection);
        if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
          switchLayoutGroup.register(projection);
        }
        if (hasTakenAnySnapshot) {
          projection.root.didUpdate();
        }
        projection.addEventListener("animationComplete", () => {
          this.safeToRemove();
        });
        projection.setOptions({
          ...projection.options,
          layoutDependency: this.props.layoutDependency,
          onExitComplete: () => this.safeToRemove()
        });
      }
      globalProjectionState.hasEverUpdated = true;
    }
    getSnapshotBeforeUpdate(prevProps) {
      const { layoutDependency, visualElement, drag: drag2, isPresent } = this.props;
      const { projection } = visualElement;
      if (!projection)
        return null;
      projection.isPresent = isPresent;
      if (prevProps.layoutDependency !== layoutDependency) {
        projection.setOptions({
          ...projection.options,
          layoutDependency
        });
      }
      hasTakenAnySnapshot = true;
      if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0 || prevProps.isPresent !== isPresent) {
        projection.willUpdate();
      } else {
        this.safeToRemove();
      }
      if (prevProps.isPresent !== isPresent) {
        if (isPresent) {
          projection.promote();
        } else if (!projection.relegate()) {
          frame.postRender(() => {
            const stack = projection.getStack();
            if (!stack || !stack.members.length) {
              this.safeToRemove();
            }
          });
        }
      }
      return null;
    }
    componentDidUpdate() {
      const { projection } = this.props.visualElement;
      if (projection) {
        projection.root.didUpdate();
        microtask.postRender(() => {
          if (!projection.currentAnimation && projection.isLead()) {
            this.safeToRemove();
          }
        });
      }
    }
    componentWillUnmount() {
      const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
      const { projection } = visualElement;
      hasTakenAnySnapshot = true;
      if (projection) {
        projection.scheduleCheckAfterUnmount();
        if (layoutGroup && layoutGroup.group)
          layoutGroup.group.remove(projection);
        if (promoteContext && promoteContext.deregister)
          promoteContext.deregister(projection);
      }
    }
    safeToRemove() {
      const { safeToRemove } = this.props;
      safeToRemove && safeToRemove();
    }
    render() {
      return null;
    }
  }
  function MeasureLayout(props) {
    const [isPresent, safeToRemove] = usePresence();
    const layoutGroup = React__default.useContext(LayoutGroupContext);
    return jsxRuntimeExports.jsx(MeasureLayoutWithContext, { ...props, layoutGroup, switchLayoutGroup: React__default.useContext(SwitchLayoutGroupContext), isPresent, safeToRemove });
  }
  const drag = {
    pan: {
      Feature: PanGesture
    },
    drag: {
      Feature: DragGesture,
      ProjectionNode: HTMLProjectionNode,
      MeasureLayout
    }
  };
  function handleHoverEvent(node, event, lifecycle) {
    const { props } = node;
    if (node.animationState && props.whileHover) {
      node.animationState.setActive("whileHover", lifecycle === "Start");
    }
    const eventName = "onHover" + lifecycle;
    const callback = props[eventName];
    if (callback) {
      frame.postRender(() => callback(event, extractEventInfo(event)));
    }
  }
  class HoverGesture extends Feature {
    mount() {
      const { current } = this.node;
      if (!current)
        return;
      this.unmount = hover(current, (_element, startEvent) => {
        handleHoverEvent(this.node, startEvent, "Start");
        return (endEvent) => handleHoverEvent(this.node, endEvent, "End");
      });
    }
    unmount() {
    }
  }
  class FocusGesture extends Feature {
    constructor() {
      super(...arguments);
      this.isActive = false;
    }
    onFocus() {
      let isFocusVisible = false;
      try {
        isFocusVisible = this.node.current.matches(":focus-visible");
      } catch (e) {
        isFocusVisible = true;
      }
      if (!isFocusVisible || !this.node.animationState)
        return;
      this.node.animationState.setActive("whileFocus", true);
      this.isActive = true;
    }
    onBlur() {
      if (!this.isActive || !this.node.animationState)
        return;
      this.node.animationState.setActive("whileFocus", false);
      this.isActive = false;
    }
    mount() {
      this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
    }
    unmount() {
    }
  }
  function handlePressEvent(node, event, lifecycle) {
    const { props } = node;
    if (node.current instanceof HTMLButtonElement && node.current.disabled) {
      return;
    }
    if (node.animationState && props.whileTap) {
      node.animationState.setActive("whileTap", lifecycle === "Start");
    }
    const eventName = "onTap" + (lifecycle === "End" ? "" : lifecycle);
    const callback = props[eventName];
    if (callback) {
      frame.postRender(() => callback(event, extractEventInfo(event)));
    }
  }
  class PressGesture extends Feature {
    mount() {
      const { current } = this.node;
      if (!current)
        return;
      const { globalTapTarget, propagate } = this.node.props;
      this.unmount = press(current, (_element, startEvent) => {
        handlePressEvent(this.node, startEvent, "Start");
        return (endEvent, { success }) => handlePressEvent(this.node, endEvent, success ? "End" : "Cancel");
      }, {
        useGlobalTarget: globalTapTarget,
        stopPropagation: propagate?.tap === false
      });
    }
    unmount() {
    }
  }
  const observerCallbacks = new WeakMap();
  const observers = new WeakMap();
  const fireObserverCallback = (entry) => {
    const callback = observerCallbacks.get(entry.target);
    callback && callback(entry);
  };
  const fireAllObserverCallbacks = (entries) => {
    entries.forEach(fireObserverCallback);
  };
  function initIntersectionObserver({ root, ...options }) {
    const lookupRoot = root || document;
    if (!observers.has(lookupRoot)) {
      observers.set(lookupRoot, {});
    }
    const rootObservers = observers.get(lookupRoot);
    const key = JSON.stringify(options);
    if (!rootObservers[key]) {
      rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
    }
    return rootObservers[key];
  }
  function observeIntersection(element, options, callback) {
    const rootInteresectionObserver = initIntersectionObserver(options);
    observerCallbacks.set(element, callback);
    rootInteresectionObserver.observe(element);
    return () => {
      observerCallbacks.delete(element);
      rootInteresectionObserver.unobserve(element);
    };
  }
  const thresholdNames = {
    some: 0,
    all: 1
  };
  class InViewFeature extends Feature {
    constructor() {
      super(...arguments);
      this.hasEnteredView = false;
      this.isInView = false;
    }
    startObserver() {
      this.unmount();
      const { viewport = {} } = this.node.getProps();
      const { root, margin: rootMargin, amount = "some", once } = viewport;
      const options = {
        root: root ? root.current : void 0,
        rootMargin,
        threshold: typeof amount === "number" ? amount : thresholdNames[amount]
      };
      const onIntersectionUpdate = (entry) => {
        const { isIntersecting } = entry;
        if (this.isInView === isIntersecting)
          return;
        this.isInView = isIntersecting;
        if (once && !isIntersecting && this.hasEnteredView) {
          return;
        } else if (isIntersecting) {
          this.hasEnteredView = true;
        }
        if (this.node.animationState) {
          this.node.animationState.setActive("whileInView", isIntersecting);
        }
        const { onViewportEnter, onViewportLeave } = this.node.getProps();
        const callback = isIntersecting ? onViewportEnter : onViewportLeave;
        callback && callback(entry);
      };
      return observeIntersection(this.node.current, options, onIntersectionUpdate);
    }
    mount() {
      this.startObserver();
    }
    update() {
      if (typeof IntersectionObserver === "undefined")
        return;
      const { props, prevProps } = this.node;
      const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props, prevProps));
      if (hasOptionsChanged) {
        this.startObserver();
      }
    }
    unmount() {
    }
  }
  function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
    return (name) => viewport[name] !== prevViewport[name];
  }
  const gestureAnimations = {
    inView: {
      Feature: InViewFeature
    },
    tap: {
      Feature: PressGesture
    },
    focus: {
      Feature: FocusGesture
    },
    hover: {
      Feature: HoverGesture
    }
  };
  const layout = {
    layout: {
      ProjectionNode: HTMLProjectionNode,
      MeasureLayout
    }
  };
  const featureBundle = {
    ...animations,
    ...gestureAnimations,
    ...drag,
    ...layout
  };
  const motion = createMotionProxy(featureBundle, createDomVisualElement);
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };
  const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    width = "600px",
    footer
  }) => {
    React__default.useEffect(() => {
      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };
      if (isOpen) {
        window.addEventListener("keydown", handleEsc);
      }
      return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);
    return React__default.createElement(AnimatePresence, null, isOpen && React__default.createElement("div", { className: "ars-modal-overlay-container" }, React__default.createElement(
      motion.div,
      {
        className: "ars-modal-backdrop",
        variants: backdropVariants,
        initial: "hidden",
        animate: "visible",
        exit: "hidden",
        transition: { duration: 0.2 },
        onClick: onClose
      }
    ), React__default.createElement("div", { className: "ars-modal-wrapper" }, React__default.createElement(
      motion.div,
      {
        className: "ars-modal",
        style: { width, maxWidth: "90vw" },
        variants: modalVariants,
        initial: "hidden",
        animate: "visible",
        exit: "hidden",
        transition: { type: "spring", damping: 25, stiffness: 300 },
        role: "dialog",
        "aria-modal": "true"
      },
React__default.createElement("div", { className: "ars-modal-header" }, title && React__default.createElement("h2", { className: "ars-modal-title" }, title), React__default.createElement(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: onClose,
          className: "ars-modal-close",
          "aria-label": "Close modal"
        },
React__default.createElement(X, { size: 20 })
      )),
React__default.createElement("div", { className: "ars-modal-content" }, children),
      footer && React__default.createElement("div", { className: "ars-modal-footer" }, footer)
    ))));
  };
  const Input = React__default.forwardRef(
    ({ className, label, error, icon, suffix, id: id2, ...props }, ref) => {
      const inputId = id2 || `input-${Math.random().toString(36).substr(2, 9)}`;
      return React__default.createElement("div", { className: cn("ars-input-group", className) }, label && React__default.createElement("label", { htmlFor: inputId, className: "ars-input-label" }, label), React__default.createElement("div", { className: "ars-input-wrapper" }, icon && React__default.createElement("span", { className: "ars-input-icon" }, icon), React__default.createElement(
        "input",
        {
          ref,
          id: inputId,
          className: cn(
            "ars-input",
            icon && "ars-input--has-icon",
            suffix && "ars-input--has-suffix",
            error && "ars-input--error"
          ),
          ...props
        }
      ), suffix && React__default.createElement("div", { className: "ars-input-suffix" }, suffix)), error && React__default.createElement("span", { className: "ars-input-error" }, error));
    }
  );
  Input.displayName = "Input";
  function useContent() {
    const { templates, phrases, isLoaded, setTemplates, setPhrases } = useSettingsContext();
    const addTemplate = React__default.useCallback((template) => {
      const newTemplate = { ...template, id: crypto.randomUUID() };
      setTemplates([...templates, newTemplate]);
    }, [templates, setTemplates]);
    const updateTemplate = React__default.useCallback((id2, updates) => {
      const newTemplates = templates.map((t) => t.id === id2 ? { ...t, ...updates } : t);
      setTemplates(newTemplates);
    }, [templates, setTemplates]);
    const deleteTemplate = React__default.useCallback((id2) => {
      const newTemplates = templates.filter((t) => t.id !== id2);
      setTemplates(newTemplates);
    }, [templates, setTemplates]);
    const reorderTemplates = React__default.useCallback((newOrder) => {
      const templateMap = new Map(templates.map((t) => [t.id, t]));
      const reordered = newOrder.map((id2) => templateMap.get(id2)).filter((t) => t !== void 0);
      setTemplates(reordered);
    }, [templates, setTemplates]);
    const addPhrase = React__default.useCallback((phrase) => {
      const newPhrase = { ...phrase, id: crypto.randomUUID() };
      setPhrases([...phrases, newPhrase]);
    }, [phrases, setPhrases]);
    const deletePhrase = React__default.useCallback((id2) => {
      const newPhrases = phrases.filter((p) => p.id !== id2);
      setPhrases(newPhrases);
    }, [phrases, setPhrases]);
    return {
      templates,
      phrases,
      isLoaded,
      addTemplate,
      updateTemplate,
      deleteTemplate,
      reorderTemplates,
      addPhrase,
      deletePhrase,
      saveLocalTemplates: setTemplates,
      saveLocalPhrases: setPhrases
    };
  }
  const TemplateManager = ({ isOpen, onClose, onInsert }) => {
    const { templates, addTemplate, updateTemplate, deleteTemplate, reorderTemplates } = useContent();
    const [selectedId, setSelectedId] = React__default.useState(null);
    const [editTitle, setEditTitle] = React__default.useState("");
    const [editContent, setEditContent] = React__default.useState("");
    const [isDirty, setIsDirty] = React__default.useState(false);
    const [draggedId, setDraggedId] = React__default.useState(null);
    const [dragOverId, setDragOverId] = React__default.useState(null);
    React__default.useEffect(() => {
      if (isOpen && templates.length > 0 && !selectedId) {
        setSelectedId(templates[0].id);
      }
    }, [isOpen, templates]);
    React__default.useEffect(() => {
      if (selectedId) {
        const template = templates.find((t) => t.id === selectedId);
        if (template) {
          setEditTitle(template.title);
          setEditContent(template.content);
          setIsDirty(false);
        }
      }
    }, [selectedId, templates]);
    const handleSave = () => {
      if (!editTitle.trim()) return;
      if (selectedId) {
        updateTemplate(selectedId, {
          title: editTitle,
          content: editContent
        });
        setIsDirty(false);
      } else {
        const newId = crypto.randomUUID();
        addTemplate({
          title: editTitle,
          content: editContent
        });
        setSelectedId(newId);
      }
    };
    const handleCreateNew = () => {
      setSelectedId(null);
      setEditTitle("New Template");
      setEditContent("");
      setIsDirty(true);
    };
    const handleDelete = (id2) => {
      if (window.confirm("Are you sure you want to delete this template?")) {
        deleteTemplate(id2);
        if (selectedId === id2) {
          setSelectedId(null);
        }
      }
    };
    const handleInsert = () => {
      if (selectedId) {
        onInsert(editContent);
        onClose();
      }
    };
    const handleDragStart = (e, id2) => {
      setDraggedId(id2);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", id2);
    };
    const handleDragOver = (e, id2) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (draggedId && draggedId !== id2) {
        setDragOverId(id2);
      }
    };
    const handleDragLeave = (e) => {
      setDragOverId(null);
    };
    const handleDrop = (e, targetId) => {
      e.preventDefault();
      setDragOverId(null);
      if (!draggedId || draggedId === targetId) {
        setDraggedId(null);
        return;
      }
      const draggedIndex = templates.findIndex((t) => t.id === draggedId);
      const targetIndex = templates.findIndex((t) => t.id === targetId);
      if (draggedIndex === -1 || targetIndex === -1) {
        setDraggedId(null);
        return;
      }
      const newTemplates = [...templates];
      const [removed] = newTemplates.splice(draggedIndex, 1);
      newTemplates.splice(targetIndex, 0, removed);
      reorderTemplates(newTemplates.map((t) => t.id));
      setDraggedId(null);
    };
    const handleDragEnd = () => {
      setDraggedId(null);
      setDragOverId(null);
    };
    const handleClose = () => {
      if (isDirty) {
        if (window.confirm("You have unsaved changes. Do you want to save them before exiting?")) {
          handleSave();
          onClose();
        } else {
          setIsDirty(false);
          if (selectedId) {
            const originalTemplate = templates.find((t) => t.id === selectedId);
            if (originalTemplate) {
              setEditTitle(originalTemplate.title);
              setEditContent(originalTemplate.content);
            }
          }
          onClose();
        }
      } else {
        onClose();
      }
    };
    return React__default.createElement(
      Modal,
      {
        isOpen,
        onClose: handleClose,
        title: "Template Manager",
        width: "850px"
      },
React__default.createElement("div", { className: "ars-template-manager", style: { display: "flex", height: "600px", gap: "1.5rem", padding: "1.5rem" } }, React__default.createElement("div", { className: "ars-tm-sidebar", style: { width: "240px", borderRight: "1px solid var(--ars-color-border)", paddingRight: "1.5rem", display: "flex", flexDirection: "column" } }, React__default.createElement("div", { className: "ars-tm-header", style: { marginBottom: "1rem" } }, React__default.createElement(
        Button,
        {
          variant: "primary",
          size: "sm",
          style: { width: "100%" },
          onClick: handleCreateNew,
          icon: React__default.createElement(Plus, { size: 16 })
        },
        "New Template"
      )), React__default.createElement("div", { className: "ars-tm-list", style: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.5rem" } }, templates.map((t) => React__default.createElement(
        "div",
        {
          key: t.id,
          draggable: true,
          onDragStart: (e) => handleDragStart(e, t.id),
          onDragOver: (e) => handleDragOver(e, t.id),
          onDragLeave: handleDragLeave,
          onDrop: (e) => handleDrop(e, t.id),
          onDragEnd: handleDragEnd,
          className: `ars-tm-item ${selectedId === t.id ? "active" : ""} ${draggedId === t.id ? "dragging" : ""} ${dragOverId === t.id ? "drag-over" : ""}`,
          onClick: () => setSelectedId(t.id),
          style: {
            padding: "0.875rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: dragOverId === t.id ? "var(--ars-color-bg-secondary)" : selectedId === t.id ? "var(--ars-color-bg-secondary)" : "transparent",
            border: dragOverId === t.id ? "2px dashed var(--ars-color-primary)" : selectedId === t.id ? "1px solid var(--ars-color-primary)" : "1px solid transparent",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            opacity: draggedId === t.id ? 0.5 : 1,
            transition: "all 0.15s ease"
          },
          title: "Drag to reorder"
        },
React__default.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              cursor: "grab",
              color: "var(--ars-color-text-secondary)",
              padding: "0.25rem",
              borderRadius: "4px"
            },
            onMouseDown: (e) => e.stopPropagation()
          },
React__default.createElement(GripVertical, { size: 16 })
        ),
React__default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden", flex: 1 } }, React__default.createElement(FileText, { size: 16, color: "var(--ars-color-text-secondary)" }), React__default.createElement("span", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 } }, t.title))
      )), templates.length === 0 && React__default.createElement("div", { style: { padding: "1rem", textAlign: "center", color: "var(--ars-color-text-secondary)", fontSize: "0.875rem" } }, "No templates yet. Create one to get started!"))), React__default.createElement("div", { className: "ars-tm-content", style: { flex: 1, display: "flex", flexDirection: "column", gap: "1rem" } }, selectedId || editTitle ? React__default.createElement(React__default.Fragment, null, React__default.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, React__default.createElement(
        Input,
        {
          value: editTitle,
          onChange: (e) => {
            setEditTitle(e.target.value);
            setIsDirty(true);
          },
          placeholder: "Template Name",
          style: { fontSize: "1.25rem", fontWeight: 600, border: "none", padding: "0.5rem 0", background: "transparent" }
        }
      ), React__default.createElement("div", { style: { display: "flex", gap: "0.5rem" } }, selectedId && React__default.createElement(
        Button,
        {
          variant: "ghost",
          onClick: () => handleDelete(selectedId),
          title: "Delete Template",
          style: { color: "var(--ars-color-error)" }
        },
React__default.createElement(Trash2, { size: 18 })
      ), React__default.createElement(
        Button,
        {
          variant: isDirty ? "primary" : "secondary",
          onClick: handleSave,
          disabled: !isDirty,
          icon: React__default.createElement(Save, { size: 16 })
        },
        "Save"
      ))), React__default.createElement(
        RichEditor,
        {
          value: editContent,
          onChange: (value) => {
            setEditContent(value);
            setIsDirty(true);
          },
          placeholder: "Enter your review template structure here...",
          showUtilities: false,
          className: "ars-tm-editor"
        }
      ), React__default.createElement("div", { style: { borderTop: "1px solid var(--ars-color-border)", paddingTop: "1rem", display: "flex", justifyContent: "flex-end" } }, React__default.createElement(
        Button,
        {
          variant: "primary",
          onClick: handleInsert,
          icon: React__default.createElement(PanelsTopLeft, { size: 16 })
        },
        "Insert Template"
      ))) : React__default.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--ars-color-text-secondary)" } }, React__default.createElement(PanelsTopLeft, { size: 48, style: { marginBottom: "1rem", opacity: 0.5 } }), React__default.createElement("p", null, "Select a template to edit or create a new one."))))
    );
  };
  const PASTEBIN_API_LOGIN_URL = "https://pastebin.com/api/api_login.php";
  const PASTEBIN_API_POST_URL = "https://pastebin.com/api/api_post.php";
  const PASTEBIN_API_RAW_URL = "https://pastebin.com/raw/";
  const PASTEBIN_DAILY_LIMIT = 20;
  const QUOTA_STORAGE_KEY = "amazon_review_studio_sync_quota";
  function getSyncQuota() {
    const today = ( new Date()).toDateString();
    const stored = localStorage.getItem(QUOTA_STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.date !== today) {
          return { date: today, count: 0 };
        }
        return data;
      } catch (e) {
        console.error("Review Studio: Failed to parse sync quota:", e);
      }
    }
    return { date: today, count: 0 };
  }
  function incrementSyncQuota() {
    const quota = getSyncQuota();
    quota.count++;
    localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(quota));
    return quota.count;
  }
  function usePastebin() {
    const { settings, setSetting } = useSettings();
    const [isLoading, setIsLoading] = React__default.useState(false);
    const { templates, phrases, saveLocalTemplates, saveLocalPhrases } = useContent();
    const apiRequest = async (url, method, data) => {
      if (typeof GM_xmlhttpRequest !== "undefined") {
        return new Promise((resolve, reject) => {
          GM_xmlhttpRequest({
            method,
            url,
            data: data ? data.toString() : void 0,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            onload: (response) => {
              if (response.status >= 200 && response.status < 300) resolve(response.responseText);
              else reject(new Error(response.responseText || `HTTP ${response.status}`));
            },
            onerror: (error) => reject(error)
          });
        });
      } else {
        const response = await fetch(url, {
          method,
          body: data,
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        const text = await response.text();
        if (!response.ok) throw new Error(text || `HTTP ${response.status}`);
        return text;
      }
    };
    const generateUserKey = React__default.useCallback(async (username, password, updateRecovery = false) => {
      const user = username || settings.amazon_pastebin_api_user_name;
      const pass = password || settings.amazon_pastebin_api_user_password;
      const devKey = settings.amazon_pastebin_api_dev_key;
      if (!user || !pass || !devKey) throw new Error("Missing credentials");
      setIsLoading(true);
      try {
        const data = new URLSearchParams({ api_dev_key: devKey, api_user_name: user, api_user_password: pass });
        const userKey = await apiRequest(PASTEBIN_API_LOGIN_URL, "POST", data);
        if (userKey.includes("Bad API request")) throw new Error(userKey);
        setSetting("amazon_pastebin_api_user_name", user);
        setSetting("amazon_pastebin_api_user_password", pass);
        setSetting("amazon_pastebin_api_user_key", userKey);
        if (updateRecovery) {
        }
        return userKey;
      } catch (error) {
        throw new Error(error.message || "Failed to generate User Key");
      } finally {
        setIsLoading(false);
      }
    }, [settings, setSetting]);
    const createPaste = React__default.useCallback(async (title, content, format = "json", privacy = "2") => {
      if (!settings.amazon_pastebin_api_dev_key || !settings.amazon_pastebin_api_user_key) throw new Error("Missing Keys");
      const quota = getSyncQuota();
      if (quota.count >= PASTEBIN_DAILY_LIMIT) {
        throw new Error(`Pastebin daily limit reached (${PASTEBIN_DAILY_LIMIT}/20). Try again tomorrow.`);
      }
      const data = new URLSearchParams({
        api_dev_key: settings.amazon_pastebin_api_dev_key,
        api_user_key: settings.amazon_pastebin_api_user_key,
        api_option: "paste",
        api_paste_code: content,
        api_paste_name: title,
        api_paste_format: format,
        api_paste_private: privacy
      });
      const response = await apiRequest(PASTEBIN_API_POST_URL, "POST", data);
      if (response.includes("Bad API request")) throw new Error(response);
      incrementSyncQuota();
      const match = response.match(/pastebin\.com\/(.+)$/);
      return match ? match[1] : response;
    }, [settings]);
    const deletePaste = React__default.useCallback(async (pasteKey) => {
      if (!settings.amazon_pastebin_api_dev_key || !settings.amazon_pastebin_api_user_key) return;
      const data = new URLSearchParams({
        api_dev_key: settings.amazon_pastebin_api_dev_key,
        api_user_key: settings.amazon_pastebin_api_user_key,
        api_option: "delete",
        api_paste_key: pasteKey
      });
      const response = await apiRequest(PASTEBIN_API_POST_URL, "POST", data);
      if (response.includes("Bad API request") && !response.includes("Paste does not exist")) throw new Error(response);
    }, [settings]);
    const getPasteContent = React__default.useCallback(async (pasteKey) => {
      try {
        const response = await fetch(`${PASTEBIN_API_RAW_URL}${pasteKey}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.text();
      } catch {
        return await apiRequest(`${PASTEBIN_API_RAW_URL}${pasteKey}`, "GET");
      }
    }, []);
    const listPastes = React__default.useCallback(async (limit = 100) => {
      if (!settings.amazon_pastebin_api_dev_key || !settings.amazon_pastebin_api_user_key) throw new Error("Not logged in");
      const data = new URLSearchParams({
        api_dev_key: settings.amazon_pastebin_api_dev_key,
        api_user_key: settings.amazon_pastebin_api_user_key,
        api_option: "list",
        api_results_limit: limit.toString()
      });
      const xmlResponse = await apiRequest(PASTEBIN_API_POST_URL, "POST", data);
      if (xmlResponse.includes("Bad API request")) throw new Error(xmlResponse);
      console.log("[Cloud Sync] Raw XML response length:", xmlResponse.length);
      console.log("[Cloud Sync] Raw XML response:", xmlResponse.substring(0, 2e3));
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
      const pasteElements = xmlDoc.getElementsByTagName("paste");
      console.log("[Cloud Sync] XML parsed paste elements:", pasteElements.length);
      let pastes = [];
      if (pasteElements.length === 0 || pasteElements.length === 1) {
        console.log("[Cloud Sync] XML parsing may have failed, trying manual parsing...");
        const pasteMatches = xmlResponse.match(/<paste>([\s\S]*?)<\/paste>/g);
        if (pasteMatches) {
          console.log(`[Cloud Sync] Manual parsing found ${pasteMatches.length} pastes`);
          for (const pasteXml of pasteMatches) {
            const titleMatch = pasteXml.match(/<paste_title>([^<]+)<\/paste_title>/);
            const keyMatch = pasteXml.match(/<paste_key>([^<]+)<\/paste_key>/);
            if (titleMatch && keyMatch) {
              const title = titleMatch[1];
              const key = keyMatch[1];
              console.log(`[Cloud Sync] Manual parse - Title: "${title}", Key: "${key}"`);
              pastes.push({ key, title });
            }
          }
        }
      } else {
        pastes = Array.from(pasteElements).map((node) => ({
          key: node.querySelector("paste_key")?.textContent || node.getElementsByTagName("paste_key")[0]?.textContent || "",
          title: node.querySelector("paste_title")?.textContent || node.getElementsByTagName("paste_title")[0]?.textContent || ""
        }));
      }
      console.log(`[Cloud Sync] Total pastes parsed: ${pastes.length}`);
      pastes.forEach((p) => console.log(`[Cloud Sync] Parsed paste: "${p.title}" (${p.key})`));
      return pastes;
    }, [settings]);
    const fetchUserKeyFromCloud = React__default.useCallback(async (recoveryId) => {
      const id2 = recoveryId || settings.amazon_pastebin_recovery_id;
      if (!id2) throw new Error("Missing Recovery Paste ID");
      setIsLoading(true);
      try {
        const content = await getPasteContent(id2);
        const encoded = content.trim();
        const decoded = atob(encoded);
        if (decoded.length === 32 && /^[a-f0-9]+$/i.test(decoded)) {
          setSetting("amazon_pastebin_api_user_key", decoded);
          if (recoveryId) setSetting("amazon_pastebin_recovery_id", recoveryId);
          return decoded;
        } else {
          throw new Error("Invalid User Key format in recovery paste");
        }
      } catch (error) {
        throw new Error(error.message || "Failed to recover User Key");
      } finally {
        setIsLoading(false);
      }
    }, [settings, getPasteContent, setSetting]);
    const syncTemplatesToCloud = React__default.useCallback(async () => {
      setIsLoading(true);
      try {
        const pastes = await listPastes();
        const existingT = pastes.find((p) => p.title === "Amazon Review Templates");
        const tContent = JSON.stringify({ version: "1.0", templates: templates.map((t) => ({ name: t.title, text: t.content, height: t.editorHeight })) });
        if (existingT) await deletePaste(existingT.key);
        await createPaste("Amazon Review Templates", tContent);
        return { success: true, message: "Templates synced" };
      } catch (e) {
        return { success: false, message: e.message };
      } finally {
        setIsLoading(false);
      }
    }, [listPastes, templates, deletePaste, createPaste]);
    const syncPhrasesToCloud = React__default.useCallback(async () => {
      setIsLoading(true);
      try {
        const pastes = await listPastes();
        const existingP = pastes.find((p) => p.title === "Amazon Review Phrases");
        const pContent = JSON.stringify({ version: "1.0", lastUpdated: ( new Date()).toISOString(), phrases: phrases.map((p) => ({ name: p.label || p.content.slice(0, 20), text: p.content })) });
        if (existingP) await deletePaste(existingP.key);
        await createPaste("Amazon Review Phrases", pContent);
        return { success: true, message: "Phrases synced" };
      } catch (e) {
        return { success: false, message: e.message };
      } finally {
        setIsLoading(false);
      }
    }, [listPastes, phrases, deletePaste, createPaste]);
    const syncAllToCloud = React__default.useCallback(async () => {
      setIsLoading(true);
      try {
        await syncTemplatesToCloud();
        await syncPhrasesToCloud();
        return { success: true, message: "Templates & Phrases synced" };
      } catch (e) {
        return { success: false, message: e.message };
      } finally {
        setIsLoading(false);
      }
    }, [syncTemplatesToCloud, syncPhrasesToCloud]);
    const syncTemplatesFromCloud = React__default.useCallback(async () => {
      setIsLoading(true);
      console.log("[Cloud Sync] Starting template and phrase import...");
      try {
        const pastes = await listPastes();
        let importedCount = 0;
        let currentTemplates = [...templates];
        let currentPhrases = [...phrases];
        const generateId = () => {
          try {
            return crypto.randomUUID();
          } catch {
            return Math.random().toString(36).substring(2) + Date.now().toString(36);
          }
        };
        const modernT = pastes.find((p) => p.title === "Amazon Review Templates");
        if (modernT) {
          console.log("[Cloud Sync] Found modern grouped templates. Using as source of truth.");
          const data = JSON.parse(await getPasteContent(modernT.key));
          const tList = data.templates || data;
          if (Array.isArray(tList)) {
            currentTemplates = tList.map((t) => ({
              id: generateId(),
              title: t.name || t.title,
              content: t.text || t.content,
              editorHeight: t.height
            })).filter((t) => t.title && t.content);
            importedCount++;
          }
        } else {
          console.log("[Cloud Sync] No modern grouped templates found. Checking for legacy individual templates...");
          console.log(`[Cloud Sync] Total pastes found: ${pastes.length}`);
          pastes.forEach((p) => {
            console.log(`[Cloud Sync] Paste found: "${p.title}"`);
          });
          const legacyT = pastes.filter((p) => {
            const hasPrefix = p.title.startsWith("Amazon Review Template:") || p.title.startsWith("Amazon Review Template: ");
            const isPhrases = p.title === "Amazon Review Template: Amazon Review Phrases" || p.title.includes("Amazon Review Phrases");
            const isReview = p.title.includes(" — REVIEW — ") || p.title.includes(" - REVIEW - ") || /\s-\sREVIEW\s-\s[A-Z0-9]{10}$/.test(p.title) ||
/\s—\sREVIEW\s—\s[A-Z0-9]{10}$/.test(p.title);
            const include = hasPrefix && !isPhrases && !isReview;
            if (hasPrefix) {
              console.log(`[Cloud Sync] Filter check for "${p.title}": hasPrefix=${hasPrefix}, isPhrases=${isPhrases}, isReview=${isReview}, include=${include}`);
            }
            return include;
          });
          console.log(`[Cloud Sync] Filtered to ${legacyT.length} legacy templates`);
          if (legacyT.length > 0) {
            console.log(`[Cloud Sync] No modern templates found. Falling back to ${legacyT.length} legacy individual templates.`);
            for (const p of legacyT) {
              try {
                const name = p.title.replace("Amazon Review Template: ", "").replace("Amazon Review Template:", "").trim();
                if (!name) {
                  console.warn(`[Cloud Sync] Skipping template with empty name: ${p.title}`);
                  continue;
                }
                const content = await getPasteContent(p.key);
                let text = content;
                let height = void 0;
                let templateName = name;
                if (content.trim().startsWith("{")) {
                  try {
                    const data = JSON.parse(content);
                    text = data.text || data.content || content;
                    height = data.height || data.editorHeight;
                    if (data.name && typeof data.name === "string") {
                      templateName = data.name;
                    }
                    if (!text || typeof text !== "string") {
                      console.warn(`[Cloud Sync] Invalid text in template ${p.title}, using raw content`);
                      text = content;
                    }
                  } catch (e) {
                    console.warn(`[Cloud Sync] Failed to parse JSON for ${p.title}, using raw content`);
                  }
                }
                const idx = currentTemplates.findIndex(
                  (et) => et.title === templateName || et.title === name
                );
                if (idx >= 0) {
                  currentTemplates[idx] = {
                    ...currentTemplates[idx],
                    title: templateName,
                    content: text,
                    editorHeight: height
                  };
                  console.log(`[Cloud Sync] Updated existing template: ${templateName}`);
                } else {
                  currentTemplates.push({
                    id: generateId(),
                    title: templateName,
                    content: text,
                    editorHeight: height
                  });
                  console.log(`[Cloud Sync] Imported new template: ${templateName}`);
                }
                importedCount++;
              } catch (err) {
                console.error(`[Cloud Sync] Failed to import individual template: ${p.title}`, err);
              }
            }
          } else {
            console.log("[Cloud Sync] No legacy individual templates found.");
          }
        }
        let phrasePaste = pastes.find((p) => p.title === "Amazon Review Phrases");
        const isModernPhrase = !!phrasePaste;
        if (!phrasePaste) {
          phrasePaste = pastes.find((p) => p.title === "Amazon Review Template: Amazon Review Phrases");
        }
        if (phrasePaste) {
          console.log(`[Cloud Sync] Found phrases list (${isModernPhrase ? "Modern" : "Legacy"}).`);
          const data = JSON.parse(await getPasteContent(phrasePaste.key));
          const pList = data.phrases || data;
          if (Array.isArray(pList)) {
            if (isModernPhrase) {
              currentPhrases = pList.map((p) => ({
                id: generateId(),
                label: p.name || p.label || "",
                content: p.text || p.content
              })).filter((p) => p.content);
            } else {
              pList.forEach((p) => {
                const label = p.name || p.label || "";
                const text = p.text || p.content;
                if (!text) return;
                const idx = currentPhrases.findIndex((ep) => ep.content === text);
                if (idx === -1) {
                  currentPhrases.push({ id: generateId(), label, content: text });
                }
              });
            }
            importedCount++;
          }
        }
        if (importedCount > 0) {
          saveLocalTemplates(currentTemplates);
          saveLocalPhrases(currentPhrases);
          console.log(`[Cloud Sync] Successfully imported ${importedCount} items.`);
          return { success: true, message: `Sync completed: Found ${importedCount} items` };
        }
        console.warn("[Cloud Sync] No valid sync data found in your Pastebin account.");
        return { success: false, message: "No sync data found in cloud" };
      } catch (e) {
        console.error("[Cloud Sync] Critical error during import:", e);
        return { success: false, message: e.message };
      } finally {
        setIsLoading(false);
      }
    }, [listPastes, getPasteContent, templates, phrases, saveLocalTemplates, saveLocalPhrases]);
    const REVIEW_OBFUSCATION_HEADER = `=== AMAZON REVIEW STUDIO PASTE ===
This Pastebin contains an encrypted, base64-encoded review draft.
It has been obfuscated for general privacy reasons and to
prevent search engines from indexing unreleased review content.

To view the contents of this review, you must import it using
the Amazon Review Studio browser extension.
================================

`;
    const PLAINTEXT_HEADER = `=== AMAZON REVIEW STUDIO PASTE ===
This is a review draft created via the Amazon Review Studio extension.
Please do not comment on this paste directly, thank you.
================================

`;
    const saveReviewToCloud = React__default.useCallback(async (reviewData) => {
      setIsLoading(true);
      try {
        const ObjectContentJson = JSON.stringify({ ...reviewData, savedAt: ( new Date()).toISOString() });
        let finalContent = "";
        if (settings.amazon_pastebin_privacy_mode) {
          const base64Content = btoa(unescape(encodeURIComponent(ObjectContentJson)));
          finalContent = REVIEW_OBFUSCATION_HEADER + base64Content;
        } else {
          finalContent = PLAINTEXT_HEADER + ObjectContentJson;
        }
        const pastes = await listPastes();
        const titleSuffix = ` - REVIEW - ${reviewData.asin}`;
        const existing = pastes.find((p) => p.title.endsWith(titleSuffix));
        const pasteTitle = `${reviewData.productTitle.slice(0, 50)}${titleSuffix}`;
        if (existing) await deletePaste(existing.key);
        await createPaste(pasteTitle, finalContent, "text", "0");
        return { success: true, message: "Review saved" };
      } catch (e) {
        return { success: false, message: e.message };
      } finally {
        setIsLoading(false);
      }
    }, [listPastes, deletePaste, createPaste, settings.amazon_pastebin_privacy_mode]);
    const fetchReviewFromCloud = React__default.useCallback(async (asin) => {
      setIsLoading(true);
      try {
        const pastes = await listPastes();
        const existing = pastes.find((p) => p.title.endsWith(` - REVIEW - ${asin}`));
        if (!existing) return { success: false, message: "No review found" };
        const rawContent = await getPasteContent(existing.key);
        let parsedData;
        if (rawContent.includes("=== AMAZON REVIEW STUDIO PASTE ===")) {
          const parts = rawContent.split("================================");
          if (parts.length > 1) {
            const base64Payload = parts[1].trim();
            try {
              const decodedJson = decodeURIComponent(escape(atob(base64Payload)));
              parsedData = JSON.parse(decodedJson);
            } catch (decodeErr) {
              return { success: false, message: "Failed to decode review content" };
            }
          } else {
            return { success: false, message: "Invalid obfuscated paste format" };
          }
        } else {
          try {
            parsedData = JSON.parse(rawContent);
          } catch (parseErr) {
            return { success: false, message: "Failed to parse legacy review data" };
          }
        }
        return { success: true, message: "Review fetched", data: parsedData };
      } catch (e) {
        return { success: false, message: e.message };
      } finally {
        setIsLoading(false);
      }
    }, [listPastes, getPasteContent]);
    const testConnection = React__default.useCallback(async () => {
      setIsLoading(true);
      try {
        const testTitle = `Test Connection - ${( new Date()).toISOString()}`;
        const pasteKey = await createPaste(testTitle, "Connection Test Success", "text", "1");
        await deletePaste(pasteKey);
        return { success: true, message: "Connection successful!" };
      } catch (e) {
        return { success: false, message: e.message };
      } finally {
        setIsLoading(false);
      }
    }, [createPaste, deletePaste]);
    const findRecoveryPasteID = React__default.useCallback(async () => {
      setIsLoading(true);
      try {
        const pastes = await listPastes();
        const recoveryPaste = pastes.find((p) => p.title === "Amazon Review - Account Token");
        if (recoveryPaste) {
          setSetting("amazon_pastebin_recovery_id", recoveryPaste.key);
          return { success: true, pasteId: recoveryPaste.key };
        }
        return { success: false, message: "No recovery paste found on your account." };
      } catch (e) {
        return { success: false, message: e.message };
      } finally {
        setIsLoading(false);
      }
    }, [listPastes, setSetting]);
    const saveUserKeyToCloud = React__default.useCallback(async () => {
      if (!settings.amazon_pastebin_api_user_key) throw new Error("No User Key to save");
      setIsLoading(true);
      try {
        const pastes = await listPastes();
        const existing = pastes.find((p) => p.title === "Amazon Review - Account Token");
        const encodedKey = btoa(settings.amazon_pastebin_api_user_key);
        if (existing) await deletePaste(existing.key);
        const newPasteId = await createPaste("Amazon Review - Account Token", encodedKey, "text", "1");
        setSetting("amazon_pastebin_recovery_id", newPasteId);
        return { success: true, pasteId: newPasteId };
      } catch (e) {
        return { success: false, message: e.message };
      } finally {
        setIsLoading(false);
      }
    }, [listPastes, settings.amazon_pastebin_api_user_key, deletePaste, createPaste, setSetting]);
    const clearCloudData = React__default.useCallback(async () => {
      setIsLoading(true);
      try {
        const pastes = await listPastes();
        const appPastes = pastes.filter(
          (p) => p.title === "Amazon Review Templates" || p.title === "Amazon Review - Account Token" || p.title.includes(" - REVIEW - ")
        );
        if (appPastes.length === 0) return { success: true, message: "No cloud data found." };
        for (const paste of appPastes) {
          await deletePaste(paste.key);
        }
        return { success: true, message: `Cleared ${appPastes.length} pastes from cloud.` };
      } catch (e) {
        return { success: false, message: e.message };
      } finally {
        setIsLoading(false);
      }
    }, [listPastes, deletePaste]);
    return {
      isLoading,
      syncTemplatesToCloud,
      syncPhrasesToCloud,
      syncAllToCloud,
      syncTemplatesFromCloud,
      saveReviewToCloud,
      fetchReviewFromCloud,
      generateUserKey,
      fetchUserKeyFromCloud,
      testConnection,
      findRecoveryPasteID,
      saveUserKeyToCloud,
      clearCloudData,
      getSyncQuota
};
  }
  const PhraseManager = ({ onInsert, onClose }) => {
    const { phrases, addPhrase, deletePhrase } = useContent();
    const { syncPhrasesToCloud } = usePastebin();
    const [isAdding, setIsAdding] = React__default.useState(false);
    const [newLabel, setNewLabel] = React__default.useState("");
    const [newContent, setNewContent] = React__default.useState("");
    const [syncState, setSyncState] = React__default.useState("idle");
    const handleSync = async (e) => {
      e.stopPropagation();
      if (syncState === "syncing") return;
      setSyncState("syncing");
      const result = await syncPhrasesToCloud();
      if (result.success) {
        setSyncState("synced");
      } else {
        setSyncState("idle");
        alert(result.message);
      }
    };
    const handleAdd = () => {
      if (!newContent.trim()) return;
      addPhrase({
        label: newLabel.trim() || void 0,
        content: newContent.trim()
      });
      setNewLabel("");
      setNewContent("");
      setIsAdding(false);
    };
    return React__default.createElement("div", { className: "ars-phrase-manager", style: { width: "300px", padding: "1rem" } }, React__default.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" } }, React__default.createElement("h3", { style: { margin: 0, fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" } }, React__default.createElement(MessageSquare, { size: 16 }), " Saved Phrases"), React__default.createElement(
      "div",
      {
        onClick: handleSync,
        className: `
                        flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold cursor-pointer transition-all border
                        ${syncState === "synced" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}
                    `,
        title: "Sync Phrases to Cloud"
      },
      syncState === "syncing" ? React__default.createElement(RefreshCw, { size: 10, className: "animate-spin text-orange-500" }) : syncState === "synced" ? React__default.createElement(Check, { size: 10, className: "text-green-600" }) : React__default.createElement(RefreshCw, { size: 10 }),
React__default.createElement("span", null, syncState === "syncing" ? "Syncing..." : syncState === "synced" ? "Synced" : "Sync")
    )), React__default.createElement("div", { className: "ars-phrase-list", style: { maxHeight: "200px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" } }, phrases.map((p) => React__default.createElement(
      "div",
      {
        key: p.id,
        className: "ars-phrase-item",
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem",
          backgroundColor: "var(--ars-color-bg-secondary)",
          borderRadius: "4px"
        }
      },
React__default.createElement(
        "div",
        {
          style: { flex: 1, cursor: "pointer", overflow: "hidden" },
          onClick: () => {
            onInsert(p.content);
            onClose();
          },
          title: p.content
        },
React__default.createElement("span", { style: { fontWeight: 500, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, p.label || p.content),
        p.label && React__default.createElement("span", { style: { fontSize: "0.75rem", color: "var(--ars-color-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" } }, p.content)
      ),
React__default.createElement(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            deletePhrase(p.id);
          },
          style: {
            background: "transparent",
            border: "none",
            color: "var(--ars-color-text-secondary)",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center"
          },
          title: "Delete phrase"
        },
React__default.createElement(Trash2, { size: 14 })
      )
    )), phrases.length === 0 && React__default.createElement("div", { style: { textAlign: "center", padding: "1rem", color: "var(--ars-color-text-secondary)", fontSize: "0.875rem" } }, "No saved phrases.")), isAdding ? React__default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem", borderTop: "1px solid var(--ars-color-border)", paddingTop: "1rem" } }, React__default.createElement(
      Input,
      {
        placeholder: "Label (Optional)",
        value: newLabel,
        onChange: (e) => setNewLabel(e.target.value),
        autoFocus: true
      }
    ), React__default.createElement(
      Input,
      {
        placeholder: "Phrase content...",
        value: newContent,
        onChange: (e) => setNewContent(e.target.value)
      }
    ), React__default.createElement("div", { style: { display: "flex", gap: "0.5rem", justifyContent: "flex-end" } }, React__default.createElement(Button, { size: "sm", variant: "ghost", onClick: () => setIsAdding(false) }, "Cancel"), React__default.createElement(Button, { size: "sm", variant: "primary", onClick: handleAdd }, "Add"))) : React__default.createElement(
      Button,
      {
        variant: "secondary",
        size: "sm",
        style: { width: "100%" },
        onClick: () => setIsAdding(true),
        icon: React__default.createElement(Plus, { size: 14 })
      },
      "Add New Phrase"
    ));
  };
  const TemplateSelector = ({
    onInsert,
    onManage,
    onClose,
    currentBody
  }) => {
    const { templates, addTemplate } = useContent();
    const { syncTemplatesToCloud } = usePastebin();
    const [isSaving, setIsSaving] = React__default.useState(false);
    const [newTitle, setNewTitle] = React__default.useState("");
    const [syncState, setSyncState] = React__default.useState("idle");
    const handleSync = async (e) => {
      e.stopPropagation();
      if (syncState === "syncing") return;
      setSyncState("syncing");
      const result = await syncTemplatesToCloud();
      if (result.success) {
        setSyncState("synced");
      } else {
        setSyncState("idle");
        alert(result.message);
      }
    };
    const handleSaveAsTemplate = () => {
      if (!currentBody.trim()) {
        alert("Review body is empty. Type something first!");
        return;
      }
      setIsSaving(true);
    };
    const confirmSave = () => {
      if (!newTitle.trim()) return;
      addTemplate({
        title: newTitle.trim(),
        content: currentBody
      });
      setNewTitle("");
      setIsSaving(false);
    };
    return React__default.createElement("div", { className: "ars-template-selector", style: { width: "300px", padding: "1rem" } }, React__default.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" } }, React__default.createElement("h3", { style: { margin: 0, fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" } }, React__default.createElement(PanelsTopLeft, { size: 16 }), " Templates"), React__default.createElement(
      "div",
      {
        onClick: handleSync,
        className: `
                        flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold cursor-pointer transition-all border
                        ${syncState === "synced" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}
                    `,
        title: "Sync Templates to Cloud"
      },
      syncState === "syncing" ? React__default.createElement(RefreshCw, { size: 10, className: "animate-spin text-orange-500" }) : syncState === "synced" ? React__default.createElement(Check, { size: 10, className: "text-green-600" }) : React__default.createElement(RefreshCw, { size: 10 }),
React__default.createElement("span", null, syncState === "syncing" ? "Syncing..." : syncState === "synced" ? "Synced" : "Sync")
    )), React__default.createElement("div", { className: "ars-template-list", style: { maxHeight: "200px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" } }, templates.map((t) => React__default.createElement(
      "div",
      {
        key: t.id,
        className: "ars-template-item",
        style: {
          display: "flex",
          alignItems: "center",
          padding: "0.625rem",
          backgroundColor: "var(--ars-color-bg-secondary)",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "background-color 0.2s ease"
        },
        onClick: () => {
          onInsert(t.content);
          onClose();
        },
        onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "var(--ars-color-bg-tertiary)",
        onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "var(--ars-color-bg-secondary)"
      },
React__default.createElement(FileText, { size: 16, style: { marginRight: "0.75rem", color: "var(--ars-color-text-secondary)", flexShrink: 0 } }),
React__default.createElement("span", { style: {
        fontSize: "0.875rem",
        fontWeight: 500,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      } }, t.title)
    )), templates.length === 0 && React__default.createElement("div", { style: { textAlign: "center", padding: "1rem", color: "var(--ars-color-text-secondary)", fontSize: "0.875rem" } }, "No templates saved.")), React__default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem", borderTop: "1px solid var(--ars-color-border)", paddingTop: "1rem" } }, isSaving ? React__default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem" } }, React__default.createElement(
      "input",
      {
        type: "text",
        placeholder: "Template name...",
        value: newTitle,
        onChange: (e) => setNewTitle(e.target.value),
        autoFocus: true,
        style: {
          width: "100%",
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid var(--ars-color-border)",
          fontSize: "0.875rem",
          outline: "none"
        }
      }
    ), React__default.createElement("div", { style: { display: "flex", gap: "0.5rem", justifyContent: "flex-end" } }, React__default.createElement(Button, { size: "sm", variant: "ghost", onClick: () => setIsSaving(false) }, "Cancel"), React__default.createElement(Button, { size: "sm", variant: "primary", onClick: confirmSave }, "Create"))) : React__default.createElement(
      Button,
      {
        variant: "secondary",
        size: "sm",
        icon: React__default.createElement(Save, { size: 14 }),
        onClick: handleSaveAsTemplate,
        style: { width: "100%", justifyContent: "flex-start" }
      },
      "Save Current as Template"
    ), React__default.createElement(
      Button,
      {
        variant: "ghost",
        size: "sm",
        icon: React__default.createElement(Settings, { size: 14 }),
        onClick: () => {
          onManage();
          onClose();
        },
        style: { width: "100%", justifyContent: "flex-start" }
      },
      "Manage Templates..."
    )));
  };
  const Card = ({
    className,
    children,
    padding = "md",
    ...props
  }) => {
    return React__default.createElement(
      "div",
      {
        className: cn("ars-card", `ars-card--p-${padding}`, className),
        ...props
      },
      children
    );
  };
  const SettingsDashboard = ({ isOpen, onClose, initialTab = "ai" }) => {
    const { settings, setSetting } = useSettings();
    const [activeTab, setActiveTab] = React__default.useState(initialTab);
    const { generateUserKey, fetchUserKeyFromCloud, testConnection, findRecoveryPasteID, saveUserKeyToCloud, clearCloudData, isLoading } = usePastebin();
    const [syncStatus, setSyncStatus] = React__default.useState(null);
    const [isSaving, setIsSaving] = React__default.useState(false);
    const [isUserKeyEditable, setIsUserKeyEditable] = React__default.useState(false);
    const handleGenerateKey = async () => {
      try {
        setSyncStatus({ type: "info", message: "Authenticating..." });
        await generateUserKey();
        setSyncStatus({ type: "success", message: "Successfully authenticated!" });
      } catch (error) {
        setSyncStatus({ type: "error", message: error.message });
      }
    };
    const handleTestConnection = async () => {
      setSyncStatus({ type: "info", message: "Testing connection..." });
      const result = await testConnection();
      setSyncStatus({ type: result.success ? "success" : "error", message: result.message });
    };
    const handleFindRecoveryPaste = async () => {
      setSyncStatus({ type: "info", message: "Searching for recovery paste..." });
      const result = await findRecoveryPasteID();
      if (result.success) {
        setSyncStatus({ type: "success", message: `Found recovery paste: ${result.pasteId}` });
      } else {
        setSyncStatus({ type: "error", message: result.message });
      }
    };
    const handleFetchKey = async () => {
      try {
        setSyncStatus({ type: "info", message: "Attempting key recovery..." });
        await fetchUserKeyFromCloud();
        setSyncStatus({ type: "success", message: "API User Key successfully recovered!" });
      } catch (error) {
        setSyncStatus({ type: "error", message: error.message });
      }
    };
    const handleClearCloud = async () => {
      if (!confirm("This will delete all synced templates and review backups from Pastebin. Continue?")) return;
      setSyncStatus({ type: "info", message: "Clearing cloud data..." });
      const result = await clearCloudData();
      setSyncStatus({ type: result.success ? "success" : "error", message: result.message });
    };
    const handleSaveUserKeyToCloud = async () => {
      setSyncStatus({ type: "info", message: "Creating recovery paste..." });
      const result = await saveUserKeyToCloud();
      if (result.success) {
        setSyncStatus({ type: "success", message: `Recovery paste created: ${result.pasteId}` });
      } else {
        setSyncStatus({ type: "error", message: result.message });
      }
    };
    const handleAIEnabledChange = async (enabled) => {
      if (enabled) {
        if (!settings.amazon_ai_tos_accepted) {
          const result = await Swal.fire({
            title: "ATTENTION!",
            text: "This feature has the potential to be abused to generate reviews without any user input. By enabling this feature, you agree to write your own review first. Do you accept?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yeah sure, whatever.",
            cancelButtonText: "No! Get me outta here!",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6"
          });
          if (result.isConfirmed) {
            setSetting("amazon_ai_tos_accepted", true);
            setSetting("amazon_ai_enabled", true);
          }
        } else {
          setSetting("amazon_ai_enabled", true);
        }
      } else {
        setSetting("amazon_ai_enabled", false);
      }
    };
    return React__default.createElement(
      Modal,
      {
        isOpen,
        onClose,
        title: "Amazon Review Studio Settings",
        width: "740px"
      },
React__default.createElement("div", { className: "ars-settings-layout p-2" }, React__default.createElement("aside", { className: "ars-settings-sidebar" }, React__default.createElement(
        Button,
        {
          variant: activeTab === "sync" ? "secondary" : "ghost",
          className: "ars-tab-btn",
          onClick: () => setActiveTab("sync"),
          icon: React__default.createElement(Cloud, { size: 18 })
        },
        "Cloud Sync"
      ), React__default.createElement(
        Button,
        {
          variant: activeTab === "ai" ? "secondary" : "ghost",
          className: "ars-tab-btn",
          onClick: () => setActiveTab("ai"),
          icon: React__default.createElement(Cpu, { size: 18 })
        },
        "AI Configuration"
      ), React__default.createElement(
        Button,
        {
          variant: activeTab === "about" ? "secondary" : "ghost",
          className: "ars-tab-btn",
          onClick: () => setActiveTab("about"),
          icon: React__default.createElement(Info, { size: 18 })
        },
        "About"
      ), React__default.createElement(
        Button,
        {
          variant: activeTab === "debug" ? "secondary" : "ghost",
          className: "ars-tab-btn",
          onClick: () => setActiveTab("debug"),
          icon: React__default.createElement(Bug, { size: 18 })
        },
        "Debug"
      )), React__default.createElement("main", { className: "ars-settings-content" }, activeTab === "ai" && React__default.createElement("div", { className: "ars-settings-section" }, React__default.createElement("h3", null, "AI Engine Settings"), React__default.createElement("div", { className: "ars-setting-group border border-indigo-100 bg-indigo-50/30 p-4 rounded-xl mb-6" }, React__default.createElement("div", { className: "flex items-center justify-between" }, React__default.createElement("div", { className: "flex items-center gap-3" }, React__default.createElement("div", { className: `p-2 rounded-lg ${settings.amazon_ai_enabled ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"}` }, React__default.createElement(Cpu, { size: 20 })), React__default.createElement("div", null, React__default.createElement("label", { className: "font-semibold text-gray-900 block cursor-pointer select-none", htmlFor: "ai-toggle" }, "AI Features"), React__default.createElement("p", { className: "text-xs text-gray-500" }, "Enable automated content generation"))), React__default.createElement("div", { className: "relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer" }, React__default.createElement(
        "input",
        {
          id: "ai-toggle",
          type: "checkbox",
          className: "peer absolute w-full h-full opacity-0 z-10 cursor-pointer",
          checked: settings.amazon_ai_enabled,
          onChange: (e) => handleAIEnabledChange(e.target.checked)
        }
      ), React__default.createElement("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" })))), React__default.createElement(
        "div",
        {
          className: `transition-all duration-500 ease-in-out ${settings.amazon_ai_enabled ? "opacity-100" : "opacity-40 pointer-events-none grayscale"}`
        },
React__default.createElement("div", { className: "ars-setting-group border border-gray-100 bg-white p-5 rounded-xl shadow-sm mb-6" }, React__default.createElement("h4", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2" }, "Provider Configuration"), React__default.createElement("div", { className: "grid gap-6" }, React__default.createElement("div", { className: "ars-setting-item" }, React__default.createElement("label", { className: "text-sm font-medium text-gray-700 mb-1.5 block" }, "Primary AI Provider"), React__default.createElement("div", { className: "relative" }, React__default.createElement(
          "select",
          {
            value: settings.amazon_ai_provider,
            onChange: (e) => setSetting("amazon_ai_provider", e.target.value),
            className: "ars-select w-full pl-10 pr-12 h-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors appearance-none leading-normal",
            disabled: !settings.amazon_ai_enabled
          },
React__default.createElement("option", { value: "gemini" }, "Google Gemini (Recommended)"),
React__default.createElement("option", { value: "local" }, "Local LLM Server")
        ), React__default.createElement("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" }, settings.amazon_ai_provider === "gemini" ? React__default.createElement(Cloud, { size: 16 }) : React__default.createElement(Cpu, { size: 16 })))), settings.amazon_ai_provider === "gemini" ? React__default.createElement("div", { className: "space-y-5 animate-in fade-in slide-in-from-top-2" }, React__default.createElement("div", { className: "ars-setting-item" }, React__default.createElement("label", { className: "text-sm font-medium text-gray-700 mb-1.5 block" }, "Model Selection"), React__default.createElement("div", { className: "flex items-center gap-3" }, React__default.createElement("div", { className: "relative flex-1 min-w-0" }, React__default.createElement(
          "select",
          {
            value: settings.amazon_ai_gemini_model,
            onChange: (e) => setSetting("amazon_ai_gemini_model", e.target.value),
            className: "ars-select w-full pl-3 pr-12 h-10 bg-gray-50 border-gray-200 focus:bg-white leading-normal",
            disabled: !settings.amazon_ai_enabled
          },
React__default.createElement("option", { value: "gemini-2.5-flash" }, "Gemini 2.5 Flash"),
React__default.createElement("option", { value: "gemini-3-flash-preview" }, "Gemini 3 Flash Preview")
        )), settings.amazon_ai_gemini_model === "gemini-2.5-flash" && React__default.createElement("span", { className: "shrink-0 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shadow-sm flex items-center gap-1" }, React__default.createElement("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500" }), "Faster & Stable"), settings.amazon_ai_gemini_model === "gemini-3-flash-preview" && React__default.createElement("span", { className: "shrink-0 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 shadow-sm flex items-center gap-1" }, React__default.createElement("div", { className: "w-1.5 h-1.5 rounded-full bg-indigo-500" }), "Smarter"))), React__default.createElement("div", { className: "ars-setting-item" }, React__default.createElement(
          Input,
          {
            label: "API Key",
            type: "text",
            placeholder: "Paste your Gemini API key here...",
            value: settings.amazon_ai_gemini_key,
            onChange: (e) => setSetting("amazon_ai_gemini_key", e.target.value),
            icon: React__default.createElement(Key, { size: 16, className: "text-gray-400" }),
            disabled: !settings.amazon_ai_enabled,
            className: "font-mono text-sm",
            autoComplete: "off"
          }
        ), React__default.createElement("p", { className: "mt-2 text-xs text-gray-500 flex items-center gap-1" }, React__default.createElement(Info, { size: 12 }), "Get a free key from ", React__default.createElement("a", { href: "https://aistudio.google.com/", target: "_blank", className: "text-indigo-600 hover:text-indigo-700 hover:underline font-medium" }, "Google AI Studio"), "."))) : React__default.createElement("div", { className: "space-y-5 animate-in fade-in slide-in-from-top-2" }, React__default.createElement("div", { className: "ars-setting-item" }, React__default.createElement(
          Input,
          {
            label: "Local Server URL",
            placeholder: "http://localhost:1234/v1",
            value: settings.amazon_ai_llm_server_url,
            onChange: (e) => setSetting("amazon_ai_llm_server_url", e.target.value),
            disabled: !settings.amazon_ai_enabled,
            icon: React__default.createElement(RefreshCw, { size: 16, className: "text-gray-400" })
          }
        ), React__default.createElement("p", { className: "mt-2 text-xs text-gray-500" }, "Compatible with LM Studio, Ollama, or LocalAI API endpoints.")))))
      )), activeTab === "sync" && React__default.createElement("div", { className: "ars-settings-section" }, React__default.createElement("div", { className: "flex justify-between items-center mb-4" }, React__default.createElement("div", null, React__default.createElement("h3", { className: "text-lg font-bold text-gray-900" }, "Cloud Sync Settings"), syncStatus && React__default.createElement("div", { className: `mt-2 text-xs px-3 py-1.5 rounded-md font-medium inline-block animate-in fade-in slide-in-from-top-1 ${syncStatus.type === "error" ? "bg-red-50 text-red-600 border border-red-100" : syncStatus.type === "success" ? "bg-green-50 text-green-600 border border-green-100" : "bg-blue-50 text-blue-600 border border-blue-100"}` }, syncStatus.message)), React__default.createElement(Button, { variant: "ghost", className: "text-red-500 hover:bg-red-50", onClick: handleClearCloud, icon: React__default.createElement(Trash2, { size: 16 }) }, "Clear Cloud")), !settings.amazon_pastebin_api_user_key && React__default.createElement("div", { className: "mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3" }, React__default.createElement(Info, { size: 18, className: "text-amber-600 shrink-0 mt-0.5" }), React__default.createElement("div", { className: "text-sm text-amber-800" }, React__default.createElement("p", { className: "font-semibold mb-1" }, "Important Privacy Note:"), React__default.createElement("p", null, "Due to Pastebin limits on private pastes, all ", React__default.createElement("strong", null, "reviews"), " saved to the cloud will be created as ", React__default.createElement("strong", null, "Public"), ". Templates and Phrases will remain ", React__default.createElement("strong", null, "Private"), "."))), React__default.createElement("div", { className: "space-y-6" }, React__default.createElement("div", { className: "ars-setting-group border border-gray-100 bg-white p-5 rounded-xl shadow-sm" }, React__default.createElement("h4", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2" }, "Auto-Sync Preferences"), React__default.createElement("div", { className: "space-y-4" }, React__default.createElement("div", { className: "flex items-center justify-between" }, React__default.createElement("div", null, React__default.createElement("label", { className: "font-medium text-gray-900" }, "Auto-Sync Templates"), React__default.createElement("p", { className: "text-xs text-gray-500" }, "Automatically backup templates when modified")), React__default.createElement("div", { className: "relative inline-block w-10 h-5 transition duration-200 ease-in-out rounded-full cursor-pointer" }, React__default.createElement(
        "input",
        {
          type: "checkbox",
          className: "peer absolute w-full h-full opacity-0 z-10 cursor-pointer",
          checked: settings.amazon_auto_sync_templates,
          onChange: (e) => setSetting("amazon_auto_sync_templates", e.target.checked)
        }
      ), React__default.createElement("div", { className: "w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" }))), React__default.createElement("div", { className: "flex items-center justify-between" }, React__default.createElement("div", null, React__default.createElement("label", { className: "font-medium text-gray-900" }, "Auto-Sync Phrases"), React__default.createElement("p", { className: "text-xs text-gray-500" }, "Automatically backup phrases when modified")), React__default.createElement("div", { className: "relative inline-block w-10 h-5 transition duration-200 ease-in-out rounded-full cursor-pointer" }, React__default.createElement(
        "input",
        {
          type: "checkbox",
          className: "peer absolute w-full h-full opacity-0 z-10 cursor-pointer",
          checked: settings.amazon_auto_sync_phrases,
          onChange: (e) => setSetting("amazon_auto_sync_phrases", e.target.checked)
        }
      ), React__default.createElement("div", { className: "w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" }))))), React__default.createElement("div", { className: "ars-setting-group border border-gray-100 bg-gray-50/30 p-4 rounded-xl space-y-4" }, React__default.createElement("div", { className: "flex items-center gap-2 mb-1" }, React__default.createElement(Key, { size: 16, className: "text-orange-500" }), React__default.createElement("span", { className: "text-sm font-semibold text-gray-700" }, "Pastebin Credentials")), React__default.createElement(
        Input,
        {
          label: "API Dev Key",
          placeholder: "Enter your Pastebin API Dev Key",
          value: settings.amazon_pastebin_api_dev_key,
          onChange: (e) => setSetting("amazon_pastebin_api_dev_key", e.target.value)
        }
      ), React__default.createElement("div", { className: "grid grid-cols-2 gap-4" }, React__default.createElement(
        Input,
        {
          label: "Pastebin Username",
          placeholder: "Username",
          value: settings.amazon_pastebin_api_user_name,
          onChange: (e) => setSetting("amazon_pastebin_api_user_name", e.target.value)
        }
      ), React__default.createElement(
        Input,
        {
          label: "Pastebin Password",
          type: "password",
          placeholder: "Password",
          value: settings.amazon_pastebin_api_user_password,
          onChange: (e) => setSetting("amazon_pastebin_api_user_password", e.target.value)
        }
      )), React__default.createElement("div", { className: "flex gap-3 pt-2" }, React__default.createElement(
        Button,
        {
          onClick: handleGenerateKey,
          variant: "secondary",
          disabled: isLoading || !settings.amazon_pastebin_api_dev_key || !settings.amazon_pastebin_api_user_name || !settings.amazon_pastebin_api_user_password,
          className: "flex-1",
          icon: isLoading ? React__default.createElement(RefreshCw, { size: 16, className: "animate-spin" }) : React__default.createElement(ShieldCheck, { size: 16 })
        },
        "Generate User Key"
      ), React__default.createElement(
        Button,
        {
          onClick: handleTestConnection,
          variant: "outline",
          disabled: isLoading || !settings.amazon_pastebin_api_dev_key || !settings.amazon_pastebin_api_user_key,
          className: "flex-1",
          icon: React__default.createElement(RefreshCw, { size: 16 })
        },
        "Test Connection"
      )), React__default.createElement("p", { className: "ars-help-text" }, "Get your key from the ", React__default.createElement("a", { href: "https://pastebin.com/doc_api", target: "_blank", className: "text-blue-600 hover:underline" }, "Pastebin API documentation"), ".")), React__default.createElement("div", { className: "ars-setting-group border border-gray-100 bg-gray-50/30 p-4 rounded-xl space-y-4" }, React__default.createElement("div", { className: "flex items-center gap-2 mb-1" }, React__default.createElement(ShieldCheck, { size: 16, className: "text-blue-500" }), React__default.createElement("span", { className: "text-sm font-semibold text-gray-700" }, "Key & Recovery Management")), React__default.createElement("div", { className: "relative" }, React__default.createElement(
        Input,
        {
          label: "API User Key (Auto-generated)",
          value: settings.amazon_pastebin_api_user_key,
          onChange: (e) => setSetting("amazon_pastebin_api_user_key", e.target.value),
          placeholder: "Will be generated automatically",
          readOnly: !isUserKeyEditable,
          className: !isUserKeyEditable ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "",
          icon: React__default.createElement(ShieldCheck, { size: 16, className: "text-gray-400" })
        }
      ), React__default.createElement(
        "button",
        {
          type: "button",
          onClick: () => setIsUserKeyEditable(!isUserKeyEditable),
          className: "absolute right-3 top-[34px] text-gray-400 hover:text-blue-600 transition-colors",
          title: "Edit User Key manually"
        },
React__default.createElement(Pen, { size: 16 })
      ), React__default.createElement("p", { className: "ars-help-text mt-2" }, "Generated from your credentials or recovered from cloud.")), React__default.createElement("div", { className: "pt-4 border-t border-gray-100 mt-2" }, React__default.createElement("label", { className: "text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1.5 mb-2" }, "Recovery Paste ID", React__default.createElement(CircleQuestionMark, { size: 14, className: "text-gray-400 cursor-help", title: "Your User Key can be stored in a rescue paste, allowing multi-device sync." })), React__default.createElement("div", { className: "flex gap-2" }, React__default.createElement(
        Input,
        {
          value: settings.amazon_pastebin_recovery_id,
          onChange: (e) => setSetting("amazon_pastebin_recovery_id", e.target.value),
          placeholder: "e.g. QweRTy12",
          className: "font-mono flex-1"
        }
      ), React__default.createElement(
        Button,
        {
          variant: "secondary",
          size: "sm",
          onClick: handleFindRecoveryPaste,
          disabled: isLoading,
          icon: React__default.createElement(Search, { size: 14 }),
          className: "whitespace-nowrap px-3 text-[11px] h-[38px]"
        },
        "Find ID"
      ), React__default.createElement(
        Button,
        {
          variant: "secondary",
          size: "sm",
          onClick: handleFetchKey,
          disabled: isLoading || !settings.amazon_pastebin_recovery_id,
          icon: React__default.createElement(CloudDownload, { size: 14 }),
          className: "whitespace-nowrap px-3 text-[11px] h-[38px]"
        },
        "Fetch Key"
      )), React__default.createElement("p", { className: "ars-help-text mt-1.5" }, "Recover your key from another device, or search for an existing recovery paste."), React__default.createElement(
        Button,
        {
          onClick: handleSaveUserKeyToCloud,
          variant: "ghost",
          size: "sm",
          className: "w-full text-blue-600 hover:bg-blue-50 text-[11px] mt-4",
          disabled: isLoading || !settings.amazon_pastebin_api_user_key
        },
        "Backup User Key to Cloud (Create Recovery Paste)"
      ))))), activeTab === "about" && React__default.createElement("div", { className: "ars-settings-section ars-about-section" }, React__default.createElement("div", { className: "ars-brand" }, React__default.createElement(Settings, { size: 48, className: "ars-brand-icon" }), React__default.createElement("h1", null, "Amazon Review Studio"), React__default.createElement("span", { className: "ars-version" }, "v2.0.0-react")), React__default.createElement("p", null, "A premium userscript for Amazon reviewers."), React__default.createElement(Card, { padding: "md" }, React__default.createElement("p", null, "Designed for power users who want professional formatting and AI-assisted content creation directly within the Amazon review form."))), activeTab === "debug" && React__default.createElement("div", { className: "ars-settings-section" }, React__default.createElement("h3", null, "Troubleshooting"), React__default.createElement("div", { className: "ars-setting-group border border-red-100 bg-red-50/30 p-4 rounded-xl space-y-4" }, React__default.createElement("p", { className: "text-sm text-gray-700" }, "Tools to help diagnose issues with form submission or injection."), React__default.createElement("div", { className: "ars-setting-item checkbox-row" }, React__default.createElement("label", { className: "flex items-center gap-3 cursor-pointer" }, React__default.createElement(
        "input",
        {
          type: "checkbox",
          checked: settings.amazon_ai_convert_markdown,
          onChange: (e) => setSetting("amazon_ai_convert_markdown", e.target.checked)
        }
      ), React__default.createElement("span", null, "Convert AI Markdown to Unicode")), React__default.createElement("p", { className: "ars-help-text ml-7" }, "Automatically formats AI-generated headers and lists with unicode styles. Disable if you prefer raw text output.")), React__default.createElement("div", { className: "ars-setting-item checkbox-row" }, React__default.createElement("label", { className: "flex items-center gap-3 cursor-pointer" }, React__default.createElement(
        "input",
        {
          type: "checkbox",
          checked: settings.debug_mode,
          onChange: (e) => setSetting("debug_mode", e.target.checked)
        }
      ), React__default.createElement("span", null, "Enable Verbose Logging (Console)"))), React__default.createElement("div", { className: "ars-setting-item checkbox-row" }, React__default.createElement("label", { className: "flex items-center gap-3 cursor-pointer" }, React__default.createElement(
        "input",
        {
          type: "checkbox",
          checked: settings.debug_unhide_native,
          onChange: (e) => {
            setSetting("debug_unhide_native", e.target.checked);
          }
        }
      ), React__default.createElement("span", null, "Unhide Native Amazon Form (Requires Refresh)")), React__default.createElement("p", { className: "ars-help-text ml-7" }, "Reveals the original Amazon review form below the Studio interface. Useful to check if data is syncing correctly."), settings.debug_unhide_native && React__default.createElement("div", { className: "ml-7 mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200" }, React__default.createElement("label", { className: "flex items-center gap-3 cursor-pointer" }, React__default.createElement(
        "input",
        {
          type: "checkbox",
          checked: settings.debug_native_side_by_side,
          onChange: (e) => setSetting("debug_native_side_by_side", e.target.checked)
        }
      ), React__default.createElement("span", { className: "text-sm font-medium" }, "Display Side-by-Side (Requires Refresh)")), React__default.createElement("p", { className: "ars-help-text ml-7 text-xs mt-1" }, "Shows the native form alongside Review Studio instead of below it. Makes native form opaque for demo/showcase purposes."))), React__default.createElement("div", { className: "ars-setting-item checkbox-row pt-2 border-t border-red-100/50" }, React__default.createElement("label", { className: "flex items-center gap-3 cursor-pointer" }, React__default.createElement(
        "input",
        {
          type: "checkbox",
          checked: settings.show_demo_settings,
          onChange: (e) => setSetting("show_demo_settings", e.target.checked)
        }
      ), React__default.createElement("span", { className: "font-medium text-indigo-700" }, "Display Demo & Presentation Settings")))), settings.show_demo_settings && React__default.createElement("div", { className: "animate-in fade-in slide-in-from-top-4 duration-500" }, React__default.createElement("h3", { className: "mt-8 flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider" }, React__default.createElement(CirclePlay, { size: 18, className: "text-indigo-600" }), "Demo & Presentation"), React__default.createElement("div", { className: "ars-setting-group border border-indigo-100 bg-indigo-50/30 p-4 rounded-xl space-y-6 mt-4" }, React__default.createElement("div", { className: "ars-setting-item checkbox-row" }, React__default.createElement("label", { className: "flex items-center justify-between cursor-pointer w-full" }, React__default.createElement("div", { className: "flex items-center gap-3" }, React__default.createElement(
        "input",
        {
          type: "checkbox",
          checked: settings.demo_enabled,
          onChange: (e) => setSetting("demo_enabled", e.target.checked)
        }
      ), React__default.createElement("div", { className: "flex flex-col" }, React__default.createElement("span", { className: "font-semibold text-gray-900 text-sm" }, "Enable Demo Mode"), React__default.createElement("span", { className: "text-xs text-gray-500" }, "Overrides PFP/Name and triggers simulated typing on load"))), React__default.createElement("div", { className: `px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${settings.demo_enabled ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"}` }, settings.demo_enabled ? "Active" : "Disabled"))), React__default.createElement("div", { className: `space-y-4 transition-all duration-300 ${settings.demo_enabled ? "opacity-100" : "opacity-40 pointer-events-none grayscale"}` }, React__default.createElement("div", { className: "grid grid-cols-2 gap-4" }, React__default.createElement(
        Input,
        {
          label: "Custom Display Name",
          placeholder: "e.g. John Doe",
          value: settings.demo_name,
          onChange: (e) => setSetting("demo_name", e.target.value)
        }
      ), React__default.createElement(
        Input,
        {
          label: "Custom PFP URL",
          placeholder: "https://example.com/image.jpg",
          value: settings.demo_pfp_url,
          onChange: (e) => setSetting("demo_pfp_url", e.target.value)
        }
      )), React__default.createElement(
        Input,
        {
          label: "Simulated Review Title",
          placeholder: "Enter the title to be typed...",
          value: settings.demo_review_title,
          onChange: (e) => setSetting("demo_review_title", e.target.value)
        }
      ), React__default.createElement("div", { className: "ars-setting-item" }, React__default.createElement("label", { className: "text-sm font-medium text-gray-700 mb-1.5 block" }, "Simulated Review Body"), React__default.createElement(
        "textarea",
        {
          className: "ars-textarea w-full p-3 text-sm border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px] leading-relaxed resize-none bg-white/50",
          placeholder: "Enter the review content to be typed...",
          value: settings.demo_review_body,
          onChange: (e) => setSetting("demo_review_body", e.target.value)
        }
      )), React__default.createElement("div", { className: "grid grid-cols-2 gap-4" }, React__default.createElement("div", { className: "ars-setting-item" }, React__default.createElement("label", { className: "text-sm font-medium text-gray-700 mb-1.5 block" }, "Typing Start Delay (seconds)"), React__default.createElement(
        "input",
        {
          type: "number",
          min: "0",
          step: "0.5",
          className: "ars-input w-full h-10 px-3 bg-white/50 border border-gray-200 rounded-lg",
          value: settings.demo_typing_delay,
          onChange: (e) => setSetting("demo_typing_delay", parseFloat(e.target.value))
        }
      )), React__default.createElement("div", { className: "ars-setting-item" }, React__default.createElement("label", { className: "text-sm font-medium text-gray-700 mb-1.5 block" }, "Typing Speed"), React__default.createElement(
        "select",
        {
          className: "ars-select w-full h-10 px-3 bg-white/50 border border-gray-200 rounded-lg",
          value: settings.demo_typing_speed,
          onChange: (e) => setSetting("demo_typing_speed", e.target.value)
        },
React__default.createElement("option", { value: "slow" }, "Slow"),
React__default.createElement("option", { value: "normal" }, "Normal"),
React__default.createElement("option", { value: "fast" }, "Fast")
      )))))))))
    );
  };
  const EditorToolbar = ({
    onStyleToggle,
    activeStyles,
    onInsert,
    onReplace,
    onClearStyles,
    showUtilities = true,
    currentValue = "",
    onListToggle,
    productName,
    asin: propAsin
  }) => {
    const [showTemplatePopover, setShowTemplatePopover] = React__default.useState(false);
    const [showTemplateManager, setShowTemplateManager] = React__default.useState(false);
    const [showPhrases, setShowPhrases] = React__default.useState(false);
    const [showCloudPopover, setShowCloudPopover] = React__default.useState(false);
    const [showSettings, setShowSettings] = React__default.useState(false);
    const [quota, setQuota] = React__default.useState(null);
    const [showBulletSelector, setShowBulletSelector] = React__default.useState(false);
    const { settings, setSetting } = useSettings();
    const {
      saveReviewToCloud,
      fetchReviewFromCloud,
      syncAllToCloud,
      syncTemplatesFromCloud,
      clearCloudData,
      isLoading: isCloudLoading,
      getSyncQuota: getSyncQuota2
    } = usePastebin();
    const bulletOptions = ["•", "●", "➜", "►", "▸", "■", "✦", "◈", "★", "✓", "✗"];
    const handleBulletRightClick = (e) => {
      e.preventDefault();
      setShowBulletSelector(!showBulletSelector);
    };
    const selectBullet = (bullet) => {
      setSetting("amazon_bullet_style", bullet);
      setShowBulletSelector(false);
    };
    const [settingsTab, setSettingsTab] = React__default.useState("ai");
    const phraseBtnRef = React__default.useRef(null);
    const phrasePopoverRef = React__default.useRef(null);
    const templateBtnRef = React__default.useRef(null);
    const templatePopoverRef = React__default.useRef(null);
    const cloudBtnRef = React__default.useRef(null);
    const cloudPopoverRef = React__default.useRef(null);
    const bulletBtnRef = React__default.useRef(null);
    const bulletSelectorRef = React__default.useRef(null);
    React__default.useEffect(() => {
      if (showCloudPopover) {
        setQuota(getSyncQuota2());
      }
    }, [showCloudPopover, getSyncQuota2]);
    React__default.useEffect(() => {
      const handleClickOutside = (event) => {
        const path = event.composedPath();
        if (showPhrases) {
          const clickedInsidePhrase = phrasePopoverRef.current && path.includes(phrasePopoverRef.current) || phraseBtnRef.current && path.includes(phraseBtnRef.current);
          if (!clickedInsidePhrase) setShowPhrases(false);
        }
        if (showTemplatePopover) {
          const clickedInsideTemplate = templatePopoverRef.current && path.includes(templatePopoverRef.current) || templateBtnRef.current && path.includes(templateBtnRef.current);
          if (!clickedInsideTemplate) setShowTemplatePopover(false);
        }
        if (showCloudPopover) {
          const clickedInsideCloud = cloudPopoverRef.current && path.includes(cloudPopoverRef.current) || cloudBtnRef.current && path.includes(cloudBtnRef.current);
          if (!clickedInsideCloud) setShowCloudPopover(false);
        }
        if (showBulletSelector) {
          const clickedInsideBullet = bulletSelectorRef.current && path.includes(bulletSelectorRef.current) || bulletBtnRef.current && path.includes(bulletBtnRef.current);
          if (!clickedInsideBullet) setShowBulletSelector(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showPhrases, showTemplatePopover, showCloudPopover, showBulletSelector]);
    const handlePrivacyToggle = async () => {
      if (settings.amazon_pastebin_privacy_mode) {
        setSetting("amazon_pastebin_privacy_mode", false);
      } else {
        const isDark = settings.dark_mode || settings.amazon_ui_lights_off;
        const result = await Swal.fire({
          title: "Enable Privacy Mode?",
          html: 'Privacy Mode encrypts your drafted reviews into a <b>Base64 format</b>.<br><br><span style="color: #d33; font-size: 14px"><b>Warning:</b> Pastebin occasionally flags pastes containing encrypted text. While they usually get approved, some do not, thereby increasing the odds of your Pastebin account being banned. Proceed at your own risk.</span>',
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Accept Risk & Enable",
          cancelButtonText: "Cancel",
          background: isDark ? "#1f2937" : "#fff",
          color: isDark ? "#f3f4f6" : "#545454"
        });
        if (result.isConfirmed) {
          setSetting("amazon_pastebin_privacy_mode", true);
        }
      }
    };
    const getProductInfo = () => {
      if (productName && productName.trim() !== "") {
        console.log("[ARS Debug] Using productName from props:", productName.substring(0, 50));
        const urlParams2 = new URLSearchParams(window.location.search);
        let asin2 = propAsin || urlParams2.get("asin");
        if (!asin2 && window.location.href.includes("/dp/")) {
          const match = window.location.href.match(/\/dp\/([A-Z0-9]{10})/);
          if (match) asin2 = match[1];
        }
        return { asin: asin2 || "UNKNOWN", title: productName.trim() };
      }
      const urlParams = new URLSearchParams(window.location.search);
      let asin = propAsin || urlParams.get("asin");
      if (!asin && window.location.href.includes("/dp/")) {
        const match = window.location.href.match(/\/dp\/([A-Z0-9]{10})/);
        if (match) asin = match[1];
      }
      console.log("[ARS Debug] getProductInfo called - scraping DOM");
      const shadowRoot = document.getElementById("amazon-review-studio-root")?.shadowRoot;
      const arsEl = shadowRoot ? shadowRoot.querySelector(".ars-product-name") : null;
      const inContextEl = document.querySelector(".in-context-ryp__product-name");
      const productTitleEl = document.getElementById("productTitle");
      const wordBreakEl = document.querySelector(".product-title-word-break");
      const h1El = document.querySelector("h1");
      console.log("[ARS Debug] .ars-product-name found:", !!arsEl, arsEl?.textContent?.substring(0, 50));
      console.log("[ARS Debug] .in-context-ryp__product-name found:", !!inContextEl, inContextEl?.textContent?.substring(0, 50));
      console.log("[ARS Debug] #productTitle found:", !!productTitleEl, productTitleEl?.textContent?.substring(0, 50));
      console.log("[ARS Debug] .product-title-word-break found:", !!wordBreakEl, wordBreakEl?.textContent?.substring(0, 50));
      console.log("[ARS Debug] h1 found:", !!h1El, h1El?.textContent?.substring(0, 50));
      const titleEl = arsEl || inContextEl || productTitleEl || wordBreakEl || h1El;
      let title = titleEl?.textContent?.trim() || "Unknown Product";
      console.log("[ARS Debug] Selected element:", titleEl?.tagName, titleEl?.className);
      console.log("[ARS Debug] Final title:", title);
      console.log("[ARS Debug] ASIN:", asin);
      return { asin: asin || "UNKNOWN", title };
    };
    const handleCloudAction = async (action) => {
      const { asin, title } = getProductInfo();
      try {
        switch (action) {
          case "save":
            if (!currentValue) {
              alert("Please enter some review text first.");
              return;
            }
            const shadowRoot = document.getElementById("amazon-review-studio-root")?.shadowRoot;
            const reviewTitleInput = shadowRoot?.getElementById("reviewTitle") || document.getElementById("reviewTitle");
            const saveRes = await saveReviewToCloud({
              reviewBody: currentValue,
              reviewTitle: reviewTitleInput?.value || "",
              asin,
              productTitle: title
            });
            alert(saveRes.message);
            break;
          case "fetch":
            if (currentValue && !confirm("This will replace your current text. Continue?")) return;
            const fetchRes = await fetchReviewFromCloud(asin);
            if (fetchRes.success && fetchRes.data) {
              const shadowRoot2 = document.getElementById("amazon-review-studio-root")?.shadowRoot;
              const titleInput = shadowRoot2?.getElementById("reviewTitle") || document.getElementById("reviewTitle");
              if (titleInput && fetchRes.data.reviewTitle) {
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
                if (nativeInputValueSetter) {
                  nativeInputValueSetter.call(titleInput, fetchRes.data.reviewTitle);
                } else {
                  titleInput.value = fetchRes.data.reviewTitle;
                }
                titleInput.dispatchEvent(new Event("input", { bubbles: true }));
              }
              onReplace(fetchRes.data.reviewBody);
            } else {
              alert(fetchRes.message);
            }
            break;
          case "create-manual":
            const exportText = JSON.stringify({ version: "1.0", content: currentValue, asin, productTitle: title }, null, 2);
            navigator.clipboard.writeText(exportText);
            window.open("https://pastebin.com/", "_blank");
            alert("Export data copied to clipboard! Paste it into Pastebin.");
            break;
          case "import-manual":
            const url = prompt("Enter Pastebin URL:");
            if (url) {
              const key = url.split("/").pop();
              if (key) {
                try {
                  const response = await fetch(`https://pastebin.com/raw/${key}`);
                  const content = await response.text();
                  onInsert(content);
                } catch (err) {
                  alert("Failed to fetch paste content.");
                }
              }
            }
            break;
          case "sync-templates":
            const pushRes = await syncAllToCloud();
            alert(pushRes.message);
            break;
          case "import-templates":
            const pullRes = await syncTemplatesFromCloud();
            alert(pullRes.message);
            break;
          case "my-pastebin":
            const username = settings.amazon_pastebin_api_user_name;
            window.open(username ? `https://pastebin.com/u/${username}` : "https://pastebin.com/", "_blank");
            break;
          case "status":
            alert(`Sync Service: Connected
User: ${settings.amazon_pastebin_api_user_name || "Anonymous"}
Dev Key: ${settings.amazon_pastebin_api_dev_key ? "✓" : "✗"}
User Key: ${settings.amazon_pastebin_api_user_key ? "✓" : "✗"}`);
            break;
          case "clear":
            const clearRes = await clearCloudData();
            if (clearRes) alert(clearRes.message);
            break;
        }
      } catch (e) {
        alert(`Error: ${e.message}`);
      }
      setShowCloudPopover(false);
    };
    const SerifIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("text", { x: "12", y: "19", textAnchor: "middle", fontSize: "25", fontFamily: "serif", fontWeight: "bold", stroke: "none", fill: "currentColor" }, "S"));
    const CursiveIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "0.5", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("text", { x: "12", y: "19", textAnchor: "middle", fontSize: "20", fontFamily: "cursive", fontWeight: "bold", stroke: "none", fill: "currentColor" }, "C"));
    const MonospaceIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("text", { x: "12", y: "19", textAnchor: "middle", fontSize: "22", fontFamily: "monospace", fontWeight: "bold", stroke: "none", fill: "currentColor" }, "M"));
    const WideIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "18", viewBox: "0 0 32 24", fill: "none", stroke: "currentColor", strokeWidth: "2.3", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("path", { d: "M4 5l6 14 6-10 6 10 6-14" }));
    const SuperscriptIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("path", { d: "M4 19l7-7" }), React.createElement("path", { d: "M11 19l-7-7" }), React.createElement("path", { d: "M19 5c0-1-.8-2-2-2s-2 1-2 2c0 2.2 4 1.8 4 4 0 1-1 2-2 2s-2-1-2-2" }));
    const tools = [
      { id: "bold", icon: React.createElement(Bold, { size: 16 }), label: "Bold" },
      { id: "italic", icon: React.createElement(Italic, { size: 16 }), label: "Italic" },
      { id: "serif", icon: React.createElement(SerifIcon, null), label: "Serif" },
      { id: "cursive", icon: React.createElement(CursiveIcon, null), label: "Cursive" },
      { id: "monospace", icon: React.createElement(MonospaceIcon, null), label: "Monospace" },
      { id: "underline", icon: React.createElement(Underline, { size: 16 }), label: "Underline" },
      { id: "strikethrough", icon: React.createElement(Strikethrough, { size: 16 }), label: "Strikethrough" },
      { id: "wide", icon: React.createElement(WideIcon, null), label: "Wide" },
      { id: "superscript", icon: React.createElement(SuperscriptIcon, null), label: "Superscript" }
    ];
    return React.createElement("div", { className: "ars-editor-toolbar" }, React.createElement("div", { className: "ars-toolbar-group" }, tools.map((tool) => React.createElement(
      Button,
      {
        key: tool.id,
        variant: activeStyles.has(tool.id) ? "primary" : "ghost",
        size: "sm",
        onClick: () => onStyleToggle(tool.id),
        title: tool.label,
        className: "ars-toolbar-btn"
      },
      tool.icon
    )), onListToggle && React.createElement(React.Fragment, null, React.createElement("div", { className: "ars-toolbar-divider" }), React.createElement("div", { className: "ars-bullet-btn-wrapper", style: { position: "relative" } }, React.createElement(
      Button,
      {
        ref: bulletBtnRef,
        variant: "ghost",
        size: "sm",
        onClick: () => onListToggle("bullet"),
        onContextMenu: handleBulletRightClick,
        title: `Bullet List (Right-click to change style: ${settings.amazon_bullet_style})`,
        className: "ars-toolbar-btn ars-bullet-btn"
      },
React.createElement(List, { size: 16 }),
React.createElement("span", { className: "ars-bullet-indicator" }, settings.amazon_bullet_style)
    ), showBulletSelector && React.createElement(
      "div",
      {
        ref: bulletSelectorRef,
        className: "ars-bullet-selector"
      },
      bulletOptions.map((bullet) => React.createElement(
        "div",
        {
          key: bullet,
          className: `ars-bullet-option ${settings.amazon_bullet_style === bullet ? "active" : ""}`,
          onClick: (e) => {
            e.stopPropagation();
            selectBullet(bullet);
          }
        },
        bullet
      ))
    )), React.createElement(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: () => onListToggle("number"),
        title: "Numbered List",
        className: "ars-toolbar-btn"
      },
React.createElement(ListOrdered, { size: 16 })
    )), showUtilities && React.createElement(React.Fragment, null, React.createElement("div", { className: "ars-toolbar-divider" }), React.createElement(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: onClearStyles,
        title: "Clear All Styling",
        className: "ars-toolbar-btn hover:bg-red-50"
      },
React.createElement(Eraser, { size: 16 })
    ))), showUtilities && React.createElement(React.Fragment, null, React.createElement("div", { className: "ars-toolbar-group" }, React.createElement("div", { style: { position: "relative" } }, React.createElement(
      Button,
      {
        ref: templateBtnRef,
        variant: showTemplatePopover ? "primary" : "ghost",
        size: "sm",
        onClick: () => setShowTemplatePopover(!showTemplatePopover),
        title: "Templates",
        className: "ars-toolbar-btn"
      },
React.createElement(PanelsTopLeft, { size: 16 })
    ), showTemplatePopover && React.createElement("div", { ref: templatePopoverRef, className: "ars-phrase-popover" }, React.createElement(
      TemplateSelector,
      {
        onInsert,
        onManage: () => setShowTemplateManager(true),
        onClose: () => setShowTemplatePopover(false),
        currentBody: currentValue
      }
    ))), React.createElement("div", { style: { position: "relative" } }, React.createElement(
      Button,
      {
        ref: phraseBtnRef,
        variant: showPhrases ? "primary" : "ghost",
        size: "sm",
        onClick: () => setShowPhrases(!showPhrases),
        title: "Insert Phrase",
        className: "ars-toolbar-btn"
      },
React.createElement(MessageSquare, { size: 16 })
    ), showPhrases && React.createElement("div", { ref: phrasePopoverRef, className: "ars-phrase-popover" }, React.createElement(
      PhraseManager,
      {
        onInsert,
        onClose: () => setShowPhrases(false)
      }
    ))), React.createElement("div", { style: { position: "relative" } }, React.createElement(
      Button,
      {
        ref: cloudBtnRef,
        variant: showCloudPopover ? "primary" : "ghost",
        size: "sm",
        onClick: () => setShowCloudPopover(!showCloudPopover),
        title: "Cloud Sync",
        className: "ars-toolbar-btn"
      },
React.createElement(Cloud, { size: 16 })
    ), showCloudPopover && React.createElement("div", { ref: cloudPopoverRef, className: "ars-phrase-popover", style: { width: "220px" } }, React.createElement("div", { className: "ars-popover-header", style: { padding: "12px 16px", borderBottom: "1px solid var(--ars-color-border)", marginBottom: "4px" } }, React.createElement("h3", { style: { margin: 0, fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 } }, React.createElement(Cloud, { size: 16 }), " Cloud Sync"), quota && React.createElement("div", { style: {
      fontSize: "0.7rem",
      fontWeight: 600,
      color: quota.count >= 20 ? "#dc2626" : quota.count >= 15 ? "#d97706" : "#6b7280",
      marginTop: "4px",
      marginLeft: "24px"
    } }, "Daily Limit: ", quota.count, "/20")), React.createElement("div", { className: "ars-popover-content" }, !settings.amazon_pastebin_api_user_key ? React.createElement("div", { className: "p-3 text-sm text-gray-500 text-center" }, React.createElement("p", { className: "mb-2" }, "Setup API to sync data"), React.createElement(Button, { variant: "primary", size: "sm", onClick: () => {
      setSettingsTab("sync");
      setShowSettings(true);
      setShowCloudPopover(false);
    } }, "Open Settings")) : React.createElement(React.Fragment, null, React.createElement("button", { onClick: () => handleCloudAction("save"), className: "ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors" }, React.createElement(Save, { size: 14, className: "text-blue-500" }), " Save Review to Cloud"), React.createElement("button", { onClick: () => handleCloudAction("fetch"), className: "ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors" }, React.createElement(Download, { size: 14, className: "text-green-500" }), " Fetch Review from Cloud"), React.createElement("div", { className: "my-1 border-t border-gray-100" }), React.createElement("button", { onClick: () => handleCloudAction("create-manual"), className: "ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors" }, React.createElement(Clipboard, { size: 14, className: "text-gray-500" }), " Create Manual Paste"), React.createElement("button", { onClick: () => handleCloudAction("import-manual"), className: "ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors" }, React.createElement(Link2, { size: 14, className: "text-gray-500" }), " Import from Paste URL"), React.createElement("div", { className: "my-1 border-t border-gray-100" }), React.createElement("button", { onClick: () => handleCloudAction("sync-templates"), className: "ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors" }, React.createElement(RefreshCw, { size: 14, className: "text-orange-500" }), " Sync Templates/Phrases"), React.createElement("button", { onClick: () => handleCloudAction("import-templates"), className: "ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors" }, React.createElement(PanelsTopLeft, { size: 14, className: "text-purple-500" }), " Import Templates/Phrases"), React.createElement("button", { onClick: () => handleCloudAction("my-pastebin"), className: "ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors" }, React.createElement(ExternalLink, { size: 14, className: "text-gray-500" }), " My Pastebin"), React.createElement("div", { className: "my-1 border-t border-gray-100" }), React.createElement("button", { onClick: () => {
      setSettingsTab("sync");
      setShowSettings(true);
      setShowCloudPopover(false);
    }, className: "ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors" }, React.createElement(Settings, { size: 14, className: "text-gray-500" }), " API Settings"), React.createElement("button", { onClick: () => handleCloudAction("status"), className: "ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors" }, React.createElement(ChartNoAxesColumn, { size: 14, className: "text-gray-500" }), " Sync Status"), React.createElement("div", { className: "ars-popover-item w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded text-sm transition-colors cursor-pointer", onClick: handlePrivacyToggle }, React.createElement("div", { className: "flex items-center gap-2" }, React.createElement(Settings, { size: 14, className: "text-blue-500" }), React.createElement("span", { title: "Encrypts review before saving" }, "Privacy Mode ", settings.amazon_pastebin_privacy_mode ? "(ON)" : "(OFF)")), React.createElement("div", { className: `w-8 h-4 rounded-full p-0.5 transition-colors ${settings.amazon_pastebin_privacy_mode ? "bg-blue-500" : "bg-gray-300"}` }, React.createElement("div", { className: `bg-white w-3 h-3 rounded-full shadow-sm transform transition-transform ${settings.amazon_pastebin_privacy_mode ? "translate-x-4" : "translate-x-0"}` }))), React.createElement("button", { onClick: () => handleCloudAction("clear"), className: "ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors text-red-500 hover:bg-red-50" }, React.createElement(Trash2, { size: 14 }), " Clear Cloud Data")), isCloudLoading && React.createElement("div", { className: "text-xs text-center text-blue-500 py-1" }, "Processing..."))))), React.createElement(
      TemplateManager,
      {
        isOpen: showTemplateManager,
        onClose: () => setShowTemplateManager(false),
        onInsert
      }
    ), showSettings && React.createElement(
      SettingsDashboard,
      {
        isOpen: showSettings,
        onClose: () => setShowSettings(false),
        initialTab: settingsTab
      }
    )));
  };
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const makeAlphabetMap = (target, source = ALPHABET) => {
    const map = {};
    const targetChars = [...target];
    const sourceChars = [...source];
    targetChars.forEach((ch, i) => {
      if (sourceChars[i]) map[sourceChars[i]] = ch;
    });
    return map;
  };
  const makeCombiningMap = (mark) => {
    const map = {};
    [...ALPHABET].forEach((ch) => map[ch] = ch + mark);
    return map;
  };
  const UNICODE_MAPS = {
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
  const STYLE_COMBINATIONS = [
    { styles: ["superscript"], key: "superscript" },
    { styles: ["underline"], key: "underline" },
    { styles: ["monospace"], key: "monospace" },
    { styles: ["wide"], key: "wide" },
    { styles: ["strikethrough"], key: "strikethrough" },
    { styles: ["cursive", "bold"], key: "cursivebold" },
    { styles: ["cursive"], key: "cursive" },
    { styles: ["serif", "bold", "italic"], key: "serifbolditalic" },
    { styles: ["serif", "bold"], key: "boldserif" },
    { styles: ["serif", "italic"], key: "serifitalic" },
    { styles: ["serif"], key: "serif" },
    { styles: ["bold", "italic"], key: "bolditalic" },
    { styles: ["bold"], key: "bold" },
    { styles: ["italic"], key: "italic" }
  ];
  class TextFormattingService {
    characterToMapKey = null;
    charToAscii = null;
    initMaps() {
      if (this.characterToMapKey) return;
      this.characterToMapKey = new Map();
      this.charToAscii = new Map();
      const priorityOrder = [
        "cursivebold",
        "cursive",
        "monospace",
        "wide",
        "superscript",
        "serifbolditalic",
        "boldserif",
        "serif",
        "serifitalic",
        "bolditalic",
        "bold",
        "italic",
        "underline",
        "strikethrough"
      ];
      for (const styleName of priorityOrder) {
        const styleMap = UNICODE_MAPS[styleName];
        if (!styleMap) continue;
        for (const [ascii, unicode] of Object.entries(styleMap)) {
          this.charToAscii.set(unicode, ascii);
          if (!this.characterToMapKey.has(unicode)) {
            this.characterToMapKey.set(unicode, styleName);
          }
          if (styleName === "underline" || styleName === "strikethrough") {
            const mark = unicode.slice(ascii.length);
            if (mark && !this.characterToMapKey.has(mark)) {
              this.characterToMapKey.set(mark, styleName);
            }
          }
        }
      }
    }
    getStylesForKey(key) {
      const combo = STYLE_COMBINATIONS.find((c) => c.key === key);
      if (combo) return combo.styles;
      const simpleKeys = ["bold", "italic", "serif", "cursive", "superscript", "underline", "monospace", "wide", "strikethrough"];
      if (simpleKeys.includes(key)) {
        return [key];
      }
      return [];
    }
applyStyles(text, activeStyles) {
      const plainText = this.toPlainText(text);
      if (activeStyles.size === 0) return plainText;
      for (const combo of STYLE_COMBINATIONS) {
        if (combo.styles.every((s) => activeStyles.has(s)) && combo.styles.length === activeStyles.size) {
          const map = UNICODE_MAPS[combo.key];
          if (!map) return plainText;
          return [...plainText].map((ch) => map[ch] || ch).join("");
        }
      }
      return plainText;
    }
detectStyles(text) {
      this.initMaps();
      const detectedStyles = new Set();
      const chars = [...text];
      for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        const nextCh = chars[i + 1];
        if (nextCh) {
          const combined = ch + nextCh;
          const mapKey2 = this.characterToMapKey.get(combined);
          if (mapKey2) {
            this.getStylesForKey(mapKey2).forEach((s) => detectedStyles.add(s));
            i++;
            continue;
          }
        }
        const mapKey = this.characterToMapKey.get(ch);
        if (mapKey) {
          this.getStylesForKey(mapKey).forEach((s) => detectedStyles.add(s));
        }
      }
      return detectedStyles;
    }
toPlainText(text) {
      this.initMaps();
      let result = "";
      for (let i = 0; i < text.length; i++) {
        const chunk2 = text.substring(i, i + 2);
        if (this.charToAscii.has(chunk2)) {
          result += this.charToAscii.get(chunk2);
          i++;
          continue;
        }
        const chunk1 = text[i];
        if (this.charToAscii.has(chunk1)) {
          result += this.charToAscii.get(chunk1);
          continue;
        }
        result += chunk1;
      }
      return result;
    }
convertMarkdownToUnicode(markdown) {
      if (!markdown) return "";
      const lines = markdown.split("\n");
      const processedLines = lines.map((line) => {
        let processed = line;
        const h1Match = processed.match(/^#\s+(.+)$/);
        if (h1Match) return this.applyStyles(h1Match[1], new Set(["wide"]));
        const hMultiMatch = processed.match(/^#{2,6}\s+(.+)$/);
        if (hMultiMatch) return this.applyStyles(hMultiMatch[1].toUpperCase(), new Set(["bold"]));
        if (/^(\s*)[-*]\s+(.+)/.test(processed)) {
          processed = processed.replace(/^(\s*)[-*]\s+/, "$1• ");
        }
        let current = processed;
        current = current.replace(/\*\*(.+?)\*\*/g, (_, c) => this.applyStyles(c, new Set(["bold"])));
        current = current.replace(/__(.+?)__/g, (_, c) => this.applyStyles(c, new Set(["bold"])));
        current = current.replace(/\*([^\s*].*?)\*/g, (_, c) => this.applyStyles(c, new Set(["italic"])));
        current = current.replace(/\b_([^_]+)_\b/g, (_, c) => this.applyStyles(c, new Set(["italic"])));
        current = current.replace(/~~(.+?)~~/g, (_, c) => this.applyStyles(c, new Set(["strikethrough"])));
        current = current.replace(/`([^`]+)`/g, (_, c) => this.applyStyles(c, new Set(["monospace"])));
        return current;
      });
      return processedLines.join("\n");
    }
  }
  const textFormattingService = new TextFormattingService();
  const ALL_BULLETS = /[•●➜►▸■✦◈★✓✗]/;
  const RichEditor = ({
    value,
    onChange,
    placeholder,
    className,
    showUtilities = true,
    autoResize = false,
    onAutoResizeChange,
    productName,
    asin
  }) => {
    const { settings } = useSettings();
    const [activeStyles, setActiveStyles] = React__default.useState( new Set());
    const [isAutoResize, setIsAutoResize] = React__default.useState(autoResize);
    const textareaRef = React__default.useRef(null);
    const valueRef = React__default.useRef(value);
    React__default.useEffect(() => {
      valueRef.current = value;
    }, [value]);
    const bulletStyle = settings.amazon_bullet_style || "•";
    React__default.useEffect(() => {
      setIsAutoResize(autoResize);
    }, [autoResize]);
    const handleAutoResizeToggle = (e) => {
      const newValue = e.target.checked;
      setIsAutoResize(newValue);
      if (onAutoResizeChange) {
        onAutoResizeChange(newValue);
      }
    };
    React__default.useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      if (!isAutoResize) {
        textarea.style.height = "";
        textarea.style.minHeight = "";
        textarea.style.overflowY = "auto";
        return;
      }
      if (!value || value.length === 0) {
        textarea.style.height = "";
        textarea.style.minHeight = "";
        textarea.style.overflowY = "auto";
        return;
      }
      if (!textarea.style.height) {
        const computedHeight = window.getComputedStyle(textarea).height;
        textarea.style.height = computedHeight;
        void textarea.offsetHeight;
      }
      textarea.style.minHeight = "0";
      const adjustHeight = () => {
        const prevHeight = textarea.style.height;
        textarea.style.transition = "none";
        textarea.style.height = "auto";
        const newHeight = Math.max(40, textarea.scrollHeight);
        textarea.style.height = prevHeight;
        void textarea.offsetHeight;
        textarea.style.transition = "";
        textarea.style.height = `${newHeight}px`;
        textarea.style.overflowY = "hidden";
      };
      adjustHeight();
      window.addEventListener("resize", adjustHeight);
      return () => window.removeEventListener("resize", adjustHeight);
    }, [value, isAutoResize]);
    const updateActiveStyles = React__default.useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentText = valueRef.current;
      let textToDetect = "";
      if (start !== end) {
        textToDetect = currentText.substring(start, end);
      } else if (start > 0) {
        textToDetect = currentText.substring(Math.max(0, start - 4), start);
      }
      if (textToDetect) {
        const detected = textFormattingService.detectStyles(textToDetect);
        setActiveStyles(detected);
      } else {
        setActiveStyles( new Set());
      }
    }, []);
    const handleStyleToggle = React__default.useCallback((style2) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selection = valueRef.current.substring(start, end);
      if (start !== end) {
        const currentSelectionStyles = textFormattingService.detectStyles(selection);
        const newStyles = new Set(currentSelectionStyles);
        if (newStyles.has(style2)) {
          newStyles.delete(style2);
        } else {
          newStyles.add(style2);
        }
        const styledText = textFormattingService.applyStyles(selection, newStyles);
        const newValue = valueRef.current.substring(0, start) + styledText + valueRef.current.substring(end);
        valueRef.current = newValue;
        onChange(newValue);
        setActiveStyles(newStyles);
        setTimeout(() => {
          textarea.setSelectionRange(start, start + styledText.length);
          textarea.focus();
        }, 0);
      } else {
        setActiveStyles((prev) => {
          const next = new Set(prev);
          if (next.has(style2)) next.delete(style2);
          else next.add(style2);
          return next;
        });
        textarea.focus();
      }
    }, [value, onChange, activeStyles, updateActiveStyles]);
    const handleListToggle = React__default.useCallback((type) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selection = value.substring(start, end);
      if (selection.includes("\n")) {
        const lines = selection.split("\n");
        const newLines = lines.map((line, i) => {
          const trimmed = line.trimStart();
          if (type === "bullet") {
            const bulletMatch = trimmed.match(new RegExp(`^${ALL_BULLETS.source}\\s`));
            return bulletMatch ? line : `${bulletStyle} ${trimmed}`;
          } else {
            return /^\d+\)\\s/.test(trimmed) ? line : `${i + 1}) ${trimmed}`;
          }
        });
        const newText = newLines.join("\n");
        const newValue = value.substring(0, start) + newText + value.substring(end);
        onChange(newValue);
        setTimeout(() => {
          textarea.setSelectionRange(start, start + newText.length);
          textarea.focus();
        }, 0);
      } else {
        let lineStart = value.lastIndexOf("\n", start - 1) + 1;
        if (lineStart < 0) lineStart = 0;
        const prefix = type === "bullet" ? `${bulletStyle} ` : "1) ";
        const newValue = value.substring(0, lineStart) + prefix + value.substring(lineStart);
        onChange(newValue);
        setTimeout(() => {
          textarea.setSelectionRange(start + prefix.length, start + prefix.length);
          textarea.focus();
        }, 0);
      }
    }, [value, onChange, bulletStyle]);
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "b") {
          e.preventDefault();
          handleStyleToggle("bold");
        }
        if (e.key === "i") {
          e.preventDefault();
          handleStyleToggle("italic");
        }
      }
      if (e.key === "Enter") {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const textBefore = value.substring(0, start);
        const lastNewline = textBefore.lastIndexOf("\n");
        const currentLine = textBefore.substring(lastNewline + 1);
        const bulletMatch = currentLine.trim().match(new RegExp(`^(${ALL_BULLETS.source})`));
        if (bulletMatch) {
          const foundBullet = bulletMatch[1];
          if (currentLine.trim() === foundBullet) {
            e.preventDefault();
            const newValue2 = value.substring(0, lastNewline + 1) + value.substring(start);
            onChange(newValue2);
            return;
          }
          e.preventDefault();
          const prefix = `
${foundBullet} `;
          const newValue = value.substring(0, start) + prefix + value.substring(start);
          onChange(newValue);
          setTimeout(() => {
            textarea.setSelectionRange(start + prefix.length, start + prefix.length);
          }, 0);
          return;
        }
        const numMatch = currentLine.match(/^(\d+)\)\\s/);
        if (numMatch) {
          if (currentLine.trim() === numMatch[0].trim()) {
            e.preventDefault();
            const newValue2 = value.substring(0, lastNewline + 1) + value.substring(start);
            onChange(newValue2);
            return;
          }
          const currentNum = parseInt(numMatch[1], 10);
          const nextNum = currentNum + 1;
          const nextPrefix = `
${nextNum}) `;
          e.preventDefault();
          const newValue = value.substring(0, start) + nextPrefix + value.substring(start);
          onChange(newValue);
          setTimeout(() => {
            textarea.setSelectionRange(start + nextPrefix.length, start + nextPrefix.length);
          }, 0);
          return;
        }
      }
    };
    React__default.useEffect(() => {
      const lines = value.split("\n");
      let expectedNum = 1;
      lines.map((line) => {
        const trimmed = line.trimStart();
        const match = trimmed.match(/^(\d+)\)\\s(.*)/);
        if (match) {
          const currentNum = parseInt(match[1], 10);
          if (currentNum !== expectedNum) {
            const leadingSpace = line.substring(0, line.indexOf(match[0]));
            const content = match[2];
            const newLine = `${leadingSpace}${expectedNum}) ${content}`;
            expectedNum++;
            return newLine;
          }
          expectedNum++;
          return line;
        } else {
          if (trimmed.length > 0) {
            expectedNum = 1;
          }
          return line;
        }
      });
    }, [value]);
    const handleInsert = React__default.useCallback((text) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + text + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        textarea.setSelectionRange(start + text.length, start + text.length);
        textarea.focus();
      }, 0);
    }, [value, onChange]);
    const handleClearStyles = React__default.useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start !== end) {
        const selection = valueRef.current.substring(start, end);
        const plainText = textFormattingService.toPlainText(selection);
        const newValue = valueRef.current.substring(0, start) + plainText + valueRef.current.substring(end);
        valueRef.current = newValue;
        onChange(newValue);
        setActiveStyles( new Set());
        setTimeout(() => {
          textarea.setSelectionRange(start, start + plainText.length);
          textarea.focus();
        }, 0);
      } else {
        const plainText = textFormattingService.toPlainText(valueRef.current);
        valueRef.current = plainText;
        onChange(plainText);
        setActiveStyles( new Set());
        textarea.focus();
      }
    }, [onChange]);
    return React__default.createElement("div", { className: cn("ars-rich-editor", className) }, React__default.createElement(
      EditorToolbar,
      {
        onStyleToggle: handleStyleToggle,
        activeStyles,
        onInsert: handleInsert,
        onReplace: onChange,
        onClearStyles: handleClearStyles,
        showUtilities,
        currentValue: value,
        onListToggle: handleListToggle,
        productName,
        asin
      }
    ), React__default.createElement(
      "textarea",
      {
        ref: textareaRef,
        className: "ars-editor-textarea",
        value,
        onChange: (e) => onChange(e.target.value),
        onSelect: updateActiveStyles,
        onClick: updateActiveStyles,
        onKeyDown: handleKeyDown,
        onKeyUp: updateActiveStyles,
        placeholder
      }
    ), React__default.createElement("div", { className: "ars-editor-footer" }, React__default.createElement("div", { className: "ars-editor-options" }, React__default.createElement("label", { className: "ars-checkbox-label", title: "Automatically resize textbox to fit content" }, React__default.createElement(
      "input",
      {
        type: "checkbox",
        checked: isAutoResize,
        onChange: handleAutoResizeToggle
      }
    ), React__default.createElement("span", null, "Auto-resize"))), React__default.createElement("span", { className: "ars-char-count" }, value.length, " characters")));
  };
  class AIService {
    get settings() {
      return settingsService.getAll();
    }
async generateReview(prompt2, images) {
      const { amazon_ai_provider } = this.settings;
      try {
        if (amazon_ai_provider === "gemini") {
          return await this.generateWithGemini(prompt2, images);
        } else {
          return await this.generateWithLocalLLM(prompt2, images);
        }
      } catch (error) {
        console.error("AI Generation Error:", error);
        return { text: "", error: error.message };
      }
    }
async generateTitle(reviewBody, productTitle, starRating) {
      const { amazon_review_title_style } = this.settings;
      const variationElements = [
        "Focus on the most surprising or unexpected aspect mentioned",
        "Emphasize the personal experience described",
        "Highlight the key decision factor mentioned in the review",
        "Focus on the practical utility or performance reported",
        "Reflect the overall sentiment and emotional tone"
      ];
      const randomVariation = variationElements[Math.floor(Math.random() * variationElements.length)];
      let toneInstructions = "";
      if (starRating) {
        const starText = starRating === 1 ? "very negative" : starRating === 2 ? "negative" : starRating === 3 ? "neutral/mixed" : starRating === 4 ? "positive" : "very positive";
        toneInstructions = `TONE: Match the sentiment of a ${starRating}-star (${starText}) review. Being honest and direct based on the content provided.`;
      }
      const prompt2 = `You are an expert at creating concise Amazon review titles that sound like real customers. Based on the review body below, generate a title that captures the reviewer's authentic voice and experience.

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
- STYLE: The title should be ${amazon_review_title_style === "short" ? "brief (3-6 words)" : "descriptive (6-12 words)"}.
- ${amazon_review_title_style === "titlecase" ? "Format in Title Case." : amazon_review_title_style === "uppercase" ? "Format in ALL CAPS." : "Format in standard sentence case."}
- IMPORTANT: ${randomVariation}.
- ONLY return the title text. No conversational filler or quotes.

RESPONSE FORMAT: Return ONLY the title text.`;
      return this.generateReview(prompt2);
    }
    async generateWithLocalLLM(prompt2, images) {
      const {
        amazon_ai_llm_server_url,
        amazon_ai_local_text_model,
        amazon_ai_timeout_llm
      } = this.settings;
      const messages = [];
      const content = [{ type: "text", text: prompt2 }];
      if (images && images.length > 0) {
        images.forEach((dataUrl) => {
          content.push({
            type: "image_url",
            image_url: {
              url: dataUrl
            }
          });
        });
      }
      messages.push({ role: "user", content });
      const requestBody = {
        model: amazon_ai_local_text_model || "local-model",
messages,
        temperature: 0.7,
        max_tokens: 1e3
      };
      try {
        const response = await fetch(`${amazon_ai_llm_server_url}/v1/chat/completions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
          signal: AbortSignal.timeout(amazon_ai_timeout_llm)
        });
        if (!response.ok) {
          throw new Error(`Local LLM Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return { text: data.choices[0]?.message?.content || "" };
      } finally {
      }
    }
    async generateWithGemini(prompt2, images) {
      const {
        amazon_ai_gemini_key,
        amazon_ai_gemini_model,
        amazon_ai_timeout_llm
      } = this.settings;
      if (!amazon_ai_gemini_key) {
        return { text: "", error: "Gemini API key not found" };
      }
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${amazon_ai_gemini_model}:generateContent?key=${amazon_ai_gemini_key}`;
      const parts = [{ text: prompt2 }];
      if (images && images.length > 0) {
        images.forEach((dataUrl) => {
          const [header, data] = dataUrl.split(";base64,");
          const mimeType = header.replace("data:", "");
          parts.push({
            inline_data: {
              mime_type: mimeType,
              data
            }
          });
        });
      }
      const requestBody = {
        contents: [{
          parts
        }]
      };
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
          signal: AbortSignal.timeout(amazon_ai_timeout_llm)
        });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error?.message || `Gemini API Error: ${response.status}`);
        }
        const data = await response.json();
        return { text: data.candidates?.[0]?.content?.parts?.[0]?.text || "" };
      } finally {
      }
    }
async testConnection() {
      try {
        const result = await this.generateReview("Hello, are you there?");
        return !result.error;
      } catch {
        return false;
      }
    }
  }
  const aiService = new AIService();
  const CACHE_KEY = "ars_product_details_cache";
  const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1e3;
  let memoizedCache = null;
  const getCache = () => {
    if (memoizedCache) return memoizedCache;
    try {
      const data = localStorage.getItem(CACHE_KEY);
      if (data) {
        memoizedCache = JSON.parse(data);
        return memoizedCache;
      }
    } catch (e) {
      console.warn("[ARS] Failed to read cache", e);
    }
    memoizedCache = { timestamp: Date.now(), details: {} };
    return memoizedCache;
  };
  const saveCache = (data) => {
    try {
      data.timestamp = Date.now();
      memoizedCache = data;
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("[ARS] Failed to save cache", e);
    }
  };
  const getCachedInfo = (asin) => {
    const cache = getCache();
    const item = cache.details[asin];
    const isCacheValid = Date.now() - cache.timestamp < CACHE_EXPIRY_MS;
    if (item && isCacheValid) {
      return {
        purchaseDate: item.purchaseDate ? new Date(item.purchaseDate) : void 0,
        category: item.category,
        description: item.description,
        reviews: item.reviews
      };
    }
    return null;
  };
  const fetchPageSource = async (url) => {
    try {
      const response = await fetch(url);
      return await response.text();
    } catch (e) {
      console.error("[ARS] Failed to fetch page source", url, e);
      return null;
    }
  };
  const decodeHtmlEntities = (text) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  const fetchProductContext = async (asin) => {
    const cache = getCache();
    const cachedItem = cache.details[asin];
    const isCacheValid = Date.now() - cache.timestamp < CACHE_EXPIRY_MS;
    if (isCacheValid && cachedItem) {
      return {
        purchaseDate: cachedItem.purchaseDate ? new Date(cachedItem.purchaseDate) : void 0,
        category: cachedItem.category,
        description: cachedItem.description,
        reviews: cachedItem.reviews
      };
    }
    const url = `/dp/${asin}`;
    const html = await fetchPageSource(url);
    if (!html) return {};
    let purchaseDate;
    let category;
    let description;
    let reviews = [];
    const dateMatch = html.match(/class="a-size-medium">\s*You last purchased this item on ([^<]+)</i);
    if (dateMatch) {
      const dateStr = dateMatch[1].trim();
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        purchaseDate = date;
      }
    }
    const bsrRowMatch = html.match(/<tr[^>]*>\s*<th[^>]*>\s*Best Sellers Rank[\s\S]*?<\/tr>/i);
    if (bsrRowMatch) {
      const bsrRowHtml = bsrRowMatch[0];
      const categoryMatches = [];
      const bsrItemRegex = /<span[^>]*class="a-list-item"[^>]*>([\s\S]*?)<\/span>/gi;
      let match;
      while ((match = bsrItemRegex.exec(bsrRowHtml)) !== null) {
        const htmlText = match[1];
        const anchorMatch = htmlText.match(/#\d+[\d,]* in\s*<a[^>]*>([^<]+)<\/a>/i);
        if (anchorMatch?.[1]) {
          categoryMatches.push(decodeHtmlEntities(anchorMatch[1].trim()));
          continue;
        }
        const text = htmlText.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
        const rankCat = text.match(/#\d+[\d,]* in ([^\(\n]+)/i);
        if (rankCat?.[1]) {
          categoryMatches.push(decodeHtmlEntities(rankCat[1].trim()));
        }
      }
      if (categoryMatches.length > 0) {
        category = categoryMatches[0];
      }
    }
    if (!category) {
      const breadcrumbMatch = html.match(/<div[^>]*id="wayfinding-breadcrumbs_feature_div"[^>]*>([\s\S]*?)<\/div>/i);
      if (breadcrumbMatch) {
        const breadcrumbHtml = breadcrumbMatch[1];
        const breadcrumbLinks = breadcrumbHtml.match(/<a[^>]*>([^<]+)<\/a>/gi);
        if (breadcrumbLinks) {
          const breadcrumbCategories = breadcrumbLinks.map((link) => decodeHtmlEntities(link.replace(/<[^>]+>/g, "").trim())).filter((text) => text && !text.includes("Amazon") && !text.includes("Home"));
          if (breadcrumbCategories.length > 0) {
            category = breadcrumbCategories[0];
          }
        }
      }
    }
    const bulletsMatch = html.match(/<div[^>]*id="feature-bullets"[^>]*>([\s\S]*?)<\/div>/i);
    if (bulletsMatch) {
      const bulletsHtml = bulletsMatch[1];
      const bullets = bulletsHtml.match(/<span[^>]*class="a-list-item"[^>]*>([\s\S]*?)<\/span>/gi);
      if (bullets) {
        description = bullets.map((b) => decodeHtmlEntities(b.replace(/<[^>]+>/g, "").trim())).filter((t) => t.length > 0).join("\n");
      }
    }
    if (!description) {
      const descMatch = html.match(/<div[^>]*id="productDescription"[^>]*>([\s\S]*?)<\/div>/i);
      if (descMatch) {
        description = decodeHtmlEntities(descMatch[1].replace(/<[^>]+>/g, "").trim());
      }
    }
    const reviewBodyRegex = /data-hook="review-body"[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/gi;
    let reviewMatch;
    let count = 0;
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const reviewElements = doc.querySelectorAll('[data-hook="review-body"] span');
      reviewElements.forEach((el) => {
        if (count < 3) {
          const text = el.textContent?.trim();
          if (text && text.length > 20) {
            reviews.push(text);
            count++;
          }
        }
      });
    } catch (e) {
      console.warn("[ARS] DOMParser failed, using regex fallback", e);
      while ((reviewMatch = reviewBodyRegex.exec(html)) !== null && count < 3) {
        const text = decodeHtmlEntities(reviewMatch[1].replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").trim());
        if (text.length > 20) {
          reviews.push(text);
          count++;
        }
      }
    }
    cache.details[asin] = {
      purchaseDate: purchaseDate?.toISOString(),
      category: category || "Uncategorized",
      description,
      reviews
    };
    saveCache(cache);
    return { purchaseDate, category: category || "Uncategorized", description, reviews };
  };
  const fetchProductDetails = async (candidate) => {
    const details = await fetchProductContext(candidate.asin);
    return {
      purchaseDate: details.purchaseDate,
      category: details.category
    };
  };
  async function compressImage(dataUrl, maxWidth = 1024) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round(height * maxWidth / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL("image/jpeg", 0.8);
        resolve(compressed);
      };
      img.onerror = (e) => reject(e);
      img.src = dataUrl;
    });
  }
  async function getUploadedImages() {
    try {
      const nodes = Array.from(document.querySelectorAll(
        ".in-context-ryp__form-field__thumbnails .in-context-ryp__form-field___thumbnails--image"
      ));
      if (nodes.length === 0) return [];
      const urls = nodes.map((n) => n.getAttribute("style") || "").map((style2) => {
        const match = style2.match(/background-image:\s*url\(("|')?(.*?)("|')?\)/i);
        return match ? match[2] : null;
      }).filter(Boolean);
      const uniqueUrls = Array.from(new Set(urls));
      async function blobToDataUrl(blobUrl) {
        try {
          const res = await fetch(blobUrl);
          const blob = await res.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (e) {
          console.warn("[ARS] Failed to convert blob to dataUrl", e);
          return "";
        }
      }
      const dataUrls = [];
      const targets = uniqueUrls.slice(0, 5);
      for (const url of targets) {
        let base64 = "";
        if (url.startsWith("data:image/")) {
          base64 = url;
        } else if (url.startsWith("blob:")) {
          base64 = await blobToDataUrl(url);
        } else {
          try {
            const res = await fetch(url, { mode: "cors" });
            const blob = await res.blob();
            base64 = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
          } catch (e) {
            console.warn("[ARS] Failed to fetch external image", url, e);
          }
        }
        if (base64) {
          try {
            const compressed = await compressImage(base64);
            dataUrls.push(compressed);
          } catch (e) {
            console.error("[ARS] Compression failed", e);
            dataUrls.push(base64);
          }
        }
      }
      return dataUrls;
    } catch (e) {
      console.error("[ARS] Image extraction failed", e);
      return [];
    }
  }
  const AIModal = ({ isOpen, onClose, onInsert, productTitle = "", asin, starRating, existingReviewText = "" }) => {
    const MIN_CHARS = 500;
    const { settings, setSetting } = useSettings();
    const [userThoughts, setUserThoughts] = React__default.useState("");
    const [additionalInstructions, setAdditionalInstructions] = React__default.useState("");
    const [useExistingReview, setUseExistingReview] = React__default.useState(false);
    const [reviewLength, setReviewLength] = React__default.useState("normal");
    const [isGenerating, setIsGenerating] = React__default.useState(false);
    const [generatedText, setGeneratedText] = React__default.useState("");
    const [error, setError] = React__default.useState(null);
    const [productContext, setProductContext] = React__default.useState(null);
    const [contextFetched, setContextFetched] = React__default.useState(false);
    const [showPreview, setShowPreview] = React__default.useState(false);
    const [includeImages, setIncludeImages] = React__default.useState(settings.amazon_ai_include_images_default);
    const [visionStatus, setVisionStatus] = React__default.useState(null);
    React__default.useEffect(() => {
      if (isOpen && asin && !contextFetched) {
        const fetchContext = async () => {
          try {
            const details = await fetchProductContext(asin);
            setProductContext({
              description: details.description,
              reviews: details.reviews
            });
          } catch (e) {
            console.error("Failed to fetch product context:", e);
          } finally {
            setContextFetched(true);
          }
        };
        fetchContext();
      }
    }, [isOpen, asin, contextFetched]);
    React__default.useEffect(() => {
    }, [isOpen]);
    React__default.useEffect(() => {
      setContextFetched(false);
      setProductContext(null);
    }, [asin]);
    const finalPrompt = React__default.useMemo(() => {
      let lengthInstruction = "";
      let markdownInstruction = "";
      switch (reviewLength) {
        case "short":
          lengthInstruction = "Keep it concise and to the point (approx 100 words).";
          break;
        case "normal":
          lengthInstruction = "Write a standard length review (approx 250 words).";
          break;
        case "long":
          lengthInstruction = "Write a comprehensive review (approx 500 words).";
          markdownInstruction = `
Formatting Instructions:
- Use Markdown for formatting.
- Use # for the main title.
- Use ## for section headers.
- Use **bold** for emphasis.
- Use *italics* for subtle emphasis.
- Use - or * for bullet points.`;
          break;
        case "detailed":
          lengthInstruction = "Write an extensive, in-depth review (approx 750+ words).";
          markdownInstruction = `
Formatting Instructions:
- Use Markdown for formatting.
- Use # for the main title.
- Use ## for section headers.
- Use **bold** for emphasis.
- Use *italics* for subtle emphasis.
- Use - or * for bullet points.`;
          break;
      }
      let p = `Write a helpful product review for: ${productTitle || "this product"}.
        
IMPORTANT: Output ONLY the review content. Do not include any introductory or concluding remarks like "Here is a review" or "I hope this helps". Start directly with the review title or body. 

RULES: Absolutely NO marketing language, no hype, no exaggerated claims, keep language plain and grounded. Avoid phrases like "game changer", "must have", "look no further", "It's not X, it's Y", or rhetorical questions. You must never use em dashes (—). 

TONE: Write in a candid way, like you're jotting your own thoughts as they come up while using the product. Structure can be loose or out of order. Don’t give an overview of the product or list features; only mention specifics that naturally surfaced during one's use of the product.

${lengthInstruction}
${markdownInstruction}`;
      if (productContext?.description) {
        const desc = productContext.description.slice(0, 500) + (productContext.description.length > 500 ? "..." : "");
        p += `

[Product Description]
${desc}`;
      }
      if (productContext?.reviews && productContext.reviews.length > 0) {
        p += `

[Top Reviews Summary]
${productContext.reviews.map((r) => "- " + r.slice(0, 150) + "...").join("\n")}`;
      }
      if (starRating && starRating > 0) {
        p += `

The user has rated this product ${starRating} out of 5 stars.`;
      }
      const currentThoughts = useExistingReview ? existingReviewText : userThoughts;
      if (currentThoughts.trim()) {
        p += `

User's Initial Thoughts / Specific Points to Cover:
${currentThoughts}`;
      }
      if (additionalInstructions.trim()) {
        p += `

Additional User Instructions (Tone, Focus, etc.):
${additionalInstructions}`;
      }
      return p;
    }, [productTitle, productContext, starRating, userThoughts, existingReviewText, useExistingReview, reviewLength]);
    const handleGenerate = async () => {
      setIsGenerating(true);
      setError(null);
      setVisionStatus(null);
      try {
        let images = [];
        if (includeImages) {
          setVisionStatus("Extracting and compressing images...");
          images = await getUploadedImages();
          if (images.length > 0) {
            setVisionStatus(`Analyzed ${images.length} image(s) for context.`);
          } else {
            setVisionStatus("No images found to analyze.");
          }
        }
        const response = await aiService.generateReview(finalPrompt, images);
        if (!response.error) {
          const shouldConvert = settings.amazon_ai_convert_markdown;
          const finalText = shouldConvert ? textFormattingService.convertMarkdownToUnicode(response.text) : response.text;
          setGeneratedText(finalText);
        } else {
          setError(response.error || "Failed to generate review");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error(err);
      } finally {
        setIsGenerating(false);
      }
    };
    const handleInsert = () => {
      onInsert(generatedText);
      onClose();
    };
    const footer = React__default.createElement(React__default.Fragment, null, React__default.createElement(Button, { variant: "ghost", onClick: onClose }, "Cancel"), React__default.createElement(
      Button,
      {
        variant: "primary",
        onClick: handleInsert,
        disabled: !generatedText || isGenerating
      },
React__default.createElement(Copy, { size: 16, style: { marginRight: 8 } }),
      "Insert into Review"
    ));
    return React__default.createElement(
      Modal,
      {
        isOpen,
        onClose,
        title: "AI Review Assistant",
        width: "700px",
        footer
      },
React__default.createElement("div", { className: "ars-ai-modal-body" }, React__default.createElement("div", { className: "ars-ai-settings-compact" }, React__default.createElement(Card, { padding: "sm", className: "ars-ai-provider-card" }, React__default.createElement("span", { className: "ars-label" }, "Provider:"), React__default.createElement(
        "select",
        {
          value: settings.amazon_ai_provider,
          onChange: (e) => setSetting("amazon_ai_provider", e.target.value),
          className: "ars-select"
        },
React__default.createElement("option", { value: "gemini" }, "Google Gemini"),
React__default.createElement("option", { value: "local" }, "Local LLM (LM Studio/Ollama)")
      )), React__default.createElement(Card, { padding: "sm", className: "ars-ai-length-card" }, React__default.createElement("span", { className: "ars-label" }, "Length:"), React__default.createElement("div", { className: "ars-ai-length-selector" }, ["short", "normal", "long", "detailed"].map((len) => React__default.createElement(
        "button",
        {
          key: len,
          className: `ars-ai-length-btn ${reviewLength === len ? "active" : ""}`,
          onClick: () => setReviewLength(len),
          title: `${len.charAt(0).toUpperCase() + len.slice(1)} Review`
        },
        len.charAt(0).toUpperCase() + len.slice(1)
      )))), React__default.createElement(Card, { padding: "sm", className: "ars-ai-vision-card" }, React__default.createElement("label", { className: "flex items-center gap-2 cursor-pointer" }, React__default.createElement(
        "input",
        {
          type: "checkbox",
          checked: includeImages,
          onChange: (e) => setIncludeImages(e.target.checked),
          className: "ars-checkbox"
        }
      ), React__default.createElement("span", { className: "ars-label mb-0 flex items-center gap-1" }, React__default.createElement(Image$1, { size: 14 }), "Include Images")))), React__default.createElement("div", { className: "ars-ai-prompt-section" }, React__default.createElement("div", { className: "flex justify-between items-end mb-2" }, React__default.createElement("div", { className: "flex flex-col gap-1" }, React__default.createElement("label", { className: "ars-label mb-0 flex items-center gap-1" }, "Your Initial Thoughts ", React__default.createElement("span", { style: { color: "#dc2626" } }, "*")), existingReviewText.length >= MIN_CHARS && React__default.createElement("label", { className: "flex items-center gap-2 text-[11px] cursor-pointer select-none text-gray-500 hover:text-gray-700 transition-colors" }, React__default.createElement(
        "input",
        {
          type: "checkbox",
          checked: useExistingReview,
          onChange: (e) => setUseExistingReview(e.target.checked),
          className: "ars-checkbox"
        }
      ), React__default.createElement("span", { style: { color: useExistingReview ? "var(--ars-color-primary)" : "inherit", fontWeight: useExistingReview ? 600 : 400 } }, "Use existing review text as prompt"))), React__default.createElement(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => setShowPreview(!showPreview),
          className: "text-[10px] h-7 px-2 border border-gray-200",
          icon: showPreview ? React__default.createElement(EyeOff, { size: 11 }) : React__default.createElement(Eye, { size: 11 })
        },
        showPreview ? "Hide Full Prompt" : "Preview Full Prompt"
      )), React__default.createElement("div", { style: { position: "relative" } }, React__default.createElement(
        "textarea",
        {
          className: "ars-ai-prompt-input",
          placeholder: `Enter your opinion, pros/cons, or specific points you want the AI to cover${` (min. ${MIN_CHARS} characters)`}...`,
          value: useExistingReview ? existingReviewText : userThoughts,
          onChange: (e) => !useExistingReview && setUserThoughts(e.target.value),
          style: {
            minHeight: "140px",
            opacity: useExistingReview ? 0.7 : 1,
            cursor: useExistingReview ? "not-allowed" : "text",
            backgroundColor: useExistingReview ? "#fbfcfd" : "white",
            borderColor: !useExistingReview && userThoughts.length > 0 && userThoughts.length < MIN_CHARS ? "#fca5a5" : "var(--ars-color-border)"
          },
          disabled: useExistingReview
        }
      ), !useExistingReview && React__default.createElement("div", { className: `absolute bottom-2 right-3 text-[10px] font-bold px-1.5 py-0.5 rounded ${userThoughts.length >= MIN_CHARS ? "text-green-600 bg-green-50" : "text-gray-400 bg-gray-50"}` }, userThoughts.length, " / ", MIN_CHARS), useExistingReview && React__default.createElement("div", { className: "absolute bottom-2 right-3 text-[10px] font-bold px-1.5 py-0.5 rounded text-blue-600 bg-blue-50" }, "Existing Text Used (", existingReviewText.length, " chars)")), React__default.createElement("div", { className: "mt-3" }, React__default.createElement("label", { className: "ars-label mb-1 text-xs text-gray-500 font-medium" }, "Additional Instructions ", React__default.createElement("span", { className: "text-[10px] text-gray-400 font-normal ml-1" }, "(Optional)")), React__default.createElement(
        "input",
        {
          type: "text",
          className: "ars-ai-prompt-input !text-xs !py-2 !px-3 !h-auto",
          placeholder: "e.g. Keep it humorous, focus on durability, avoid mentioning price...",
          value: additionalInstructions,
          onChange: (e) => setAdditionalInstructions(e.target.value),
          style: { minHeight: "38px" }
        }
      )), showPreview && React__default.createElement("div", { className: "ars-ai-prompt-preview mt-2 p-3 bg-gray-50 border rounded text-xs font-mono text-gray-600 overflow-y-auto max-h-40 whitespace-pre-wrap" }, finalPrompt), React__default.createElement(
        Button,
        {
          className: "ars-generate-btn mt-3",
          onClick: handleGenerate,
          isLoading: isGenerating,
          disabled: isGenerating || (useExistingReview ? existingReviewText.length < MIN_CHARS : userThoughts.length < MIN_CHARS),
          icon: React__default.createElement(Sparkles, { size: 18 })
        },
        "Generate Review"
      ), visionStatus && React__default.createElement("div", { className: "ars-ai-vision-status mt-2 text-xs text-blue-600 flex items-center gap-1" }, isGenerating && includeImages && visionStatus.includes("Extracting") ? React__default.createElement(LoaderCircle, { size: 12, className: "animate-spin" }) : React__default.createElement(Image$1, { size: 12 }), visionStatus)), error && React__default.createElement("div", { className: "ars-ai-error" }, error), React__default.createElement("div", { className: "ars-ai-result-section" }, React__default.createElement("label", { className: "ars-label" }, "Generated Review:"), React__default.createElement("div", { className: "ars-ai-result-container" }, generatedText ? React__default.createElement("p", { className: "ars-ai-result-text" }, generatedText) : React__default.createElement("div", { className: "ars-ai-placeholder" }, "Your generated review will appear here..."))))
    );
  };
  const StarsIcon$1 = ({ size = 18, className = "" }) => React__default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className
    },
React__default.createElement("path", { d: "M11 21c-4.97 0-9-4.03-9-9s4.03-9 9-9c.83 0 1.62.11 2.37.32-2.18 1.39-3.62 3.8-3.62 6.5s1.44 5.11 3.62 6.5c-.75.21-1.54.32-2.37.32z" }),
React__default.createElement("circle", { cx: "18", cy: "5", r: "1.2" }),
React__default.createElement("circle", { cx: "21", cy: "9", r: "0.8" }),
React__default.createElement("circle", { cx: "15", cy: "4", r: "0.6" }),
React__default.createElement("circle", { cx: "22", cy: "3", r: "0.5" }),
React__default.createElement("circle", { cx: "17", cy: "11", r: "0.7" }),
React__default.createElement("circle", { cx: "20", cy: "16", r: "0.6" }),
React__default.createElement("path", { d: "M19 14l.3 1.1 1.1.3-1.1.3-.3 1.1-.3-1.1-1.1-.3 1.1-.3z" }),
React__default.createElement("path", { d: "M12 7l.2.8.8.2-.8.2-.2.8-.2-.8-.8-.2.8-.2z" })
  );
  const SaveIndicator = ({ status }) => {
    if (status === "idle") return null;
    const config = {
      saving: { icon: React__default.createElement(LoaderCircle, { size: 12, className: "animate-spin" }), text: "Saving draft...", color: "text-gray-500" },
      saved: { icon: React__default.createElement(Check, { size: 12 }), text: "Draft saved", color: "text-green-600" },
      error: { icon: React__default.createElement(CircleAlert, { size: 12 }), text: "Save failed", color: "text-red-500" }
    }[status];
    if (!config) return null;
    return React__default.createElement("div", { className: `ars-save-indicator flex items-center gap-1.5 text-xs font-medium transition-opacity duration-300 ${config.color}` }, config.icon, React__default.createElement("span", null, config.text));
  };
  const ReviewFormShell = () => {
    const amazon = useAmazonForm();
    const { settings, setSetting } = useSettings();
    const [isAIModalOpen, setIsAIModalOpen] = React__default.useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = React__default.useState(false);
    const [showPasteFeedback, setShowPasteFeedback] = React__default.useState(false);
    const [isGeneratingTitle, setIsGeneratingTitle] = React__default.useState(false);
    const pressTimer = React__default.useRef(null);
    const isLongPress = React__default.useRef(false);
    const handleLightsPressStart = () => {
      isLongPress.current = false;
      pressTimer.current = setTimeout(() => {
        isLongPress.current = true;
        setSetting("dark_mode", !settings.dark_mode);
      }, 600);
    };
    const handleLightsPressEnd = (e) => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
        pressTimer.current = null;
      }
      if (!isLongPress.current) {
        setSetting("amazon_ui_lights_off", !settings.amazon_ui_lights_off);
      }
    };
    React__default.useEffect(() => {
      const styleId = "ars-lights-off-global";
      if (settings.amazon_ui_lights_off) {
        if (!document.getElementById(styleId)) {
          const styleEl = document.createElement("style");
          styleEl.id = styleId;
          styleEl.textContent = `
                    #amazon-review-studio-root {
                        position: relative !important;
                        z-index: 1000000 !important;
                    }
                    #navbar-main {
                        position: relative !important;
                        z-index: 1000001 !important;
                        pointer-events: auto !important;
                    }
                    body::after {
                        content: '';
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.85);
                        z-index: 999999;
                        pointer-events: none;
                        transition: opacity 0.4s ease;
                        animation: ars-fade-in 0.4s ease forwards;
                    }
                    @keyframes ars-fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .swal2-container {
                        z-index: 1000002 !important;
                    }
                `;
          document.head.appendChild(styleEl);
        }
      } else {
        const el = document.getElementById(styleId);
        if (el) el.remove();
      }
      return () => {
        const el = document.getElementById(styleId);
        if (el) el.remove();
      };
    }, [settings.amazon_ui_lights_off]);
    React__default.useEffect(() => {
      if (!showPasteFeedback) return;
      const t = setTimeout(() => setShowPasteFeedback(false), 2e3);
      return () => clearTimeout(t);
    }, [showPasteFeedback]);
    const handlePasteSuccess = () => setShowPasteFeedback(true);
    const globalPasteRef = React__default.useRef(null);
    globalPasteRef.current = (e) => {
      const el = document.activeElement;
      const isInput = el?.tagName === "INPUT" || el?.tagName === "TEXTAREA" || el?.isContentEditable;
      if (isInput) return;
      const hasImage = Array.from(e.clipboardData?.items ?? []).some((item) => item.type.startsWith("image/"));
      if (!hasImage) return;
      e.preventDefault();
      amazon.pasteImageFromClipboard(e).then((result) => {
        if (result === "ok") setShowPasteFeedback(true);
      });
    };
    React__default.useEffect(() => {
      const handler = (e) => globalPasteRef.current?.(e);
      document.addEventListener("paste", handler, true);
      return () => document.removeEventListener("paste", handler, true);
    }, []);
    React__default.useEffect(() => {
      if (!settings.demo_enabled || !amazon.isReady) return;
      let isCancelled = false;
      const bodyText = settings.demo_review_body || "";
      const titleText = settings.demo_review_title || "";
      const initialDelay = settings.demo_typing_delay * 1e3;
      const charDelay = settings.demo_typing_speed === "slow" ? 80 : settings.demo_typing_speed === "fast" ? 20 : 45;
      const typeSimulation = async () => {
        await new Promise((resolve) => setTimeout(resolve, initialDelay));
        if (isCancelled) return;
        if (bodyText) {
          for (let i = 0; i <= bodyText.length; i++) {
            if (isCancelled) break;
            amazon.setReviewText(bodyText.substring(0, i));
            await new Promise((resolve) => setTimeout(resolve, charDelay));
            if (i === 1) {
              await new Promise((resolve) => setTimeout(resolve, 1e3));
            }
          }
        }
        if (isCancelled) return;
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (isCancelled) return;
        if (titleText) {
          for (let i = 0; i <= titleText.length; i++) {
            if (isCancelled) break;
            amazon.setReviewTitle(titleText.substring(0, i));
            await new Promise((resolve) => setTimeout(resolve, charDelay));
          }
        }
      };
      typeSimulation();
      return () => {
        isCancelled = true;
      };
    }, [settings.demo_enabled, amazon.isReady]);
    React__default.useEffect(() => {
      const handleBeforeUnload = (e) => {
        if (amazon.state.reviewText.trim().length > 0) {
          e.preventDefault();
          e.returnValue = "";
        }
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [amazon.state.reviewText]);
    const handleInsertAI = (text) => {
      const prev = amazon.state.reviewText;
      amazon.setReviewText(prev + (prev ? "\n\n" : "") + text);
    };
    const handleGenerateTitle = async () => {
      const reviewText = amazon.state.reviewText.trim();
      if (!reviewText) {
        alert("Please write some review content first before generating a title.");
        return;
      }
      setIsGeneratingTitle(true);
      try {
        const response = await aiService.generateTitle(
          reviewText,
          amazon.product.name,
          amazon.state.starRating
        );
        if (response.text && !response.error) {
          amazon.setReviewTitle(response.text.trim());
        } else if (response.error) {
          alert(`Title Generation Error: ${response.error}`);
        }
      } catch (err) {
        console.error("Title Generation Error:", err);
      } finally {
        setIsGeneratingTitle(false);
      }
    };
    if (!amazon.isReady) {
      return React__default.createElement("div", { className: "ars-review-shell ars-review-shell--loading", key: "loading" }, React__default.createElement("p", null, "Loading review form..."));
    }
    return React__default.createElement("div", { className: "ars-review-shell", key: "ready" }, React__default.createElement(
      ProfileSection,
      {
        avatarSrc: amazon.profile.avatarSrc,
        name: amazon.profile.name
      }
    ), React__default.createElement("form", { className: "ars-review-form-container", autoComplete: "off", onSubmit: (e) => e.preventDefault() }, React__default.createElement("input", { type: "text", style: { display: "none" }, tabIndex: -1, "aria-hidden": "true", value: "", readOnly: true, autoComplete: "false" }), React__default.createElement(
      ProductHeader,
      {
        imageSrc: amazon.product.imageSrc,
        title: amazon.product.title,
        name: amazon.product.name,
        productUrl: amazon.product.productUrl || void 0
      }
    ), React__default.createElement("div", { className: "ars-review-form-fields" }, React__default.createElement("div", { className: "ars-form-field" }, React__default.createElement(
      StarRating,
      {
        value: amazon.state.starRating,
        onChange: amazon.setStarRating
      }
    )), React__default.createElement("div", { className: "ars-form-field" }, React__default.createElement("div", { className: "ars-form-field-label-row" }, React__default.createElement("div", { className: "flex items-center gap-3" }, React__default.createElement("label", { className: "ars-form-label" }, "Write a review"), React__default.createElement(SaveIndicator, { status: amazon.syncStatus })), settings.amazon_ai_enabled && React__default.createElement(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: () => setIsAIModalOpen(true),
        className: "ars-ai-trigger"
      },
React__default.createElement(Sparkles, { size: 14 }),
      "AI Assistant"
    )), React__default.createElement(
      RichEditor,
      {
        value: amazon.state.reviewText,
        onChange: amazon.setReviewText,
        placeholder: "What should other customers know?",
        autoResize: settings.amazon_editor_auto_resize,
        onAutoResizeChange: (enabled) => setSetting("amazon_editor_auto_resize", enabled)
      }
    )), React__default.createElement("div", { className: "ars-form-field" }, React__default.createElement("label", { className: "ars-form-label" }, "Share a video or photo"), React__default.createElement(
      MediaUpload,
      {
        onTrigger: amazon.triggerMediaUpload,
        onPasteFromClipboard: amazon.pasteImageFromClipboard,
        onPasteSuccess: handlePasteSuccess,
        onFilesDropped: amazon.setMediaFiles,
        thumbnails: amazon.state.mediaThumbnails,
        onRemove: amazon.removeMedia,
        showPasteFeedback,
        placeholder: "Drag-and-drop or Crtl+V your images here!"
      }
    )), React__default.createElement("div", { className: "ars-form-field" }, React__default.createElement(
      Input,
      {
        id: "reviewTitle",
        label: "Title your review (required)",
        placeholder: "What's most important to know?",
        value: amazon.state.reviewTitle,
        onChange: (e) => amazon.setReviewTitle(e.target.value),
        name: "ars-review-title",
        autoComplete: "off-title",
        spellCheck: false,
        autoCorrect: "off",
        autoCapitalize: "off",
        suffix: settings.amazon_ai_enabled && React__default.createElement(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              handleGenerateTitle();
            },
            style: { pointerEvents: "auto", background: "white" },
            isLoading: isGeneratingTitle,
            className: "ars-ai-trigger",
            title: "Generate title from review body"
          },
          !isGeneratingTitle && React__default.createElement(Sparkles, { size: 14 })
        )
      }
    )))), React__default.createElement("div", { className: "ars-review-submit" }, React__default.createElement("div", { className: "flex items-center gap-4" }, amazon.lastSaved && React__default.createElement("div", { className: "text-xs text-gray-500 font-medium" }, "Draft saved ", amazon.lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))), React__default.createElement("div", { className: "ars-submit-group" }, React__default.createElement(SaveIndicator, { status: amazon.syncStatus }), React__default.createElement(
      Button,
      {
        variant: "outline",
        size: "md",
        onClick: () => {
          const hasContent = amazon.state.reviewText.trim().length > 0;
          if (hasContent) {
            if (window.confirm("You have unsaved changes in your review. Are you sure you want to go back?")) {
              window.location.href = "https://www.amazon.ca/review/review-your-purchases/listing";
            }
          } else {
            window.location.href = "https://www.amazon.ca/review/review-your-purchases/listing";
          }
        },
        className: "ars-back-button",
        icon: React__default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, React__default.createElement("path", { d: "M19 12H5M12 19l-7-7 7-7" }))
      },
      "Back"
    ), React__default.createElement(
      Button,
      {
        variant: "primary",
        size: "lg",
        onClick: amazon.submit,
        icon: React__default.createElement(Send, { size: 20 }),
        type: "button"
      },
      "Submit"
    ))), React__default.createElement(
      AIModal,
      {
        isOpen: isAIModalOpen,
        onClose: () => setIsAIModalOpen(false),
        onInsert: handleInsertAI,
        productTitle: amazon.product.name,
        asin: amazon.product.asin,
        starRating: amazon.state.starRating,
        existingReviewText: amazon.state.reviewText
      }
    ), React__default.createElement(
      SettingsDashboard,
      {
        isOpen: isSettingsOpen,
        onClose: () => setIsSettingsOpen(false)
      }
    ), React__default.createElement("div", { className: "ars-header-actions" }, React__default.createElement(
      "button",
      {
        type: "button",
        className: `ars-action-button ${settings.amazon_ui_lights_off ? "active" : ""} ${settings.dark_mode ? "!text-yellow-400" : ""}`,
        onMouseDown: handleLightsPressStart,
        onMouseUp: handleLightsPressEnd,
        onMouseLeave: () => {
          if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
          }
        },
        onTouchStart: handleLightsPressStart,
        onTouchEnd: handleLightsPressEnd,
        "aria-label": settings.dark_mode ? "Dark Mode On (Long Press to Toggle)" : "Lights Off",
        title: "Lights Off (Long Press for Dark Mode)"
      },
      settings.dark_mode ? React__default.createElement(StarsIcon$1, { size: 18 }) : React__default.createElement(Moon, { size: 18 })
    ), React__default.createElement(
      "button",
      {
        type: "button",
        className: "ars-action-button",
        onClick: () => setIsSettingsOpen(true),
        "aria-label": "Settings"
      },
React__default.createElement(Settings, { size: 18 })
    )));
  };
  const stringifyUnordered = (items) => {
    const sorted = [...items].sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    return JSON.stringify(sorted);
  };
  function useAutoSync() {
    const { templates, phrases, isLoaded } = useContent();
    const { syncTemplatesToCloud, syncPhrasesToCloud, isLoading } = usePastebin();
    const { settings } = useSettings();
    const prevTemplatesRef = React__default.useRef(null);
    const prevPhrasesRef = React__default.useRef(null);
    React__default.useEffect(() => {
      if (!isLoaded) {
        return;
      }
      if (prevTemplatesRef.current === null) {
        prevTemplatesRef.current = stringifyUnordered(templates);
      }
      if (prevPhrasesRef.current === null) {
        prevPhrasesRef.current = stringifyUnordered(phrases);
      }
      if (!settings.amazon_pastebin_api_dev_key || !settings.amazon_pastebin_api_user_key) {
        return;
      }
      const quota = getSyncQuota();
      if (quota.count >= 18) {
        console.warn("[Auto-Sync] Quota limit approaching. Disabling auto-sync to preserve remaining slots.");
        return;
      }
      const currentTemplatesJson = stringifyUnordered(templates);
      const currentPhrasesJson = stringifyUnordered(phrases);
      const templatesChanged = currentTemplatesJson !== prevTemplatesRef.current;
      const phrasesChanged = currentPhrasesJson !== prevPhrasesRef.current;
      if ((templatesChanged || phrasesChanged) && !isLoading) {
        console.log(`[Auto-Sync] Detected content changes (${templatesChanged ? "Templates" : ""}${templatesChanged && phrasesChanged ? ", " : ""}${phrasesChanged ? "Phrases" : ""}), triggering cloud sync...`);
        prevTemplatesRef.current = currentTemplatesJson;
        prevPhrasesRef.current = currentPhrasesJson;
        const timer = setTimeout(() => {
          if (templatesChanged && settings.amazon_auto_sync_templates) {
            syncTemplatesToCloud().then((res) => {
              if (res.success) console.log("[Auto-Sync] Successfully synced Templates.");
              else console.warn("[Auto-Sync] Failed to sync Templates:", res.message);
            });
          }
          if (phrasesChanged && settings.amazon_auto_sync_phrases) {
            syncPhrasesToCloud().then((res) => {
              if (res.success) console.log("[Auto-Sync] Successfully synced Phrases.");
              else console.warn("[Auto-Sync] Failed to sync Phrases:", res.message);
            });
          }
        }, 1e3);
        return () => clearTimeout(timer);
      }
    }, [templates, phrases, isLoaded, settings.amazon_pastebin_api_dev_key, settings.amazon_pastebin_api_user_key, syncTemplatesToCloud, syncPhrasesToCloud, isLoading]);
  }
  const AutoSyncWatcher = () => {
    useAutoSync();
    return null;
  };
  const ScalingWrapper = ({ children }) => {
    const { settings, setSetting } = useSettings();
    const [isResizing, setIsResizing] = React__default.useState(false);
    const containerRef = React__default.useRef(null);
    const dragRef = React__default.useRef(null);
    const scale2 = settings.amazon_ui_scale ?? 1;
    const startResize = React__default.useCallback((e) => {
      e.preventDefault();
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      dragRef.current = {
        startX: e.clientX,
        startScale: scale2,
        unscaledWidth: rect.width / scale2
      };
      setIsResizing(true);
    }, [scale2]);
    React__default.useEffect(() => {
      if (!isResizing || !dragRef.current) return;
      const handleMouseMove = (e) => {
        const { startX, startScale, unscaledWidth } = dragRef.current;
        const deltaX = e.clientX - startX;
        let newScale = startScale + deltaX / unscaledWidth;
        newScale = Math.max(0.5, Math.min(1, newScale));
        newScale = Math.round(newScale * 100) / 100;
        if (newScale !== scale2) {
          setSetting("amazon_ui_scale", newScale);
        }
      };
      const handleMouseUp = () => {
        setIsResizing(false);
        dragRef.current = null;
      };
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isResizing, scale2, setSetting]);
    const [compHeight, setCompHeight] = React__default.useState("auto");
    const [compWidth, setCompWidth] = React__default.useState("auto");
    const contentRef = React__default.useRef(null);
    React__default.useEffect(() => {
      if (!contentRef.current) return;
      const updateDimensions = () => {
        if (contentRef.current) {
          setCompHeight(contentRef.current.offsetHeight * scale2);
          setCompWidth(contentRef.current.offsetWidth * scale2);
        }
      };
      const observer2 = new ResizeObserver(updateDimensions);
      observer2.observe(contentRef.current);
      updateDimensions();
      return () => observer2.disconnect();
    }, [scale2]);
    return React__default.createElement(
      "div",
      {
        ref: containerRef,
        className: `ars-scaling-wrapper ${isResizing ? "is-resizing" : ""} ${settings.dark_mode ? "ars-dark-mode" : ""}`,
        style: {
          height: compHeight || "auto",
          width: "100%",
          position: "relative"
        }
      },
React__default.createElement(
        "div",
        {
          className: "ars-scaling-content",
          style: {
            transform: `scale(${scale2})`,
            transformOrigin: "top center",
            width: "100%",
            position: "relative"
          }
        },
React__default.createElement("div", { style: {
          position: "relative",
          width: "fit-content",
          margin: "0 auto",
          maxWidth: "100%"
        } }, React__default.createElement("div", { ref: contentRef }, children), React__default.createElement(
          "div",
          {
            className: "ars-resize-handle",
            onMouseDown: startResize,
            onDoubleClick: () => setSetting("amazon_ui_scale", 1),
            title: "Drag to scale down, double-click to reset"
          }
        ))
      )
    );
  };
  function App() {
    return React.createElement(SettingsProvider, null, React.createElement(AutoSyncWatcher, null), React.createElement(ScalingWrapper, null, React.createElement(ReviewFormShell, null)));
  }
  const useReviewCandidates = () => {
    const [candidates, setCandidates] = React__default.useState([]);
    const [isLoading, setIsLoading] = React__default.useState(true);
    const [sortMode, setSortMode] = React__default.useState("default");
    const [searchQuery, setSearchQuery] = React__default.useState("");
    const [dismissedAsins, setDismissedAsins] = React__default.useState([]);
    const [thankYouHtml, setThankYouHtml] = React__default.useState(null);
    const [profile, setProfile] = React__default.useState({ name: "", avatarSrc: "" });
    const enrichedAsins = React__default.useRef( new Set());
    React__default.useEffect(() => {
      const stored = localStorage.getItem("rstudio_dismissed_asins");
      if (stored) {
        setDismissedAsins(JSON.parse(stored));
      }
    }, []);
    const scrapePage = React__default.useCallback(() => {
      const items = [];
      const thankYouContainer = document.querySelector(".in-context-ryp__thankyou-container-desktop");
      if (thankYouContainer) {
        setThankYouHtml(thankYouContainer.innerHTML);
      }
      const profileEl = document.querySelector('[data-hook="ryp-profile-info"]');
      if (profileEl) {
        const name = profileEl.querySelector(".a-profile-name")?.textContent || "";
        const avatarSrc = profileEl.querySelector("img")?.getAttribute("src") || "";
        setProfile({ name, avatarSrc });
      }
      const candidateElements = document.querySelectorAll(".ryp__review-candidate");
      candidateElements.forEach((el) => {
        const titleEl = el.querySelector(".ryp__review-candidate__product-title");
        const imgEl = el.querySelector(".ryp__review-candidate__product-image");
        const linkEl = el.querySelector('a[href*="asin="], a[href*="/dp/"]');
        const videoBanner = el.querySelector('[data-banner-type="NEEDS_VIDEO_BANNER"]');
        if (titleEl && imgEl) {
          const title = titleEl.textContent?.trim() || "Unknown Product";
          const imageUrl = imgEl.getAttribute("src") || "";
          const href = linkEl?.getAttribute("href") || "";
          let asin = "";
          const urlParams = new URLSearchParams(href.split("?")[1]);
          asin = urlParams.get("asin") || "";
          if (!asin) {
            const dpMatch = href.match(/\/dp\/([A-Z0-9]{10})/);
            if (dpMatch) asin = dpMatch[1];
          }
          if (asin) {
            const cached = getCachedInfo(asin);
            items.push({
              asin,
              title,
              imageUrl,
              reviewUrl: href,
              isVideoRequired: !!videoBanner,
              currentRating: 0,
              ...cached || {}
            });
            if (cached) {
              enrichedAsins.current.add(asin);
            }
          }
        }
      });
      if (items.length > 0) {
        setCandidates((prev) => {
          const prevMap = new Map(prev.map((c) => [c.asin, c]));
          let hasChanges = prev.length !== items.length;
          const merged = items.map((newItem) => {
            const existing = prevMap.get(newItem.asin);
            if (existing) {
              return {
                ...newItem,
                purchaseDate: existing.purchaseDate || newItem.purchaseDate,
                category: existing.category || newItem.category,
                currentRating: existing.currentRating || newItem.currentRating
              };
            }
            hasChanges = true;
            return newItem;
          });
          return hasChanges ? merged : prev;
        });
        setIsLoading(false);
        return true;
      }
      return false;
    }, []);
    React__default.useEffect(() => {
      scrapePage();
      const observer2 = new MutationObserver(() => {
        if (scrapePage()) ;
      });
      observer2.observe(document.body, { childList: true, subtree: true });
      const interval = setInterval(() => {
        if (scrapePage()) ;
      }, 500);
      return () => {
        observer2.disconnect();
        clearInterval(interval);
      };
    }, [scrapePage]);
    React__default.useEffect(() => {
      if (candidates.length === 0) return;
      const enrichInParallel = async () => {
        const batchSize = 5;
        const unenriched = candidates.filter((c) => !enrichedAsins.current.has(c.asin));
        if (unenriched.length === 0) return;
        unenriched.forEach((c) => enrichedAsins.current.add(c.asin));
        for (let i = 0; i < unenriched.length; i += batchSize) {
          const batch = unenriched.slice(i, i + batchSize);
          await Promise.all(batch.map(async (candidate) => {
            try {
              const details = await fetchProductDetails(candidate);
              if (details.purchaseDate || details.category) {
                setCandidates((prev) => prev.map(
                  (c) => c.asin === candidate.asin ? { ...c, ...details } : c
                ));
              }
            } catch (err) {
              console.warn(`[ARS] Failed to enrich ${candidate.asin}`, err);
            }
          }));
          if (i + batchSize < unenriched.length) {
            await new Promise((r) => setTimeout(r, 200));
          }
        }
      };
      enrichInParallel();
    }, [candidates.length]);
    React__default.useEffect(() => {
      if (candidates.length > 0 && typeof chrome !== "undefined" && chrome.storage) {
        const serializableCandidates = candidates.map((c) => ({
          ...c,
          purchaseDate: c.purchaseDate ? c.purchaseDate.toISOString() : void 0
        }));
        chrome.storage.local.set({ reviewCandidates: serializableCandidates });
      }
    }, [candidates]);
    const dismissCandidate = React__default.useCallback((asin) => {
      const newDismissed = [...dismissedAsins, asin];
      setDismissedAsins(newDismissed);
      localStorage.setItem("rstudio_dismissed_asins", JSON.stringify(newDismissed));
    }, [dismissedAsins]);
    const filteredCandidates = candidates.filter((c) => {
      if (dismissedAsins.includes(c.asin)) return false;
      if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
    const sortedCandidates = [...filteredCandidates].sort((a, b) => {
      if (sortMode === "date") {
        const dateA = a.purchaseDate ? new Date(a.purchaseDate).getTime() : 0;
        const dateB = b.purchaseDate ? new Date(b.purchaseDate).getTime() : 0;
        if (dateA && dateB) return dateB - dateA;
        if (dateA) return -1;
        if (dateB) return 1;
        return 0;
      }
      if (sortMode === "category") {
        const catA = a.category || "Uncategorized";
        const catB = b.category || "Uncategorized";
        if (catA === "Uncategorized" && catB !== "Uncategorized") return 1;
        if (catB === "Uncategorized" && catA !== "Uncategorized") return -1;
        return catA.localeCompare(catB);
      }
      if (sortMode === "alpha") return a.title.localeCompare(b.title);
      return 0;
    });
    return {
      candidates: sortedCandidates,
      isLoading,
      sortMode,
      setSortMode,
      searchQuery,
      setSearchQuery,
      dismissCandidate,
      thankYouHtml,
      profile
    };
  };
  const ReviewCandidateCard = ({ candidate, layoutMode }) => {
    const [rating, setRating] = React__default.useState(0);
    const productUrl = `/dp/${candidate.asin}`;
    const handleRatingChange = (newRating) => {
      setRating(newRating);
      const nativeCard = Array.from(document.querySelectorAll(".ryp__review-candidate")).find((el) => {
        const link = el.querySelector('a[href*="asin="], a[href*="/dp/"]');
        const href = link?.getAttribute("href") || "";
        return href.includes(candidate.asin);
      });
      if (nativeCard) {
        if (newRating > 0) {
          const nativeStars = nativeCard.querySelectorAll('button[data-hook="ryp-star"]');
          if (nativeStars && nativeStars.length >= newRating) {
            const targetStar = nativeStars[newRating - 1];
            targetStar.click();
          }
        } else {
          const clearBtn = nativeCard.querySelector('.in-context-ryp__form-field--starRating--clear, [class*="starRating--clear"], [aria-label="Clear"]');
          if (clearBtn) {
            console.log("[ARS] Clicking native clear button in card");
            clearBtn.click();
            clearBtn.querySelector("span")?.click();
            const mouseEventProps = { bubbles: true, cancelable: true, view: window };
            clearBtn.dispatchEvent(new MouseEvent("mousedown", mouseEventProps));
            clearBtn.dispatchEvent(new MouseEvent("mouseup", mouseEventProps));
          }
        }
      }
    };
    const handleReset = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleRatingChange(0);
    };
    if (layoutMode === "list") {
      return React__default.createElement("div", { className: `rounded-xl border overflow-hidden flex flex-row items-center gap-4 px-4 py-1.5 group transition-all duration-300 bg-white border-gray-100 hover:shadow-md h-14` }, React__default.createElement(
        "a",
        {
          href: productUrl,
          target: "_blank",
          rel: "noreferrer",
          className: "w-10 h-10 shrink-0 flex items-center justify-center",
          title: "View Product Page"
        },
React__default.createElement(
          "img",
          {
            src: candidate.imageUrl,
            alt: candidate.title,
            className: "w-full h-full object-contain mix-blend-multiply"
          }
        )
      ), React__default.createElement("div", { className: "flex-1 min-w-0" }, React__default.createElement("h3", { className: `text-[11px] font-bold truncate leading-tight text-gray-900` }, candidate.title), React__default.createElement("div", { className: `flex items-center gap-3 mt-0.5 text-[8px] font-bold uppercase tracking-wider text-gray-400` }, candidate.purchaseDate && React__default.createElement("div", { className: "flex items-center gap-1" }, React__default.createElement(Calendar, { size: 8 }), React__default.createElement("span", null, candidate.purchaseDate.toLocaleDateString())), candidate.category && React__default.createElement("div", { className: "flex items-center gap-1" }, React__default.createElement(Tag, { size: 8 }), React__default.createElement("span", null, candidate.category)))), React__default.createElement("div", { className: "flex items-center gap-2" }, React__default.createElement("div", { className: "scale-[0.55] origin-right" }, React__default.createElement(
        StarRating,
        {
          value: rating,
          onChange: handleRatingChange,
          hideClear: true
        }
      )), rating > 0 && React__default.createElement(
        "button",
        {
          onClick: handleReset,
          className: `p-1 rounded-lg transition-colors text-gray-400 hover:text-gray-600`
        },
React__default.createElement(RotateCcw, { size: 10 })
      )), React__default.createElement("div", { className: "w-28 shrink-0 flex justify-end" }, React__default.createElement(
        "a",
        {
          href: candidate.reviewUrl,
          target: "_blank",
          rel: "noreferrer",
          className: `flex items-center justify-center gap-1 w-full py-1.5 rounded-lg text-[9px] font-black transition-all duration-300 uppercase tracking-widest ${rating > 0 ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-200/50 active:scale-95" : "bg-gray-100 text-gray-300 cursor-not-allowed opacity-50"}`,
          onClick: (e) => rating === 0 && e.preventDefault()
        },
        "Review",
React__default.createElement(ChevronRight, { size: 10, className: "ml-0.5" })
      )));
    }
    return React__default.createElement("div", { className: `rounded-xl border overflow-hidden flex flex-row relative group shadow-sm hover:shadow-md transition-all duration-300 h-30 bg-white border-gray-100` }, React__default.createElement(
      "a",
      {
        href: productUrl,
        target: "_blank",
        rel: "noreferrer",
        className: "w-28 shrink-0 p-2 flex items-center justify-center",
        title: "View Product Page"
      },
React__default.createElement("div", { className: "w-full h-full relative" }, React__default.createElement(
        "img",
        {
          src: candidate.imageUrl,
          alt: candidate.title,
          className: "w-full h-full object-contain mix-blend-multiply"
        }
      ), candidate.isVideoRequired && React__default.createElement("div", { className: "absolute top-0 left-0" }, React__default.createElement("span", { className: "bg-blue-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-sm" }, "VIDEO")))
    ), React__default.createElement("div", { className: "flex-1 p-2.5 pl-1 flex flex-col items-start min-w-0" }, React__default.createElement("div", { className: "w-full" }, React__default.createElement("h3", { className: `text-[11px] font-bold line-clamp-3 leading-tight mb-0.5 tracking-tight text-left text-gray-900` }, candidate.title), React__default.createElement("div", { className: `flex items-center gap-2 text-[8px] font-bold uppercase tracking-wider text-left text-gray-400` }, candidate.purchaseDate ? React__default.createElement("div", { className: "flex items-center gap-1" }, React__default.createElement(Calendar, { size: 8 }), React__default.createElement("span", null, candidate.purchaseDate.toLocaleDateString())) : candidate.category ? React__default.createElement("div", { className: "flex items-center gap-1" }, React__default.createElement(Tag, { size: 8 }), React__default.createElement("span", { className: "truncate max-w-[80px]" }, candidate.category)) : null)), React__default.createElement("div", { className: "mt-0.5 flex items-center justify-center w-full" }, React__default.createElement("div", { className: "inline-flex items-center" }, React__default.createElement(
      StarRating,
      {
        value: rating,
        onChange: handleRatingChange,
        className: "scale-[0.7] origin-center",
        hideClear: true
      }
    ))), React__default.createElement("div", { className: "mt-auto w-full px-1 mb-0.5" }, React__default.createElement(AnimatePresence, null, rating > 0 && React__default.createElement(
      motion.div,
      {
        className: "flex items-center gap-1.5",
        initial: { opacity: 0, y: 5 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 5 },
        transition: { type: "spring", damping: 15, stiffness: 200 }
      },
React__default.createElement(
        motion.a,
        {
          href: candidate.reviewUrl,
          target: "_blank",
          rel: "noreferrer",
          className: `flex-1 flex items-center justify-center gap-1 py-1 rounded-lg text-[9px] font-black transition-all duration-300 uppercase tracking-widest shadow-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-200/50`
        },
        "Review",
React__default.createElement(ChevronRight, { size: 10 })
      ),
React__default.createElement(
        "button",
        {
          onClick: handleReset,
          className: `p-1.5 rounded-lg transition-colors flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700`,
          title: "Reset Rating"
        },
React__default.createElement(RotateCcw, { size: 14 })
      )
    )))));
  };
  const SortFilterTabs = ({
    searchQuery,
    onSearchChange,
    sortMode,
    onSortChange,
    totalItems,
    isLoading
  }) => {
    const tabs = [
      { id: "default", label: "Unsorted" },
      { id: "date", label: "Recent" },
      { id: "category", label: "Category" },
      { id: "alpha", label: "A-Z" }
    ];
    return React__default.createElement("div", { className: "max-w-[1200px] mx-auto px-6" }, React__default.createElement("div", { className: "flex flex-col items-center gap-6 py-2" }, React__default.createElement("div", { className: "flex items-center justify-center w-full" }, React__default.createElement("div", { className: `flex items-center gap-1 p-1 rounded-2xl bg-gray-100` }, tabs.map((tab) => React__default.createElement(
      "button",
      {
        key: tab.id,
        onClick: () => onSortChange(tab.id),
        className: `
                                    whitespace-nowrap px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200
                                    ${sortMode === tab.id ? "bg-white text-amber-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}
                                `
      },
      tab.label
    )))), React__default.createElement("div", { className: "flex flex-col sm:flex-row items-center gap-4 w-full justify-center" }, React__default.createElement("div", { className: "relative w-full max-w-md" }, React__default.createElement(
      "input",
      {
        type: "text",
        placeholder: "Search your purchases...",
        className: `w-full pl-10 pr-4 py-2 border rounded-2xl text-sm focus:ring-2 focus:ring-amber-500/20 placeholder-gray-400 transition-all font-medium text-center bg-gray-50 border-gray-100 text-gray-900`,
        value: searchQuery,
        onChange: (e) => onSearchChange(e.target.value)
      }
    ), React__default.createElement("div", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" }, React__default.createElement(Search, { size: 16 })), isLoading && React__default.createElement("div", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-amber-500" }, React__default.createElement(LoaderCircle, { size: 16, className: "animate-spin" })))), React__default.createElement("div", { className: `text-[10px] uppercase tracking-widest font-bold text-gray-400` }, totalItems, " Available Products")));
  };
  const StarsIcon = ({ size = 20, className = "" }) => React__default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className
    },
React__default.createElement("path", { d: "M11 21c-4.97 0-9-4.03-9-9s4.03-9 9-9c.83 0 1.62.11 2.37.32-2.18 1.39-3.62 3.8-3.62 6.5s1.44 5.11 3.62 6.5c-.75.21-1.54.32-2.37.32z" }),
React__default.createElement("circle", { cx: "18", cy: "5", r: "1.2" }),
React__default.createElement("circle", { cx: "21", cy: "9", r: "0.8" }),
React__default.createElement("circle", { cx: "15", cy: "4", r: "0.6" }),
React__default.createElement("circle", { cx: "22", cy: "3", r: "0.5" }),
React__default.createElement("circle", { cx: "17", cy: "11", r: "0.7" }),
React__default.createElement("circle", { cx: "20", cy: "16", r: "0.6" }),
React__default.createElement("path", { d: "M19 14l.3 1.1 1.1.3-1.1.3-.3 1.1-.3-1.1-1.1-.3 1.1-.3z" }),
React__default.createElement("path", { d: "M12 7l.2.8.8.2-.8.2-.2.8-.2-.8-.8-.2.8-.2z" })
  );
  const ReviewPurchasesContent = () => {
    const {
      candidates,
      isLoading,
      sortMode,
      setSortMode,
      searchQuery,
      setSearchQuery,
      thankYouHtml,
      profile
    } = useReviewCandidates();
    const { settings, setSetting } = useSettings();
    const [isSettingsOpen, setIsSettingsOpen] = React__default.useState(false);
    const [layoutMode, setLayoutMode] = React__default.useState("grid");
    const pressTimer = React__default.useRef(null);
    const isLongPress = React__default.useRef(false);
    const handleLightsPressStart = () => {
      isLongPress.current = false;
      pressTimer.current = setTimeout(() => {
        isLongPress.current = true;
        setSetting("dark_mode", !settings.dark_mode);
      }, 600);
    };
    const handleLightsPressEnd = () => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
        pressTimer.current = null;
      }
      if (!isLongPress.current) {
        setSetting("amazon_ui_lights_off", !settings.amazon_ui_lights_off);
      }
    };
    React__default.useEffect(() => {
      const styleId = "ars-lights-off-global";
      if (settings.amazon_ui_lights_off) {
        if (!document.getElementById(styleId)) {
          const styleEl = document.createElement("style");
          styleEl.id = styleId;
          styleEl.textContent = `
                    #amazon-review-studio-root {
                        position: relative !important;
                        z-index: 1000000 !important;
                    }
                    #navbar-main {
                        position: relative !important;
                        z-index: 1000001 !important;
                        pointer-events: auto !important;
                    }
                    body::after {
                        content: '';
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.85);
                        z-index: 999999;
                        pointer-events: none;
                        transition: opacity 0.4s ease;
                        animation: ars-fade-in 0.4s ease forwards;
                    }
                    @keyframes ars-fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `;
          document.head.appendChild(styleEl);
        }
      } else {
        const el = document.getElementById(styleId);
        if (el) el.remove();
      }
      return () => {
        const el = document.getElementById(styleId);
        if (el) el.remove();
      };
    }, [settings.amazon_ui_lights_off]);
    return React__default.createElement("div", { className: "max-w-[1200px] mx-auto transition-all duration-500" }, React__default.createElement("div", { className: `rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden pb-12 bg-white border-gray-100 border` }, React__default.createElement("div", { className: "relative" }, React__default.createElement(
      ProfileSection,
      {
        avatarSrc: profile.avatarSrc,
        name: profile.name || "Amazon Shopper"
      }
    ), React__default.createElement("div", { className: "absolute top-1/2 -translate-y-1/2 right-8 flex items-center gap-2" }, React__default.createElement(
      "button",
      {
        type: "button",
        className: `p-2.5 rounded-xl transition-all ${settings.amazon_ui_lights_off ? "bg-amber-500/10 text-amber-500 font-bold" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"} ${settings.dark_mode ? "!text-yellow-400" : ""}`,
        onMouseDown: handleLightsPressStart,
        onMouseUp: handleLightsPressEnd,
        onMouseLeave: () => {
          if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
          }
        },
        onTouchStart: handleLightsPressStart,
        onTouchEnd: handleLightsPressEnd,
        title: settings.dark_mode ? "Dark Mode On (Long Press to Toggle)" : "Lights Off (Long Press for Dark Mode)"
      },
      settings.dark_mode ? React__default.createElement(StarsIcon, { size: 20 }) : React__default.createElement(Moon, { size: 20 })
    ), React__default.createElement(
      "button",
      {
        type: "button",
        className: "p-2.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-xl transition-all",
        onClick: () => setIsSettingsOpen(true),
        title: "Settings"
      },
React__default.createElement(Settings, { size: 20 })
    ))), React__default.createElement(AnimatePresence, null, thankYouHtml && React__default.createElement(
      motion.div,
      {
        className: "px-10 pt-10",
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.6, ease: "easeOut" }
      },
React__default.createElement("div", { className: `rounded-3xl p-8 flex items-start gap-6 border shadow-lg bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200/50` }, React__default.createElement(
        motion.div,
        {
          className: `w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-green-100`,
          initial: { scale: 0, rotate: -180 },
          animate: { scale: 1, rotate: 0 },
          transition: { duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }
        },
React__default.createElement(CircleCheck, { className: "text-green-600", size: 32, strokeWidth: 2 })
      ), React__default.createElement("div", { className: "flex-1" }, React__default.createElement(
        motion.h3,
        {
          className: `text-2xl mb-2 text-green-800`,
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.3 }
        },
React__default.createElement("span", { className: "font-black tracking-tight" }, "Review Submitted")
      ), React__default.createElement(
        motion.p,
        {
          className: `text-lg mb-3 text-green-700`,
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.4 }
        },
React__default.createElement("span", { className: "font-light" }, "Awesome! "),
React__default.createElement("span", { className: "font-bold" }, "Thank you for helping other shoppers!")
      ), React__default.createElement(
        motion.p,
        {
          className: `text-sm text-green-600/70`,
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5, delay: 0.5 }
        },
React__default.createElement("span", { className: "font-light italic" }, "Your feedback helps "),
React__default.createElement("span", { className: "font-bold" }, "millions of shoppers")
      )))
    )), React__default.createElement("div", { className: "pt-10 pb-6 px-4" }, React__default.createElement(
      SortFilterTabs,
      {
        searchQuery,
        onSearchChange: setSearchQuery,
        sortMode,
        onSortChange: setSortMode,
        totalItems: candidates.length,
        isLoading
      }
    )), React__default.createElement("main", { className: "px-10 py-6 min-h-[400px]" }, !isLoading && candidates.length > 0 && React__default.createElement("div", { className: "flex justify-end mb-6" }, React__default.createElement("div", { className: `p-1 rounded-xl flex items-center gap-1 border shadow-sm bg-gray-50 border-gray-100` }, React__default.createElement(
      "button",
      {
        onClick: () => setLayoutMode("grid"),
        className: `p-1.5 rounded-lg transition-all ${layoutMode === "grid" ? "bg-amber-600 text-white shadow-sm shadow-amber-900/20" : "text-gray-400 hover:text-gray-600"}`,
        title: "Grid View"
      },
React__default.createElement(LayoutGrid, { size: 16 })
    ), React__default.createElement(
      "button",
      {
        onClick: () => setLayoutMode("list"),
        className: `p-1.5 rounded-lg transition-all ${layoutMode === "list" ? "bg-amber-600 text-white shadow-sm shadow-amber-900/20" : "text-gray-400 hover:text-gray-600"}`,
        title: "List View"
      },
React__default.createElement(List, { size: 16 })
    ))), isLoading && candidates.length === 0 ? React__default.createElement("div", { className: "flex flex-col items-center justify-center py-24 text-center" }, React__default.createElement(
      motion.div,
      {
        className: `w-24 h-24 rounded-2xl flex items-center justify-center mb-8 bg-gray-50`,
        animate: { rotate: 360 },
        transition: { duration: 4, repeat: Infinity, ease: "linear" }
      },
React__default.createElement(LoaderCircle, { className: "text-amber-600", size: 32 })
    ), React__default.createElement("h3", { className: `text-xl font-black tracking-tight text-gray-900` }, "Syncing Studio"), React__default.createElement("p", { className: `font-bold uppercase tracking-widest text-[9px] mt-2 text-gray-400` }, "Finding your recent purchases...")) : candidates.length === 0 ? React__default.createElement("div", { className: "flex flex-col items-center justify-center py-24 text-center" }, React__default.createElement("div", { className: `w-24 h-24 rounded-2xl flex items-center justify-center mb-8 bg-gray-50` }, React__default.createElement("svg", { className: `w-12 h-12 text-gray-200`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React__default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" }))), React__default.createElement("h3", { className: `text-xl font-black tracking-tight text-gray-900` }, "No Items to Review"), React__default.createElement("p", { className: `font-bold uppercase tracking-widest text-[9px] mt-2 text-gray-400` }, searchQuery ? "Try refining your search query" : "Your review queue is currently empty")) : React__default.createElement(AnimatePresence, { mode: "wait" }, React__default.createElement(
      motion.div,
      {
        key: `${layoutMode}-${sortMode}`,
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        className: layoutMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "flex flex-col gap-3"
      },
      sortMode === "category" ? (() => {
        const groups = {};
        candidates.forEach((c) => {
          const cat = c.category || "Uncategorized";
          if (!groups[cat]) groups[cat] = [];
          groups[cat].push(c);
        });
        return Object.entries(groups).map(([category, items]) => React__default.createElement(React__default.Fragment, { key: category }, React__default.createElement("div", { className: `col-span-full pt-6 pb-2 border-b mb-2 flex items-center gap-3 border-gray-100` }, React__default.createElement("h3", { className: `text-sm font-black uppercase tracking-[0.2em] text-amber-600` }, category), React__default.createElement("div", { className: `h-px flex-1 bg-gray-100/50` }), React__default.createElement("span", { className: `text-[10px] font-bold text-gray-400` }, items.length, " ", items.length === 1 ? "Item" : "Items")), items.map((candidate) => React__default.createElement(
          ReviewCandidateCard,
          {
            key: candidate.asin,
            candidate,
            layoutMode
          }
        ))));
      })() : candidates.map((candidate) => React__default.createElement(
        ReviewCandidateCard,
        {
          key: candidate.asin,
          candidate,
          layoutMode
        }
      ))
    ))), React__default.createElement("div", { className: "px-12 pt-8 flex items-center justify-center gap-3" }, React__default.createElement("div", { className: `h-px flex-1 bg-gray-100` }), React__default.createElement("span", { className: `text-[9px] font-black uppercase tracking-[0.2em] text-gray-300` }, "Powered by Review Studio"), React__default.createElement("div", { className: `h-px flex-1 bg-gray-100` }))), React__default.createElement(
      SettingsDashboard,
      {
        isOpen: isSettingsOpen,
        onClose: () => setIsSettingsOpen(false)
      }
    ));
  };
  const ReviewPurchasesPage = () => {
    return React__default.createElement(SettingsProvider, null, React__default.createElement(AutoSyncWatcher, null), React__default.createElement(ScalingWrapper, null, React__default.createElement(ReviewPurchasesContent, null)));
  };
  const style = `.ars-profile-section{background:linear-gradient(135deg,#232f3e,#131921)}.ars-profile-container{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.5rem}.ars-profile-info{display:flex;align-items:center;gap:1rem}.ars-profile-avatar-wrapper{flex-shrink:0}.ars-profile-avatar{display:block;width:44px;height:44px;border-radius:50%;overflow:hidden;background-color:#ffffff1a;transition:transform .2s ease,box-shadow .2s ease;border:2px solid transparent}.ars-profile-avatar:hover{transform:scale(1.08);border-color:#ffffff4d;box-shadow:0 0 15px #ffffff1a}.ars-profile-avatar img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.ars-profile-avatar-placeholder{display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:1.25rem;font-weight:600;color:#f90;background-color:#fff}.ars-profile-name{font-size:1rem;font-weight:500;color:#fff}.ars-profile-edit-link{font-size:.875rem;color:#54b4e8;text-decoration:none;transition:color .2s ease}.ars-profile-edit-link:hover{color:#7ec8f0;text-decoration:underline}.ars-product-header{display:flex;align-items:flex-start;gap:1rem;margin-top:1.5rem}.ars-product-image-link{flex-shrink:0;display:block}.ars-product-image-link:hover .ars-product-image{opacity:.9}.ars-product-image{flex-shrink:0;width:64px;height:64px;-o-object-fit:contain;object-fit:contain;border-radius:8px;box-shadow:0 2px 8px #00000014;transition:opacity .2s ease}.ars-product-info{display:flex;flex-direction:column;gap:.25rem;min-width:0}.ars-product-title{font-size:1.125rem;font-weight:700;color:#0f1111;letter-spacing:-.01em}.ars-product-name{font-size:.875rem;color:#565959;line-height:1.4}.ars-star-rating{display:flex;align-items:center;gap:1rem}.ars-star-rating-stars{display:flex;gap:4px}.ars-star-button{display:flex;align-items:center;justify-content:center;padding:4px;border:none;background:transparent;color:#d5d9d9;cursor:pointer;transition:color .2s ease,transform .2s cubic-bezier(.175,.885,.32,1.275)}.ars-star-button:hover{color:#e68a00;transform:scale(1.15)}.ars-star-button:active{transform:scale(.9)}.ars-star-button:focus-visible{outline:2px solid #FF9900;outline-offset:2px}.ars-star-button--filled{color:#f90}.ars-star-rating-stars:hover .ars-star-button--filled{color:#e68a00}.ars-star-clear{font-size:.875rem;color:#54b4e8;background:none;border:none;cursor:pointer;padding:4px 0;transition:color .2s ease}.ars-star-clear:hover{color:#2d9fd8;text-decoration:underline}.ars-media-upload{display:flex;align-items:center;justify-content:center;min-height:120px;padding:1.5rem;border:2px dashed #d5d9d9;border-radius:12px;background-color:#f9fafb;cursor:pointer;transition:all .2s ease;width:100%}.ars-media-upload--compact{width:80px;height:80px;min-height:80px;padding:0;border-radius:8px;border-width:1.5px}.ars-media-upload:hover{border-color:#f90;background-color:#ff99000a}.ars-media-upload--dragging{border-color:#f90;background-color:#ff99001a;box-shadow:inset 0 0 0 4px #ff99000d}.ars-media-upload:focus-visible{outline:2px solid #FF9900;outline-offset:2px}.ars-media-upload-content{display:flex;flex-direction:column;align-items:center;gap:.5rem}.ars-media-upload-icon{color:#565959}.ars-media-upload--dragging .ars-media-upload-icon,.ars-media-upload:hover .ars-media-upload-icon{color:#f90}.ars-media-upload-placeholder{font-size:.875rem;color:#565959}.ars-media-upload-wrapper{display:flex;flex-direction:column;gap:.75rem}.ars-media-upload--uploading{pointer-events:none}.ars-media-upload-feedback{font-size:.875rem;color:#067d62;font-weight:500}.ars-media-upload-actions{display:flex;align-items:center;gap:.75rem;flex-wrap:wrap}.ars-media-upload-action-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem .875rem;font-size:.875rem;border-radius:8px;cursor:pointer;transition:all .2s ease;text-decoration:none;width:-moz-fit-content;width:fit-content}.ars-media-upload-paste-btn,.ars-media-upload-google-btn,.ars-media-upload-icloud-btn{color:#565959;background:#fff;border:1px solid #d5d9d9}.ars-media-upload-paste-btn:hover,.ars-media-upload-google-btn:hover,.ars-media-upload-icloud-btn:hover{border-color:#f90;color:#f90;background:#fff}.ars-media-thumbnails{display:flex;flex-wrap:wrap;gap:.75rem;margin-bottom:.5rem}.ars-media-thumbnail{position:relative;width:80px;height:80px;border-radius:8px;overflow:hidden;border:1px solid #d5d9d9;background-color:#f3f4f6;flex-shrink:0}.ars-media-thumbnail-image{width:100%;height:100%;background-size:cover;background-position:center;background-repeat:no-repeat}.ars-media-thumbnail-remove{position:absolute;top:4px;right:4px;width:20px;height:20px;border-radius:50%;background-color:#0009;color:#fff;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity .2s ease,background-color .2s ease;padding:0}.ars-media-thumbnail:hover .ars-media-thumbnail-remove{opacity:1}.ars-media-thumbnail-remove:hover{background-color:#c00}.ars-media-upload-dragging-content{display:flex;flex-direction:column;align-items:center;gap:.75rem;pointer-events:none}@keyframes bounce{0%,to{transform:translateY(-10%);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:translateY(0);animation-timing-function:cubic-bezier(0,0,.2,1)}}.ars-review-shell{position:relative;display:flex;flex-direction:column;max-width:800px;margin-left:auto;margin-right:auto;background-color:#fff;color:#0f1111;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px #00000014;animation:ars-fade-zoom .5s cubic-bezier(.2,.8,.2,1) forwards}.ars-review-shell--loading{padding:2rem;text-align:center;color:#565959}.ars-review-form-container{padding:1.5rem 2rem 0}.ars-review-form-fields{display:flex;flex-direction:column;gap:1.5rem;margin-top:1.5rem}.ars-form-field{display:flex;flex-direction:column;gap:.5rem}.ars-form-field-label-row{display:flex;align-items:center;justify-content:space-between}.ars-form-label{font-size:.875rem;font-weight:600;color:#0f1111}.ars-ai-trigger{color:#f90!important;border-color:#f90!important}.ars-ai-trigger:hover{background-color:#ff990014!important}.ars-review-submit{display:flex;align-items:center;justify-content:space-between;margin-top:1.5rem;padding:1.25rem 2rem;border-top:1px solid #e5e7eb;background-color:#f9fafb}.ars-header-actions{position:absolute;top:1rem;right:1rem;display:flex;align-items:center;gap:.5rem;z-index:20}.ars-action-button{display:flex;align-items:center;justify-content:center;width:36px;height:36px;padding:0;border:none;background:transparent;color:#fff;cursor:pointer;border-radius:8px;transition:all .2s ease;opacity:.8}.ars-action-button:hover{background-color:#ffffff1a;color:#fff;opacity:1}.ars-action-button.active{color:#f90;opacity:1}.ars-submit-group{display:flex;align-items:center;gap:1rem}.ars-back-button{background-color:#fff!important;border-color:#d5d9d9!important;color:#0f1111!important;box-shadow:0 2px 5px #d5d9d980}.ars-back-button:hover{background-color:#f7fafa!important;border-color:#adb1b1!important;transform:translateY(-1px)}.ars-back-button:active{transform:translateY(0)}.ars-button{display:inline-flex;align-items:center;justify-content:center;border-radius:var(--ars-radius-md);font-weight:500;transition:all var(--ars-anim-fast);outline:none;border:1px solid transparent;-webkit-user-select:none;-moz-user-select:none;user-select:none;white-space:nowrap}.ars-button:disabled{opacity:.6;cursor:not-allowed;pointer-events:none}.ars-button:focus-visible{box-shadow:0 0 0 2px var(--ars-color-bg-main),0 0 0 4px var(--ars-color-primary)}.ars-button--primary{background-color:var(--ars-color-primary);color:var(--ars-color-text-inverse);box-shadow:0 1px 2px #0000001a}.ars-button--primary:hover{background-color:var(--ars-color-primary-hover);transform:translateY(-1px)}.ars-button--primary:active{transform:translateY(0)}.ars-button--secondary{background-color:var(--ars-color-secondary);color:var(--ars-color-text-inverse)}.ars-button--secondary:hover{background-color:var(--ars-color-secondary-hover)}.ars-button--outline{background-color:transparent;border-color:var(--ars-color-border);color:var(--ars-color-text-main)}.ars-button--outline:hover{background-color:var(--ars-color-bg-secondary);border-color:var(--ars-color-border-focus)}.ars-button--ghost{background-color:transparent;color:var(--ars-color-text-secondary)}.ars-button--ghost:hover{background-color:var(--ars-color-bg-secondary);color:var(--ars-color-text-main)}.ars-button--danger{background-color:var(--ars-color-error);color:var(--ars-color-text-inverse)}.ars-button--danger:hover{background-color:#a8082e}.ars-button--sm{height:28px;padding:0 var(--ars-spacing-sm);font-size:var(--ars-font-size-sm)}.ars-button--md{height:36px;padding:0 var(--ars-spacing-md);font-size:var(--ars-font-size-sm)}.ars-button--lg{height:44px;padding:0 var(--ars-spacing-lg);font-size:var(--ars-font-size-md)}.ars-button--icon{width:36px;height:36px;padding:0;border-radius:50%}.ars-button--icon.ars-button--sm{width:28px;height:28px}.ars-button--icon.ars-button--lg{width:44px;height:44px}.ars-button__loader{animation:ars-spin 1s linear infinite;margin-right:var(--ars-spacing-xs)}.ars-button--icon .ars-button__loader{margin-right:0}.ars-button__icon{margin-right:var(--ars-spacing-xs);display:flex;align-items:center}.ars-button--icon .ars-button__icon{margin-right:0}@keyframes ars-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.ars-input-group{display:flex;flex-direction:column;gap:var(--ars-spacing-xs);width:100%}.ars-input-wrapper{position:relative;display:flex;align-items:center}.ars-input-label{font-size:var(--ars-font-size-sm);font-weight:500;color:var(--ars-color-text-main)}.ars-input{width:100%;height:36px;padding:0 var(--ars-spacing-sm);font-family:inherit;font-size:var(--ars-font-size-md);color:var(--ars-color-text-main);background-color:var(--ars-color-bg-main);border:1px solid var(--ars-color-border);border-radius:var(--ars-radius-md);transition:all var(--ars-anim-fast);outline:none}.ars-input:focus{border-color:var(--ars-color-primary);box-shadow:0 0 0 1px var(--ars-color-primary)}.ars-input:disabled{background-color:var(--ars-color-bg-secondary);cursor:not-allowed;opacity:.7}.ars-input--has-icon{padding-left:32px}.ars-input-icon{position:absolute;left:8px;color:var(--ars-color-text-secondary);display:flex;pointer-events:none}.ars-input--error{border-color:var(--ars-color-error)}.ars-input--error:focus{box-shadow:0 0 0 1px var(--ars-color-error)}.ars-input--has-suffix{padding-right:48px}.ars-input-suffix{position:absolute;right:4px;display:flex;align-items:center;justify-content:center;z-index:10}.ars-input-error{font-size:var(--ars-font-size-xs);color:var(--ars-color-error)}.ars-card{background-color:var(--ars-color-bg-main);border:1px solid var(--ars-color-border);border-radius:var(--ars-radius-md);box-shadow:var(--ars-shadow-sm);overflow:hidden}.ars-card--p-none{padding:0}.ars-card--p-sm{padding:var(--ars-spacing-sm)}.ars-card--p-md{padding:var(--ars-spacing-md)}.ars-card--p-lg{padding:var(--ars-spacing-lg)}.ars-modal-overlay-container{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;pointer-events:none}.ars-modal-backdrop{position:fixed;inset:0;background-color:#0009;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);pointer-events:auto}.ars-modal-wrapper{position:relative;z-index:100001;pointer-events:none;display:flex;align-items:center;justify-content:center;width:100%;max-height:100vh;padding:20px}.ars-modal{background-color:var(--ars-color-bg-main);border-radius:16px;box-shadow:0 25px 50px -12px #00000040;pointer-events:auto;display:flex;flex-direction:column;max-height:calc(100vh - 80px);outline:none;border:1px solid var(--ars-color-border);overflow:hidden}.ars-modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--ars-color-border)}.ars-modal-title{margin:0;font-size:1.25rem;font-weight:800;color:var(--ars-color-text-main);letter-spacing:-.025em}.ars-modal-content{padding:0;overflow-y:auto;flex:1}.ars-modal-footer{padding:16px 24px;border-top:1px solid var(--ars-color-border);display:flex;justify-content:flex-end;gap:12px;background-color:var(--ars-color-bg-secondary)}.ars-modal-close{color:var(--ars-color-text-secondary);opacity:.6;transition:all .2s ease}.ars-modal-close:hover{opacity:1;background-color:var(--ars-color-bg-tertiary)}.ars-rich-editor{display:flex;flex-direction:column;width:100%}.ars-editor-textarea{width:100%;min-height:250px;padding:var(--ars-spacing-md);font-family:inherit;font-size:var(--ars-font-size-md);color:var(--ars-color-text-main);background-color:var(--ars-color-bg-main);border:1px solid var(--ars-color-border);resize:vertical;outline:none;line-height:1.6;transition:height .3s cubic-bezier(.4,0,.2,1),min-height .3s cubic-bezier(.4,0,.2,1);will-change:height,min-height}.ars-editor-footer{display:flex;justify-content:space-between;align-items:center;padding:var(--ars-spacing-xs) var(--ars-spacing-sm);background-color:var(--ars-color-bg-secondary);border:1px solid var(--ars-color-border);border-top:none;border-bottom-left-radius:var(--ars-radius-md);border-bottom-right-radius:var(--ars-radius-md)}.ars-editor-options{display:flex;align-items:center}.ars-checkbox-label{display:flex;align-items:center;gap:.5rem;font-size:var(--ars-font-size-xs);color:var(--ars-color-text-secondary);cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none}.ars-checkbox-label input[type=checkbox]{cursor:pointer}.ars-checkbox-label:hover{color:var(--ars-color-text-main)}.ars-char-count{font-size:var(--ars-font-size-xs);color:var(--ars-color-text-secondary)}.ars-tm-editor{flex:1;min-height:0}.ars-tm-editor .ars-editor-textarea{flex:1;min-height:200px;resize:none}.ars-editor-toolbar{display:flex;justify-content:space-between;align-items:center;padding:var(--ars-spacing-xs);background-color:var(--ars-color-bg-secondary);border:1px solid var(--ars-color-border);border-bottom:none;border-top-left-radius:var(--ars-radius-md);border-top-right-radius:var(--ars-radius-md)}.ars-toolbar-group{display:flex;align-items:center;gap:var(--ars-spacing-xs)}.ars-toolbar-divider{width:1px;height:20px;background-color:var(--ars-color-border);margin:0 var(--ars-spacing-xs)}.ars-toolbar-btn{height:28px!important;width:28px!important;padding:0!important;display:flex;align-items:center;justify-content:center}.ars-toolbar-btn[data-variant=primary]{background-color:var(--ars-color-primary)!important;color:#fff!important}.ars-toolbar-paste{width:auto!important;min-width:28px;padding:0 8px!important}.ars-toolbar-paste-label{margin-left:4px}.ars-phrase-popover{position:absolute;top:100%;right:0;z-index:1000;margin-top:4px;background-color:#fff;border-radius:8px;box-shadow:0 4px 12px #00000026;border:1px solid var(--ars-color-border)}.ars-bullet-selector{position:absolute!important;top:100%!important;left:0!important;margin-top:5px!important;background:#fff!important;border:1px solid #ddd!important;border-radius:8px!important;box-shadow:0 8px 24px #0003!important;display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:6px!important;padding:10px!important;z-index:99999!important;width:auto!important;min-width:140px!important;pointer-events:auto!important}.ars-bullet-selector-overlay{display:none!important}.ars-bullet-option{width:30px!important;height:30px!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;border-radius:4px!important;font-size:16px!important;color:#333!important;transition:all .2s ease!important;background:transparent!important}.ars-bullet-option:hover{background-color:#f0f0f0!important}.ars-bullet-option.active{background-color:var(--ars-color-primary)!important;color:#fff!important}.ars-bullet-btn{position:relative!important}.ars-bullet-indicator{position:absolute!important;bottom:-1px!important;right:-1px!important;font-size:11px!important;color:inherit!important;opacity:.8!important;width:12px!important;height:12px!important;display:flex!important;align-items:center!important;justify-content:center!important;pointer-events:none!important;z-index:1!important;font-weight:700!important}.ars-ai-modal-body{display:flex;flex-direction:column;gap:var(--ars-spacing-md)}.ars-ai-settings-compact{display:flex;gap:var(--ars-spacing-sm);background:#f8fafc;padding:var(--ars-spacing-xs);border-radius:var(--ars-radius-lg);border:1px solid #e2e8f0}.ars-ai-provider-card,.ars-ai-length-card,.ars-ai-vision-card{background:#fff!important;border:1px solid #e2e8f0!important;transition:transform var(--ars-anim-fast),box-shadow var(--ars-anim-fast)}.ars-ai-provider-card:hover,.ars-ai-length-card:hover,.ars-ai-vision-card:hover{box-shadow:0 4px 6px -1px #0000000d}.ars-ai-provider-card{display:flex;align-items:center;gap:var(--ars-spacing-sm);flex:1}.ars-ai-length-card{display:flex;align-items:center;gap:var(--ars-spacing-sm);flex:2}.ars-ai-vision-card{flex:1;display:flex;align-items:center}.ars-ai-length-selector{display:flex;gap:4px;flex:1}.ars-ai-length-btn{flex:1;padding:6px 8px;font-size:var(--ars-font-size-xs);border:1px solid var(--ars-color-border);background-color:var(--ars-color-bg-main);color:var(--ars-color-text-secondary);border-radius:var(--ars-radius-sm);cursor:pointer;transition:all var(--ars-anim-fast)}.ars-ai-length-btn:hover{background-color:var(--ars-color-bg-secondary)}.ars-ai-length-btn.active{background-color:var(--ars-color-primary);color:#fff;border-color:var(--ars-color-primary);font-weight:600}.ars-label{font-size:var(--ars-font-size-sm);font-weight:600;color:var(--ars-color-text-main)}.ars-select{flex:1;height:32px;border-radius:var(--ars-radius-sm);border:1px solid var(--ars-color-border);padding:0 var(--ars-spacing-xs);outline:none;font-family:inherit}.ars-ai-prompt-section{display:flex;flex-direction:column;gap:var(--ars-spacing-sm)}.ars-ai-prompt-input{width:100%;min-height:80px;padding:var(--ars-spacing-md);border:1px solid var(--ars-color-border);border-radius:var(--ars-radius-lg);font-family:inherit;font-size:var(--ars-font-size-md);line-height:1.6;resize:vertical;outline:none;transition:all var(--ars-anim-fast)}.ars-ai-prompt-input:focus{border-color:var(--ars-color-primary)}.ars-ai-result-section{display:flex;flex-direction:column;gap:var(--ars-spacing-xs)}.ars-ai-result-container{min-height:150px;padding:var(--ars-spacing-md);background-color:var(--ars-color-bg-secondary);border:1px dotted var(--ars-color-border);border-radius:var(--ars-radius-md);position:relative}.ars-ai-result-text{margin:0;line-height:1.6;white-space:pre-wrap}.ars-ai-placeholder{color:var(--ars-color-text-secondary);display:flex;align-items:center;justify-content:center;height:100%;font-style:italic}.ars-ai-error{padding:var(--ars-spacing-sm);background-color:#ba09331a;color:var(--ars-color-error);border-radius:var(--ars-radius-sm);font-size:var(--ars-font-size-sm)}.ars-settings-layout{display:flex;min-height:380px;gap:var(--ars-spacing-md)}.ars-settings-sidebar{width:180px;display:flex;flex-direction:column;gap:var(--ars-spacing-xs);border-right:1px solid var(--ars-color-border);padding-right:var(--ars-spacing-md)}.ars-tab-btn{justify-content:flex-start!important;width:100%}.ars-settings-content{flex:1;overflow-y:auto}.ars-settings-section{display:flex;flex-direction:column;gap:var(--ars-spacing-md)}.ars-settings-section h3{margin:0;font-size:var(--ars-font-size-lg);color:var(--ars-color-text-main)}.ars-setting-item{display:flex;flex-direction:column;gap:var(--ars-spacing-xs)}.ars-setting-subgroup{padding-left:var(--ars-spacing-md);border-left:2px solid var(--ars-color-bg-tertiary);display:flex;flex-direction:column;gap:var(--ars-spacing-md)}.ars-help-text{font-size:var(--ars-font-size-xs);color:var(--ars-color-text-secondary);margin-top:-8px}.ars-description{font-size:var(--ars-font-size-sm);color:var(--ars-color-text-secondary);margin-top:-12px}.ars-about-section{align-items:center;text-align:center}.ars-brand{display:flex;flex-direction:column;align-items:center;margin-bottom:var(--ars-spacing-lg)}.ars-brand h1{font-size:var(--ars-font-size-xl);margin:var(--ars-spacing-sm) 0 0 0}.ars-brand-icon{color:var(--ars-color-primary)}.ars-version{font-size:var(--ars-font-size-xs);color:var(--ars-color-text-secondary)}.ars-scaling-wrapper{transition:height .2s ease-out,width .2s ease-out}.ars-scaling-wrapper.is-resizing{transition:none;cursor:nwse-resize}.ars-scaling-content{transition:transform .2s ease-out;pointer-events:auto}.is-resizing .ars-scaling-content{transition:none}.ars-resize-handle{position:absolute;bottom:5px;right:5px;width:12px;height:12px;cursor:nwse-resize;z-index:1000;opacity:.6;transition:opacity .2s ease;background:linear-gradient(-45deg,transparent 20%,#ccc 20%,#ccc 30%,transparent 30%,transparent 45%,#ccc 45%,#ccc 55%,transparent 55%)}.ars-resize-handle:hover,.is-resizing .ars-resize-handle{opacity:1}.ars-resize-handle svg{display:none}.ars-studio-container{display:flex;flex-direction:column;background-color:var(--ars-color-bg-main);border:1px solid var(--ars-color-border);border-radius:var(--ars-radius-lg);box-shadow:var(--ars-shadow-lg);overflow:hidden;max-width:900px;margin:0 auto}.ars-studio-header{display:flex;align-items:center;justify-content:space-between;padding:var(--ars-spacing-md) var(--ars-spacing-lg);background-color:var(--ars-color-secondary);color:#fff}.ars-title-group{display:flex;align-items:center;gap:var(--ars-spacing-sm)}.ars-title-group h1{font-size:var(--ars-font-size-lg);margin:0;font-weight:700;letter-spacing:-.5px}.ars-logo{color:var(--ars-color-primary)}.ars-studio-main{padding:var(--ars-spacing-lg);display:flex;flex-direction:column;gap:var(--ars-spacing-xl)}.ars-form-section{display:flex;flex-direction:column;gap:var(--ars-spacing-md)}.ars-editor-label-row{display:flex;align-items:center;justify-content:space-between}.ars-editor-label-row label{font-size:var(--ars-font-size-sm);font-weight:600;color:var(--ars-color-text-main)}.ars-ai-trigger{color:var(--ars-color-primary)!important;border-color:var(--ars-color-primary)!important}.ars-ai-trigger:hover{background-color:#ff99000d!important}.ars-actions-section{display:flex;flex-direction:column;align-items:center;gap:var(--ars-spacing-sm);padding-top:var(--ars-spacing-lg);border-top:1px solid var(--ars-color-bg-tertiary)}.ars-apply-btn{width:100%;max-width:400px;height:48px!important;font-size:var(--ars-font-size-md)!important}.ars-hint{font-size:var(--ars-font-size-xs);color:var(--ars-color-text-secondary);margin:0}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.\\!container{width:100%!important}.container{width:100%}@media(min-width:640px){.\\!container{max-width:640px!important}.container{max-width:640px}}@media(min-width:768px){.\\!container{max-width:768px!important}.container{max-width:768px}}@media(min-width:1024px){.\\!container{max-width:1024px!important}.container{max-width:1024px}}@media(min-width:1280px){.\\!container{max-width:1280px!important}.container{max-width:1280px}}@media(min-width:1536px){.\\!container{max-width:1536px!important}.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.collapse{visibility:collapse}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.inset-0{inset:0}.inset-y-0{top:0;bottom:0}.bottom-2{bottom:.5rem}.left-0{left:0}.left-3{left:.75rem}.left-4{left:1rem}.right-2{right:.5rem}.right-3{right:.75rem}.right-4{right:1rem}.right-8{right:2rem}.top-0{top:0}.top-1\\/2{top:50%}.top-\\[34px\\]{top:34px}.z-10{z-index:10}.z-20{z-index:20}.col-span-full{grid-column:1 / -1}.mx-auto{margin-left:auto;margin-right:auto}.my-1{margin-top:.25rem;margin-bottom:.25rem}.my-auto{margin-top:auto;margin-bottom:auto}.mb-0{margin-bottom:0}.mb-0\\.5{margin-bottom:.125rem}.mb-1{margin-bottom:.25rem}.mb-1\\.5{margin-bottom:.375rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.ml-0\\.5{margin-left:.125rem}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.ml-7{margin-left:1.75rem}.mt-0\\.5{margin-top:.125rem}.mt-1{margin-top:.25rem}.mt-1\\.5{margin-top:.375rem}.mt-2{margin-top:.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mt-8{margin-top:2rem}.mt-auto{margin-top:auto}.line-clamp-3{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3}.line-clamp-4{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.contents{display:contents}.hidden{display:none}.aspect-square{aspect-ratio:1 / 1}.\\!h-auto{height:auto!important}.h-1{height:.25rem}.h-1\\.5{height:.375rem}.h-10{height:2.5rem}.h-12{height:3rem}.h-14{height:3.5rem}.h-16{height:4rem}.h-24{height:6rem}.h-3{height:.75rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-6{height:1.5rem}.h-7{height:1.75rem}.h-8{height:2rem}.h-\\[38px\\]{height:38px}.h-full{height:100%}.h-px{height:1px}.max-h-40{max-height:10rem}.min-h-\\[100px\\]{min-height:100px}.min-h-\\[400px\\]{min-height:400px}.min-h-\\[650px\\]{min-height:650px}.w-1\\.5{width:.375rem}.w-10{width:2.5rem}.w-11{width:2.75rem}.w-12{width:3rem}.w-16{width:4rem}.w-24{width:6rem}.w-28{width:7rem}.w-3{width:.75rem}.w-4{width:1rem}.w-5{width:1.25rem}.w-8{width:2rem}.w-\\[480px\\]{width:480px}.w-full{width:100%}.min-w-0{min-width:0px}.max-w-7xl{max-width:80rem}.max-w-\\[1200px\\]{max-width:1200px}.max-w-\\[80px\\]{max-width:80px}.max-w-md{max-width:28rem}.flex-1{flex:1 1 0%}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.origin-center{transform-origin:center}.origin-right{transform-origin:right}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-0{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-4{--tw-translate-x: 1rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-\\[0\\.55\\]{--tw-scale-x: .55;--tw-scale-y: .55;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-\\[0\\.7\\]{--tw-scale-x: .7;--tw-scale-y: .7;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes bounce{0%,to{transform:translateY(-25%);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:none;animation-timing-function:cubic-bezier(0,0,.2,1)}}.animate-bounce{animation:bounce 1s infinite}@keyframes spin{to{transform:rotate(360deg)}}.animate-spin{animation:spin 1s linear infinite}.cursor-help{cursor:help}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.resize-none{resize:none}.resize{resize:both}.appearance-none{-webkit-appearance:none;-moz-appearance:none;appearance:none}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-0{gap:0px}.gap-0\\.5{gap:.125rem}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-6{gap:1.5rem}.gap-8{gap:2rem}.space-y-1>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.25rem * var(--tw-space-y-reverse))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.space-y-5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.25rem * var(--tw-space-y-reverse))}.space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}.self-start{align-self:flex-start}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-wrap{white-space:pre-wrap}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-3xl{border-radius:1.5rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.rounded-xl{border-radius:.75rem}.border{border-width:1px}.border-b{border-bottom-width:1px}.border-t{border-top-width:1px}.border-amber-200{--tw-border-opacity: 1;border-color:rgb(253 230 138 / var(--tw-border-opacity, 1))}.border-amber-400\\/20{border-color:#fbbf2433}.border-blue-100{--tw-border-opacity: 1;border-color:rgb(219 234 254 / var(--tw-border-opacity, 1))}.border-emerald-100{--tw-border-opacity: 1;border-color:rgb(209 250 229 / var(--tw-border-opacity, 1))}.border-emerald-400\\/20{border-color:#34d39933}.border-gray-100{--tw-border-opacity: 1;border-color:rgb(243 244 246 / var(--tw-border-opacity, 1))}.border-gray-200{--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1))}.border-gray-300{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity, 1))}.border-green-100{--tw-border-opacity: 1;border-color:rgb(220 252 231 / var(--tw-border-opacity, 1))}.border-green-200{--tw-border-opacity: 1;border-color:rgb(187 247 208 / var(--tw-border-opacity, 1))}.border-green-200\\/50{border-color:#bbf7d080}.border-indigo-100{--tw-border-opacity: 1;border-color:rgb(224 231 255 / var(--tw-border-opacity, 1))}.border-red-100{--tw-border-opacity: 1;border-color:rgb(254 226 226 / var(--tw-border-opacity, 1))}.border-red-100\\/50{border-color:#fee2e280}.border-red-400\\/20{border-color:#f8717133}.border-white\\/5{border-color:#ffffff0d}.bg-amber-100{--tw-bg-opacity: 1;background-color:rgb(254 243 199 / var(--tw-bg-opacity, 1))}.bg-amber-400\\/10{background-color:#fbbf241a}.bg-amber-50{--tw-bg-opacity: 1;background-color:rgb(255 251 235 / var(--tw-bg-opacity, 1))}.bg-amber-500{--tw-bg-opacity: 1;background-color:rgb(245 158 11 / var(--tw-bg-opacity, 1))}.bg-amber-500\\/10{background-color:#f59e0b1a}.bg-amber-600{--tw-bg-opacity: 1;background-color:rgb(217 119 6 / var(--tw-bg-opacity, 1))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-blue-500{--tw-bg-opacity: 1;background-color:rgb(59 130 246 / var(--tw-bg-opacity, 1))}.bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}.bg-emerald-400\\/10{background-color:#34d3991a}.bg-emerald-50{--tw-bg-opacity: 1;background-color:rgb(236 253 245 / var(--tw-bg-opacity, 1))}.bg-emerald-500{--tw-bg-opacity: 1;background-color:rgb(16 185 129 / var(--tw-bg-opacity, 1))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1))}.bg-gray-100\\/50{background-color:#f3f4f680}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity, 1))}.bg-gray-300{--tw-bg-opacity: 1;background-color:rgb(209 213 219 / var(--tw-bg-opacity, 1))}.bg-gray-50{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1))}.bg-gray-50\\/30{background-color:#f9fafb4d}.bg-green-100{--tw-bg-opacity: 1;background-color:rgb(220 252 231 / var(--tw-bg-opacity, 1))}.bg-green-50{--tw-bg-opacity: 1;background-color:rgb(240 253 244 / var(--tw-bg-opacity, 1))}.bg-indigo-50{--tw-bg-opacity: 1;background-color:rgb(238 242 255 / var(--tw-bg-opacity, 1))}.bg-indigo-50\\/30{background-color:#eef2ff4d}.bg-indigo-500{--tw-bg-opacity: 1;background-color:rgb(99 102 241 / var(--tw-bg-opacity, 1))}.bg-indigo-600{--tw-bg-opacity: 1;background-color:rgb(79 70 229 / var(--tw-bg-opacity, 1))}.bg-red-400\\/10{background-color:#f871711a}.bg-red-50{--tw-bg-opacity: 1;background-color:rgb(254 242 242 / var(--tw-bg-opacity, 1))}.bg-red-50\\/30{background-color:#fef2f24d}.bg-red-500{--tw-bg-opacity: 1;background-color:rgb(239 68 68 / var(--tw-bg-opacity, 1))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.bg-white\\/5{background-color:#ffffff0d}.bg-white\\/50{background-color:#ffffff80}.bg-white\\/\\[0\\.08\\]{background-color:#ffffff14}.bg-zinc-900{--tw-bg-opacity: 1;background-color:rgb(24 24 27 / var(--tw-bg-opacity, 1))}.bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.from-amber-500{--tw-gradient-from: #f59e0b var(--tw-gradient-from-position);--tw-gradient-to: rgb(245 158 11 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-400{--tw-gradient-from: #60a5fa var(--tw-gradient-from-position);--tw-gradient-to: rgb(96 165 250 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-green-50{--tw-gradient-from: #f0fdf4 var(--tw-gradient-from-position);--tw-gradient-to: rgb(240 253 244 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-zinc-800{--tw-gradient-from: #27272a var(--tw-gradient-from-position);--tw-gradient-to: rgb(39 39 42 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.to-amber-400{--tw-gradient-to: #fbbf24 var(--tw-gradient-to-position)}.to-amber-600{--tw-gradient-to: #d97706 var(--tw-gradient-to-position)}.to-emerald-50\\/50{--tw-gradient-to: rgb(236 253 245 / .5) var(--tw-gradient-to-position)}.to-indigo-400{--tw-gradient-to: #818cf8 var(--tw-gradient-to-position)}.to-zinc-900{--tw-gradient-to: #18181b var(--tw-gradient-to-position)}.bg-clip-text{-webkit-background-clip:text;background-clip:text}.object-contain{-o-object-fit:contain;object-fit:contain}.p-0\\.5{padding:.125rem}.p-1{padding:.25rem}.p-1\\.5{padding:.375rem}.p-2{padding:.5rem}.p-2\\.5{padding:.625rem}.p-3{padding:.75rem}.p-3\\.5{padding:.875rem}.p-4{padding:1rem}.p-5{padding:1.25rem}.p-6{padding:1.5rem}.p-8{padding:2rem}.\\!px-3{padding-left:.75rem!important;padding-right:.75rem!important}.\\!py-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.px-1{padding-left:.25rem;padding-right:.25rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.px-12{padding-left:3rem;padding-right:3rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-24{padding-top:6rem;padding-bottom:6rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.pb-12{padding-bottom:3rem}.pb-2{padding-bottom:.5rem}.pb-6{padding-bottom:1.5rem}.pl-1{padding-left:.25rem}.pl-10{padding-left:2.5rem}.pl-3{padding-left:.75rem}.pr-10{padding-right:2.5rem}.pr-12{padding-right:3rem}.pr-4{padding-right:1rem}.pr-8{padding-right:2rem}.pt-1{padding-top:.25rem}.pt-10{padding-top:2.5rem}.pt-2{padding-top:.5rem}.pt-4{padding-top:1rem}.pt-6{padding-top:1.5rem}.pt-8{padding-top:2rem}.text-left{text-align:left}.text-center{text-align:center}.font-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.font-sans{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif}.\\!text-xs{font-size:.75rem!important;line-height:1rem!important}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.text-\\[7\\.5px\\]{font-size:7.5px}.text-\\[7px\\]{font-size:7px}.text-\\[8\\.5px\\]{font-size:8.5px}.text-\\[8px\\]{font-size:8px}.text-\\[9px\\]{font-size:9px}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-black{font-weight:900}.font-bold{font-weight:700}.font-light{font-weight:300}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.italic{font-style:italic}.leading-none{line-height:1}.leading-normal{line-height:1.5}.leading-relaxed{line-height:1.625}.leading-tight{line-height:1.25}.tracking-\\[0\\.2em\\]{letter-spacing:.2em}.tracking-tight{letter-spacing:-.025em}.tracking-wider{letter-spacing:.05em}.tracking-widest{letter-spacing:.1em}.\\!text-yellow-400{--tw-text-opacity: 1 !important;color:rgb(250 204 21 / var(--tw-text-opacity, 1))!important}.text-amber-400{--tw-text-opacity: 1;color:rgb(251 191 36 / var(--tw-text-opacity, 1))}.text-amber-500{--tw-text-opacity: 1;color:rgb(245 158 11 / var(--tw-text-opacity, 1))}.text-amber-600{--tw-text-opacity: 1;color:rgb(217 119 6 / var(--tw-text-opacity, 1))}.text-amber-800{--tw-text-opacity: 1;color:rgb(146 64 14 / var(--tw-text-opacity, 1))}.text-blue-400{--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity, 1))}.text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-emerald-400{--tw-text-opacity: 1;color:rgb(52 211 153 / var(--tw-text-opacity, 1))}.text-emerald-700{--tw-text-opacity: 1;color:rgb(4 120 87 / var(--tw-text-opacity, 1))}.text-gray-200{--tw-text-opacity: 1;color:rgb(229 231 235 / var(--tw-text-opacity, 1))}.text-gray-300{--tw-text-opacity: 1;color:rgb(209 213 219 / var(--tw-text-opacity, 1))}.text-gray-400{--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity, 1))}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}.text-gray-600{--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.text-gray-700{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity, 1))}.text-gray-900{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}.text-green-500{--tw-text-opacity: 1;color:rgb(34 197 94 / var(--tw-text-opacity, 1))}.text-green-600{--tw-text-opacity: 1;color:rgb(22 163 74 / var(--tw-text-opacity, 1))}.text-green-600\\/70{color:#16a34ab3}.text-green-700{--tw-text-opacity: 1;color:rgb(21 128 61 / var(--tw-text-opacity, 1))}.text-green-800{--tw-text-opacity: 1;color:rgb(22 101 52 / var(--tw-text-opacity, 1))}.text-indigo-600{--tw-text-opacity: 1;color:rgb(79 70 229 / var(--tw-text-opacity, 1))}.text-indigo-700{--tw-text-opacity: 1;color:rgb(67 56 202 / var(--tw-text-opacity, 1))}.text-orange-500{--tw-text-opacity: 1;color:rgb(249 115 22 / var(--tw-text-opacity, 1))}.text-purple-400{--tw-text-opacity: 1;color:rgb(192 132 252 / var(--tw-text-opacity, 1))}.text-purple-500{--tw-text-opacity: 1;color:rgb(168 85 247 / var(--tw-text-opacity, 1))}.text-red-400{--tw-text-opacity: 1;color:rgb(248 113 113 / var(--tw-text-opacity, 1))}.text-red-500{--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity, 1))}.text-red-600{--tw-text-opacity: 1;color:rgb(220 38 38 / var(--tw-text-opacity, 1))}.text-transparent{color:transparent}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-zinc-400{--tw-text-opacity: 1;color:rgb(161 161 170 / var(--tw-text-opacity, 1))}.text-zinc-500{--tw-text-opacity: 1;color:rgb(113 113 122 / var(--tw-text-opacity, 1))}.text-zinc-600{--tw-text-opacity: 1;color:rgb(82 82 91 / var(--tw-text-opacity, 1))}.underline{text-decoration-line:underline}.placeholder-gray-400::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity, 1))}.placeholder-gray-400::placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity, 1))}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-40{opacity:.4}.opacity-50{opacity:.5}.mix-blend-multiply{mix-blend-mode:multiply}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-\\[0_20px_50px_rgba\\(0\\,0\\,0\\,0\\.1\\)\\]{--tw-shadow: 0 20px 50px rgba(0,0,0,.1);--tw-shadow-colored: 0 20px 50px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-amber-200\\/50{--tw-shadow-color: rgb(253 230 138 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-amber-900\\/20{--tw-shadow-color: rgb(120 53 15 / .2);--tw-shadow: var(--tw-shadow-colored)}.outline{outline-style:solid}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.grayscale{--tw-grayscale: grayscale(100%);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur-md{--tw-backdrop-blur: blur(12px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-300{transition-duration:.3s}.duration-500{transition-duration:.5s}.ease-in{transition-timing-function:cubic-bezier(.4,0,1,1)}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}:host{display:block;animation:ars-fade-zoom .6s cubic-bezier(.2,.8,.2,1) forwards;font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light;color:var(--ars-color-text-main);background-color:transparent;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;--ars-color-primary: #FF9900;--ars-color-primary-hover: #e68a00;--ars-color-secondary: #232f3e;--ars-color-secondary-hover: #131921;--ars-color-text-main: #0f1111;--ars-color-text-secondary: #565959;--ars-color-text-inverse: #ffffff;--ars-color-bg-main: #ffffff;--ars-color-bg-secondary: #f0f2f2;--ars-color-bg-tertiary: #e7e9ec;--ars-color-border: #d5d9d9;--ars-color-border-focus: #e77600;--ars-color-success: #067d62;--ars-color-error: #ba0933;--ars-color-warning: #ffa41c;--ars-radius-sm: 4px;--ars-radius-md: 8px;--ars-radius-lg: 12px;--ars-radius-xl: 20px;--ars-shadow-sm: 0 1px 3px rgba(0, 0, 0, .12);--ars-shadow-md: 0 4px 6px rgba(0, 0, 0, .1);--ars-shadow-lg: 0 10px 15px rgba(0, 0, 0, .1);--ars-spacing-xs: 4px;--ars-spacing-sm: 8px;--ars-spacing-md: 16px;--ars-spacing-lg: 24px;--ars-spacing-xl: 32px;--ars-font-size-xs: 11px;--ars-font-size-sm: 13px;--ars-font-size-md: 15px;--ars-font-size-lg: 18px;--ars-font-size-xl: 24px;--ars-anim-fast: .15s ease;--ars-anim-normal: .25s ease}.ars-dark-mode{color-scheme:dark;--ars-color-text-main: #e5e7eb;--ars-color-text-secondary: #9ca3af;--ars-color-text-inverse: #111827;--ars-color-bg-main: #1f2937;--ars-color-bg-secondary: #111827;--ars-color-bg-tertiary: #374151;--ars-color-border: #4b5563;--ars-color-border-focus: #f59e0b;--ars-shadow-sm: 0 1px 3px rgba(0, 0, 0, .5);--ars-shadow-md: 0 4px 6px rgba(0, 0, 0, .4);--ars-shadow-lg: 0 10px 15px rgba(0, 0, 0, .4)}:host{padding:60px 24px!important}*{box-sizing:border-box}button{cursor:pointer;font-family:inherit}::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#ccc;border-radius:4px}::-webkit-scrollbar-thumb:hover{background:#bbb}@keyframes ars-fade-zoom{0%{opacity:0;transform:scale(.98) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}.ars-review-shell-listing{animation:ars-fade-zoom .6s cubic-bezier(.2,.8,.2,1) forwards}.ryp__desktop{display:none!important}.ars-dark-mode .bg-white{background-color:var(--ars-color-bg-main)!important}.ars-dark-mode .bg-gray-50,.ars-dark-mode .bg-gray-50\\/30{background-color:var(--ars-color-bg-secondary)!important}.ars-dark-mode .bg-gray-100{background-color:var(--ars-color-bg-tertiary)!important}.ars-dark-mode .bg-white\\/80{background-color:#1f2937cc!important}.ars-dark-mode .bg-white\\/50{background-color:#1f293780!important}.ars-dark-mode .text-gray-900,.ars-dark-mode .text-gray-800{color:var(--ars-color-text-main)!important}.ars-dark-mode .text-gray-700,.ars-dark-mode .text-gray-600{color:var(--ars-color-text-secondary)!important}.ars-dark-mode .text-gray-500{color:#9ca3af!important}.ars-dark-mode .text-gray-400{color:#6b7280!important}.ars-dark-mode .border-gray-100,.ars-dark-mode .border-gray-200,.ars-dark-mode .border-gray-300{border-color:var(--ars-color-border)!important}.ars-dark-mode .hover\\:bg-gray-50:hover{background-color:var(--ars-color-bg-tertiary)!important}.ars-dark-mode .hover\\:bg-gray-100:hover{background-color:#4b5563!important}.ars-dark-mode input,.ars-dark-mode textarea,.ars-dark-mode select{background-color:var(--ars-color-bg-secondary)!important;color:var(--ars-color-text-main)!important;border-color:var(--ars-color-border)!important}.ars-dark-mode .bg-black\\/20{background-color:#0009!important}.ars-dark-mode .text-amber-500{color:#fbbf24!important}.ars-dark-mode .bg-amber-50{background-color:#f59e0b26!important}.ars-dark-mode img.mix-blend-multiply{mix-blend-mode:normal!important}.ars-dark-mode .ars-review-shell{background-color:var(--ars-color-bg-main)!important;color:var(--ars-color-text-main)!important}.ars-dark-mode .ars-review-submit{background-color:var(--ars-color-bg-secondary)!important;border-top-color:var(--ars-color-border)!important}.ars-dark-mode .ars-back-button{background-color:var(--ars-color-bg-tertiary)!important;border-color:var(--ars-color-border)!important;color:var(--ars-color-text-main)!important}.ars-dark-mode .ars-back-button:hover{background-color:var(--ars-color-bg-secondary)!important}.ars-dark-mode .ars-form-label{color:var(--ars-color-text-main)!important}.ars-dark-mode .ars-ai-provider-card,.ars-dark-mode .ars-ai-length-card,.ars-dark-mode .ars-ai-vision-card{background:var(--ars-color-bg-main)!important;border-color:var(--ars-color-border)!important}.ars-dark-mode .ars-ai-result-container{background-color:var(--ars-color-bg-secondary)!important;border-color:var(--ars-color-border)!important}.ars-dark-mode .ars-ai-prompt-input{background-color:var(--ars-color-bg-secondary)!important;color:var(--ars-color-text-main)!important;border-color:var(--ars-color-border)!important}.ars-dark-mode .ars-product-title{color:var(--ars-color-text-main)!important}.ars-dark-mode .ars-product-name{color:var(--ars-color-text-secondary)!important}.ars-dark-mode .ars-media-upload{background-color:var(--ars-color-bg-secondary)!important;border-color:var(--ars-color-border)!important}.ars-dark-mode .ars-media-upload-placeholder,.ars-dark-mode .ars-media-upload-icon{color:var(--ars-color-text-secondary)!important}.ars-dark-mode .ars-media-upload-paste-btn,.ars-dark-mode .ars-media-upload-google-btn,.ars-dark-mode .ars-media-upload-icloud-btn{background-color:var(--ars-color-bg-main)!important;color:var(--ars-color-text-main)!important;border-color:var(--ars-color-border)!important}.ars-dark-mode .ars-media-upload-paste-btn:hover,.ars-dark-mode .ars-media-upload-google-btn:hover,.ars-dark-mode .ars-media-upload-icloud-btn:hover{background-color:var(--ars-color-bg-tertiary)!important;border-color:var(--ars-color-primary)!important;color:var(--ars-color-primary)!important}.ars-dark-mode .ars-ai-trigger{color:var(--ars-color-primary)!important;border-color:var(--ars-color-primary)!important;background-color:transparent!important}.ars-dark-mode .ars-ai-trigger:hover{background-color:#ff99001a!important}.ars-dark-mode .ars-ai-trigger:disabled{opacity:.5!important}.ars-dark-mode .ars-phrase-popover,.ars-dark-mode .ars-bullet-selector{background-color:var(--ars-color-bg-main)!important;background:var(--ars-color-bg-main)!important;border-color:var(--ars-color-border)!important;color:var(--ars-color-text-main)!important;box-shadow:0 8px 32px #0006!important}.ars-dark-mode .ars-popover-header{border-bottom-color:var(--ars-color-border)!important}.ars-dark-mode .ars-popover-item,.ars-dark-mode .ars-template-item,.ars-dark-mode .ars-phrase-item{color:var(--ars-color-text-main)!important}.ars-dark-mode .ars-popover-item:hover,.ars-dark-mode .ars-template-item:hover,.ars-dark-mode .ars-phrase-item:hover{background-color:var(--ars-color-bg-tertiary)!important}.ars-dark-mode .ars-bullet-option{color:var(--ars-color-text-main)!important;background:transparent!important}.ars-dark-mode .ars-bullet-option:hover{background-color:var(--ars-color-bg-tertiary)!important}.ars-dark-mode .ars-bullet-option.active{background-color:var(--ars-color-primary)!important;color:#fff!important}.ars-dark-mode .bg-gray-50{background-color:var(--ars-color-bg-tertiary)!important;color:var(--ars-color-text-secondary)!important}.ars-dark-mode .border-gray-200{border-color:var(--ars-color-border)!important}.ars-dark-mode .text-gray-600{color:var(--ars-color-text-secondary)!important}.ars-dark-mode ::-webkit-scrollbar-thumb{background:#4b5563}.ars-dark-mode ::-webkit-scrollbar-thumb:hover{background:#6b7280}.after\\:absolute:after{content:var(--tw-content);position:absolute}.after\\:left-\\[2px\\]:after{content:var(--tw-content);left:2px}.after\\:top-\\[2px\\]:after{content:var(--tw-content);top:2px}.after\\:h-4:after{content:var(--tw-content);height:1rem}.after\\:h-5:after{content:var(--tw-content);height:1.25rem}.after\\:w-4:after{content:var(--tw-content);width:1rem}.after\\:w-5:after{content:var(--tw-content);width:1.25rem}.after\\:rounded-full:after{content:var(--tw-content);border-radius:9999px}.after\\:border:after{content:var(--tw-content);border-width:1px}.after\\:border-gray-300:after{content:var(--tw-content);--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity, 1))}.after\\:bg-white:after{content:var(--tw-content);--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.after\\:transition-all:after{content:var(--tw-content);transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.after\\:content-\\[\\'\\'\\]:after{--tw-content: "";content:var(--tw-content)}.hover\\:border-amber-500\\/50:hover{border-color:#f59e0b80}.hover\\:border-blue-500\\/50:hover{border-color:#3b82f680}.hover\\:bg-blue-50:hover{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.hover\\:bg-gray-100:hover{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1))}.hover\\:bg-gray-200:hover{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity, 1))}.hover\\:bg-red-50:hover{--tw-bg-opacity: 1;background-color:rgb(254 242 242 / var(--tw-bg-opacity, 1))}.hover\\:from-amber-600:hover{--tw-gradient-from: #d97706 var(--tw-gradient-from-position);--tw-gradient-to: rgb(217 119 6 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.hover\\:to-amber-500:hover{--tw-gradient-to: #f59e0b var(--tw-gradient-to-position)}.hover\\:to-amber-700:hover{--tw-gradient-to: #b45309 var(--tw-gradient-to-position)}.hover\\:text-blue-600:hover{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.hover\\:text-gray-600:hover{--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.hover\\:text-gray-700:hover{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity, 1))}.hover\\:text-indigo-700:hover{--tw-text-opacity: 1;color:rgb(67 56 202 / var(--tw-text-opacity, 1))}.hover\\:text-zinc-400:hover{--tw-text-opacity: 1;color:rgb(161 161 170 / var(--tw-text-opacity, 1))}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:opacity-80:hover{opacity:.8}.hover\\:shadow-md:hover{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.focus\\:border-amber-500:focus{--tw-border-opacity: 1;border-color:rgb(245 158 11 / var(--tw-border-opacity, 1))}.focus\\:border-blue-500\\/50:focus{border-color:#3b82f680}.focus\\:border-indigo-500:focus{--tw-border-opacity: 1;border-color:rgb(99 102 241 / var(--tw-border-opacity, 1))}.focus\\:bg-white:focus{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-2:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-amber-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(245 158 11 / var(--tw-ring-opacity, 1))}.focus\\:ring-amber-500\\/20:focus{--tw-ring-color: rgb(245 158 11 / .2)}.focus\\:ring-blue-500\\/20:focus{--tw-ring-color: rgb(59 130 246 / .2)}.focus\\:ring-indigo-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(99 102 241 / var(--tw-ring-opacity, 1))}.active\\:scale-95:active{--tw-scale-x: .95;--tw-scale-y: .95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:focus-within .group-focus-within\\:text-blue-400{--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity, 1))}.group:hover .group-hover\\:bg-white\\/10{background-color:#ffffff1a}.group:hover .group-hover\\:text-blue-400{--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity, 1))}.group:hover .group-hover\\:text-zinc-400{--tw-text-opacity: 1;color:rgb(161 161 170 / var(--tw-text-opacity, 1))}.group:hover .group-hover\\:opacity-80{opacity:.8}.peer:checked~.peer-checked\\:bg-indigo-600{--tw-bg-opacity: 1;background-color:rgb(79 70 229 / var(--tw-bg-opacity, 1))}.peer:checked~.peer-checked\\:after\\:translate-x-full:after{content:var(--tw-content);--tw-translate-x: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.peer:checked~.peer-checked\\:after\\:border-white:after{content:var(--tw-content);--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity, 1))}.peer:focus~.peer-focus\\:outline-none{outline:2px solid transparent;outline-offset:2px}.peer:focus~.peer-focus\\:ring-2{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.peer:focus~.peer-focus\\:ring-4{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.peer:focus~.peer-focus\\:ring-indigo-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(165 180 252 / var(--tw-ring-opacity, 1))}.dark\\:border-zinc-600:is(.dark *){--tw-border-opacity: 1;border-color:rgb(82 82 91 / var(--tw-border-opacity, 1))}.dark\\:border-zinc-700:is(.dark *){--tw-border-opacity: 1;border-color:rgb(63 63 70 / var(--tw-border-opacity, 1))}.dark\\:bg-amber-900:is(.dark *){--tw-bg-opacity: 1;background-color:rgb(120 53 15 / var(--tw-bg-opacity, 1))}.dark\\:bg-zinc-700:is(.dark *){--tw-bg-opacity: 1;background-color:rgb(63 63 70 / var(--tw-bg-opacity, 1))}.dark\\:bg-zinc-800:is(.dark *){--tw-bg-opacity: 1;background-color:rgb(39 39 42 / var(--tw-bg-opacity, 1))}.dark\\:text-amber-300:is(.dark *){--tw-text-opacity: 1;color:rgb(252 211 77 / var(--tw-text-opacity, 1))}.dark\\:text-white:is(.dark *){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.dark\\:hover\\:text-gray-200:hover:is(.dark *){--tw-text-opacity: 1;color:rgb(229 231 235 / var(--tw-text-opacity, 1))}@media(min-width:640px){.sm\\:w-auto{width:auto}.sm\\:max-w-xs{max-width:20rem}.sm\\:flex-row{flex-direction:row}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}}@media(min-width:768px){.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(min-width:1024px){.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.lg\\:px-8{padding-left:2rem;padding-right:2rem}}@media(min-width:1280px){.xl\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}`;
  const MOUNT_ID = "amazon-review-studio-root";
  const HIDE_CSS = `
    #react-app.ryp__desktop, 
    .in-context-ryp__container, 
    [data-testid="in-context-ryp-form"],
    #in-context-ryp-form {
        display: none !important;
    }
    #amazon-review-studio-root {
        display: block !important;
    }
`;
  function injectHidingStyle() {
    if (document.getElementById("ars-anti-flicker")) return;
    const debugUnhide = settingsService.get("debug_unhide_native");
    if (debugUnhide) return;
    const styleEl = document.createElement("style");
    styleEl.id = "ars-anti-flicker";
    styleEl.textContent = HIDE_CSS;
    (document.head || document.documentElement).appendChild(styleEl);
  }
  injectHidingStyle();
  const CONTAINER_SELECTORS = [
    "#react-app.ryp__desktop",
    "#react-app",
    ".in-context-ryp__container",
    '[data-testid="in-context-ryp-form"]',
    ".ryp__review-candidates-list-container__container"
];
  function detectPageType() {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const hasAsin = searchParams.has("asin");
    const isThankYouPage = path.toLowerCase().includes("thankyou");
    const isListingPage = path.includes("/listing");
    const isReviewPurchasesWithoutEdit = path.includes("/review-your-purchases") && !hasAsin && !path.includes("/edit");
    const hasDOMIndicators = !!document.querySelector(".in-context-ryp__thankyou-container-desktop") || !!document.querySelector(".ryp__review-candidates-list-container__container");
    const shouldShowListing = isThankYouPage || isListingPage || isReviewPurchasesWithoutEdit || hasDOMIndicators;
    return shouldShowListing ? "listing" : "review";
  }
  function findAmazonReviewContainer() {
    for (const sel of CONTAINER_SELECTORS) {
      const el = document.querySelector(sel);
      if (el) {
        console.log(`[Amazon Review Studio] Container found via selector: ${sel}`);
        return el;
      }
    }
    return null;
  }
  function hideAmazonReviewUI(container) {
    const debugUnhide = settingsService.get("debug_unhide_native");
    const sideBySide = settingsService.get("debug_native_side_by_side");
    if (debugUnhide) {
      container.style.display = "block";
      if (sideBySide) {
        container.style.opacity = "1";
        container.style.marginTop = "0";
        container.style.flex = "1";
        container.style.minWidth = "0";
      } else {
        container.style.opacity = "0.5";
        container.style.marginTop = "600px";
      }
    } else {
      container.style.display = "none";
    }
  }
  function mount() {
    if (document.getElementById(MOUNT_ID)) return;
    const container = findAmazonReviewContainer();
    if (!container) {
      return;
    }
    console.log("[Amazon Review Studio] Found review container, replacing with Review Studio...");
    hideAmazonReviewUI(container);
    const host = document.createElement("div");
    host.id = MOUNT_ID;
    const debugUnhide = settingsService.get("debug_unhide_native");
    const sideBySide = settingsService.get("debug_native_side_by_side");
    Object.assign(host.style, {
      position: "relative",
      width: "100%",
      maxWidth: "100%",
      minHeight: "600px",
paddingTop: debugUnhide && sideBySide ? "0" : "40px",
paddingLeft: "24px",
      paddingRight: "24px",
      boxSizing: "border-box"
    });
    const parent = container.parentNode;
    if (parent) {
      if (debugUnhide && sideBySide) {
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.gap = "20px";
        wrapper.style.alignItems = "flex-start";
        wrapper.style.width = "100%";
        wrapper.style.maxWidth = "100%";
        parent.insertBefore(wrapper, container);
        wrapper.appendChild(container);
        wrapper.appendChild(host);
        Object.assign(host.style, {
          flex: "1",
          minWidth: "0"
        });
      } else {
        parent.insertBefore(host, container.nextSibling);
      }
    } else {
      document.body.appendChild(host);
    }
    const shadow = host.attachShadow({ mode: "open" });
    const styleEl = document.createElement("style");
    styleEl.textContent = style;
    shadow.appendChild(styleEl);
    const rootContainer = document.createElement("div");
    rootContainer.className = "ars-root-container";
    shadow.appendChild(rootContainer);
    const pageType = detectPageType();
    console.log("[Amazon Review Studio] Rendering React tree...", `Component: ${pageType === "listing" ? "ReviewPurchasesPage" : "App"}`);
    const root = ReactDOM.createRoot(rootContainer);
    root.render(
      pageType === "listing" ? React__default.createElement(ReviewPurchasesPage, null) : React__default.createElement(App, null)
    );
    window.__arsCurrentPageType = pageType;
    window.__arsReactRoot = { root, rootContainer };
  }
  function remountIfNeeded() {
    const currentPageType = window.__arsCurrentPageType;
    const newPageType = detectPageType();
    if (currentPageType && currentPageType !== newPageType) {
      console.log("[Amazon Review Studio] Page type changed, remounting...", { from: currentPageType, to: newPageType });
      const rootInfo = window.__arsReactRoot;
      if (rootInfo?.root) {
        rootInfo.root.render(
          newPageType === "listing" ? React__default.createElement(ReviewPurchasesPage, null) : React__default.createElement(App, null)
        );
        window.__arsCurrentPageType = newPageType;
      }
    }
  }
  function watchAndMount() {
    if (document.getElementById(MOUNT_ID)) return;
    if (findAmazonReviewContainer()) {
      mount();
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watchAndMount);
  } else {
    watchAndMount();
  }
  const observer = new MutationObserver(() => {
    watchAndMount();
    remountIfNeeded();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  let lastUrl = window.location.href;
  const urlObserver = new MutationObserver(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      console.log("[Amazon Review Studio] URL changed:", { from: lastUrl, to: currentUrl });
      lastUrl = currentUrl;
      remountIfNeeded();
    }
  });
  urlObserver.observe(document, { subtree: true, childList: true });
  window.addEventListener("popstate", () => {
    console.log("[Amazon Review Studio] Popstate detected");
    remountIfNeeded();
  });

})(React, ReactDOM, Swal);