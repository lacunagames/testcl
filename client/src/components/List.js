import React, {useEffect, useState, useContext} from 'react';
import { AppContext } from "../App";
import './List.scss';

function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch('http://localhost:3001/list-targets');
      const json = await response.json();
      setList(json);
    };
    fetchList();
  }, []);

  const [data, setData] = useState({});
  useEffect(() => {
    if (!list.length) {
      return;
    }
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/data');
      const json = await response.json();
      const data = {};
      for (const key of list) {
        data[key] = [];
      }
      json.forEach(row => Object.keys(row).forEach(key => data[key]?.push(row[key])));
       
      for (const key of list) {
        data[key].min = Math.min(...data[key]);
        data[key].max = Math.max(...data[key]);
      }
      setData(data);
    };
    fetchData();
  }, [list]);

  const [, setPrediction] = useContext(AppContext);
  async function getPrediction(item) {
    const response = await fetch('http://localhost:3001/predict?target=' + item);
    const json = await response.json();
    setPrediction(json);
  }

  return (
    <div className="content">
      <ul className="List">
        {list.map((item, index) => 
          <li key={index}>
            <h3>{item}</h3>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {data[item]?.map((val, index) => index === 0 || data[item][index] === '' || data[item][index - 1] === ''
              ? '' 
              : <line 
                key={index} 
                x1={index - 1} 
                y1={data[item][index - 1] - data[item].min} 
                x2={index} 
                y2={data[item][index] - data[item].min} />
              )}
            </svg>
            <button onClick={() => getPrediction(item)}>Predict</button>
          </li>)}
      </ul>
    </div>
  );
}

export default List;
