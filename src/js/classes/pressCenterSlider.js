import Swiper from 'swiper';

class PressCenterSlider {
    constructor(element) {
        this.elements = {
            tabItems: Array.from(element.querySelectorAll('.press-center-slider__tab-item')),
            tabButtons: Array.from(element.querySelectorAll('.press-center-slider__tab-btn')).concat(Array.from(element.querySelectorAll('.press-center-slider__tab-more-menu-link'))),
            prevButton: element.querySelector('.press-center-slider__controls-btn--prev'),
            nextButton: element.querySelector('.press-center-slider__controls-btn--next')
        };

        this.state = {
            tabActiveIndex: 0,
            sliders: [],
            sliderOptions: {
                watchOverflow: true,
                slidesPerView: 'auto',
                spaceBetween: 20,
                breakpoints: {
                    769: {
                        spaceBetween: 65
                    }
                }
            }
        };

        this.initializeSliders();
        this.setActiveTab(this.state.tabActiveIndex);
        this.setTabButtonsListeners();
        this.setSliderButtonListeners();
    }

    setActiveTab(index) {
        const { tabButtons, tabItems } = this.elements;
        tabItems.forEach(item => item.classList.remove('active'));
        tabButtons.forEach(button => button.classList.remove('active'));
        this.state.tabActiveIndex = index;
        tabItems[index].classList.add('active');
        tabButtons[index].classList.add('active');
        this.checkButtonsActivity();
    }

    checkButtonsActivity() {
        const { prevButton, nextButton } = this.elements;
        const { sliders } = this.state;
        const currentSlider = sliders[this.state.tabActiveIndex];
        prevButton.disabled = false;
        nextButton.disabled = false;
        console.log(currentSlider.progress);
        if (currentSlider.progress === 0 || currentSlider.isBeginning) {
            prevButton.disabled = true;
        }
        if (currentSlider.progress === 1 || currentSlider.isEnd) {
            nextButton.disabled = true;
        }
    }

    handleSliderControlsClick(event, direction, btn) {
        event.preventDefault();
        const { sliders } = this.state;
        const currentSlider = sliders[this.state.tabActiveIndex];

        if (direction === 'prev' && btn.disabled === false) {
            currentSlider.slidePrev();
        } else if (direction === 'next' && btn.disabled === false) {
            currentSlider.slideNext();
        } else {
            console.log('No button action available');
        }
    }

    setSliderButtonListeners() {
        const { prevButton, nextButton } = this.elements;
        prevButton.addEventListener('click', this.handleSliderControlsClick.bind(this, event, 'prev', prevButton));
        nextButton.addEventListener('click', this.handleSliderControlsClick.bind(this, event, 'next', nextButton));
    }

    setTabButtonsListeners() {
        const { tabButtons } = this.elements;
        tabButtons.forEach((btn, index) => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                this.setActiveTab(index);
            });
        });
    }

    initializeSliders() {
        const { tabItems } = this.elements;
        tabItems.forEach(item => {
            const swiperContainer = item.querySelector('.swiper-container');
            const swiperPagination = item.querySelector('.press-center-slider__pagination');

            const options = {
                ...this.state.sliderOptions,
                pagination: {
                    el: swiperPagination,
                    type: 'bullets',
                    clickable: true
                }
            }

            const swiperInstance = new Swiper(swiperContainer, options);

            swiperInstance.on('progress', () => {
                this.checkButtonsActivity();
            });

            this.state.sliders.push(swiperInstance);
        });
    }
}

export default PressCenterSlider;
