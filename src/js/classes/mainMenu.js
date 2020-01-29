import { openAccordeon, closeAccordeon } from '../functions/accordeons';
import { lockScroll, unlockScroll } from '../functions/scrollBlocker';
import MOBILE_WIDTH from '../constants/mobileWidth';
import detectIt from 'detect-it';

class MainMenu {
    constructor(element) {
        this.elements = {
            nav: element.querySelector('.main-nav'),
            navOpen: element.querySelector('.page-header__burger-btn'),
            navClose: element.querySelector('.main-nav__mobile-top-row-menu-close'),
            submenuLinks: Array.from(element.querySelectorAll('.main-nav__link--has-submenu'))
        };

        this.state = {
            open: false
        };

        this.bindEventListeners();
    }

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
    }

    bindEventListeners() {
        this.elements.navOpen.addEventListener('click', event => {
            event.preventDefault();
            this.openMenu();
        });
        this.elements.navClose.addEventListener('click', event => {
            event.preventDefault();
            this.closeMenu();
        });

        this.elements.submenuLinks.forEach(link => {
            link.addEventListener('click', event => {
                if (detectIt.hasTouch) event.preventDefault();
                if (!window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
                    return;
                }

                const content = link.nextElementSibling;

                if (!content) return;

                if (link.classList.contains('active')) {
                    closeAccordeon(content);
                } else {
                    openAccordeon(content);
                }

                link.classList.toggle('active');
            });
        });
    }

    openMenu() {
        this.elements.nav.classList.add('shown');
        this.elements.navOpen.classList.add('active');
        lockScroll(this.elements.nav, window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches);
        this.setState({
            open: true
        });
    }

    closeMenu() {
        this.elements.nav.classList.remove('shown');
        this.elements.navOpen.classList.remove('active');
        unlockScroll(this.elements.nav);
        this.setState({
            open: false
        });
    }
}

export default MainMenu;
