class PressCenterTop {
    constructor(element) {
        this.elements = {
            backgroundSlides: Array.from(element.querySelectorAll('.press-center-top__background-slider-item')),
            contentSlides: Array.from(element.querySelectorAll('.press-center-top__content-slider-list-item')),
            navigationBtns: Array.from(element.querySelectorAll('.press-center-top__content-slider-navigation-card'))
        };

        this.state = {
            activeIndex: 0
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
    }

    initialize() {
        const { navigationBtns } = this.elements;
        navigationBtns.forEach((btn, btnIndex) => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                this.changeSlide(btnIndex);
            });
        });

        this.changeSlide(this.state.activeIndex);
    }
}

export default PressCenterTop;
