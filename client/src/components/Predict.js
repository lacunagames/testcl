import React, {useContext} from 'react';
import { AppContext } from "../App";
import './Predict.scss';

function Predict() {
  const [prediction, setPrediction] = useContext(AppContext);
console.log(prediction);
  return (
    <div className="content Predict">
      <div className="grid">
        <div>
          <h2 className="h3">Summary</h2>
          <ul className="summary">
            {Object.keys(prediction.modelSummary).map(key => 
            <li key={key}>
              {key}: 
              <strong>{prediction.modelSummary[key]}</strong>
            </li>)}
          </ul>
        </div>
        <div>
          <h2>Confusion metric</h2>
          <ul className="summary">
            {Object.keys(prediction.metrics.confusionMetric).map(key => 
            <li key={key}>
              {key}: 
              <strong>{prediction.metrics.confusionMetric[key]}</strong>
            </li>)}
          </ul>
        </div>
        <div>
          <h2>Detailed scoring</h2>
          <ul className="summary">
            {Object.keys(prediction.metrics.detailedScoring).map(key => 
            <li key={key}>
              {key}: 
              <strong>{prediction.metrics.detailedScoring[key]}</strong>
            </li>)}
          </ul>
        </div>
        <div>
          <h2>Overall scores</h2>
          <ul className="summary">
            {Object.keys(prediction.metrics.overallScores).map(key => 
            <li key={key}>
              {key}: 
              <strong>{prediction.metrics.overallScores[key]}</strong>
            </li>)}
          </ul>
        </div>
      </div>
      <button onClick={() => setPrediction(undefined)}>Reset</button>
    </div>
  );
}

export default Predict;
