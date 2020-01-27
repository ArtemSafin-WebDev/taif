import debounce from '../functions/debounce';

class CardSlider {
    constructor(element) {
        this.elements = {
            slides: Array.from(element.querySelectorAll('.card-slider__slide')),
            wrapper: element.querySelector('.card-slider__wrapper'),
            prevButton: element.querySelector('.card-slider__button--prev'),
            nextButton: element.querySelector('.card-slider__button--next'),
            pagination: element.querySelector('.card-slider__pagination')
        };

        this.state = {
            activeSlideIndex: 0,
            maxOverlayDepth: 2,
            mouseDown: false,
            startX: 0,
            startY: 0,
            moveX: 0,
            startY: 0,
            prevCardsScaleFactor: 0.95,
            prevCardsOpacityFactor: 0.85,
            changeOpacityOnPreviousCards: true,
            slidesInitialTranslateValues: [],
            pagination: true,
            clicksBlocked: false,
            callbacks: {
                slideChange: [],
                dragStart: []
            }
        };

        if (this.elements.slides.length > 1) this.initialize();
    }

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
    }

    on(event, callback) {
        if (this.state.callbacks.hasOwnProperty(event)) {
            this.state.callbacks[event].push(callback);
        } else {
            console.error('No such event available');
        }
        this.state.callback;
    }

    

    handleClicksInsideSlide(event, index) {
        if (this.state.clicksBlocked) event.preventDefault();
        if (!this.state.clicksBlocked) this.changeSlide(index);
        this.state.clicksBlocked = false;
    }

    createPagination() {
        if (this.state.pagination || this.elements.pagination) {
            this.elements.slides.forEach((slide, slideIndex) => {
                const bullet = document.createElement('a');
                bullet.className = 'card-slider__pagination-bullet';
                bullet.href = '#';
                if (slideIndex === this.state.activeSlideIndex) {
                    bullet.classList.add('active');
                }
                bullet.addEventListener('click', event => {
                    event.preventDefault();
                    this.changeSlide(slideIndex);
                });
                this.elements.pagination.appendChild(bullet);
            });
        }
    }

    updatePagination() {
        if (this.state.pagination || this.elements.pagination) {
            const paginationBullets = Array.from(this.elements.pagination.children);
            paginationBullets.forEach((bullet, bulletIndex) => {
                bullet.classList.remove('active');
                if (bulletIndex === this.state.activeSlideIndex) {
                    bullet.classList.add('active');
                }
            });
        }
    }

    handleResize() {
        this.update();
    }

    calculateSizes() {
        const wrapperStyles = window.getComputedStyle(this.elements.wrapper);
        const slideStyles = window.getComputedStyle(this.elements.slides[0]);
        this.setState({
            sizes: {
                wrapperWidth: parseInt(wrapperStyles.width, 10),
                slideWidth: parseInt(slideStyles.width, 10),
                slideMarginRight: parseInt(slideStyles.marginRight, 10)
            },
            threshold: parseInt(wrapperStyles.width, 10) * 0.3,
            cardOffset: parseInt(slideStyles.width, 10) * 0.025
        });
    }

    changeSlide(index) {
        const { slides } = this.elements;
        const { callbacks, changeOpacityOnPreviousCards, prevCardsOpacityFactor, prevCardsScaleFactor } = this.state;
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
                slide.style.transform = `translateX(${-(slideOffset + this.state.cardOffset * depthLevel)}px) scale(${Math.pow(prevCardsScaleFactor, depthLevel)})`;
                slide.style.opacity = `${Math.pow(changeOpacityOnPreviousCards ? prevCardsOpacityFactor : 1, depthLevel)}`;
            } else {
                const slideOffset = index * (this.state.sizes.slideWidth + this.state.sizes.slideMarginRight);
                slide.style.transform = `translateZ(0) translateX(${direction * slideOffset}px)`;
                if (slideIndex === index) {
                    slide.classList.add('current');
                } else {
                    slide.classList.add('next');
                }
            }
        });
        this.state.activeSlideIndex = index;
        callbacks.slideChange.forEach(cb => {
            console.log('Slidechange callback run', cb);
            cb();
        });
        this.handleArrowsActivity();
        this.updatePagination();
    }

    handleArrowsActivity() {
        const { slides, prevButton, nextButton } = this.elements;
        const { activeSlideIndex } = this.state;
        const slidesCount = slides.length;
        prevButton.classList.remove('disabled');
        nextButton.classList.remove('disabled');
        if (activeSlideIndex + 1 >= slidesCount) {
            nextButton.classList.add('disabled');
        }
        if (activeSlideIndex - 1 < 0) {
            prevButton.classList.add('disabled');
        }
    }

    prevSlide() {
        const { activeSlideIndex } = this.state;
        const nextSlideIndex = activeSlideIndex - 1;
        if (nextSlideIndex < 0) return;
        this.changeSlide(nextSlideIndex);
    }

    nextSlide() {
        const { activeSlideIndex } = this.state;
        const { slides } = this.elements;
        const nextSlideIndex = activeSlideIndex + 1;
        if (nextSlideIndex >= slides.length) return;
        this.changeSlide(nextSlideIndex);
    }

    getCurrentTranslateValue(element) {
        const styles = window.getComputedStyle(element);
        const matrix = new WebKitCSSMatrix(styles.transform);
        return matrix.m41;
    }

    dragStart(event) {
        if (event.type === 'mousedown') event.preventDefault();
        const { callbacks } = this.state;
        const { slides, wrapper } = this.elements;
        let startX;
        let startY;
        if (event.type === 'touchmove') {
            const touch = event.targetTouches[0] || event.changedTouches[0];
            startX = touch.pageX;
            startY = touch.pageY;
        } else {
            startX = event.pageX;
            startY = event.pageY;
        }
        wrapper.classList.add('dragging');
        this.setState({
            mouseDown: true,
            slidesInitialTranslateValues: slides.map(slide => this.getCurrentTranslateValue(slide)),
            startX,
            startY
        });
        callbacks.dragStart.forEach(cb => cb());
    }

    dragMove(event) {
        if (event.type === 'mousemove') event.preventDefault();
        if (!this.state.mouseDown) return;
        const { startX, startY, slidesInitialTranslateValues } = this.state;
        const { slides } = this.elements;
        let moveX;
        let moveY;
        if (event.type === 'touchmove') {
            const touch = event.targetTouches[0] || event.changedTouches[0];
            moveX = touch.pageX;
            moveY = touch.pageY;
        } else {
            moveX = event.pageX;
            moveY = event.pageY;
        }
        this.setState({
            moveX,
            moveY
        });
        const offsetX = moveX - startX;
        const directionX = offsetX > 0 ? 'right' : 'left';

        slides.forEach((slide, slideIndex) => {
            const initialTranslateValue = slidesInitialTranslateValues[slideIndex];
            const resultingOffset = initialTranslateValue + offsetX;
            if (slide.classList.contains('current')) {
                if (directionX === 'right') {
                    slide.style.transform = `translateZ(0) translateX(${resultingOffset}px)`;
                }
            } else if (slide.classList.contains('next')) {
                slide.style.transform = `translateZ(0) translateX(${resultingOffset}px)`;
            }
        });

        if (Math.abs(offsetX) >= this.state.threshold) {
            this.dragEnd();
            if (directionX === 'right') {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        }
    }

    dragEnd(event) {
        const { wrapper } = this.elements;
        const { startX, moveX } = this.state;
        wrapper.classList.remove('dragging');
        this.setState({
            mouseDown: false,
            startX: 0,
            moveX: 0
        });

        const offset = moveX - startX;
        const direction = offset > 0 ? 'right' : 'left';

        if (typeof event !== 'undefined' && event.type !== 'mouseleave') {
            event.preventDefault();
           
            if (Math.abs(offset) >= this.state.threshold && moveX !== 0) {
                this.dragEnd();
                if (direction === 'right') {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            } else {
                this.changeSlide(this.state.activeSlideIndex);
            }
        }

        if (Math.abs(offset) >= 20 && Math.abs(moveX) >= 20) {
            this.state.clicksBlocked = true;
        }
    }

    handleNextButtonClick(event, type, btn) {
        event.preventDefault();
        if (btn.classList.contains('disabled')) return;
        if (type === 'next') {
            this.nextSlide();
        } else if (type === 'prev') {
            this.prevSlide();
        }
    }

    bindListeners() {
        const { wrapper, nextButton, prevButton, slides } = this.elements;
        wrapper.addEventListener('touchstart', this.dragStart.bind(this));
        wrapper.addEventListener('mousedown', this.dragStart.bind(this));
        wrapper.addEventListener('touchmove', this.dragMove.bind(this));
        wrapper.addEventListener('mousemove', this.dragMove.bind(this));
        wrapper.addEventListener('touchend', this.dragEnd.bind(this));
        wrapper.addEventListener('mouseup', this.dragEnd.bind(this));
        window.addEventListener('resize', debounce(this.handleResize.bind(this), 200));
        nextButton.addEventListener('click', this.handleNextButtonClick.bind(this, event, 'next', nextButton));
        prevButton.addEventListener('click', this.handleNextButtonClick.bind(this, event, 'prev', prevButton));
        slides.forEach((slide, index) => {
            slide.addEventListener('click', event => {
                this.handleClicksInsideSlide(event, index);
            });
        })
    }

    initialize() {
        this.calculateSizes();
        this.changeSlide(this.state.activeSlideIndex);
        this.bindListeners();
        this.createPagination();
    }

    update() {
        this.dragEnd();
        this.calculateSizes();
        this.changeSlide(this.state.activeSlideIndex);
    }
}

export default CardSlider;
