import Swiper from 'swiper';

class PressCenterNewsSlider {
    constructor(element) {
        this.elements = {
            container: element.querySelector('.swiper-container'),
            nextBtn: element.querySelector('.press-center-main__news-slider-btn--next'),
            prevBtn: element.querySelector('.press-center-main__news-slider-btn--prev')
        };

        this.state = {
            options: {
                effect: 'fade',
                watchOverflow: true,
                fadeEffect: {
                    crossFade: false
                },
                navigation: {
                    nextEl: this.elements.nextBtn,
                    prevEl: this.elements.prevBtn
                }
            },
            sliderInstance: null
        };


        this.initialize();
    }

    initialize() {
        this.state.sliderInstance = new Swiper(this.elements.container, this.state.options);
    }
}

export default PressCenterNewsSlider;