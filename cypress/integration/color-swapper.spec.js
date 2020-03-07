/**
 * Color Swapper E2E Tests Suite
 */
context('Color Swapper E2E Tests Suite', () => {
    const data = require('../fixtures/color-swapper');
    const selectors = data.selectors;

    beforeEach(() => {
        cy.visit(data.pages.root);
    });

    /**
     * Swap a cell with itself 
     * - swap cell n°1 with cell n°1
     * => first cell color should not change
     * => actions should stay disable all along
     */
    it('Swap a cell with itself', () => {
        cy.get(selectors.undoButton).should('be.disabled');
        cy.get(selectors.resetButton).should('be.disabled');

        cy.getCellColor(1).then(firstCellColorBefore => {
            cy.dragDrop(1, 1);

            cy.getCellColor(1).should('eq', firstCellColorBefore);

            cy.get(selectors.undoButton).should('be.disabled');
            cy.get(selectors.resetButton).should('be.disabled');
        });
    });

    /**
     * Swap two different cells
     * - swap cell n°1 with cell n°2
     * => first cell color should have previous second cell color
     * => second cell color should have previous first cell color
     * => actions should become enabled
     */
    it('Swap two different cells', () => {
        cy.get(selectors.undoButton).should('be.disabled');
        cy.get(selectors.resetButton).should('be.disabled');

        cy.getCellColors(1, 2).then(cellColorsBefore => {
            cy.dragDrop(1, 2);

            cy.getCellColor(1).should('eq', cellColorsBefore[2]);
            cy.getCellColor(2).should('eq', cellColorsBefore[1]);

            cy.get(selectors.undoButton).should('not.be.disabled');
            cy.get(selectors.resetButton).should('not.be.disabled');
        });
    });

    /**
     * Undo action
     * - swap cell n°1 with cell n°2, swap cell n°1 with cell n°3, then undo twice
     * after first undo :
     * => actions should stay enabled
     * => grid should have its second state
     * after second undo :
     * => actions should become disabled
     * => grid should have its initial state
     * => actions should become disabled after second undo
     */
    it('Undo action', () => {
        cy.getCellColors(1, 2, 3).then(cellColorsBefore => {

            cy.get(selectors.undoButton).should('be.disabled');
            cy.get(selectors.resetButton).should('be.disabled');

            cy.dragDrop(1, 2);
            cy.dragDrop(1, 3);

            cy.getCellColor(1).should('eq', cellColorsBefore[3]);
            cy.getCellColor(2).should('eq', cellColorsBefore[1]);
            cy.getCellColor(3).should('eq', cellColorsBefore[2]);

            cy.get(selectors.undoButton).should('not.be.disabled');
            cy.get(selectors.resetButton).should('not.be.disabled');

            cy.get(selectors.undoButton).click();

            cy.getCellColor(1).should('eq', cellColorsBefore[2]);
            cy.getCellColor(2).should('eq', cellColorsBefore[1]);
            cy.getCellColor(3).should('eq', cellColorsBefore[3]);

            cy.get(selectors.undoButton).should('not.be.disabled');
            cy.get(selectors.resetButton).should('not.be.disabled');

            cy.get(selectors.undoButton).click();

            cy.getCellColor(1).should('eq', cellColorsBefore[1]);
            cy.getCellColor(2).should('eq', cellColorsBefore[2]);
            cy.getCellColor(3).should('eq', cellColorsBefore[3]);

            cy.get(selectors.undoButton).should('be.disabled');
            cy.get(selectors.resetButton).should('be.disabled');
        });
    });

    /**
     * Reset action
     * - swap cell n°1 with cell n°2, swap cell n°1 with cell n°3, then reset
     * => actions should become disabled
     * => grid should have its initial state
     */
    it('Reset action', () => {
        cy.getCellColors(1, 2, 3).then(cellColorsBefore => {

            cy.get(selectors.undoButton).should('be.disabled');
            cy.get(selectors.resetButton).should('be.disabled');

            cy.dragDrop(1, 2);
            cy.dragDrop(1, 3);

            cy.get(selectors.undoButton).should('not.be.disabled');
            cy.get(selectors.resetButton).should('not.be.disabled');

            cy.getCellColor(1).should('eq', cellColorsBefore[3]);
            cy.getCellColor(2).should('eq', cellColorsBefore[1]);
            cy.getCellColor(3).should('eq', cellColorsBefore[2]);

            cy.get(selectors.resetButton).click();

            cy.getCellColor(1).should('eq', cellColorsBefore[1]);
            cy.getCellColor(2).should('eq', cellColorsBefore[2]);
            cy.getCellColor(3).should('eq', cellColorsBefore[3]);

            cy.get(selectors.undoButton).should('be.disabled');
            cy.get(selectors.resetButton).should('be.disabled');
        });
    });

    /**
     * Grid resizing
     * - select a width of 8 and a height of 9
     * => grid should have 72 cells
     * => grid should have 9 rows
     * => each row should have 8 cells
     * => actions should be disabled
     */
    it('Grid resizing', () => {
        var newWidth = 8, newHeight = 9;
        var newSize = newWidth * newHeight;

        cy.get(selectors.widthSelect).select(newWidth.toString());
        cy.get(selectors.heightSelect).select(newHeight.toString());

        cy.get(selectors.droppableCell).its('length').should('eq', newSize);
        cy.get(selectors.gridRow).its('length').should('eq', newHeight);
        cy.get(selectors.gridRow).first().find(selectors.droppableCell).its('length').should('eq', newWidth);

        cy.get(selectors.undoButton).should('be.disabled');
        cy.get(selectors.resetButton).should('be.disabled');
    })

    /**
     * Grid color selection
     * - insert #FFFFFF (white) as first cell color, and #000000 (black) as last cell color
     * => first cell should be white 
     * => last cell should be black 
     * => actions should be disabled
     */
    it('Grid color selection', () => {
        cy.get(selectors.droppableCell).its('length').then(size => {

            cy.get(selectors.firstColorSelect).clear().type('FFFFFF');
            cy.wait(100);
            cy.checkCellRGBColor(1, 'rgb(255, 255, 255)');

            cy.get(selectors.lastColorSelect).clear().type('000000');
            cy.wait(100);
            cy.checkCellRGBColor(size, 'rgb(0, 0, 0)');

            cy.get(selectors.undoButton).should('be.disabled');
            cy.get(selectors.resetButton).should('be.disabled');

        });
    });

    /**
     * Grid shuffle
     * - click the shuffle button
     * => grid should not have its initial state
     */
    it('Grid shuffle', () => {
        cy.get(selectors.droppableCell).its('length').then(size => {
            var allIndexes = Array.from(Array(size).keys());

            cy.getCellColors(...allIndexes).then((cellColorsBefore) => {
                cy.get(selectors.shuffleButton).click();
                cy.getCellColors(...allIndexes).should('not.eq', cellColorsBefore);
            })
        });
    });

});