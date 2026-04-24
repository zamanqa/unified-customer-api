Add a new test case to an existing module spec file. Module and test description: $ARGUMENTS

## Project context
- Spec files: `cypress/e2e/customer-api/{nn}-{module}/{module}.cy.js`
- Commands files: `cypress/support/customer-api/{module}/{Name}Commands.js`
- All API calls go through Commands files — never call `cy.request` directly in spec files
- Use `Cypress.env('db{Name}Id')` for IDs set in `beforeEach`
- For new IDs not in `beforeEach`, query DB inline: `commands.getSomethingFromDB().then((result) => { ... })`

## Test template
```js
it('Test N: {description}', () => {
  // Use ID from beforeEach
  const id = Cypress.env('db{Name}Id');
  expect(id).to.exist;

  {name}.someCommand(id).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('{field}');
    cy.log('{Label}:', response.body.{field});
  });

  // Optional: verify in DB
  {name}.verify{Name}InDB(id);
});
```

## Steps
1. Read the spec file and its Commands file for "$ARGUMENTS" module
2. If the required API call doesn't exist in Commands, add it there first
3. If a DB query is needed, add it to the Queries file and export it from Commands
4. Add the new `it()` block at the end of the describe block with the next test number
5. Keep assertions focused — log key fields with `cy.log`
