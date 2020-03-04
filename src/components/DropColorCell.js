import React from 'react';
import { useDrop } from 'react-dnd';
import { ITEM_TYPE_CELL } from '../utils/Constants';
import '../stylesheets/components/DropColorCell.scss';

/**
 * DropColorCell component
 * The 'drop' cell is the cell container that can receive a dragged data (i.e. DragColorCell).
 * 
 * @param {*} props 
 * - index : identifier of the cell
 * - value : hexadecimal code of the cell color
 */
export default function DropColorCell(props) {

  // Drop context
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ITEM_TYPE_CELL,
    drop: () => ({ index: props.index }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const statusClass = (canDrop && isOver) ? 'droppable' : '';

  return (
    <div data-cy="droppable-cell" ref={drop} className={'drop-color-cell ' + statusClass} style={{ backgroundColor: props.value }}>
      {props.children}
    </div >
  )
}

