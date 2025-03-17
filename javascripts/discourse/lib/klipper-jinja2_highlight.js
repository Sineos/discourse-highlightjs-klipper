/*
Language: Klipper Configuration with Jinja2 Macros
Description: Syntax highlighting for Klipper configuration files and Jinja2 templating.
Author: Sineos
Version: 0.4
*/

export default function (hljs) {
  return {
    name: "Klipper Configuration with Jinja2",
    aliases: ["klipper", "cfg"],
    disableAutodetect: true,
    contains: [
      // 1. Comments
      hljs.COMMENT(/#/, /$/),
      hljs.COMMENT(/;/, /$/),

      // 8. Sections
      {
        scope: "symbol",
        begin: /^\[[a-zA-Z0-9_]+\]/,
        end: /$/,
      },

      // 6. Keys
      {
        scope: "attr",
        begin: /^\s*[a-zA-Z0-9_]+\s*(?=[=:])/,
        end: /$/,
      },

      // 7. Values
      {
        scope: "string",
        begin: /:\s*/,
        end: /$/,
        excludeBegin: true,
        contains: [
          hljs.QUOTE_STRING_MODE,
          hljs.NUMBER_MODE,
          { scope: "addition", match: /!?[A-Za-z]+\d+/ },
          { scope: "string", match: /[^{#;]+/ }, // Match any characters except Jinja blocks, comments, and semicolons
        ],
      },
      {
        scope: "string",
        begin: /=/,
        end: /$/,
        excludeBegin: true,
        contains: [
          hljs.QUOTE_STRING_MODE,
          hljs.NUMBER_MODE,
          { scope: "addition", match: /!?[A-Za-z]+\d+/ },
          { scope: "string", match: /[^{#;]+/ }, // Match any characters except Jinja blocks, comments, and semicolons
        ],
      },

      // 2. G-code rule block
      {
        scope: "meta",
        begin: /^\s*gcode\s*:/m,
        end: /$/,
        contains: [
          // 3. G-code commands
          {
            scope: "deletion",
            match: /^\s+(?:\t| )+\b[GMT]\d+(?:\s+[-+]?\d+(?:\.\d+)?)?\b/m,
          },

          // 4. Built-in commands
          {
            scope: "built_in",
            match:
              /^\s+(?:\t| )+\b(SET_FAN_SPEED|SET_FILAMENT_SENSOR|SET_GCODE_OFFSET|SET_GCODE_VARIABLE|SET_HEATER_TEMPERATURE|SET_IDLE_TIMEOUT|SET_PAUSE_AT_LAYER|SET_PAUSE_NEXT_LAYER|SET_PRESSURE_ADVANCE|SET_STEPPER_ENABLE|SET_TEMPERATURE_FAN_TARGET|SET_VELOCITY_LIMIT|STATUS|TEMPERATURE_WAIT|TURN_OFF_HEATERS|Z_OFFSET_APPLY_ENDSTOP|Z_OFFSET_APPLY_PROBE|Z_TILT_ADJUST)\b/m,
          },

          // 3. Comments within gcode block
          {
            scope: "comment",
            begin: /^\s+(?:\t| )+#/,
            end: /$/,
          },
          {
            scope: "comment",
            begin: /^\s+(?:\t| )+;/,
            end: /$/,
          },

          // 5. Jinja code within gcode block
          {
            scope: "punctuation",
            begin: /^\s+(?:\t| )+\{%-?/m,
            end: /-%?\}/,
            contains: [
              {
                scope: "keyword",
                match:
                  /\b(if|else|elif|endif|for|endfor|macro|endmacro|set|include|import|from|do|extends|block|endblock|call|endcall|filter|endfilter|raw|endraw|autoescape|endautoescape|trans|endtrans|pluralize|with|endwith)\b/,
              },
              { scope: "variable", begin: /\{\{/, end: /\}\}/ },
              hljs.QUOTE_STRING_MODE,
            ],
          },
        ],
      },

      // 5. Jinja code outside gcode block
      {
        scope: "punctuation",
        begin: /\{%-?/,
        end: /-%?\}/,
        contains: [
          {
            scope: "keyword",
            match:
              /\b(if|else|elif|endif|for|endfor|macro|endmacro|set|include|import|from|do|extends|block|endblock|call|endcall|filter|endfilter|raw|endraw|autoescape|endautoescape|trans|endtrans|pluralize|with|endwith)\b/,
          },
          { scope: "variable", begin: /\{\{/, end: /\}\}/ },
          hljs.QUOTE_STRING_MODE,
        ],
      },

      // G-code commands outside gcode block
      {
        scope: "deletion",
        match: /\b[GMT]\d+(?:\s+[-+]?\d+(?:\.\d+)?)?\b/,
      },

      // Jinja variables outside gcode block
      {
        scope: "variable",
        begin: /\{\{/,
        end: /\}\}/,
      },
    ],
  };
}
