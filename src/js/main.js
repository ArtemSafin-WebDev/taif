import polyfills from './polyfills';
import detectTouch from './detectTouch';
import IntroSlider from './classes/introSlider';
import PressCenterSlider from './classes/pressCenterSlider';
import StocksCard from './classes/stocksCard';
import StructureMenu from './classes/structureMenu';
import MainMenu from './classes/mainMenu';


document.addEventListener('DOMContentLoaded', function() {
    // Polyfills

    polyfills();

    // Detect touch devices

    detectTouch();


    // Burger menu

    new MainMenu(document.querySelector('.page-header'));

    // Company structure

    new StructureMenu(document.querySelector('.page-header'));

    // Intro sliders

    const introSliders = Array.from(document.querySelectorAll('.js-intro-slider'));
    introSliders.forEach(element => new IntroSlider(element));

    // Press center sliders

    const pressCenterSliders = Array.from(document.querySelectorAll('.js-press-center-slider'));
    pressCenterSliders.forEach(element => new PressCenterSlider(element));

    // Stocks cards

    const stocksCards = Array.from(document.querySelectorAll('.js-stocks-card'));

    stocksCards.forEach(element => new StocksCard(element));


    // Show more cards

    const showMoreCards = Array.from(document.querySelectorAll('.js-show-more-card'));

    showMoreCards.forEach(card => card.parentElement.classList.add('hidden'))

    showMoreCards.forEach(card => card.addEventListener('click', event => {
        event.preventDefault();
        card.parentElement.classList.remove('hidden');
        card.parentElement.style.display = "none";
        
    }));
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
