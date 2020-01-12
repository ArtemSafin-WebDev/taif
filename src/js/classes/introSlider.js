import Swiper from 'swiper';

class IntroSlider {
    constructor(element) {
        if (!element) {
            throw new ReferenceError('No element provided');
        }

        this.elements = {
            root: element,
            backgrounds: Array.from(element.querySelectorAll('.intro-slider__backgrounds-list-item')),
            navigation: Array.from(element.querySelectorAll('.intro-slider__navigation-link')),
            innerSliderWrappers: Array.from(element.querySelectorAll('.intro-slider__inner-slider-wrapper')),
            contentSlides: Array.from(element.querySelectorAll('.intro-slider__contents-list-item'))
        };

        if (this.elements.backgrounds.length !== this.elements.navigation.length) {
            throw new Error('Number of elements must be equal');
        }

        this.state = {
            timer: null,
            activeIndex: 0,
            slidesCount: this.elements.backgrounds.length,
            autoplaySpeed: 6000,
            autoplay: true,
            autoplayAfterClick: false,
            innerSliders: [],
            innerSliderOptions: {
                watchOverflow: true,
                slidesPerView: 'auto',
                spaceBetween: 15,
                longSwipesRatio: 0.2,
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                breakpoints: {
                    769: {
                        spaceBetween: 30
                    },
                    969: {
                        spaceBetween: 60
                    }
                }
            }
        };

        this.initInnerSliders();
        this.changeSlide(this.state.activeIndex);
        this.handleAutoplay();
        this.bindClickListeners();
    }

    initInnerSliders() {
        const { innerSliderWrappers } = this.elements;
        innerSliderWrappers.forEach((element, elementIndex) => {
            const container = element.querySelector('.swiper-container');
            const options = {
                ...this.state.innerSliderOptions,
                navigation: {
                    nextEl: element.querySelector('.intro-slider__inner-slider-button--next'),
                    prevEl: element.querySelector('.intro-slider__inner-slider-button--prev')
                },
                pagination: {
                    el: element.querySelector('.intro-slider__inner-slider-pagination'),
                    type: 'bullets',
                    clickable: true
                }
            };

            const swiperInstance = new Swiper(container, options);

            swiperInstance.on('touchMove', () => {
                this.changeSlide.call(this, elementIndex);
            });

            this.state.innerSliders.push(swiperInstance);
        });
    }

    clearActive() {
        const { backgrounds, contentSlides } = this.elements;
        backgrounds.forEach(element => element.classList.remove('active'));
        contentSlides.forEach(element => element.classList.remove('active'));
    }

    clearNavTransitions() {
        const { navigation } = this.elements;
        navigation.forEach(nav => {
            nav.classList.remove('current');
            nav.classList.remove('active');
        });
    }

    setCurrentNavTransition() {
        const { activeIndex } = this.state;
        const { navigation } = this.elements;

        this.clearNavTransitions();

        navigation[activeIndex].classList.add('current');
    }

    bindClickListeners() {
        const { navigation } = this.elements;
        navigation.forEach((btn, btnIndex) => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                this.changeSlide(btnIndex);
            });
        });
    }

    handleAutoplay() {
        if (!this.state.autoplay) return;

        const { autoplaySpeed } = this.state;

        this.setCurrentNavTransition();

        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.state.timer = null;
        }

        this.state.timer = setInterval(() => {
            this.changeSlide();
            this.setCurrentNavTransition();
        }, autoplaySpeed);
    }

    changeSlide(newIndex) {
        const { activeIndex, slidesCount, timer } = this.state;
        const { backgrounds, navigation, contentSlides } = this.elements;
        this.clearActive();

        if (typeof newIndex === 'undefined') {
            if (activeIndex < slidesCount - 1) {
                this.state.activeIndex++;
            } else {
                this.state.activeIndex = 0;
            }
        } else {
            this.state.activeIndex = newIndex;
            if (this.state.autoplayAfterClick) {
                this.handleAutoplay();
            } else {
                if (timer) {
                    clearInterval(timer);
                    this.state.timer = null;
                }
                this.clearNavTransitions();
                navigation[this.state.activeIndex].classList.add('active');
            }
        }

        backgrounds[this.state.activeIndex].classList.add('active');
        contentSlides[this.state.activeIndex].classList.add('active');
    }
}

export default IntroSlider;
