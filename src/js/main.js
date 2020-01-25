import polyfills from './polyfills';
import detectTouch from './detectTouch';
import IntroSlider from './classes/introSlider';
import PressCenterSlider from './classes/pressCenterSlider';
import StocksCard from './classes/stocksCard';
import StructureMenu from './classes/structureMenu';
import MainMenu from './classes/mainMenu';
import PressCenterNewsSlider from './classes/pressCenterNewsSlider';
import SidebarSlider from './classes/sidebarSlider';
import PressCenterTop from './classes/pressCenterTop';
import PhotoSlider from './classes/photoSlider';
import IntroInnerSlider from './classes/introInnerSlider';


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


    // Press center news slider

    const pressCenterNewsSliders = Array.from(document.querySelectorAll('.js-press-center-news-slider'));

    pressCenterNewsSliders.forEach(element => new PressCenterNewsSlider(element));

    // Sidebar sliders

    const sidebarSliders = Array.from(document.querySelectorAll('.js-sidebar-slider'));

    sidebarSliders.forEach(element => new SidebarSlider(element));


    // Press center top

    const pressCenterTops = Array.from(document.querySelectorAll('.js-press-center-top'));
    
    pressCenterTops.forEach(element => {
        new PressCenterTop(element);
    });


    // Photo sliders

    const photoSliders = Array.from(document.querySelectorAll('.js-photo-slider'));

    photoSliders.forEach(element => {
        new PhotoSlider(element);
    })


    // Intro slider

    const innerSliders = Array.from(document.querySelectorAll('.js-inner-slider'));

    innerSliders.forEach(element => new IntroInnerSlider(element));

    // Drag test

    const dragTests = Array.from(document.querySelectorAll('.drag-test'));

    dragTests.forEach(test => {
        let mouseDown = false;
        let startX;
        let moveX;
        let initialTranslate;
        let item = test.querySelector('.drag-test__item');
        const getCurrentTranslate = (element) => {
            const styles = window.getComputedStyle(element);
            const matrix = new WebKitCSSMatrix(styles.transform);
            return matrix.m41;
        }

        const mouseDownHandler = (event) => {
            event.preventDefault();
            mouseDown = true;
            startX = event.pageX;
            initialTranslate = getCurrentTranslate(item);
        }
        const mouseMoveHandler = event => {
            if (!mouseDown) return;
            event.preventDefault();
            moveX = event.pageX;
            console.log(moveX);
            item.style.transform = `translateX(${initialTranslate + moveX - startX}px)`;
        }
        const mouseUpHandler = () => {
            mouseDown = false;
        }

        test.addEventListener('mousedown', mouseDownHandler);
        test.addEventListener('mousemove', mouseMoveHandler);
        test.addEventListener('mouseup', mouseUpHandler);
    })
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
