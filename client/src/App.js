import React, {useState} from 'react';
import './styles/core.scss';
import './App.scss';
import List from './components/List';
import Predict from './components/Predict';

export const AppContext = React.createContext();

function App() {
  const [prediction, setPrediction] = useState(undefined);
  return (
    <div className="App">
      <header className="App-header">
        <h2>CasuaLens Predictions</h2>
      </header>
      
      <AppContext.Provider value={[prediction, setPrediction]}>
        {typeof prediction === 'undefined' ? <List /> : <Predict />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
