import {locator} from "../helpers/locator";

export class BasePage {
    constructor() {
        this.baseElements = {
            body: locator.byCss("body")
        }
    }

    focusOutFromInputField() {
        cy.getElement(this.baseElements.body).click();
    }
}