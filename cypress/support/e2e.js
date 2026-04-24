// e2e.js - Support file loaded before every test

Cypress.on('uncaught:exception', () => {
  return false;
});

beforeEach(() => {
  cy.log(`Running: ${Cypress.currentTest.titlePath.join(' > ')}`);
});
