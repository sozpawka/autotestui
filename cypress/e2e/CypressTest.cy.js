describe('Cypress Tests', () => {
  it('Проверка подключения к серверу', () => {
    cy.fixture('cypressTest').then((data) => {
      cy.visit(data.main_url, { failOnStatusCode: false });
      cy.get('body').should('be.visible');
    });
  });
});