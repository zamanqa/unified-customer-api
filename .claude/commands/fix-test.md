Fix a failing test in this project. Failing module or test: $ARGUMENTS

## Project context (use without reading files unless specifically needed)
- Base URL: `https://circuly-lumen.herokuapp.com/2026-04`
- Auth: JWT Bearer managed by `ensureAuthenticated()` in `_shared/apiClient.js`
- Helpers: `circulydbRequest` / `cssRequest` / `debtistRequest`
- DB: `cy.task('queryDb', sql)` with `Cypress.env('companyId')`

## Failure diagnosis checklist

| Symptom | Cause | Fix |
|---|---|---|
| 401 Unauthorized | Token expired or wrong header | Check `apiClient.js` — must send `Authorization: Bearer ${token}` |
| 404 Not Found | Wrong URL path | Verify endpoint against Postman: `C:\Users\shahi\Downloads\circuly_customers API (2026-04) (hub).postman_collection.json` |
| DB query returns 0 rows | Wrong company_id or no matching data | Check `Cypress.env('companyId')` is set; verify DB has data |
| Assertion failed on body | API changed response shape | Log `response.body` and update assertion to match actual shape |
| 422 / 400 | Wrong payload | Compare payload with Postman collection request body |
| `undefined` in test | `Cypress.env` not set from previous test | Add guard: `if (!id) { cy.log('No data, skipping'); return; }` |
| Timeout | Async processing (fulfillment, etc.) | Increase `cy.wait()` or use `defaultCommandTimeout` in it() options |

## Steps
1. Read only the failing spec file: `cypress/e2e/customer-api/{matching folder}/$ARGUMENTS.cy.js`
2. Read its Commands file: `cypress/support/customer-api/{module}/{Name}Commands.js`
3. Identify failure from the table above
4. Apply the minimal fix — do not refactor surrounding code
5. If endpoint changed, check Postman collection for correct path
