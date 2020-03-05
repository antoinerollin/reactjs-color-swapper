import React from 'react';
import '../stylesheets/components/App.scss';
import ColorSwapper from './ColorSwapper';

/**
 * Welcome to the ColorSwapper application using ReactJS !
 */
function App() {
  return (
    <div className="App">

      <h1>Color Swapper</h1>
      <h4>Drag and drop cells in order to reorder the grid.</h4>

      <ColorSwapper />

    </div>
  );
}

export default App;
