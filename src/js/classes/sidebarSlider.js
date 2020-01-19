import Swiper from 'swiper';

class SidebarSlider {
    constructor(element) {
        this.elements = {
            container: element.querySelector('.swiper-container'),
            prevBtn: element.querySelector('.sidebar-slider__controls-btn--prev'),
            nextBtn: element.querySelector('.sidebar-slider__controls-btn--next')
        };

        this.state = {
            swiperInstance: null,
            options: {
                watchOverflow: true,
                autoHeight: true,
                navigation: {
                    nextEl: this.elements.nextBtn,
                    prevEl: this.elements.prevBtn
                }
            }
        };

        this.initialize();
    }

    initialize() {
        this.state.swiperInstance = new Swiper(this.elements.container, this.state.options);
    }
}

export default SidebarSlider;
