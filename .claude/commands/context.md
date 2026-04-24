Load the full project context for unified-customer-api. Do NOT read any files — use this as the authoritative reference.

## Project
`C:\Users\shahi\Circuly Project\unified-customer-api`
Cypress 13 E2E tests for Circuly Customers API v2026-04.

## Auth
- Login: `POST https://circuly-lumen.herokuapp.com/2026-04/auth/login`
- Body: `{ consumer_key: "ck_shopify_po", consumer_secret: "cs_i2451dlc5lkcsgww0gks" }`
- Token cached in `Cypress.env('jwtToken')` + `Cypress.env('jwtTokenExpiry')` (decoded via atob, no lib)
- companyId `734f-4c766638po` pre-seeded in config, overwritten by login response

## DB (PostgreSQL via cy.task)
Host: `circuly-development-restore.csmudpdd3zlm.eu-central-1.rds.amazonaws.com` | DB: `postgres` | Port: `5432`

## 3 URL helpers (all in `cypress/support/customer-api/_shared/apiClient.js`)
| Helper | URL built | Used by |
|---|---|---|
| `circulydbRequest(method, endpoint)` | `{base}/2026-04/{companyId}/circulydb{endpoint}` | orders, customers, invoices, payments, subscriptions, draft-orders, transactions, recurring-payments, product-tracking, product-variants, retailers, vouchers, notes, access-keys, csv |
| `cssRequest(method, endpoint)` | `{base}/2026-04{endpoint}` | deliveries (`/css/deliveries`), css module |
| `debtistRequest(method, endpoint)` | `{base}/2026-04/{companyId}{endpoint}` | debtist (`/debtist/...`) |

## 18 modules → spec files
01-orders, 02-customers, 03-invoices, 04-payments, 05-subscriptions, 06-deliveries, 07-draft-orders, 08-transactions, 09-recurring-payments, 10-product-tracking, 11-product (variants), 12-retailers, 13-vouchers, 14-css, 15-notes, 16-debtist, 17-access-keys, 18-csv

## Per-module file pattern
- `cypress/support/customer-api/{module}/{Name}Commands.js` — exports API call functions
- `cypress/support/customer-api/{module}/{Name}Queries.js` — exports SQL strings
- `cypress/support/customer-api/{module}/{Name}Payloads.js` — exports request body objects
- `cypress/e2e/customer-api/{nn}-{module}/{module}.cy.js` — describe + beforeEach DB seed + it() tests

Now proceed with the user's task using this context.
