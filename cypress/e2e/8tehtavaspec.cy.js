describe('ToDo app E2E tests', () => {
  it('creates a new task with high priority and in progress status then deletes it', () => {
    cy.visit('/');

    cy.contains('label', 'Topic').parent().find('input').type('Spartan');

    cy.get('select').eq(0).select('High');

    cy.get('select').eq(1).select('In progress');

    cy.contains('label', 'Description')
      .parent()
      .find('textarea')
      .type('Shout "This is Sparta!"');

    cy.contains('button', 'Save Task').click();

    cy.contains('Spartan').should('be.visible');
    cy.contains('High').should('be.visible');
    cy.contains('In progress').should('be.visible');
    cy.contains('Shout "This is Sparta!"').should('be.visible');

    cy.wait(5000);

    cy.contains('button', 'Complete').click();

    cy.wait(5000);

    cy.on('window:confirm', () => true);

    cy.contains('button', 'Delete').click();

    cy.contains('Spartan').should('not.exist');
  });
});
