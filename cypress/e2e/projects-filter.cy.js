describe('Project filtering (e2e)', () => {
  beforeEach(() => {
    // Включаем мок projectService для e2e ДО загрузки приложения
    cy.visit('/login', {
      onBeforeLoad(win) {
        // @ts-ignore
        win.__E2E_PROJECTS_MOCK__ = require('../../src/services/projects.service.mock').projectServiceMock;
        // @ts-ignore
        win.__E2E_USERS_MOCK__ = require('../../src/services/users.service.mock').usersServiceMock;
      }
    });
  });

  it('should login and filter projects by status and creator', () => {
    // Логин через UI
    cy.get('input[type="email"]').type('aryltsov@ukr.net');
    cy.get('input[type="password"]').type('qweqweqwe');
    cy.get('button[type="submit"]').click();

    // Дождаться перехода на страницу проектов
    cy.url().should('match', /\/dashboard\/projects(\/|$|\?)/);
    // cy.wait('@getProjects'); // Firestore-запросы не мокаются через intercept

    // Проверить, что отображаются все проекты
    cy.contains('Project A');
    cy.contains('Project B');
    cy.contains('Project C');

    // Фильтрация по статусу "active"
    cy.get('select').select('active');
    cy.wait(200); // дать времени на обновление
    cy.screenshot('after-select-active');
    cy.get('.project-card,.project-row,p.line-clamp-1').then($els => {
      cy.log('Проектов в DOM:', $els.length);
      $els.each((i, el) => cy.log('Проект:', el.textContent));
    });
    cy.contains('Project A');
    cy.contains('Project C');
    cy.contains('Project B').should('not.exist');

    // Фильтрация по создателю "Bob"
    cy.get('input[placeholder="Select creator..."]').type('Bob');
    // Клик по "Bob" в выпадающем списке (headlessui/combobox)
    cy.get('[role="option"]').contains('Bob').click();
    cy.contains('Project C');
    cy.contains('Project A').should('not.exist');
    cy.contains('Project B').should('not.exist');

    // Сброс фильтра по статусу
    cy.get('select').select('');
    cy.contains('Project C');
    cy.contains('Project B');
    cy.contains('Project A').should('not.exist');

    // Сброс фильтра по создателю
    cy.get('input[placeholder="Select creator..."]').clear();
    cy.contains('Project A');
    cy.contains('Project B');
    cy.contains('Project C');
  });
});
