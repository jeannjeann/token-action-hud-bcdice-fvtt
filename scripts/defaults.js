import { GROUP } from "./constants.js";

/**
 * Default layout and groups
 */
export let DEFAULTS = null;

Hooks.once("tokenActionHudCoreApiReady", async (coreModule) => {
  const groups = GROUP;
  Object.values(groups).forEach((group) => {
    group.name = coreModule.api.Utils.i18n(group.name);
    group.listName = `Group: ${coreModule.api.Utils.i18n(
      group.listName ?? group.name
    )}`;
  });
  const groupsArray = Object.values(groups);
  DEFAULTS = {
    layout: [
      {
        nestId: "macros",
        id: "macros",
        name: coreModule.api.Utils.i18n("tokenActionHud.bcdice.macro"),
        groups: [{ ...groups.bcdmacros, nestId: "macros_bcdmacros" }],
      },
      {
        nestId: "replacements",
        id: "replacements",
        name: coreModule.api.Utils.i18n("tokenActionHud.bcdice.replacement"),
        groups: [
          { ...groups.bcdreplacements, nestId: "replacements_bcdreplacements" },
        ],
      },
      {
        nestId: "utility",
        id: "utility",
        name: coreModule.api.Utils.i18n("tokenActionHud.utility"),
        groups: [
          { ...groups.token, nestId: "utility_token" },
          { ...groups.utility, nestId: "utility_utility" },
        ],
      },
    ],
    groups: groupsArray,
  };
});
