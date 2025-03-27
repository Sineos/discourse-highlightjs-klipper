/*
Language: Klipper Configuration with Jinja2 Macros
Description: Syntax highlighting for Klipper configuration files and Jinja2 templating.
Author: Sineos
Version: 0.5
*/

export default function (hljs) {
  const COMMENT = {
    scope: "comment",
    variants: [
      { begin: /^\s*[#;].*$/, end: /$/ }, // Standalone comments
      { begin: /[#;].*/, end: /$/ }, // Inline/trailing comments
    ],
    relevance: 10,
  };

  const KEY_PART = {
    scope: "attr",
    begin: /^[^=\s]+(?=\s*[:=])/,
  };

  const VALUE_PART = {
    scope: "attribute",
    begin: /[:=]/,
    end: /$/,
    excludeBegin: true,
    excludeEnd: true,
    contains: [COMMENT, hljs.inherit(hljs.NUMBER_MODE, { scope: "built_in" })],
  };

  const SECTION = {
    scope: "punctuation",
    begin: /^\s*\[/,
    end: /\]/,
    contains: [
      {
        scope: "strong",
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
        scope: "keyword",
        match:
          /\b(if|elif|else|endif|for|endfor|while|endwhile|set|in|params|not|and|trim|round)\b/,
      },
      {
        scope: "keyword",
        match: /\b([Tt]rue|[Ff]alse|[Nn]one)\b/,
      },
      hljs.QUOTE_STRING_MODE,
    ],
  };

  const GCODE_COMMAND = {
    begin: /\b[GMT]\d+\b/, // Match G-code commands like G1, M104
    end: /$/, // Capture the rest of the line
    scope: "attribute", // Highlight the command itself
    contains: [
      {
        scope: "attribute",
        match: /\b[XZYEFS]\d*\.?\d*\b/, // Match parameters within the same line
      },
    ],
  };

  const INDENTED_BLOCK = {
    scope: "attr",
    begin: /^\s+/,
    end: /$/,
    contains: [
      COMMENT,
      hljs.inherit(hljs.NUMBER_MODE, { scope: "built_in" }),
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
}
