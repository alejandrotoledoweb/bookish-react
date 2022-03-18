describe('Bookish application', function () {
  it('visit the bookish', function () {
    cy.visit('http://localhost:3000/');
    cy.get('h2[data-test="heading"]').contains('Bookish');
  });
});
