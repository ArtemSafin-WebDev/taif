import IntroSlider from './classes/introSlider';

export default function() {
    const introSliders = Array.from(document.querySelectorAll('.js-intro-slider'));
    introSliders.forEach(element => new IntroSlider(element));
}
