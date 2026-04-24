/**
 * API Health Check — Server Wake-up Helper
 *
 * Run once at the beginning of a spec using before() to wake up
 * Heroku dynos and other cold-start servers before tests begin.
 */

const HUB_API_URL    = 'https://circuly-lumen.herokuapp.com';
const CHECKOUT_API_URL = 'https://checkout-api-development-680576524870.europe-west3.run.app/v1/version';
const VALID_STATUSES = [200, 301, 302];
const RETRY_WAIT_MS  = 15000;

/**
 * Wake up the main Hub / Lumen API (Heroku sleeps after inactivity).
 */
function checkHubApi() {
  cy.request({
    method: 'GET',
    url: `${HUB_API_URL}/2026-04/auth/login`,
    failOnStatusCode: false,
    body: {},
  }).then((response) => {
    cy.log(`✓ Hub API status: ${response.status}`);

    if (!VALID_STATUSES.includes(response.status) && response.status !== 422) {
      cy.log(`⚠ Hub API returned ${response.status}, retrying after ${RETRY_WAIT_MS / 1000}s...`);
      cy.wait(RETRY_WAIT_MS);

      cy.request({
        method: 'GET',
        url: `${HUB_API_URL}/2026-04/auth/login`,
        failOnStatusCode: false,
        body: {},
      }).then((retryResponse) => {
        cy.log(`✓ Hub API (retry): ${retryResponse.status}`);
      });
    }
  });
}

/**
 * Wake up the Checkout API.
 * Retries once after 15 seconds if status is not 200, 301, or 302.
 */
function checkCheckoutApi() {
  cy.request({
    method: 'GET',
    url: CHECKOUT_API_URL,
    failOnStatusCode: false,
  }).then((response) => {
    cy.log(`✓ Checkout API status: ${response.status}`);

    if (!VALID_STATUSES.includes(response.status)) {
      cy.log(`⚠ Checkout API returned ${response.status}, retrying after ${RETRY_WAIT_MS / 1000}s...`);
      cy.wait(RETRY_WAIT_MS);

      cy.request({
        method: 'GET',
        url: CHECKOUT_API_URL,
        failOnStatusCode: false,
      }).then((retryResponse) => {
        cy.log(`✓ Checkout API (retry): ${retryResponse.status}`);
        expect(retryResponse.status).to.be.oneOf(VALID_STATUSES);
      });
    } else {
      expect(response.status).to.be.oneOf(VALID_STATUSES);
    }
  });
}

/**
 * Run all API health checks.
 * Call this inside before() in any spec that needs a warm server.
 *
 * Usage:
 *   import { wakeUpServers } from '../../../support/helpers/apiHealthCheck';
 *   before(() => { wakeUpServers(); });
 */
export function wakeUpServers() {
  cy.log('========== API Health Check — Waking up servers ==========');
  checkCheckoutApi();
  cy.log('✓ All APIs pinged — servers are awake');
}
