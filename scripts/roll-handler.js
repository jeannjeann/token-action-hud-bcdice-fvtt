export let RollHandler = null;

Hooks.once("tokenActionHudCoreApiReady", async (coreModule) => {
  /**
   * Extends Token Action HUD Core's RollHandler class and handles action events triggered when an action is clicked
   */
  RollHandler = class RollHandler extends coreModule.api.RollHandler {
    /**
     * Handle action click
     * Called by Token Action HUD Core when an action is left or right-clicked
     * @override
     * @param {object} event        The event
     * @param {string} encodedValue The encoded value
     */
    async handleActionClick(event, encodedValue) {
      const [actionTypeId, actionId] = encodedValue.split("|");
      const knownCharacters = ["character"];

      // If single actor is selected
      if (this.actor) {
        await this.#handleAction(
          event,
          this.actor,
          this.token,
          actionTypeId,
          actionId
        );
        return;
      }

      const controlledTokens = canvas.tokens.controlled.filter((token) =>
        knownCharacters.includes(token.actor?.type)
      );

      // If multiple actors are selected
      for (const token of controlledTokens) {
        const actor = token.actor;
        await this.#handleAction(event, actor, token, actionTypeId, actionId);
      }
    }

    /**
     * Handle action hover
     * Called by Token Action HUD Core when an action is hovered on or off
     * @override
     * @param {object} event        The event
     * @param {string} encodedValue The encoded value
     */
    async handleActionHover(event, encodedValue) {}

    /**
     * Handle group click
     * Called by Token Action HUD Core when a group is right-clicked while the HUD is locked
     * @override
     * @param {object} event The event
     * @param {object} group The group
     */
    async handleGroupClick(event, group) {}

    /**
     * Handle action
     * @private
     * @param {object} event        The event
     * @param {object} actor        The actor
     * @param {object} token        The token
     * @param {string} actionTypeId The action type id
     * @param {string} actionId     The actionId
     */
    async #handleAction(event, actor, token, actionTypeId, actionId) {
      switch (actionTypeId) {
        case "bcdmacro":
          this.#handleMacroAction(event, actor, actionId);
          break;
        case "bcdreplacement":
          this.#handleReplacementAction(event, actor, actionId);
          break;
        case "utility":
          this.#handleUtilityAction(token, actionId);
          break;
      }
    }

    /**
     * Handle BCDice Macro action
     * @private
     * @param {object} event    The event
     * @param {object} actor    The actor
     * @param {string} actionId The action id
     */
    #handleMacroAction(event, actor, actionId) {
      const isRightClick = this.isRightClick(event);
      if (!isRightClick) {
        game.modules
          .get("fvtt-bcdice-addon")
          .api.customCommand("/bcd", "", `${actionId}`);
      } else {
        let message = `/bcd ${actionId}`;
        let textarea = ui.chat.element.find("textarea")[0];
        textarea.value = message;
        textarea.focus();
        textarea.setSelectionRange(message.length, message.length);
      }
    }

    /**
     * Handle BCDice Replacement action
     * @private
     * @param {object} event    The event
     * @param {object} actor    The actor
     * @param {string} actionId The action id
     */
    #handleReplacementAction(event, actor, actionId) {
      const isRightClick = this.isRightClick(event);
      if (!isRightClick) {
        let message = `/bcd ${actionId.replace(/=.*/, "")}`;
        let textarea = ui.chat.element.find("textarea")[0];
        textarea.value = message;
        textarea.focus();
        textarea.setSelectionRange(message.length, message.length);
      } else {
        let message = `/bcd ${actionId}`;
        let textarea = ui.chat.element.find("textarea")[0];
        textarea.value = message;
        textarea.focus();
        textarea.setSelectionRange(message.length, message.length);
      }
    }

    /**
     * Handle utility action
     * @private
     * @param {object} token    The token
     * @param {string} actionId The action id
     */
    async #handleUtilityAction(token, actionId) {
      switch (actionId) {
        case "endTurn":
          if (game.combat?.current?.tokenId === token.id) {
            await game.combat?.nextTurn();
          }
          break;
      }
    }
  };
});
