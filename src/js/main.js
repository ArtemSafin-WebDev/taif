import polyfills from './polyfills';
import detectTouch from './detectTouch';
import IntroSlider from './classes/introSlider';
import PressCenterSlider from './classes/pressCenterSlider';
import StocksCard from './classes/stocksCard';


document.addEventListener('DOMContentLoaded', function() {
    // Polyfills

    polyfills();

    // Detect touch devices

    detectTouch();

    // Intro sliders

    const introSliders = Array.from(document.querySelectorAll('.js-intro-slider'));
    introSliders.forEach(element => new IntroSlider(element));

    // Press center sliders

    const pressCenterSliders = Array.from(document.querySelectorAll('.js-press-center-slider'));
    pressCenterSliders.forEach(element => new PressCenterSlider(element));

    // Stocks cards

    const stocksCards = Array.from(document.querySelectorAll('.js-stocks-card'));

    stocksCards.forEach(element => new StocksCard(element));
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
