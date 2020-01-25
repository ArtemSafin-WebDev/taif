class IntroInnerSlider {
    constructor(element) {
        this.elements = {
            slides: Array.from(element.querySelectorAll('.inner-slider__slide')),
            wrapper: element.querySelector('.inner-slider__wrapper')
        };

        this.state = {
            activeSlideIndex: 1,
            sizes: {},
            maxOverlayDepth: 2,
            mouseDown: false,
            startX: 0,
            offsetX: 0,
            slidesInitialTranslateValues: [],
            animating: false,
            switchTreshold: 70
        };

        if (this.elements.slides.length > 0) this.initialize();
    }

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
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
            slide.classList.remove('current');
            slide.classList.remove('next');

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
                slide.style.opacity = `${Math.pow(0.6, depthLevel)}`;
            } else {
                const slideOffset = index * (this.state.sizes.slideWidth + this.state.sizes.slideMarginRight);

                slide.style.transform = `translateZ(0) translateX(${direction * slideOffset}px)`;

                if (slideIndex === index) {
                    slide.classList.add('current');
                } else {
                    slide.classList.add('next');
                }
            }

            this.state.activeSlideIndex = index;
        });
    }

    getCurrentTranslateValue(element) {
        const styles = window.getComputedStyle(element);
        const matrix = new WebKitCSSMatrix(styles.transform);
        return matrix.m41;
    }

    dragStart(event) {
        if (this.state.animating) return;
        event.preventDefault();
        const { slides, wrapper } = this.elements;
        let startX;
        if (event.type === 'touchmove') {
            const touch = event.targetTouches[0] || event.changedTouches[0];
            startX = touch.pageX;
        } else {
            startX = event.pageX;
        }
        wrapper.classList.add('dragging');
        this.setState({
            mouseDown: true,
            slidesInitialTranslateValues: slides.map(slide => this.getCurrentTranslateValue(slide)),
            startX
        });
    }

    dragMove(event) {
        event.preventDefault();
        if (!this.state.mouseDown) return;
        const { startX, slidesInitialTranslateValues } = this.state;
        const { slides } = this.elements;
        let moveX;
        if (event.type === 'touchmove') {
            const touch = event.targetTouches[0] || event.changedTouches[0];
            moveX = touch.pageX;
        } else {
            moveX = event.pageX;
        }
        const offset = moveX - startX;
        const direction = offset > 0 ? 'left' : 'right';

        slides.forEach((slide, slideIndex) => {
            const initialTranslateValue = slidesInitialTranslateValues[slideIndex];
            if (!slide.classList.contains('prev')) {
                slide.style.transform = `translateX(${initialTranslateValue + offset}px)`;
            }
        });
    }

    dragEnd(event) {
        event.preventDefault();
        const { wrapper } = this.elements;
        wrapper.classList.remove('dragging');
        this.setState({
            mouseDown: false,
            startX: 0
        });
    }

    bindListeners() {
        const { wrapper } = this.elements;

        wrapper.addEventListener('touchstart', this.dragStart.bind(this));
        wrapper.addEventListener('mousedown', this.dragStart.bind(this));
        wrapper.addEventListener('touchmove', this.dragMove.bind(this));
        wrapper.addEventListener('mousemove', this.dragMove.bind(this));
        wrapper.addEventListener('touchend', this.dragEnd.bind(this));
        wrapper.addEventListener('mouseup', this.dragEnd.bind(this));
        wrapper.addEventListener('mouseleave', this.dragEnd.bind(this));
    }

    initialize() {
        this.calculateSizes();
        this.changeSlide(this.state.activeSlideIndex);
        this.bindListeners();
    }

    destroy() {}
}

export default IntroInnerSlider;
