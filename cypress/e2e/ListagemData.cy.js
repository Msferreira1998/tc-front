describe('Componente ListagemData', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos', {
      fixture: 'todos.json',
    }).as('getTodos');
    cy.visit('/');
    cy.wait('@getTodos');
  });
  it('deve exibir a tabela de tarefas corretamente', () => {
    cy.get('[data-cy="todo-table"]').should('exist');
    cy.get('[data-cy="search-input"]').should('exist');
    cy.get('[data-cy="add-button"]').should('exist');
  });

  it('deve abrir o formulário de adicionar nova tarefa ao clicar no botão "Add"', () => {
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="todo-form"]').should('exist');
    cy.get('[data-cy="title-input"]').should('exist');
    cy.get('[data-cy="user-id-input"]').should('exist');
  });

  it('deve enviar dados ao clicar no botão Submit no formulário', () => {
    const todoData = {
      title: 'New Todo',
      userId: 1,
    };

    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="title-input"]').type(todoData.title);
    cy.get('[data-cy="user-id-input"]').type(todoData.userId);
    cy.get('[data-cy="submit-button"]').click();
    cy.get('.swal2-confirm').click();

    cy.get('[data-cy="todo-table"]').should('contain', todoData.title);
  });

  it('deve editar uma tarefa ao clicar no ícone "Editar"', () => {
    const updatedTodo = {
      id: 1,
      title: 'Tarefa Atualizada',
      userId: 1,
      completed: true,
    };

    cy.get('[data-cy="Editar-button-1"]').click();
    cy.get('[data-cy="title-input"]').clear().type(updatedTodo.title);
    cy.get('[data-cy="submit-button"]').click();
    cy.get('.swal2-confirm').click();

    cy.get('[data-cy="todo-table"]').should('contain', updatedTodo.title);
  });

  it('deve excluir uma tarefa ao clicar no ícone "Excluir"', () => {
    const todoIdToDelete = 1;
    const taskName = 'New Todo';

    cy.get('[data-cy="Excluir-button-1"]').click();

    cy.get('.swal2-confirm').click();

    cy.get('[data-cy="todo-table"]').should('not.contain', taskName);
  });

  it('deve concluir uma tarefa ao clicar no ícone "Concluir"', () => {
    const completeIcon = 'mdi-close';

    cy.get('[data-cy="Concluir-button-1"]').click();

    cy.get('.swal2-confirm').click();
    cy.get('.swal2-confirm').click();

    cy.get(`[data-cy="Concluir-button-1"].${completeIcon}`).should('exist');
  });

  it('deve filtrar a lista de tarefas com base no termo de pesquisa', () => {
    const searchTerm = 'Task 1';

    cy.get('[data-cy="search-input"]').type(searchTerm);

    cy.get('[data-cy="todo-table"]').should('contain', searchTerm);
  });

  it('deve limpar o formulário ao clicar no botão "Cancel"', () => {
    cy.get('[data-cy="add-button"]').click();

    cy.get('[data-cy="title-input"]').type('New Todo');
    cy.get('[data-cy="user-id-input"]').type(2);

    cy.get('[data-cy="cancel-button"]').click();

    cy.get('[data-cy="todo-form"]').should('not.exist');
  });

  it('deve carregar a lista de tarefas corretamente ao iniciar a página', () => {
    cy.get('[data-cy="todo-table"]').should('exist');
    cy.get("tr[class='v-data-table__tr']").should('have.length.greaterThan', 0);

    cy.get('[data-cy="todo-table"]').should('contain', 'Task 1');
    cy.get('[data-cy="todo-table"]').should('contain', 'Task 2');
    cy.get('[data-cy="todo-table"]').should('contain', 'Task 3');
  });
});
