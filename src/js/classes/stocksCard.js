import Chart from 'chart.js';
import axios from 'axios';

class StocksCard {
    constructor(element) {
        this.elements = {
            root: element,
            openSelector: element.querySelector('.info-cards__stocks-top-section'),
            selector: element.querySelector('.info-cards__stocks-selector'),
            chartCanvas: element.querySelector('canvas'),
            ticker: element.querySelector('.info-cards__stocks-emitent-selection-ticker-text'),
            emitentName: element.querySelector('.info-cards__stocks-emitent-selection-name'),
            price: element.querySelector('.info-cards__stocks-price-amount'),
            dynamics: element.querySelector('.info-cards__stocks-price-dynamics'),
            preloader: element.querySelector('.info-cards__stocks-preloader')
        };

        this.state = {
            data: [],
            loading: false,
            chart: null
        };

        (async () => {
            try {
                this.elements.preloader.classList.add('active');
                const pricesData = await axios.get(element.getAttribute('data-source'));
                this.elements.preloader.classList.remove('active');
                this.setState({
                    data: pricesData.data
                });
                if (this.state.data.length === 0) {
                   
                    return err;
                }

                this.prepareSelectorElements();
                this.bindSelectorEventListeners();

                this.setStock(this.state.data[0]);
            } catch (err) {
               
                return;
            }
        })();
    }

    setStock(stockData) {
        const prices = stockData.history;
        const { ticker, emitentName, price, dynamics } = this.elements;

        ticker.textContent = stockData.ticker;
        emitentName.textContent = stockData.emitentName;
        price.textContent = stockData.currentPrice;
        dynamics.classList.remove('info-cards__stocks-price-dynamics--positive');
        dynamics.classList.remove('info-cards__stocks-price-dynamics--negative');
        if (stockData.priceDynamics === 'positive') {
            dynamics.textContent = '+' + stockData.priceDynamicsAmount;
            dynamics.classList.add('info-cards__stocks-price-dynamics--positive');
        } else if (stockData.priceDynamics === 'negative') {
            dynamics.textContent = '-' + stockData.priceDynamicsAmount;
            dynamics.classList.add('info-cards__stocks-price-dynamics--negative');
        }

        this.drawChart(prices);
    }

    prepareSelectorElements() {
        const data = this.state.data;
        const list = this.elements.root.querySelector('.info-cards__stocks-selector-list');

        data.forEach(dataItem => {
            const li = document.createElement('li');
            li.className = 'info-cards__stocks-selector-list-item';
            li.innerHTML = `
            <a href="#" class="info-cards__stocks-selector-btn">
                <span class="info-cards__stocks-selector-btn-ticker">
                    ${dataItem.ticker}
                </span>
                <span class="info-cards__stocks-selector-btn-description">
                    ${dataItem.emitentName}
                </span>
            </a>
            `;

            const link = li.querySelector('a');

            link.addEventListener('click', event => {
                event.preventDefault();
                this.setStock(dataItem);
                this.closeSelector();
            });

            list.appendChild(li);
        });
    }

    openSelector(event) {
        event.preventDefault();
       
        this.elements.selector.classList.add('active');
    }

    closeSelector() {
      
        this.elements.selector.classList.remove('active');
    }

    handleOutsideClicks(event) {
        const { target } = event;
        if (target === this.elements.openSelector || this.elements.root.contains(target) || target === this.elements.root) {
            return;
        }
        this.closeSelector();
    }

    bindSelectorEventListeners() {
        this.elements.openSelector.addEventListener('click', this.openSelector.bind(this));

        document.addEventListener('click', this.handleOutsideClicks.bind(this));
    }

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
       
    }

    drawChart(priceHistory) {
        const ctx = this.elements.chartCanvas.getContext('2d');
        const gradientFill = ctx.createLinearGradient(0, 0, 0, 160);
        gradientFill.addColorStop(0, 'rgba(30, 172, 114, .5)');
        gradientFill.addColorStop(1, 'rgba(30, 172, 114, .06)');

        const dataset = {
            lineTension: 0,
            borderColor: '#1EAC72',
            backgroundColor: gradientFill,
            pointBorderColor: 'rgba(0,0,0,0)',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointHoverBackgroundColor: '#1EAC72',
            pointHoverBorderColor: '#1EAC72',
            borderWidth: 3,
            data: priceHistory
        };


      

        if (!this.state.chart) {
            const chartOptions = {
                type: 'line',
                data: {
                    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
                    datasets: [dataset]
                },
                options: {
                    tooltips: {
                        displayColors: false
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    display: false,
                                    suggestedMax: Math.max(...priceHistory) + 20
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

            this.setState({
                chart
            });
        } else {
            this.state.chart.data.datasets = [];
            this.state.chart.data.datasets.push(dataset);
            this.state.chart.update();
        }
    }
}

export default StocksCard;
