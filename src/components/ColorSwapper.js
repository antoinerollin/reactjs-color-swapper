import React, { Component } from 'react';
import '../stylesheets/components/ColorSwapper.scss';
import { COLOR_DEFAULT_MAX_VALUE_RGB, COLOR_DEFAULT_MIN_VALUE_RGB, GRID_DEFAULT_HEIGHT, GRID_DEFAULT_WIDTH } from '../utils/Constants';
import GridUtils from '../utils/GridUtils';
import ColorGrid from './ColorGrid';
import GridConfiguration from './GridConfiguration';
import SwapperButton from './SwapperButton';

/**
 * ColorSwapper component
 * The color swapper contains a 4x4 grid of alternative cell colors.
 * Grid can be configured through the GridConfiguration component (i.e. GridConfiguration.js).
 * It can also be reordered by using drag and drop on cells.
 * A move can be cancelled thanks to the undo button.
 * The grid can be reset thanks to the reset button.
 */
export default class ColorSwapper extends Component {
  constructor(props) {
    super();

    this.state = {
      minColor: COLOR_DEFAULT_MIN_VALUE_RGB,
      maxColor: COLOR_DEFAULT_MAX_VALUE_RGB,
      width: GRID_DEFAULT_WIDTH,
      height: GRID_DEFAULT_HEIGHT,
      values: [],
      history: []
    }

    this.handleCellDrop = this.handleCellDrop.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
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
    var cells = GridUtils.generateCellsRgb(numberOfCells, this.state.minColor, this.state.maxColor);
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
  handleUndo(callbackFn) {
    if (this.state.history.length > 0) {
      const historyUpdated = [...this.state.history];
      const [i, j] = historyUpdated.pop();

      const swappedGrid = GridUtils.swap([...this.state.values], i, j);

      this.setState({ values: swappedGrid, history: historyUpdated }, callbackFn);
    }
  }

  /* Undo recursively all the history, on reset. */
  handleReset() {
    if (this.state.history.length > 0) {
      this.handleUndo(() => this.handleReset());
    }
  }

  /* Random swaps on current grid on shuffle */
  handleShuffle() {
    var shuffledgrid = GridUtils.shuffle([...this.state.values]);
    this.setState({ values: shuffledgrid });
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

  /* When first color is changed, generates a new grid */
  handleMinColorChange = (color) => {
    this.setState({ minColor: color.rgb }, () => {
      this.resetGrid();
    });
  };

  /* When last color is changed, generates a new grid */
  handleMaxColorChange = (color) => {
    this.setState({ maxColor: color.rgb }, () => {
      this.resetGrid();
    });
  };

  /******************
   * RENDER METHODS *
   ******************/

  /* Renders the configuration panel */
  renderConfiguration() {
    return (
      <GridConfiguration
        minColor={this.state.minColor} maxColor={this.state.maxColor}
        onMinColorChange={this.handleMinColorChange}
        onMaxColorChange={this.handleMaxColorChange}
        width={this.state.width} height={this.state.height}
        onWidthChange={this.handleWidthChange}
        onHeightChange={this.handleHeightChange} />
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
      <div className="swapper-actions">
        <SwapperButton dataCy="shuffle-button" text="Shuffle" icon="cached" onClick={this.handleShuffle} />
        <SwapperButton dataCy="undo-button" text="Undo" icon="restore" onClick={this.handleUndo} disabled={areActionsDisabled} />
        <SwapperButton dataCy="reset-button" text="Reset" icon="replay" onClick={this.handleReset} disabled={areActionsDisabled} />
      </div>
    )
  }

  render() {
    return (
      <div className="color-swapper">

        <div className="swapper-left">
          <h3>Color Grid</h3>

          {/* Color Grid */}
          {this.renderGrid()}

          {/* Actions */}
          {this.renderActions()}
        </div>

        <div className="swapper-right">
          {/*Configuration*/}
          {this.renderConfiguration()}
        </div>

      </div>
    )
  }
}