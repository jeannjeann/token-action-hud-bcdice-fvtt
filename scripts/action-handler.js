// System Module Imports
import { ACTION_TYPE, ITEM_TYPE } from "./constants.js";
import { Utils } from "./utils.js";

export let ActionHandler = null;

Hooks.once("tokenActionHudCoreApiReady", async (coreModule) => {
  /**
   * Extends Token Action HUD Core's ActionHandler class and builds system-defined actions for the HUD
   */
  ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
    /**
     * Build system actions
     * Called by Token Action HUD Core
     * @override
     * @param {array} groupIds
     */ a;
    async buildSystemActions(groupIds) {
      // Set actor and token variables
      this.actors = !this.actor ? this._getActors() : [this.actor];
      this.actorType = this.actor?.type;

      // Settings
      this.ignoreCategory = Utils.getSetting("ignoreCategory");

      // Get BCDice Data
      this.bcdiceData = await game.modules
        .get("fvtt-bcdice-addon")
        .api.getDataForCurrentEntity();

      // Set items variable
      if (this.actor) {
        let items = this.actor.items;
        items = coreModule.api.Utils.sortItemsByName(items);
        this.items = items;
      }

      if (this.actorType === "character") {
        this.#buildCharacterActions();
      } else if (!this.actor) {
        this.#buildMultipleTokenActions();
      }
    }

    /**
     * Build character actions
     * @private
     */
    #buildCharacterActions() {
      this.#buildMacro();
      this.#buildReplacement();
    }

    /**
     * Build multiple token actions
     * @private
     * @returns {object}
     */
    #buildMultipleTokenActions() {}

    /**
     * Build BCDice Macro
     * @private
     */
    async #buildMacro() {
      const actionTypeId = "bcdmacro";
      const actionTypeName = coreModule.api.Utils.i18n(
        ACTION_TYPE[actionTypeId]
      );

      const groupId = ITEM_TYPE[actionTypeId]?.groupId;
      const rootGroupData = { id: groupId, type: "system" };

      // add groups and actions
      for (let i = 0; i < this.bcdiceData.tabs.length; i++) {
        const category = this.bcdiceData.tabs[i].headers;

        for (let j = 0; j < category.length; j++) {
          const actions = [];
          const categoryGroupData = {
            id: `group${j}`,
            name: category[j].name,
            type: "system-derived",
          };
          if (!this.ignoreCategory)
            this.addGroup(categoryGroupData, rootGroupData);

          for (let k = 0; k < category[j].macros.length; k++) {
            const macro = category[j].macros[k].macro;
            let text = macro.split(/[\s\u3000]+/);
            let name = text[1] || text[0];
            let command = text[0];
            let id = `group${j}-macro${k}`;
            let encodedValue = [actionTypeId, `${macro}`].join(this.delimiter);
            let listName = `${actionTypeName}: ${name}`;
            let tooltip = `${command}`;
            actions.push({ id, name, encodedValue, listName, tooltip });
          }

          if (!this.ignoreCategory) {
            const groupData = { id: `group${j}`, type: "system-derived" };
            this.addActions(actions, groupData);
          } else {
            this.addActions(actions, rootGroupData);
          }
        }
      }
    }

    /**
     * Build BCDice Replacement
     * @private
     */
    async #buildReplacement() {
      const actionTypeId = "bcdreplacement";
      const actionTypeName = coreModule.api.Utils.i18n(
        ACTION_TYPE[actionTypeId]
      );
      const groupId = ITEM_TYPE[actionTypeId]?.groupId;
      const groupData = { id: groupId, type: "system" };

      const replacements = this.bcdiceData.replacements
        .split("\n")
        .map((line) => `:${line}`);

      // add actions
      const actions = [];
      for (let i = 0; i < replacements.length; i++) {
        let name = replacements[i].replace(/^:/, "").replace(/=.*/, "");
        let command = replacements[i];
        let id = `replacement${i}`;
        let encodedValue = [actionTypeId, `${command}`].join(this.delimiter);
        let listName = `${actionTypeName}: ${name}`;
        let tooltip = `${command}`;
        if (name) actions.push({ id, name, encodedValue, listName, tooltip });
      }
      this.addActions(actions, groupData);
    }
  };
});
