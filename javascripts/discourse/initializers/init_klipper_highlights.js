import { withPluginApi } from "discourse/lib/plugin-api";
import klipperJinja2 from "../lib/klipper-jinja2_highlight";

export default {
  name: "highlightjs-klipper-jinja2",
  initialize() {
    withPluginApi("1.4.0", (api) => {
      api.registerHighlightJSLanguage("klipper-jinja2", klipperJinja2);
    });
  },
};
