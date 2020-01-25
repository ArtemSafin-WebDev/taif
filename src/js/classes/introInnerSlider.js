class IntroInnerSlider {
    constructor(element) {
        this.elements = {
            slides: Array.from(element.querySelectorAll('.inner-slider__slide')),
            wrapper: element.querySelector('.inner-slider__wrapper')
        };

        this.state = {
            activeSlideIndex: 0,
            sizes: {},
            maxOverlayDepth: 2
        };

        if (this.elements.slides.length > 0) this.initialize();

        setTimeout(() => {
            this.changeSlide(1);
            setTimeout(() => {
                this.changeSlide(2);
            }, 2000);
        }, 2000);
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
                wrapperWidth: parseInt(wrapperStyles.width, 10),
                slideWidth: parseInt(slideStyles.width, 10),
                slideMarginRight: parseInt(slideStyles.marginRight, 10)
            }
        });
    }

    changeSlide(index) {
        const { slides } = this.elements;
        let direction = index > this.state.activeIndex ? 1 : -1;

        slides.forEach((slide, slideIndex) => {
            slide.classList.remove('prev');

            slide.style.transform = '';
            slide.style.opacity = '';

            if (slideIndex < index) {
                slide.classList.add('prev');
                let depthLevel = index - slideIndex;
                console.log('Depth level', depthLevel);

                if (depthLevel > this.state.maxOverlayDepth) {
                    depthLevel = this.state.maxOverlayDepth;
                    slide.style.opacity = '0';
                }

                const slideOffset = slideIndex * (this.state.sizes.slideWidth + this.state.sizes.slideMarginRight);

                slide.style.transform = `translateX(${-(slideOffset + 20 * depthLevel)}px) scale(${Math.pow(0.95, depthLevel)})`;
            } else {
                const slideOffset = index * (this.state.sizes.slideWidth + this.state.sizes.slideMarginRight);

                slide.style.transform = `translateX(${direction * slideOffset}px)`;
            }

            this.state.activeSlideIndex = index;
        });
    }

    bindListeners() {}

    initialize() {
        console.log('Initializing');
        this.calculateSizes();
    }

    destroy() {}
}

export default IntroInnerSlider;
