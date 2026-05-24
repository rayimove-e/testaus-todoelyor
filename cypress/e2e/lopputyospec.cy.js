describe('Priority filtering', () => {
  const tasks = [
    {
      id: 'task_low',
      topic: 'Low priority task',
      priority: 'low',
      status: 'todo',
      description: 'This is a low priority task',
      completed: false,
      createdAt: 1000,
      updatedAt: 1000,
    },
    {
      id: 'task_medium',
      topic: 'Medium priority task',
      priority: 'medium',
      status: 'todo',
      description: 'This is a medium priority task',
      completed: false,
      createdAt: 2000,
      updatedAt: 2000,
    },
    {
      id: 'task_high',
      topic: 'High priority task',
      priority: 'high',
      status: 'todo',
      description: 'This is a high priority task',
      completed: false,
      createdAt: 3000,
      updatedAt: 3000,
    },
  ];

  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('todo_tasks_v1', JSON.stringify(tasks));
      },
    });
  });

  it('shows all tasks by default', () => {
    cy.contains('Low priority task').should('be.visible');
    cy.contains('Medium priority task').should('be.visible');
    cy.contains('High priority task').should('be.visible');
  });

  it('filters tasks by low priority', () => {
    cy.contains('button', 'Low').click();

    cy.contains('Low priority task').should('be.visible');
    cy.contains('Medium priority task').should('not.exist');
    cy.contains('High priority task').should('not.exist');
  });

  it('filters tasks by medium priority', () => {
    cy.contains('button', 'Med').click();

    cy.contains('Low priority task').should('not.exist');
    cy.contains('Medium priority task').should('be.visible');
    cy.contains('High priority task').should('not.exist');
  });

  it('filters tasks by high priority', () => {
    cy.contains('button', 'High').click();

    cy.contains('Low priority task').should('not.exist');
    cy.contains('Medium priority task').should('not.exist');
    cy.contains('High priority task').should('be.visible');
  });

  it('removes priority filter when All button is clicked', () => {
    cy.contains('button', 'High').click();

    cy.contains('High priority task').should('be.visible');
    cy.contains('Low priority task').should('not.exist');
    cy.contains('Medium priority task').should('not.exist');

    cy.contains('button', 'All').click();

    cy.contains('Low priority task').should('be.visible');
    cy.contains('Medium priority task').should('be.visible');
    cy.contains('High priority task').should('be.visible');
  });
});
