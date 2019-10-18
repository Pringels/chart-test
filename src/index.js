import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

import { Line } from 'react-chartjs-2';

const rand = () => Math.round((Math.random() - 0.5) * 4);
const rand100 = () => Math.round(Math.random() * 100);

const getPoints = () => {
  const list = [];
  let prev = 0;
  for (let i = 0; i < 100; i++) {
    const curr = prev + rand();
    list.push(curr);
    prev = curr;
  }
  return list;
};

function App() {
  const [points, setPoints] = useState(getPoints());
  const [points2, setPoints2] = useState(getPoints());

  const changeRandom = (list, handler) => {
    const temp = [...list];
    temp[rand100()] += rand();
    temp[rand100()] -= rand();
    temp[rand100()] -= rand();
    temp[rand100()] += rand();
    handler([...temp]);
  };

  const changeExact = (index, target) => {
    const temp = [...points];
    temp[index] = target;
    setPoints(temp);
  };

  const data = {
    labels: points,
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        steppedLine: true,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: points
      },
      {
        label: 'My First dataset 2',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(192,75,192,0.4)',
        borderColor: 'rgba(192,75,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        steppedLine: true,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(192,75,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(192,75,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: points2
      }
    ]
  };

  return (
    <div>
      <h2>Line Example</h2>
      <Line
        options={{
          tooltips: {
            enabled: false
          }
        }}
        data={data}
        getElementsAtEvent={([a, b]) => {
          changeExact(a._index, points2[a._index]);
        }}
      />
      <button onClick={() => setPoints(getPoints())}>regen</button>
      <button onClick={() => setPoints2(getPoints())}>regen2</button>
      <button onClick={() => changeRandom(points, setPoints)}>change</button>
      <button onClick={() => changeRandom(points2, setPoints2)}>change</button>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
