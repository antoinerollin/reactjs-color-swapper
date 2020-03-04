import DndSimulatorDataTransfer from './DndSimulatorDataTransfer';

const data = require('../fixtures/color-swapper');

/**
 * Retrieve the draggable (index) cell (i.e. DragColorCell.js)
 */
Cypress.Commands.add('getDragCell', (index) => {
    return cy.get(data.selectors.draggableCell + ':nth-child(' + index + ')').first();
});

/**
 * Retrieve the droppable (index) cell (i.e. DropColorCell.js)
 */
Cypress.Commands.add('getDropCell', (index) => {
    return cy.get(data.selectors.droppableCell + ':nth-child(' + index + ')').first();
});

/**
 * Drag the (sourceIndex) cell and drop it on the (targetIndex) cell
 */
Cypress.Commands.add('dragDrop', (sourceIndex, targetIndex) => {
    const dataTransfer = new DndSimulatorDataTransfer()

    cy.getDragCell(sourceIndex)
        .trigger('mousedown', { which: 1 })
        .trigger('dragstart', { dataTransfer })
        .trigger('drag', {})

    cy.getDropCell(targetIndex)
        .trigger('dragover', { dataTransfer })
        .trigger('drop', { dataTransfer })
        .trigger('dragend', { dataTransfer })
        .trigger('mouseup', { which: 1 })
});

/**
 * Retrieve the background color of the (index) cell
 */
Cypress.Commands.add('getCellBgColor', (index) => {
    var bgColor = Cypress.$(Cypress.$(data.selectors.droppableCell + ':nth-child(' + index + ')')[0]).css('background-color');
    return cy.wrap(bgColor);
});
