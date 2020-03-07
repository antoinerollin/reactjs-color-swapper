import React from 'react';
import { TwitterPicker } from 'react-color';
import { AVAILABLE_COLOR_VALUES, GRID_SIZE_MAX_VALUE } from '../utils/Constants';
import '../stylesheets/components/GridConfiguration.scss';

/**
 * GridConfiguration component
 * This component enables to configure several grid's parameters.
 * First parameters are the colors used to fill the grid, modified thanks to color pickers.
 * Second parameters are the width and the height of the grid, modified through select menus.
 */
export default function GridConfiguration(props) {

  /* Renders the color pickers panel */
  function renderColorSelect(id, color, onChange) {
    return (
      <div className="color-select" data-cy={id}>
        <TwitterPicker color={color} colors={AVAILABLE_COLOR_VALUES} onChangeComplete={onChange} triangle="hide" />
      </div>
    )
  }

  /* Renders a number select for grid size configuration */
  function renderSizeSelect(id, value, onChangeFn) {
    return (
      <select data-cy={id} className="swapper-select" value={value} onChange={onChangeFn}>
        {Array.from(Array(GRID_SIZE_MAX_VALUE).keys()).map(val => {
          return (<option key={val} className="swapper-option" value={val + 1}>{val + 1}</option>)
        })}
      </select>
    )
  }

  return (
    <div className="grid-configuration">

      <h3>Settings</h3>

      {/* Color selection */}
      <div className="color-configuration">
        <h4>First color</h4>
        {renderColorSelect("first-color-select", props.minColor, (e) => props.onColorChange(e.rgb, props.maxColor))}
        <h4>Last color</h4>
        {renderColorSelect("last-color-select", props.maxColor, (e) => props.onColorChange(props.minColor, e.rgb))}
      </div>

      <div className="size-configuration">
        <h4>Size</h4>

        {/* Width */}
        {renderSizeSelect('width-select', props.width, (e) => props.onSizeChange(parseInt(e.target.value), props.height))}
        <span className="size-divider">x</span>
        {/* Height */}
        {renderSizeSelect('height-select', props.height, (e) => props.onSizeChange(props.width, parseInt(e.target.value)))}
      </div>
    </div >
  )
}

