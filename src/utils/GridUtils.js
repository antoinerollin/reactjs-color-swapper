/**
 * GridUtils
 * This class contains usefull methods for grid creation and grid edition.
 */
export default class GridUtils {

  /**
   * Generates a list of [numberOfCells] hexadecimal codes.
   * The first color is [minColor] and the last is [maxColor].
   * 
   * @param {*} numberOfCells : number of values to generate
   * @param {*} minColorRGB : first step color of the generated values
   * @param {*} maxColorRGB : last step color of the generated values
   */
  static generateCellsRgb(numberOfCells, minColorRGB, maxColorRGB) {

    const colorStepR = parseInt((maxColorRGB.r - minColorRGB.r) / (numberOfCells - 1));
    const colorStepG = parseInt((maxColorRGB.g - minColorRGB.g) / (numberOfCells - 1));
    const colorStepB = parseInt((maxColorRGB.b - minColorRGB.b) / (numberOfCells - 1));

    var cells = [];
    for (var i = 0; i < numberOfCells; i++) {
      const newR = minColorRGB.r + i * colorStepR;
      const newG = minColorRGB.g + i * colorStepG;
      const newB = minColorRGB.b + i * colorStepB;
      cells[i] = '#' + this.rgbToHex(newR) + this.rgbToHex(newG) + this.rgbToHex(newB);
    }

    return cells;
  }

  /**
   * Converts a RGB color value into hexadecimal color value
   * 
   * @param {*} grid : the RGB value to convert into hexa code
   */
  static rgbToHex(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };

  /**
   * Swap [i]nth value and [j]nth value in the [grid].
   * 
   * @param {*} grid : grid to modify
   * @param {*} i : index of the first cell
   * @param {*} j : index of the second cell
   */
  static swap(grid, i, j) {
    [grid[i], grid[j]] = [grid[j], grid[i]];
    return grid;
  }

  /**
   * Process [grid].length * 2 swaps
   */
  static shuffle(grid) {
    for (var n = 0; n < grid.length * 2; n++) {
      var i = Math.floor(Math.random() * Math.floor(grid.length));
      var j = Math.floor(Math.random() * Math.floor(grid.length));
      this.swap(grid, i, j);
    }

    return grid;
  }
}