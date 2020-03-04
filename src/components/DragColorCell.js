import React from 'react';
import '../stylesheets/components/DragColorCell.scss';
import { useDrag } from 'react-dnd';
import { ITEM_TYPE_CELL } from '../utils/Constants';

/**
 * DragColorCell component
 * The 'drag' cell is the cell element that can be dragged into a dropzone (i.e. DropColorCell).
 * 
 * @param {*} props 
 * - index : identifier of the cell
 * - onDrop : function called on drop event of the cell
 */
export default function DragColorCell(props) {

  // Drag context
  const [{ isDragging }, drag] = useDrag({
    item: { index: props.index, type: ITEM_TYPE_CELL },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        props.onDrop(item.index, dropResult.index);
      }
    }
  });

  const statusClass = isDragging ? 'dragged' : '';

  return (
    <div data-cy="draggable-cell" ref={drag} className={'drag-color-cell ' +  statusClass}></div>
  )
}

