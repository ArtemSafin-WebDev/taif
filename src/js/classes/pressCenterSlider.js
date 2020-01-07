import Swiper from 'swiper';

class PressCenterSlider {
    constructor(element) {
        this.elements = {
            tabItems: Array.from(element.querySelectorAll('.press-center-slider__tab-item')),
            tabButtons: Array.from(element.querySelectorAll('.press-center-slider__tab-btn')).concat(Array.from(element.querySelectorAll('.press-center-slider__tab-more-menu-link')))
        };

        this.state = {
            sliders: [],
            sliderOptions: {
                watchOverflow: true,
                slidesPerView: 'auto',
                spaceBetween: 65
            }
        };


        console.dir(this.elements.tabButtons);

        this.initializeSliders();
    }

    initializeTabs() {}

    initializeSliders() {
        const { tabItems } = this.elements;
        tabItems.forEach(item => {
            const swiperContainer = item.querySelector('.swiper-container');

            this.state.sliders.push(new Swiper(swiperContainer, this.state.sliderOptions));
        });
    }
}

export default PressCenterSlider;
