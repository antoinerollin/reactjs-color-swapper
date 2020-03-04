/**
 * GridUtils
 * This class contains usefull method for grid creation and grid edition.
 */
export default class GridUtils {

  /**
   * Generates a list of [numberOfCells] hexadecimal codes.
   * The first color is [hexaMinValue] and the last is [hexaMaxValue].
   * 
   * @param {*} numberOfCells : number of values to generate
   * @param {*} hexaMinValue : first step color of the generated values
   * @param {*} hexaMaxValue : last step color of the generated values
   */
  static generateCells(numberOfCells, hexaMinValue, hexaMaxValue) {
    const colorMinValue = parseInt(hexaMinValue, 16); 
    const colorMaxValue = parseInt(hexaMaxValue, 16);
    const colorStep = parseInt((colorMaxValue - colorMinValue) / (numberOfCells - 1));

    var cells = [];
    for (var i = 0; i < numberOfCells; i++) {
      var colorValue = colorMinValue + i * colorStep;
      cells[i] = '#' + colorValue.toString(16);
    }

    return cells;
  }

  /**
   * Swap [i]nth value and [j]nth value in the [grid].
   * 
   * @param {*} grid : grid to modify
   * @param {*} i : index of the first cell
   * @param {*} j : index of the second cell
   */
  static swap(grid, i, j){
    [grid[i], grid[j]] = [grid[j], grid[i]];
    return grid;
  }
}