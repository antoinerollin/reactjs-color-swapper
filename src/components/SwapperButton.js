import React from 'react';
import '../stylesheets/components/SwapperButton.scss';

/**
 * SwapperButton component
 * 
 * @param {*} props
 * - onClick : action to call on click 
 * - icon : button's icon (material icon identifier)
 * - text : button's text
 * - dataCy : selector for end-to-end tests
 * - disabled : button disabled status
 */
export default function SwapperButton(props) {

  return (
    <button className="swapper-button"
      data-cy={props.dataCy}
      onClick={() => props.onClick()}
      disabled={props.disabled}>

      <span className="material-icons">{props.icon}</span>
      {props.text}

    </button>
  )
}

