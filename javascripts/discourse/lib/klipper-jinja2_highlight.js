/*
Language: Klipper Configuration with Jinja2 Macros
Description: Syntax highlighting for Klipper configuration files and Jinja2 templating.
Author: Sineos
Version: 0.3
*/

export default function (hljs) {
  // Klipper Configuration Keywords
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
      "ADXL345 BED_MESH_CALIBRATE BED_MESH_OUTPUT BED_MESH_PROFILE " +
      "BED_SCREWS_ADJUST BED_TILT_CALIBRATE CANCEL_PRINT DELTA_CALIBRATE " +
      "ENDSTOP_PHASE_CALIBRATE FIRMWARE_RESTART G0 G1 G2 G3 G17 G18 G19 " +
      "G28 G90 G91 G92 M18 M73 M82 M83 M84 M104 M105 M106 M107 M109 " +
      "M112 M114 M115 M117 M140 M190 M191 M204 M220 M221 M400 PAUSE " +
      "PID_CALIBRATE QUAD_GANTRY_LEVEL RESTART RESPOND RESUME SAVE_CONFIG " +
      "SCREWS_TILT_CALIBRATE SET_FAN_SPEED SET_FILAMENT_SENSOR " +
      "SET_GCODE_OFFSET SET_GCODE_VARIABLE SET_HEATER_TEMPERATURE " +
      "SET_IDLE_TIMEOUT SET_PAUSE_AT_LAYER SET_PAUSE_NEXT_LAYER " +
      "SET_PRESSURE_ADVANCE SET_STEPPER_ENABLE SET_TEMPERATURE_FAN_TARGET " +
      "SET_VELOCITY_LIMIT STATUS TEMPERATURE_WAIT TURN_OFF_HEATERS " +
      "Z_OFFSET_APPLY_ENDSTOP Z_OFFSET_APPLY_PROBE Z_TILT_ADJUST",
  };

  // Jinja2 Keywords
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

  return {
    name: "Klipper Configuration with Jinja2",
    aliases: ["klipper", "cfg"],
    keywords: KLIPPER_KEYWORDS,
    disableAutodetect: true,
    contains: [
      // Section Headers
      {
        scope: "title",
        begin: /^\[[^\]]+\]/,
        end: /$/,
        relevance: 10,
      },

      // Comments (`#`, `;`, and `{# ... #}` for Jinja)
      {
        scope: "comment",
        begin: /[#;]/,
        end: /$/,
      },
      {
        scope: "comment",
        begin: /\{#/,
        end: /#\}/,
      },

      // Attributes (`step_pin:`, `max_temp:`, etc.)
      {
        scope: "attr",
        begin: /^\s*[a-zA-Z_]+(?=\s*:)/m,
        end: /[:=]/,
        excludeEnd: true,
        contains: [
          {
            scope: "number",
            match: /[-+]?\b\d+(\.\d+)?\b(?![A-Za-z_])/,
          },
        ],
      },

      // Strings (fixing missing styling)
      {
        scope: "string",
        begin: /"/,
        end: /"/,
      },
      {
        scope: "string",
        begin: /'/,
        end: /'/,
      },

      // Boolean literals
      {
        scope: "literal",
        keywords: JINJA2_KEYWORDS.literal,
      },

      // Pins (`PA5`, `PB3`, `!PC3`, etc.)
      {
        scope: "variable",
        begin: /!?[A-Za-z]+\d+/,
      },

      // Lists (`[0, 10, 20]`)
      {
        scope: "list",
        begin: /\[/,
        end: /\]/,
        contains: [hljs.NUMBER_MODE],
      },

      // G-Code commands (`G0`, `M104`, `M400`, etc.)
      {
        scope: "built_in",
        begin: /\b[GMT]\d+(?:\s+[-+]?\d+(?:\.\d+)?)?\b/,
      },

      // Jinja2 Blocks `{% ... %}`
      {
        scope: "meta",
        begin: /\{%/,
        end: /%\}/,
        contains: [
          {
            scope: "keyword",
            keywords: JINJA2_KEYWORDS,
          },
          {
            scope: "number",
            match: /[-+]?\b\d+(\.\d+)?\b(?![A-Za-z_])/,
          },
          {
            scope: "string",
            begin: /"/,
            end: /"/,
          },
          {
            scope: "string",
            begin: /'/,
            end: /'/,
          },
          {
            scope: "variable",
            begin: /\{\{/,
            end: /\}\}/,
          },
        ],
      },

      // Jinja2 Variables `{{ ... }}`
      {
        scope: "variable",
        begin: /\{\{/,
        end: /\}\}/,
        contains: [
          {
            scope: "keyword",
            keywords: JINJA2_KEYWORDS,
          },
          {
            scope: "number",
            match: /[-+]?\b\d+(\.\d+)?\b(?![A-Za-z_])/,
          },
          {
            scope: "string",
            begin: /"/,
            end: /"/,
          },
          {
            scope: "string",
            begin: /'/,
            end: /'/,
          },
        ],
      },
    ],
  };
}
