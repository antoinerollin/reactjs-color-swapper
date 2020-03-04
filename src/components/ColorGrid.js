import React from 'react';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import DropColorCell from './DropColorCell';
import DragColorCell from './DragColorCell';
import '../stylesheets/components/ColorGrid.scss';

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
            <div key={row}>
              {/* Cells */}
              {Array.from(Array(props.width).keys()).map((col) => {
                const index = row * (props.height) + col;
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

