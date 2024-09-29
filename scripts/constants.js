/**
 * Module-based constants
 */
export const MODULE = {
  ID: "token-action-hud-bcdice",
};

/**
 * Core module
 */
export const CORE_MODULE = {
  ID: "token-action-hud-core",
};

/**
 * Core module version required by the system module
 */
export const REQUIRED_CORE_MODULE_VERSION = "1.5";

/**
 * Action types
 */
export const ACTION_TYPE = {
  bcdmacro: "tokenActionHud.bcdice.bcdmacro",
  bcdreplacement: "tokenActionHud.bcdice.bcdreplacement",
  utility: "tokenActionHud.utility",
};

/**
 * Groups
 */
export const GROUP = {
  bcdmacros: {
    id: "bcdmacros",
    name: "tokenActionHud.bcdice.bcdmacro",
    type: "system",
    settings: { showTitle: false },
  },
  bcdreplacements: {
    id: "bcdreplacements",
    name: "tokenActionHud.bcdice.bcdreplacement",
    type: "system",
    settings: { showTitle: false },
  },
  token: { id: "token", name: "tokenActionHud.token", type: "system" },
  utility: { id: "utility", name: "tokenActionHud.utility", type: "system" },
};

/**
 * Item types
 */
export const ITEM_TYPE = {
  bcdmacro: { groupId: "bcdmacros" },
  bcdreplacement: { groupId: "bcdreplacements" },
};
