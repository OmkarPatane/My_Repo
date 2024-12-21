import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

// Register required ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const newChart = ({ globalData }) => {
    // Aggregate data by date
    const aggregatedData = globalData.reduce((acc, item) => {
        const existingEntry = acc.find((entry) => entry.date === item.date);
        if (existingEntry) {
            existingEntry.calories += item.calories; // Add calories for the same date
        } else {
            acc.push({ date: item.date, calories: item.calories });
        }
        return acc;
    }, []);

    // Sort by date for a proper chronological chart
    aggregatedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Chart Data
    const chartData = {
        labels: aggregatedData.map((item) => item.date), // Dates for the x-axis
        datasets: [
            {
                label: 'Total Calories',
                data: aggregatedData.map((item) => item.calories),
                borderColor: '#63A4FF',
                backgroundColor: (context) => {
                    const { ctx, chartArea } = context.chart;
                    if (!chartArea) return null; // Handle chart initialization
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, 'rgba(99, 132, 255, 0.2)');
                    gradient.addColorStop(1, 'rgba(99, 132, 255, 0.8)');
                    return gradient;
                },
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#63A4FF',
                tension: 0.4, // Smooth curve
            },
        ],
    };

    // Chart Options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#4B5563', // Custom color
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                    },
                },
            },
            title: {
                display: true,
                text: 'Daily Calorie Intake',
                color: '#1F2937',
                font: {
                    size: 20,
                    weight: 'bold',
                    family: 'Arial, sans-serif',
                },
            },
            tooltip: {
                callbacks: {
                    title: (context) => `Date: ${context[0].label}`,
                    label: (context) => {
                        const calories = aggregatedData[context.dataIndex].calories;
                        return `Total Calories: ${calories} cal`;
                    },
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Tooltip background color
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#ccc',
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                ticks: { color: '#6B7280' },
                grid: { color: 'rgba(203, 213, 224, 0.2)' },
            },
            y: {
                ticks: { color: '#6B7280' },
                grid: { color: 'rgba(203, 213, 224, 0.2)' },
            },
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuad',
        },
    };

    return <Line data={chartData} options={options} />;
};

export default newChart;
