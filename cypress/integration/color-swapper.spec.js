/**
 * Color Swapper E2E Tests Suite
 */
context('Color Swapper E2E Tests Suite', () => {
    const data = require('../fixtures/color-swapper');

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
        cy.get(data.selectors.undoButton).should('be.disabled');
        cy.get(data.selectors.resetButton).should('be.disabled');

        cy.getCellColor(1).then(firstCellBgColorBefore => {
            cy.dragDrop(1, 1);

            cy.getCellColor(1).should('eq', firstCellBgColorBefore);

            cy.get(data.selectors.undoButton).should('be.disabled');
            cy.get(data.selectors.resetButton).should('be.disabled');
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
        cy.get(data.selectors.undoButton).should('be.disabled');
        cy.get(data.selectors.resetButton).should('be.disabled');

        cy.getCellColors(1, 2).then(cellsBgColorBefore => {
            cy.dragDrop(1, 2);

            cy.getCellColor(1).should('eq', cellsBgColorBefore[2]);
            cy.getCellColor(2).should('eq', cellsBgColorBefore[1]);

            cy.get(data.selectors.undoButton).should('not.be.disabled');
            cy.get(data.selectors.resetButton).should('not.be.disabled');
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
        cy.getCellColors(1, 2, 3).then(cellsBgColorBefore => {

            cy.get(data.selectors.undoButton).should('be.disabled');
            cy.get(data.selectors.resetButton).should('be.disabled');

            cy.dragDrop(1, 2);
            cy.dragDrop(1, 3);

            cy.getCellColor(1).should('eq', cellsBgColorBefore[3]);
            cy.getCellColor(2).should('eq', cellsBgColorBefore[1]);
            cy.getCellColor(3).should('eq', cellsBgColorBefore[2]);

            cy.get(data.selectors.undoButton).should('not.be.disabled');
            cy.get(data.selectors.resetButton).should('not.be.disabled');

            cy.get(data.selectors.undoButton).click();

            cy.getCellColor(1).should('eq', cellsBgColorBefore[2]);
            cy.getCellColor(2).should('eq', cellsBgColorBefore[1]);
            cy.getCellColor(3).should('eq', cellsBgColorBefore[3]);

            cy.get(data.selectors.undoButton).should('not.be.disabled');
            cy.get(data.selectors.resetButton).should('not.be.disabled');

            cy.get(data.selectors.undoButton).click();

            cy.getCellColor(1).should('eq', cellsBgColorBefore[1]);
            cy.getCellColor(2).should('eq', cellsBgColorBefore[2]);
            cy.getCellColor(3).should('eq', cellsBgColorBefore[3]);

            cy.get(data.selectors.undoButton).should('be.disabled');
            cy.get(data.selectors.resetButton).should('be.disabled');
        });
    });

    /**
     * Reset action
     * - swap cell n°1 with cell n°2, swap cell n°1 with cell n°3, then reset
     * => actions should become disabled
     * => grid should have its initial state
     */
    it('Reset action', () => {
        cy.getCellColors(1, 2, 3).then(cellsBgColorBefore => {

            cy.get(data.selectors.undoButton).should('be.disabled');
            cy.get(data.selectors.resetButton).should('be.disabled');

            cy.dragDrop(1, 2);
            cy.dragDrop(1, 3);

            cy.get(data.selectors.undoButton).should('not.be.disabled');
            cy.get(data.selectors.resetButton).should('not.be.disabled');

            cy.getCellColor(1).should('eq', cellsBgColorBefore[3]);
            cy.getCellColor(2).should('eq', cellsBgColorBefore[1]);
            cy.getCellColor(3).should('eq', cellsBgColorBefore[2]);

            cy.get(data.selectors.resetButton).click();

            cy.getCellColor(1).should('eq', cellsBgColorBefore[1]);
            cy.getCellColor(2).should('eq', cellsBgColorBefore[2]);
            cy.getCellColor(3).should('eq', cellsBgColorBefore[3]);

            cy.get(data.selectors.undoButton).should('be.disabled');
            cy.get(data.selectors.resetButton).should('be.disabled');
        });
    });

    /**
     * Resize grid
     * - select a width of 8 and a height of 9
     * => grid should have 72 cells
     * => grid should have 9 rows
     * => each row should have 8 cells
     */
    it('Resize grid', () => {
        var newWidth = 8, newHeight = 9;
        var newSize = newWidth * newHeight;

        cy.get(data.selectors.widthSelect).select(newWidth.toString());
        cy.get(data.selectors.heightSelect).select(newHeight.toString());

        cy.get(data.selectors.droppableCell).its('length').should('eq', newSize);
        cy.get(data.selectors.gridRow).its('length').should('eq', newHeight);
        cy.get(data.selectors.gridRow).first().find(data.selectors.droppableCell).its('length').should('eq', newWidth);

        cy.get(data.selectors.undoButton).should('be.disabled');
        cy.get(data.selectors.resetButton).should('be.disabled');
    })

});