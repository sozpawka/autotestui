describe('Cypress Tests', () => {
  it('1. Проверка подключения к серверу', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url);
      cy.get('body').should('be.visible');
    });
  });

  it('2. Создание новой стажировки работодателем', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url);
      cy.get('[href="/login"] > .button').click();
      cy.get('.form-input--text').type(data.login, { delay: 0 });
      cy.get('.form-input--password').type(data.password, { delay: 0 });
      cy.get(':nth-child(3) > .button').click();
      cy.url().should('include', '/account');
      cy.get('.menu-item__item-name').contains('Стажировки').click();
      cy.get('[data-v-e4f6348f=""][data-v-4849dea2=""] > .vacancies-block > .vacancies-block__filters-wrapper > .button').first().click();

      cy.get('.desktop-modal__content').should('be.visible');
      cy.get('.vacancy-add-form-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(1) > .form-control--responsive > .form-input--').type('Тестовая стажировка', { force: true });
      cy.get('.vacancy-add-form-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(4) > .form-control--responsive > .form-input--date').type('2026-06-01', { force: true });
      cy.get('.vacancy-add-form-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(5) > .form-control--responsive > .form-input--date').type('2026-07-01', { force: true });
      cy.get('.vacancy-add-form-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(6) > [name="requirements"] > .form-area').type('Знание Cypress', { force: true });
      cy.get('.vacancy-add-form-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(7) > [name="responsibilities"] > .form-area').type('Писать тесты', { force: true });
      cy.get('.vacancy-add-form-wrapper > .form > .form__buttons > .buttons > .button').click({ force: true });
    });
  });

  it('3. Просмотр страницы со стажировками (поиск и фильтр)', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url + '/internships');
      cy.get('.form-input--text').first().type('Тестовая стажировка', { delay: 0 });
      cy.get('div.search-input__field > .button').click();
      cy.get(':nth-child(2) > .radio-component__label').click();
      cy.get('.form-select__selected').first().click();
      cy.get('.form-select__items > :nth-child(1)').click();
    });
  });
});