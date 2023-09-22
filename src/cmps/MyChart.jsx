import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,   RadialLinearScale} from 'chart.js';
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
  } from "chart.js";
import { Doughnut, PolarArea,Pie,Line  } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
import { toyService } from '../services/toy.service.js';
import { loadInitalToys, loadToysAll, loadToysByStock } from '../store/actions/toy.actions.js'; 
import { useSelector } from 'react-redux';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


export function MyChart() {
    const toysInital = useSelector(storeState => storeState.toyModule.toysInitial)

    useEffect(() => {
        loadInitalToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top" 
          },
          title: {
            display: true,
            text: "Chart.js Line Chart"
          }
        }
      };

    const labels = ["January", "February", "March", "April", "May", "June", "July"];
    const dataForChart = {
        labels,
        datasets: [
          {
            label: "Dataset 1",
            data: labels.map(() => faker.number.int({ min: -1000, max: 500 })),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)"
          },
        ],
      };

     
   
    const data = {
        labels: toyService.getLabels(),
        datasets: [
            {
                label: 'Price',
                data: toyService.getLabels().map((l) => loadToysAll(l,toysInital)) ,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataForTaskThree = {
        labels: toyService.getLabels(),
        datasets: [
            {
                label: 'byStock',
                data: toyService.getLabels().map((l) => loadToysByStock(l,toysInital)) ,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <section style={{maxWidth:'30vw', display:'flex'}}>
            <div>
            <h1>Prices per label</h1>
            <Pie data={data} />
            </div>
          <div>
          <h1>Percentage of toys that are in stock by
            labels</h1>
            <Pie data={dataForTaskThree} />
          </div>
            <Line options={options} data={dataForChart} />
        </section>
    )
}
