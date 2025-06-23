import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    type ChartData,
    type ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface Props {
    header: string;
    labels: string[];
    data: number[];
    yTitle?: string;
    xTitle?: string;
    datasetLabel?: string;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function BarChart({ header, labels, data, datasetLabel = 'Value', yTitle, xTitle }: Props) {
    const chartData: ChartData<'bar', number[], string> = {
        labels,
        datasets: [
            {
                label: datasetLabel,
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: header
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: string | number) {
                        if (typeof value === 'number') {
                            return value.toLocaleString();
                        }
                        return value;
                    }
                },
                title: {
                    display: yTitle !== undefined ? true : false,
                    text: yTitle
                }
            },
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45
                },
                title: {
                    display: xTitle !== undefined ? true : false,
                    text: xTitle
                }
            }
        }
    };

    return <Bar data={chartData} options={options} />;
}
