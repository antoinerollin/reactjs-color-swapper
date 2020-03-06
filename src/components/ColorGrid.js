import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import '../stylesheets/components/ColorGrid.scss';
import DragColorCell from './DragColorCell';
import DropColorCell from './DropColorCell';

/**
 * ColorGrid component
 * Grid of alternative cell colors.
 * 
 * @param {*} props
 * - width : number of cells in a row
 * - height : number of cells in a column
 * - onCellDrop : function called on drop event of a cell
 */
export default function ColorGrid(props) {

  return (
    <DndProvider backend={Backend}>
      <div className="color-grid">
        {/* Rows */}
        {Array.from(Array(props.height).keys()).map((row) => {
          return (
            <div key={row} data-cy="grid-row" className="color-grid-row">

              {/* Cells */}
              {Array.from(Array(props.width).keys()).map((col) => {
                const index = row * (props.width) + col;
                return (
                  <DropColorCell key={index} index={index} value={props.values[index]}>
                    <DragColorCell index={index} onDrop={props.onCellDrop} />
                  </DropColorCell>
                )
              })}

            </div>
          )
        })}
      </div>
    </DndProvider>
  )
}

