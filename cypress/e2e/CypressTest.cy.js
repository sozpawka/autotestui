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

  it('4. Отклик на стажировку студентом', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url + '/login');
      cy.get('.form-input--text').type('Sozpawka', { delay: 0 });
      cy.get('.form-input--password').type(data.password, { delay: 0 });
      cy.get(':nth-child(3) > .button').should('not.be.disabled').click();
      cy.url().should('include', '/account');
      cy.visit(data.main_url + '/internships');
      cy.get('.internship-item__footer-wrapper', { timeout: 10000 }).should('exist');
      cy.get('.internship-item__footer-wrapper')
        .find('.button__background-color-green')
        .first()
        .should('be.visible')
        .click({ force: true });
    });
  });

  it('5. Подтверждение отклика работодателем', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url + '/login');
      cy.get('.form-input--text').type(data.login, { delay: 0 });
      cy.get('.form-input--password').type(data.password, { delay: 0 });
      cy.get(':nth-child(3) > .button').click();  
      cy.get(':nth-child(5) > .menu-item__item-name').click();
      cy.get('.responses-page__tabs > .navigation-workspace > :nth-child(2) > .navigation-item__title').click();
      cy.get(':nth-child(2) > :nth-child(2) > .form-select__selected').click();
      cy.get('.form-select__items > :nth-child(4)').click();
      cy.get(':nth-child(1) > .responses-list-item__actions > :nth-child(1)').click({ force: true });
    });
  });

  it('6. Взаимодействие внутри рабочего пространства', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url + '/login');
      cy.get('.form-input--text').type(data.login, { delay: 0 });
      cy.get('.form-input--password').type(data.password, { delay: 0 });
      cy.get(':nth-child(3) > .button').click();
      cy.get(':nth-child(5) > .menu-item__item-name').click();
      cy.get(':nth-child(3) > .navigation-item__title').click();
      cy.get(':nth-child(2) > :nth-child(2) > .form-select__selected').click();
      cy.get('.form-select__items > :nth-child(4)').click();
      cy.get('.infinite-loader > :nth-child(1) > .button').click();
      cy.get('.form-area').type('Тестовый текст', { force: true });
      cy.get('.comment-textarea__buttons > :nth-child(2)').click();
    });
  });

  it('7. Смена статуса рабочего пространства', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url + '/login');
      cy.get('.form-input--text').type(data.login, { delay: 0 });
      cy.get('.form-input--password').type(data.password, { delay: 0 });
      cy.get(':nth-child(3) > .button').click();
      cy.get(':nth-child(5) > .menu-item__item-name').click();
      cy.get(':nth-child(3) > .navigation-item__title').click();
      cy.get(':nth-child(2) > :nth-child(2) > .form-select__selected').click();
      cy.get('.form-select__items > :nth-child(4)').click();
      cy.get('.infinite-loader > :nth-child(1) > .button').click();
      cy.get('.status-open__buttons > :nth-child(1)').click({ force: true });
    });
  });
});

describe('Cypress Negative Tests', () => {

  it('8. Негативный тест: Создание стажировки с пустым названием', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url + '/login');
      cy.get('.form-input--text').type(data.login);
      cy.get('.form-input--password').type(data.password);
      cy.get(':nth-child(3) > .button').click();
      
      cy.get('.menu-item__item-name').contains('Стажировки').click();
      cy.get('.vacancies-block__filters-wrapper > .button').first().should('exist');
      cy.get('.vacancies-block__filters-wrapper > .button').first().click({ force: true });
      
      cy.get('.desktop-modal__content').should('be.visible');
      cy.get('.vacancy-add-form-wrapper > .form > .form__buttons > .buttons > .button').click({ force: true });
      cy.get('.desktop-modal__content').should('be.visible');
    });
  });

  it('9. Негативный тест: Поиск несуществующей стажировки', () => {
    cy.intercept('GET', '**/api/internships?page=1*').as('getSearch');
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url + '/internships');
      cy.get('.form-input--text').first().type('ASDFG12345');
      cy.get('div.search-input__field > .button').click();
            cy.wait('@getSearch');
      cy.wait(500); 
      cy.get('body').should('not.contain', 'Тестовая стажировка');
    });
  });

  it('10. Негативный тест: Отклик на уже откликнутую стажировку', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url + '/login');
      cy.get('.form-input--text').type('Sozpawka');
      cy.get('.form-input--password').type(data.password);
      cy.get(':nth-child(3) > .button').click();
      
      cy.url().should('include', '/account');
      cy.wait(2000); 

      cy.visit(data.main_url + '/internships');
      
      cy.get('.internship-item__footer-wrapper').should('be.visible');

      cy.contains('Вы уже откликнулись!')
        .first()
        .parents('.internship-item__footer-wrapper')
        .within(() => {
          cy.get('button').first().click({ force: true });
          cy.get('.button__background-color-green').should('not.exist');
        });
    });
  });

  it('11. Негативный тест: подтверждения в отклоненных', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url + '/login');
      cy.get('.form-input--text').type(data.login);
      cy.get('.form-input--password').type(data.password);
      cy.get(':nth-child(3) > .button').click();
      
      cy.get(':nth-child(5) > .menu-item__item-name').click();
      cy.wait(1000); 

      cy.get(':nth-child(4) > .navigation-item__title').should('be.visible').click(); 
      cy.wait(1000);

      cy.get('.responses-list').should('not.contain', 'Вы подтвердили заявку');
    });
  });

  it('12. Негативный тест: Отправка пустого комментария', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url + '/login');
      cy.get('.form-input--text').type(data.login);
      cy.get('.form-input--password').type(data.password);
      cy.get(':nth-child(3) > .button').click();
      
      cy.get(':nth-child(5) > .menu-item__item-name').click();
      cy.get(':nth-child(3) > .navigation-item__title').click();
      cy.get('.infinite-loader > :nth-child(1) > .button').click();
      
      cy.get('.comment-textarea__buttons > :nth-child(2)').click({ force: true });
      
      cy.get('.base-comment').should('not.have.text', '');
    });
  });
  
  it('13. Негативный тест: Попытка доступа к рабочему пространству без авторизации', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url + '/workspaces/443');
      cy.url().should('include', '/login');
      cy.get('.form-input--text').should('be.visible');
      cy.get('.workspace-page').should('not.exist');
    });
  });
});