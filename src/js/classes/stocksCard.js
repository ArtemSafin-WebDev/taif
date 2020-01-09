import Chart from 'chart.js';

class StocksCard {
    constructor(element) {
        this.elements = {
            openSelector: element.querySelector('.info-cards__stocks-top-section'),
            chartCanvas: element.querySelector('canvas')
        };

        this.state = {
            data: [],
            chart: {}
        };

        this.drawChart();
    }

    drawChart() {
        const ctx = this.elements.chartCanvas.getContext('2d');

        const gradientFill = ctx.createLinearGradient(0, 0, 0, 160);
        gradientFill.addColorStop(0, 'rgba(30, 172, 114, .5)');
        gradientFill.addColorStop(1, 'rgba(30, 172, 114, .06)');

        const chartOptions = {
            type: 'line',
            data: {
                labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
                datasets: [
                    {
                        lineTension: 0,
                        borderColor: '#1EAC72',
                        backgroundColor: gradientFill,
                        pointBorderColor: 'rgba(0,0,0,0)',
                        pointBackgroundColor: 'rgba(0,0,0,0)',
                        pointHoverBackgroundColor: '#1EAC72',
                        pointHoverBorderColor: '#1EAC72',
                        borderWidth: 3,
                        data: [100, 120, 150, 170, 180, 170, 160]
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },

                scales: {
                    yAxes: [
                        {
                            ticks: {
                                display: false,
                               
                                suggestedMax: 200
                            },
                            gridLines: {
                                color: '#e5e5e5',
                                drawBorder: false,

                                zeroLineColor: 'rgba(0, 0, 0, 0)',
                                tickMarkLength: 0,
                                offsetGridLines: false
                            }
                        }
                    ],
                    xAxes: [
                        {
                            position: 'top',
                            offset: false,
                            ticks: {
                                maxRotation: 0,
                                display: false
                            },
                            gridLines: {
                                color: '#e5e5e5',
                                drawBorder: false,
                                zeroLineColor: 'rgba(0, 0, 0, 0)',
                                tickMarkLength: 0,
                                offsetGridLines: false
                            }
                        }
                    ]
                }
            }
        };

        const chart = new Chart(ctx, chartOptions);
    }
}

export default StocksCard;
