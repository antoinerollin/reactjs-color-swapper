import DndSimulatorDataTransfer from './DndSimulatorDataTransfer';

const selectors = require('../fixtures/color-swapper').selectors;

/**
 * Drag the (sourceIndex) cell and drop it on the (targetIndex) cell
 */
Cypress.Commands.add('dragDrop', (sourceIndex, targetIndex) => {
    const dataTransfer = new DndSimulatorDataTransfer()

    cy.get(selectors.draggableCell).its(sourceIndex - 1)
        .trigger('mousedown', { which: 1 })
        .trigger('dragstart', { dataTransfer })
        .trigger('drag', {})

    cy.get(selectors.droppableCell).its(targetIndex - 1)
        .trigger('dragover', { dataTransfer })
        .trigger('drop', { dataTransfer })
        .trigger('dragend', { dataTransfer })
        .trigger('mouseup', { which: 1 })
});

/**
 * Retrieve the background color of the (index) cell
 */
Cypress.Commands.add('getCellColor', (index) => {
    var bgColor = Cypress.$(Cypress.$(selectors.droppableCell)[index - 1]).css('background-color');
    return cy.wrap(bgColor);
});

/**
 * Retrieve the background color of all the (indexes) cells
 */
Cypress.Commands.add('getCellColors', (...indexes) => {
    var values = [];

    indexes.forEach(index => {
        values[index] = Cypress.$(Cypress.$(selectors.droppableCell)[index - 1]).css('background-color');
    })

    return cy.wrap(values);
});

Cypress.Commands.add('checkCellRGBColor', (index, rgb) => {
    cy.get(selectors.droppableCell).its(index - 1).should('have.css', 'background-color').and('eq', rgb);
});

Cypress.Commands.add('checkCellRGBColors', (colors) => {
    cy.get(selectors.droppableCell).its('length').then(size => {
        var allIndexes = Array.from(Array(size + 1).keys());

        cy.getCellColors(...allIndexes).then(currentColors => {
            for (var i = 0; i < currentColors.length; i++) {
                if (colors[i + 1]) {
                    cy.checkCellRGBColor(i + 1, colors[i + 1]);
                }
            }
        })
    });
});


