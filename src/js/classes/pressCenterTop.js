class PressCenterTop {
    constructor(element) {
        this.elements = {
            root: element,
            backgroundSlides: Array.from(element.querySelectorAll('.press-center-top__background-slider-item')),
            contentSlides: Array.from(element.querySelectorAll('.press-center-top__content-slider-list-item')),
            navigationBtns: Array.from(element.querySelectorAll('.press-center-top__content-slider-navigation-card'))
        };

        this.state = {
            activeIndex: 0,
            navigationDisabled: false,
            freezeDuratuion: 1000,
            freezeTimer: null
        };

        this.initialize();
    }

    changeSlide(index) {
        const { contentSlides, backgroundSlides, navigationBtns } = this.elements;
        contentSlides.forEach(element => element.classList.remove('active'));
        backgroundSlides.forEach(element => element.classList.remove('active'));
        navigationBtns.forEach(element => element.classList.remove('active'));

        contentSlides[index].classList.add('active');
        backgroundSlides[index].classList.add('active');
        navigationBtns[index].classList.add('active');

        this.state.activeIndex = index;

        if (this.state.freezeTimer) {
            clearTimeout(this.state.freezeTimer);
            this.state.freezeTimer = null;
        }
        this.elements.root.classList.add('navigation-disabled');
        this.state.freezeTimer = setTimeout(() => {
            this.elements.root.classList.remove('navigation-disabled');
        }, this.state.freezeDuratuion);
    }

    initialize() {
        const { navigationBtns } = this.elements;
        navigationBtns.forEach((btn, btnIndex) => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                if (this.elements.root.classList.contains('navigation-disabled')) {
                    console.log('navigation was disabled at that moment');
                    return;
                }
                this.changeSlide(btnIndex);
            });
        });

        this.changeSlide(this.state.activeIndex);
    }
}

export default PressCenterTop;
