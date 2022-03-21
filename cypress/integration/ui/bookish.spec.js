import axios from 'axios';

describe('Bookish application', () => {
  before(() => {
    return axios
      .delete('http://localhost:8080/books?_cleanup=true')
      .catch((err) => err);
  });

  afterEach(() => {
    return axios
      .delete('http://localhost:8080/books?_cleanup=true')
      .catch((err) => err);
  });

  beforeEach(() => {
    const books = [
      { name: 'Building Microservices', id: 3 },
      { name: 'Domain-driven design', id: 2 },
      { name: 'Refactoring', id: 1 },
    ];

    return books.map(async (item) =>
      axios.post('http://localhost:8080/books', item, {
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('visit the bookish', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h2[data-test="heading"]').contains('Bookish');
  });

  it('Shows a book list', async () => {
    cy.visit('http://localhost:3000/');
    await cy.get('div[data-test="book-list"').should('exist');
    await cy.get('div.book-item').should('have.length', 3);
    await cy.get('div.book-item').should((books) => {
      expect(books).to.have.length(2);

      const titles = [...books].map((x) => x.querySelector('h2').innerHTML);
      expect(titles).to.deep.equal([
        'Refactoring',
        'Domain-driven design',
        'Building Microservices',
      ]);
    });
  });

  it('Goes to the detail page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('div.book-item').contains('View Details').eq(0).click();
    cy.url().should('include', 'books/1');
    cy.get('h2.book-title').contains('Refactoring');
  });
});
