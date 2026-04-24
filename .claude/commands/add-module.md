Scaffold a new test module in this project. Module name: $ARGUMENTS

## What to create (3 support files + 1 spec file)

### 1. Commands file
Path: `cypress/support/customer-api/$ARGUMENTS/$ARGUMENTSCommands.js`

```js
import { circulydbRequest } from '../_shared/apiClient';
import { get{Name}Query, verify{Name}Query } from './{name}Queries';

export function get{Name}FromDB() {
  const companyId = Cypress.env('companyId');
  return cy.task('queryDb', get{Name}Query(companyId));
}

export function getAll{Names}() {
  return circulydbRequest('GET', '/{endpoint}');
}

export function get{Name}ById(id) {
  return circulydbRequest('GET', `/{endpoint}/${id}`);
}

export function create{Name}(payload) {
  return circulydbRequest('POST', '/{endpoint}', { body: payload });
}

export function update{Name}(id, payload) {
  return circulydbRequest('PUT', `/{endpoint}/${id}`, { body: payload });
}

export function delete{Name}(id) {
  return circulydbRequest('DELETE', `/{endpoint}/${id}`);
}

export function verify{Name}InDB(id) {
  const companyId = Cypress.env('companyId');
  return cy.task('queryDb', verify{Name}Query(companyId, id)).then((result) => {
    expect(result.length).to.be.greaterThan(0);
    cy.log('DB verification -- id:', id);
  });
}
```

### 2. Queries file
Path: `cypress/support/customer-api/$ARGUMENTS/$ARGUMENTSQueries.js`

```js
// DB queries for $ARGUMENTS module

export function get{Name}Query(companyId) {
  return `
    SELECT id, created_at
    FROM public.{table_name}
    WHERE company_id = '${companyId}'
    ORDER BY created_at DESC
    LIMIT 1
  `;
}

export function verify{Name}Query(companyId, id) {
  return `
    SELECT id
    FROM public.{table_name}
    WHERE company_id = '${companyId}'
      AND id = '${id}'
  `;
}
```

### 3. Spec file
Path: `cypress/e2e/customer-api/{nn}-$ARGUMENTS/$ARGUMENTS.cy.js`

```js
import * as {name} from '../../../support/customer-api/$ARGUMENTS/{Name}Commands';

describe('{Name} API', () => {

  beforeEach(() => {
    {name}.get{Name}FromDB().then((result) => {
      expect(result.length).to.be.greaterThan(0);
      const record = result[0];
      cy.log('DB record ID:', record.id);
      Cypress.env('db{Name}Id', record.id);
    });
  });

  it('Test 1: Fetch all {names} and verify list', () => {
    {name}.getAll{Names}().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data').and.to.be.an('array');
      cy.log('Total returned:', response.body.data.length);
    });
  });

  it('Test 2: Fetch {name} by ID and verify in DB', () => {
    const id = Cypress.env('db{Name}Id');
    {name}.get{Name}ById(id).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Fetched:', id);
    });
    {name}.verify{Name}InDB(id);
  });

});
```

## Steps to follow
1. Ask the user: API endpoint path, DB table name, URL helper (circulydb/css/debtist), next module number (nn)
2. Fill in all placeholders and create the 3 support files + 1 spec file
3. Add npm script to `package.json`: `"api:$ARGUMENTS": "cypress run --spec \"cypress/e2e/customer-api/{nn}-$ARGUMENTS/$ARGUMENTS.cy.js\""`
