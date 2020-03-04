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

        cy.getCellBgColor(1).then(firstCellBgColorBefore => {
            cy.dragDrop(1, 1);

            cy.getCellBgColor(1).should('eq', firstCellBgColorBefore);

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

        cy.getCellBgColor(1).then(firstCellBgColorBefore => {
            cy.getCellBgColor(2).then(secondCellBgColorBefore => {
                cy.dragDrop(1, 2);

                cy.getCellBgColor(1).should('eq', secondCellBgColorBefore);
                cy.getCellBgColor(2).should('eq', firstCellBgColorBefore);

                cy.get(data.selectors.undoButton).should('not.be.disabled');
                cy.get(data.selectors.resetButton).should('not.be.disabled');
            });
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
        cy.getCellBgColor(1).then(firstCellBgColorBefore => {
            cy.getCellBgColor(2).then(secondCellBgColorBefore => {
                cy.getCellBgColor(3).then(thirdCellBgColorBefore => {

                    cy.get(data.selectors.undoButton).should('be.disabled');
                    cy.get(data.selectors.resetButton).should('be.disabled');

                    cy.dragDrop(1, 2);
                    cy.dragDrop(1, 3);

                    cy.getCellBgColor(1).should('eq', thirdCellBgColorBefore);
                    cy.getCellBgColor(2).should('eq', firstCellBgColorBefore);
                    cy.getCellBgColor(3).should('eq', secondCellBgColorBefore);

                    cy.get(data.selectors.undoButton).should('not.be.disabled');
                    cy.get(data.selectors.resetButton).should('not.be.disabled');

                    cy.get(data.selectors.undoButton).click();

                    cy.getCellBgColor(1).should('eq', secondCellBgColorBefore);
                    cy.getCellBgColor(2).should('eq', firstCellBgColorBefore);
                    cy.getCellBgColor(3).should('eq', thirdCellBgColorBefore);

                    cy.get(data.selectors.undoButton).should('not.be.disabled');
                    cy.get(data.selectors.resetButton).should('not.be.disabled');

                    cy.get(data.selectors.undoButton).click();

                    cy.getCellBgColor(1).should('eq', firstCellBgColorBefore);
                    cy.getCellBgColor(2).should('eq', secondCellBgColorBefore);
                    cy.getCellBgColor(3).should('eq', thirdCellBgColorBefore);

                    cy.get(data.selectors.undoButton).should('be.disabled');
                    cy.get(data.selectors.resetButton).should('be.disabled');
                });
            });
        });
    });

    /**
     * Undo action
     * - swap cell n°1 with cell n°2, swap cell n°1 with cell n°3, then reset
     * => actions should become disabled
     * => grid should have its initial state
     */
    it('Reset action', () => {
        cy.getCellBgColor(1).then(firstCellBgColorBefore => {
            cy.getCellBgColor(2).then(secondCellBgColorBefore => {
                cy.getCellBgColor(3).then(thirdCellBgColorBefore => {

                    cy.get(data.selectors.undoButton).should('be.disabled');
                    cy.get(data.selectors.resetButton).should('be.disabled');

                    cy.dragDrop(1, 2);
                    cy.dragDrop(1, 3);

                    cy.get(data.selectors.undoButton).should('not.be.disabled');
                    cy.get(data.selectors.resetButton).should('not.be.disabled');

                    cy.getCellBgColor(1).should('eq', thirdCellBgColorBefore);
                    cy.getCellBgColor(2).should('eq', firstCellBgColorBefore);
                    cy.getCellBgColor(3).should('eq', secondCellBgColorBefore);

                    cy.get(data.selectors.resetButton).click();

                    cy.getCellBgColor(1).should('eq', firstCellBgColorBefore);
                    cy.getCellBgColor(2).should('eq', secondCellBgColorBefore);
                    cy.getCellBgColor(3).should('eq', thirdCellBgColorBefore);

                    cy.get(data.selectors.undoButton).should('be.disabled');
                    cy.get(data.selectors.resetButton).should('be.disabled');
                });
            });
        });
    });

});