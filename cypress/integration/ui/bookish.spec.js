import axios from 'axios';

describe('Bookish application', () => {
  before(() => {
    return axios
      .delete('http://localhost:8080/books?_cleanup=true')
      .catch((err) => err);
  });

  afterEach(() => {
    cleanUpStubBooks();
  });

  beforeEach(() => {
    feedStubBooks();
    goToApp();
  });

  const feedStubBooks = () => {
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
  };

  const cleanUpStubBooks = () => {
    return axios
      .delete('http://localhost:8080/books?_cleanup=true')
      .catch((err) => err);
  };

  const goToApp = () => {
    cy.visit('http://localhost:3000/');
  };

  const CheckAppTitle = () => {
    cy.get('h2[data-test="heading"]').contains('Bookish');
  };

  const checkBookListWith = (expectation = []) => {
    cy.get('div[data-test="book-list"]').should('exist');
    cy.get('div.book-item').should((books) => {
      expect(books).to.have.length(expectation.length);
      const titles = [...books].map((x) => x.querySelector('h2').innerHTML);
      expect(titles).to.deep.equal(expectation);
    });
  };

  const checkBookList = () => {
    checkBookListWith([
      'Refactoring',
      'Domain-driven design',
      'Building Microservices',
      'Acceptance Test Driven Development with React',
    ]);
  };

  const checkSearchResult = () => {
    checkBookListWith(['Domain-driven design']);
  };

  it('visit the bookish', () => {
    CheckAppTitle();
  });

  it('Shows a book list', async () => {
    checkBookList();
    // await cy.get('div[data-test="book-list"').should('exist');
    // await cy.get('div.book-item').should('have.length', 3);
    // await cy.get('div.book-item').should((books) => {
    //   expect(books).to.have.length(2);

    //   const titles = [...books].map((x) => x.querySelector('h2').innerHTML);
    //   expect(titles).to.deep.equal([
    //     'Refactoring',
    //     'Domain-driven design',
    //     'Building Microservices',
    //   ]);
    // });
  });

  const gotoNthBookInTheList = (number) => {
    cy.get('div.book-item').contains('View Details').eq(number).click();
  };

  it('Goes to the detail page', () => {
    // cy.get('div.book-item').contains('View Details').eq(0).click();
    gotoNthBookInTheList(0);
    cy.url().should('include', `books/${0 + 1}`);
    cy.get('h2.book-title').contains('Refactoring');
  });

  it('searches for a title', () => {
    cy.get('div.book-item').should('have.length', 3);
    cy.get('[data-test="search"] input').type('design');
    checkSearchResult();
    // cy.get('div.book-item').should('have.length', 1);
    // cy.get('div.book-item').eq(0).contains('Domain-driven design');
  });

  const checkBookDetail = (title) => {
    cy.get('h2.book-title').contains(title);
  };

  it('Write a review for a book', () => {
    gotoNthBookInTheList(0);
    checkBookDetail('Refactoring');
    cy.get('input[name="name"]').type('Juntao Qiu');
    cy.get('textarea[name="content"]').type('Excellent work!');
    cy.get('button[name="submit"]').click();
    cy.get('div[data-test="reviews-container"] .review').should(
      'have.length',
      1
    );
  });
});
