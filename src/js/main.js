import polyfills from './polyfills';
import detectTouch from './detectTouch';
import mainMenu from './mainMenu';
import introSlider from './introSlider';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    mainMenu();
    introSlider();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
})
