export default function (hljs) {
const COMMENT = {
  scope: "comment",
  variants: [
    { begin: /^\s*#/, end: /$/, relevance: 0 }, // Standalone comments
    { begin: /#(?=\s|\w)/, end: /$/, relevance: 0 }, // Inline comments
    { begin: /\s*#/, end: /$/, relevance: 0 }, // Captures comments after Jinja2 and values
  ],
};

  const INLINE_COMMENT = {
    scope: "comment",
    begin: /;/,
    end: /$/, // Ensures semicolon comments are correctly highlighted
    relevance: 0,
  };

  const KEY_VALUE_PAIR = {
    scope: "addition",
    match: /^\s*[^\s:]+[:=]/,
    contains: [
      {
        scope: "deletion",
        match: /[^\s:]+/,
      },
      {
        scope: "deletion",
        match: /[0-9]+/,
      },
    ],
  };

  const SECTION = {
    scope: "punctuation",
    begin: /^\s*\[/,
    end: /\]/,
    contains: [
      {
        scope: "title",
        match: /[^\]]+/,
      },
    ],
  };

  const INDENTED_BLOCK = {
    scope: "symbol",
    begin: /^\s+/,
    end: /$/,
    contains: [
      hljs.inherit(hljs.QUOTE_STRING_MODE, { scope: "string" }),
      hljs.inherit(hljs.NUMBER_MODE, { scope: "number" }),
    ],
  };

  const JINJA2_TEMPLATE = {
    scope: "punctuation",
    begin: /\{%/,
    end: /%\}/,
    contains: [
      {
        scope: "keyword",
        match: /\w+/,
      },
      hljs.inherit(hljs.QUOTE_STRING_MODE, { scope: "string" }),
      hljs.inherit(hljs.NUMBER_MODE, { scope: "number" }),
    ],
  };

  return {
    name: "Klipper Config",
    aliases: ["klipper", "cfg"],
    disableAutodetect: true,
    contains: [
      COMMENT,
      INLINE_COMMENT,
	  hljs.HASH_COMMENT_MODE,
      INDENTED_BLOCK,
      SECTION,
      KEY_VALUE_PAIR,
      JINJA2_TEMPLATE,
      hljs.inherit(hljs.QUOTE_STRING_MODE, { scope: "string" }),
      hljs.inherit(hljs.NUMBER_MODE, { scope: "number" }),
    ],
  };
}
