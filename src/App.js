import React from 'react';
import './App.css';

/* Using latest React hooks  */
import Dashboard from './components/dashboard-hooks';

/* Using old React */
// import Dashboard from './components/dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard/>
    </div>
  );
}

export default App;
