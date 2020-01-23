import Swiper from "swiper"

class PhotoSlider {
    constructor(element) {
        this.elements = {
            mainContainer: element.querySelector('.photo-slider__main .swiper-container'),
            thumbsContainer: element.querySelector('.photo-slider__thumbs .swiper-container')
        }
        this.state = {
            mainSliderOptions: {
                thumbs: {},
                spaceBetween: 20,
                watchOverflow: true
            },
            thumbsSliderOptions: {
                slidesPerView: 'auto',
                spaceBetween: 10,
                threshold: 10,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
            },
            sliderInstance: null
        }


        this.initialize();
    }


    initialize() {


        console.log(this.state);
        console.log(this.elements);
        this.state.mainSliderOptions.thumbs.swiper = new Swiper(this.elements.thumbsContainer, this.state.thumbsSliderOptions);
        this.state.sliderInstance = new Swiper(this.elements.mainContainer, this.state.mainSliderOptions);



      
    }
}


export default PhotoSlider;