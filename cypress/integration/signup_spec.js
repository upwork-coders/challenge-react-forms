const { getUserMockData } = require("../support/helpers/utils");
const signupPage  = require("../support/pages/signup_page");

describe("Sign Up", () => {
  beforeEach(() =>{
    cy.visit('/');
  });

  it("User should able to signup with valid details", () => {
    const data = getUserMockData();
    signupPage.verifyPageIsDisplayed();
    signupPage.fillSignupFormAndClickOnSubmit(data);
    signupPage.verifyInsertedDataOnTable(data, 1);
  });

  it("User should not able to signup with invalid details", () => {
    const invalidData = {
      name: "Test",
      email: "test@email",
      age: "10",
      phone: "1234",
      password: "testPassword",
      homepage: "www.google.com"
    };

    signupPage.verifyPageIsDisplayed();
    signupPage.fillSignupFormAndClickOnSubmit(invalidData, { invalid: true });
    signupPage.verifyInvalidDataErrorsForInputFields();
  });

  it("User should see all the form fields errors when all the form fields are blank", () => {
    signupPage.verifyPageIsDisplayed();
    signupPage.fillSignupFormAndClickOnSubmit(null, { invalid: true });
    signupPage.verifyInvalidDataErrorsForInputFields();
  });
})
