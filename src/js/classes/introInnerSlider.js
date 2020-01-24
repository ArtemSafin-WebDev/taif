class IntroInnerSlider {
    constructor(element) {
        this.elements = {
            slides: Array.from(element.querySelectorAll('.inner-slider__slide')),
            wrapper: element.querySelector('.inner-slider__wrapper')
        };

        this.state = {
            activeSlideIndex: 0,
            sizes: {}
        };

        if (this.elements.slides > 0) this.initialize();
    }

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
        console.log('New state', this.state);
    }

    handleResize() {}

    calculateSizes() {
        const wrapperStyles = window.getComputedStyle(this.elements.wrapper);
        const slideStyles = window.getComputedStyle(this.elements.slides[0]);

        this.setState({
            sizes: {
                wrapperWidth: wrapperStyles.width,
                slideWidth: slideStyles.width,
                slideMarginRight: slideStyles.marginRight
            }
        });
    }

    bindListeners() {}

    initialize() {
        this.calculateSizes();
    }

    destroy() {
        
    }
}

export default IntroInnerSlider;
