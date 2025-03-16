/*
Language: Klipper Configuration with Jinja2 Macros
Description: Syntax highlighting for Klipper configuration files and Jinja2 templating.
Author: Sineos
Version: 0.2
*/

export default function (hljs) {
  // Klipper configuration keywords
  const KLIPPER_KEYWORDS = {
    keyword:
      "accel bed_level bed_mesh bed_screws bed_tilt bltouch " +
      "controller_fan delta_calibrate description dir_pin " +
      "enable_pin endstop_accuracy endstop_override endstop_pin " +
      "extruder fan filament_diameter filament_switch_sensor " +
      "gcode_macro heater_fan heater_pin homing_positive_dir " +
      "idle_timeout max_accel max_error max_extrude_cross_section " +
      "max_extrude_only_accel max_extrude_only_velocity " +
      "max_power max_temp max_velocity max_z_accel max_z_velocity " +
      "microsteps min_extrude_temp min_power min_temp nozzle_diameter " +
      "pause_resume pid_Kd pid_Ki pid_Kp pin position_max position_min " +
      "pressure_advance printer pwm_cycle_time pwm_max pwm_min pwm_scale " +
      "quad_gantry_level restart_method rotation_distance safe_z_home " +
      "sensor_pin sensor_type shutdown_on_error step_pin stepper " +
      "temperature_sensor virtual_sdcard z_tilt",

    literal: "false null true none",

    built_in:
      "BED_MESH_CALIBRATE CANCEL_PRINT DELTA_CALIBRATE FIRMWARE_RESTART " +
      "G0 G1 G2 G3 G17 G18 G19 G28 G90 G91 G92 M18 M73 M82 M83 M84 M104 " +
      "M105 M106 M107 M109 M112 M114 M115 M117 M140 M190 M191 M204 M220 " +
      "M221 PAUSE PID_CALIBRATE QUAD_GANTRY_LEVEL RESUME SAVE_CONFIG " +
      "SET_GCODE_OFFSET SET_HEATER_TEMPERATURE SET_PRESSURE_ADVANCE " +
      "SET_VELOCITY_LIMIT SET_STEPPER_ENABLE STATUS Z_OFFSET_APPLY_ENDSTOP " +
      "M400",
  };

  // Jinja2 keywords
  const JINJA2_KEYWORDS = {
    keyword:
      "if else elif endif for endfor macro endmacro set include import " +
      "from do extends block endblock call endcall filter endfilter " +
      "raw endraw autoescape endautoescape trans endtrans pluralize " +
      "with endwith",
    built_in:
      "range loop super self namespace varargs kwargs print_stats gcode params time printer",
    literal: "true false none null",
  };

  const KLIPPER_COMMENT = {
    scope: "comment",
    begin: /[#;]/,
    end: /$/,
  };

  // Klipper configuration section
  const KLIPPER_SECTION = {
    scope: "section",
    begin: /^\[[^\]]+\]/,
    end: /(?=\n\[|\n$)/,
    contains: [
      {
        scope: "section_title",
        begin: /\[[^\]]+\]/,
      },
      {
        scope: "attr",
        begin: /^\s*[a-zA-Z_]+(?=\s*:)/m,
        end: /[:=]/,
        relevance: 0,
        keywords: KLIPPER_KEYWORDS,
      },
      KLIPPER_COMMENT,
      hljs.HASH_COMMENT_MODE,
      hljs.inherit(hljs.NUMBER_MODE, { scope: "number" }),
      {
        scope: "literal",
        keywords: JINJA2_KEYWORDS.literal,
      },
      {
        scope: "pin",
        begin: /!?[A-Za-z]+\d+/,
        relevance: 0,
      },
      {
        scope: "list",
        begin: /\[/,
        end: /\]/,
        contains: [
          hljs.QUOTE_STRING_MODE,
          hljs.NUMBER_MODE,
          {
            scope: "literal",
            keywords: JINJA2_KEYWORDS.literal,
          },
        ],
      },
      {
        scope: "gcode",
        begin: /\b[GMT]\d+(?:\s+[-+]?\d+(?:\.\d+)?)?\b/,
        relevance: 0,
      },
    ],
  };

  // Jinja2 template blocks
  const JINJA2_TEMPLATE = {
    scope: "jinja2-block",
    begin: /\{%/,
    end: /%\}/,
    contains: [
      {
        scope: "keyword",
        keywords: JINJA2_KEYWORDS,
      },
      {
        scope: "variable",
        begin: /\{\{/,
        end: /\}\}/,
        contains: [
          hljs.QUOTE_STRING_MODE,
          hljs.NUMBER_MODE,
          {
            keywords: JINJA2_KEYWORDS,
          },
        ],
      },
    ],
  };

  // Jinja2 comments
  const JINJA2_COMMENT = {
    scope: "comment",
    begin: /\{#/,
    end: /#\}/,
  };

  return {
    name: "Klipper Configuration with Jinja2",
    aliases: ["klipper", "cfg"],
    keywords: KLIPPER_KEYWORDS,
    contains: [
      KLIPPER_SECTION,
      JINJA2_TEMPLATE,
      JINJA2_COMMENT,
      hljs.HASH_COMMENT_MODE,
      {
        scope: "comment",
        begin: /;/,
        end: /$/,
      },
    ],
  };
}
