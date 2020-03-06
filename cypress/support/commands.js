import DndSimulatorDataTransfer from './DndSimulatorDataTransfer';

const data = require('../fixtures/color-swapper');

/**
 * Drag the (sourceIndex) cell and drop it on the (targetIndex) cell
 */
Cypress.Commands.add('dragDrop', (sourceIndex, targetIndex) => {
    const dataTransfer = new DndSimulatorDataTransfer()

    cy.get(data.selectors.draggableCell).its(sourceIndex - 1)
        .trigger('mousedown', { which: 1 })
        .trigger('dragstart', { dataTransfer })
        .trigger('drag', {})

    cy.get(data.selectors.droppableCell).its(targetIndex - 1)
        .trigger('dragover', { dataTransfer })
        .trigger('drop', { dataTransfer })
        .trigger('dragend', { dataTransfer })
        .trigger('mouseup', { which: 1 })
});

/**
 * Retrieve the background color of the (index) cell
 */
Cypress.Commands.add('getCellColor', (index) => {
    var bgColor = Cypress.$(Cypress.$(data.selectors.droppableCell + ':nth-child(' + index + ')')[0]).css('background-color');
    return cy.wrap(bgColor);
});

/**
 * Retrieve the background color of all the (indexes) cells
 */
Cypress.Commands.add('getCellColors', (...indexes) => {
    var values = [];

    indexes.forEach(index => {
        values[index] = Cypress.$(Cypress.$(data.selectors.droppableCell + ':nth-child(' + index + ')')[0]).css('background-color');
    })

    return cy.wrap(values);
});


