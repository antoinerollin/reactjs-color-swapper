import React, { Component } from 'react';
import GridUtils from '../utils/GridUtils';
import ColorGrid from './ColorGrid';
import { GRID_WIDTH, GRID_HEIGHT, COLOR_MIN_VALUE, COLOR_MAX_VALUE } from '../utils/Constants';
import '../stylesheets/components/ColorSwapper.scss';

/**
 * ColorSwapper component
 * The color swapper contains a 4x4 grid of alternative cell colors.
 * This grid can be reordered by using drag and drop on cells.
 * A move can be cancelled thanks to the undo button.
 * The grid can be reset thanks to the reset button.
 */
export default class ColorSwapper extends Component {
  constructor(props) {
    super();

    this.state = {
      values: [],
      history: []
    }

    this.handleCellDrop = this.handleCellDrop.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  /* Init */
  componentDidMount() {
    this.resetGrid();
  }

  /* Generates a new grid */
  resetGrid() {
    const numberOfCells = GRID_WIDTH * GRID_HEIGHT;
    var cells = GridUtils.generateCells(numberOfCells, COLOR_MIN_VALUE, COLOR_MAX_VALUE);
    this.setState({ values: cells, history: [] });
  }

  /* When a cell is dropped, process swap and save move into history */
  handleCellDrop(i, j) {
    if (i !== j) {
      const swappedGrid = GridUtils.swap([...this.state.values], i, j);

      const historyUpdated = [...this.state.history];
      historyUpdated.push([i, j]);

      this.setState({
        values: swappedGrid,
        history: historyUpdated
      });
    }
  }

   /* Swap the cells of the last move */
   handleUndo() {
    if (this.state.history.length > 0) {
      const historyUpdated = [...this.state.history];
      const [i, j] = historyUpdated.pop();

      const swappedGrid = GridUtils.swap([...this.state.values], i, j);

      this.setState({ values: swappedGrid, history: historyUpdated });
    }
  }

  /* Generates a new grid */
  handleReset() {
    this.resetGrid();
  }


  render() {
    const areActionsDisabled = this.state.history.length === 0;

    return (
      <div className="color-swapper">

        {/* Color Grid */}
        <ColorGrid width={GRID_WIDTH} height={GRID_HEIGHT}
          values={this.state.values}
          onCellDrop={this.handleCellDrop} />

        {/* Actions */}
        <div className={'swapper-actions'}>
          <button data-cy="undo-button" className="swapper-button" onClick={() => this.handleUndo()} disabled={areActionsDisabled}>
            <span className="material-icons">restore</span>
            Undo
          </button>

          <button data-cy="reset-button" className="swapper-button" onClick={() => this.handleReset()} disabled={areActionsDisabled}>
            <span className="material-icons">replay</span>
            Reset
          </button>
        </div>
      </div>
    )
  }
}