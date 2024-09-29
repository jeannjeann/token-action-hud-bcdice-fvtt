import { MODULE } from "./constants.js";

/**
 * Register module settings
 * Called by Token Action HUD Core to register Token Action HUD system module settings
 * @param {function} coreUpdate Token Action HUD Core update function
 */
export function register(coreUpdate) {
  game.settings.register(MODULE.ID, "displayUnequipped", {
    name: game.i18n.localize(
      "tokenActionHud.bcdice.settings.displayUnequipped.name"
    ),
    hint: game.i18n.localize(
      "tokenActionHud.bcdice.settings.displayUnequipped.hint"
    ),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "useTab", {
    name: game.i18n.localize("tokenActionHud.bcdice.settings.useTab.name"),
    hint: game.i18n.localize("tokenActionHud.bcdice.settings.useTab.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
}
