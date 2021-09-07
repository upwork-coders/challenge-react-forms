import {locator} from "../helpers/locator";
import {BasePage} from "./base_page";

class SignupPage extends BasePage {
    constructor() {
        super();

        // All the important elements
        this.elements = {
            // Signup form elements
            signUpForm:{
                title: locator.byXpath(`//h1[text()="Sign Up"]`),
                nameInput: locator.byXpath(`//label[contains(text(), "Name")]/input[@name="name"]`),
                emailInput: locator.byXpath(`//label[contains(text(), "Email")]/input[@name="email"]`),
                ageInput: locator.byXpath(`//label[contains(text(), "Age")]/input[@name="age"]`),
                phoneNumberInput: locator.byXpath(`//label[contains(text(), "Phone Number")]/input[@name="phoneNumber"]`),
                passwordInput: locator.byXpath(`//label[contains(text(), "Password")]/input[@name="password"]`),
                homepageURLInput: locator.byXpath(`//label[contains(text(), "Homepage")]/input[@name="homepage"]`),
                submitButton: locator.byCss(`input[type="submit"]`)
            },

            // People table elements
            peopleTable: {
                nameCell: (index) => locator.byXpath(`//table//th[text()="Name"]/../../..//tbody/tr[@aria-label="col-${index}"]/td[@aria-label="name-cell"]`),
                emailCell: (index) => locator.byXpath(`//table//th[text()="Email"]/../../..//tbody/tr[@aria-label="col-${index}"]/td[@aria-label="email-cell"]`),
                ageCell: (index) => locator.byXpath(`//table//th[text()="Age"]/../../..//tbody/tr[@aria-label="col-${index}"]/td[@aria-label="age-cell"]`),
                phoneCell: (index) => locator.byXpath(`//table//th[text()="Phone"]/../../..//tbody/tr[@aria-label="col-${index}"]/td[@aria-label="phone-number-cell"]`),
                homepageCell: (index) => locator.byXpath(`//table//th[text()="Homepage"]/../../..//tbody/tr[@aria-label="col-${index}"]/td[@aria-label="homepage-cell"]`),
            }
        }

        // Input fields errors
        this.inputFieldsErrorMessages = {
            name: "Name Required",
            email: "Invalid Email",
            age: "Invalid Age",
            phoneNumber: "Invalid Phone Number",
            password: "Weak Password",
            homepage: "Invalid URL"
        }
    }

    // Verify signup page is displayed
    verifyPageIsDisplayed() {
        cy.getElement(this.elements.signUpForm.title);
    }

    /**
     * Fill signup form with valid, invalid or blank data
     * @param data is contains information of people
     * @param options is control the input type
     */
    fillSignupFormAndClickOnSubmit(data, options = { invalid: false }) {
        const blankValue = "\n";

        cy.getElement(this.elements.signUpForm.nameInput)
            .type(data !== null ? data.name : blankValue);
        cy.getElement(this.elements.signUpForm.emailInput)
            .type(data !== null ? data.email : blankValue);
        cy.getElement(this.elements.signUpForm.ageInput)
            .type(data !== null ? data.age : blankValue);
        cy.getElement(this.elements.signUpForm.phoneNumberInput)
            .type(data !== null ? data.phone : blankValue);
        cy.getElement(this.elements.signUpForm.passwordInput)
            .type(data !== null ? data.password : blankValue);
        cy.getElement(this.elements.signUpForm.homepageURLInput)
            .type(data !== null ? data.homepage : blankValue);

        if(!options.invalid) {
            cy.getElement(this.elements.signUpForm.submitButton)
                .should("be.enabled")
                .click()
                .should("have.value", "Saved!");
        } else {
            cy.getElement(this.elements.signUpForm.submitButton)
                .should("not.be.enabled");
            this.focusOutFromInputField();
        }
    }

    // Verify input errors for the invalid data
    verifyInvalidDataErrorsForInputFields() {
        this.verifyErrorsOfBlankInputFields({ allErrors: false });
    }

    // Verify input errors for the blank fields
    verifyErrorsOfBlankInputFields(options = { allErrors: true}) {
        if(options.allErrors) {
            this.verifyAnError(this.elements.signUpForm.nameInput, this.inputFieldsErrorMessages.name);
            this.verifyAnError(this.elements.signUpForm.age, this.inputFieldsErrorMessages.age);
        }
        this.verifyAnError(this.elements.signUpForm.emailInput, this.inputFieldsErrorMessages.email);
        this.verifyAnError(this.elements.signUpForm.phoneNumberInput, this.inputFieldsErrorMessages.phoneNumber);
        this.verifyAnError(this.elements.signUpForm.passwordInput, this.inputFieldsErrorMessages.password);
        this.verifyAnError(this.elements.signUpForm.homepageURLInput, this.inputFieldsErrorMessages.homepage);
    }

    // Common method for retrieve error of each input field
    verifyAnError(inputField, error) {
        cy.getElement(inputField)
            .parent("label")
            .parent("div")
            .find("div[aria-label='error-message']")
            .should("have.css", "color", "rgb(255, 65, 54)")
            .should("have.text", error);
    }

    // verify inserted people details on people table
    verifyInsertedDataOnTable(data, row) {
        const index = row - 1;
        cy.getElement(this.elements.peopleTable.nameCell(index))
            .should("have.text", data.name);
        cy.getElement(this.elements.peopleTable.emailCell(index))
            .should("have.text", data.email);
        cy.getElement(this.elements.peopleTable.ageCell(index))
            .should("have.text", data.age);
        cy.getElement(this.elements.peopleTable.phoneCell(index))
            .should("have.text", data.phone);
        cy.getElement(this.elements.peopleTable.homepageCell(index))
            .should("have.text", data.homepage);
    }
}

module.exports = new SignupPage();