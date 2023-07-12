const getFullData = () => {
  cy.intercept('GET', /categories/, { fixture: 'categories' }).as('categories');
  cy.intercept('GET', /books/, { fixture: 'books' }).as('books');
  cy.intercept('GET', /users\/me/, { fixture: 'user-full-data' }).as('me');
};

const login = 'adA1';
const pass = 'adA1adA1';

describe('Main page', () => {
  beforeEach(() => {
    cy.session([login, pass], () => {
      cy.intercept('POST', /local/, { fixture: 'user-auth' }).as('authorize');
      cy.visit('http://localhost:3000/#/auth');
      cy.get('[data-test-id=auth-form] input[name=identifier]').should('be.visible').type(login);
      cy.get('[data-test-id=auth-form] input[name=password]').should('be.visible').type(pass);
      cy.get('[type=submit]').should('be.exist').click();
      cy.wait('@authorize');
      cy.get('[data-test-id=main-page]').should('be.visible');
    });

    getFullData();
    cy.viewport('macbook-16');
    cy.visit(`http://localhost:3000`);
  });

  context('Check infinite scroll', () => {
    it('should categories load', () => {
      cy.wait(['@categories', '@me']);
      cy.wait('@books').its('request.url').should('not.include', '[categories][path][$eq]');

      cy.get('[data-test-id=navigation-programming]').click();

      cy.wait('@books').its('request.url').should('include', '[categories][path][$eq]=programming');
    });

    it('should infinity scroll logic be correct', () => {
      cy.wait(['@books', '@categories', '@me']);

      cy.get('[data-test-id=content]').children().should('have.length', 12);
      cy.scrollTo('center');
      cy.get('[data-test-id=content]').children().should('have.length', 12);

      cy.scrollTo('bottom', { duration: 500 });

      cy.wait('@books').its('request.url').should('include', 'pagination[page]=2');

      cy.get('[data-test-id=content]').children().should('have.length', 24);
    });
  });

  context('Check books sorting', () => {
    it('should books sorting open', () => {
      cy.get('[data-test-id=sort-option]').should('not.be.visible');
      cy.get('[data-test-id=sort-button]').click();
      cy.get('[data-test-id=sort-option]').should('be.visible');
    });

    it('should books sorting be correct', () => {
      cy.wait('@books').its('request.url').should('include', 'sort=title:asc');
      cy.get('[data-test-id=sort-tags]').children().eq(0).should('have.text', 'По названию от А до Я');

      cy.get('[data-test-id=sort-button]').click();
      cy.get('[data-test-id=sort-option]').eq(2).click();
      cy.wait('@books').its('request.url').should('include', 'sort=title:asc,authors:desc');
      cy.get('[data-test-id=sort-tags]').children().should('have.length', 2);
      cy.get('[data-test-id=sort-tags]').children().eq(1).should('have.text', 'По автору от Я до А');

      cy.get('[data-test-id=sort-tags]').children().eq(0).click();
      cy.get('[data-test-id=sort-tags]').children().should('have.length', 1);
      cy.get('[data-test-id=sort-tags]').children().eq(0).should('have.text', 'По автору от Я до А');
      cy.wait('@books').its('request.url').should('include', 'sort=authors:desc');
    });
  });

  context('Check book search', () => {
    it('should book search be correct', () => {
      cy.wait('@books');
      cy.fixture('books').then((fixture) => {
        cy.intercept(
          'GET',
          /books/,
          fixture.filter(
            ({ title, authors }) =>
              title.toLowerCase().includes('hom') || authors.toString().toLowerCase().includes('hom')
          )
        ).as('books');
      });
      cy.get('[data-test-id=input-search]').type('hom');
      cy.wait('@books')
        .its('request.url')
        .should('include', 'filters[$or][0][title][$containsi]=hom&filters[$or][1][authors][$containsi]=hom');

      cy.intercept('GET', /books/, { fixture: 'books' }).as('books');
      cy.get('[data-test-id=content]').children().should('have.length', 2);
      cy.get('[data-test-id=input-search]').clear();
      cy.wait('@books');
      cy.get('[data-test-id=content]').children().should('have.length', 12);

      cy.fixture('books').then((fixture) => {
        cy.intercept(
          'GET',
          /books/,
          fixture.filter(({ title }) => title.includes('asd'))
        ).as('books');
      });
      cy.get('[data-test-id=input-search]').type('asd');
      cy.wait('@books');
      cy.get('[data-test-id=search-result-not-found]')
        .should('exist')
        .should('have.text', 'По запросу ничего не найдено');
    });
  });

  context('Check hiding books', () => {
    it('should hiding books be correct', () => {
      cy.wait('@books');
      cy.fixture('books').then((fixture) => {
        cy.intercept(
          'GET',
          /books/,
          fixture.filter(({ booking }) => !booking)
        ).as('books');
      });
      cy.get('[data-test-id=content]').children().should('have.length', 12);

      cy.get('[data-test-id=hide-booking-books]').click();
      cy.wait('@books').its('request.url').should('include', 'filters[booking][id][$null]=true');
      cy.get('[data-test-id=content]').children().should('have.length', 11);
    });
  });

  context('Check changing display', () => {
    it.only('should display be working in one button', () => {
      cy.wait('@books');
      cy.get('[data-test-id=button-menu-view-tile]').click();
      cy.get('[data-test-id=button-menu-view-list]').click();
    });
  });
});
