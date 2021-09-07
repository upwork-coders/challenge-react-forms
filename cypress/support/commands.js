// Define all the common methods

const { locator_types } = require("./helpers/locator");

// Added cypress custom command for get element
Cypress.Commands.add("getElement", (locator) => {
   (locator.type === locator_types.CSS) ? cy.get(locator.locator).should("be.visible") : cy.xpath(locator.locator).should("be.visible");
});