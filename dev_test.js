hljs.registerLanguage("klipper", function (hljs) {
  const COMMENT = {
    scope: "comment",
    variants: [
      { begin: /^\s*[#;].*$/, end: /$/ }, // Standalone comments
      { begin: /[#;].*/, end: /$/ }, // Inline/trailing comments
    ],
    relevance: 10,
  };

  const KEY_PART = {
    scope: "symbol",
    begin: /^[^=\s]+(?=\s*[:=])/,
  };

  const VALUE_PART = {
    scope: "addition",
    begin: /[:=]/,
    end: /$/,
    excludeBegin: true,
    excludeEnd: true,
    contains: [COMMENT, hljs.inherit(hljs.NUMBER_MODE, { scope: "number" })],
  };

  const SECTION = {
    scope: "punctuation",
    begin: /^\s*\[/,
    end: /\]/,
    contains: [
      {
        scope: "section",
        match: /[^\]]+/,
      },
    ],
  };

  const JINJA_BLOCK = {
    scope: "name",
    begin: /^ {2,}\{%/, // Match Jinja blocks with indentation of two or more spaces
    end: /%}/,
    contains: [
      {
        scope: "built_in",
        match:
          /\b(if|elif|else|for|endfor|while|endwhile|set|in|params|not|and|trim|round)\b/,
      },
      hljs.QUOTE_STRING_MODE,
    ],
  };

  const GCODE_COMMAND = {
    begin: /\b[GMT]\d+\b/, // Match G-code commands like G1, M104
    end: /$/, // Capture the rest of the line
    scope: "deletion", // Highlight the command itself
    contains: [
      {
        scope: "addition",
        match: /\b[XZYEFS]\d*\.?\d*\b/, // Match parameters within the same line
      },
    ],
  };

  const INDENTED_BLOCK = {
    scope: "deletion",
    begin: /^\s+/,
    end: /$/,
    contains: [
      COMMENT,
      hljs.inherit(hljs.NUMBER_MODE, { scope: "number" }),
      hljs.QUOTE_STRING_MODE,
      GCODE_COMMAND,
    ],
    relevance: 10,
  };

  return {
    name: "Klipper Config",
    aliases: ["klipper", "cfg"],
    disableAutodetect: true,
    contains: [
      COMMENT,
      SECTION,
      KEY_PART,
      VALUE_PART,
      JINJA_BLOCK,
      INDENTED_BLOCK,
    ],
  };
});
