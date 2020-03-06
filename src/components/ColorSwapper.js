import React, { Component } from 'react';
import '../stylesheets/components/ColorSwapper.scss';
import { COLOR_MAX_VALUE, COLOR_MIN_VALUE, GRID_DEFAULT_HEIGHT, GRID_DEFAULT_WIDTH, GRID_SIZE_MAX_VALUE } from '../utils/Constants';
import GridUtils from '../utils/GridUtils';
import ColorGrid from './ColorGrid';

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
      width: GRID_DEFAULT_WIDTH,
      height: GRID_DEFAULT_HEIGHT,
      values: [],
      history: []
    }

    this.handleCellDrop = this.handleCellDrop.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
  }

  /* Initialization */
  componentDidMount() {
    this.resetGrid();
  }

  /* Generates a new grid */
  resetGrid() {
    const numberOfCells = this.state.width * this.state.height;
    var cells = GridUtils.generateCells(numberOfCells, COLOR_MIN_VALUE, COLOR_MAX_VALUE);
    this.setState({ values: cells, history: [] });
  }

  /************
   * HANDLERS *
   ************/

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

  /* When width changes, generates a new grid */
  handleWidthChange(e) {
    this.setState({ width: parseInt(e.target.value) }, () => {
      this.resetGrid();
    })
  }

  /* When width changes, generates a new grid */
  handleHeightChange(e) {
    this.setState({ height: parseInt(e.target.value) }, () => {
      this.resetGrid();
    })
  }

  /******************
   * RENDER METHODS *
   ******************/

  /* Renders the configuration panel */
  renderConfiguration() {
    return (
      <div className="swapper-configuration">
        {/* Width */}
        {this.renderSizeSelect('width-select', this.state.width, this.handleWidthChange)}

        <span>x</span>

        {/* Height */}
        {this.renderSizeSelect('height-select', this.state.height, this.handleHeightChange)}
      </div>
    )
  }

  /* Renders a number select for grid size configuration */
  renderSizeSelect(id, value, onChangeFn) {
    return (
      <select data-cy={id} className="swapper-select" value={value} onChange={onChangeFn}>
        {Array.from(Array(GRID_SIZE_MAX_VALUE).keys()).map(val => {
          return (<option key={val} className="swapper-option" value={val + 1}>{val + 1}</option>)
        })}
      </select>
    )
  }

  /* Renders the grid */
  renderGrid() {
    return <ColorGrid width={this.state.width} height={this.state.height}
      values={this.state.values}
      onCellDrop={this.handleCellDrop} />
  }

  /* Renders the action panel */
  renderActions() {
    const areActionsDisabled = this.state.history.length === 0;

    return (
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
    )
  }

  render() {
    return (
      <div className="color-swapper">

        {/*Configuration*/}
        {this.renderConfiguration()}

        {/* Color Grid */}
        {this.renderGrid()}

        {/* Actions */}
        {this.renderActions()}
      </div >
    )
  }
}