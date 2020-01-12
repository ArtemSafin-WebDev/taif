
import { lockScroll, unlockScroll } from '../functions/scrollBlocker';

class StructureMenu {
    constructor(element) {
        this.elements = {
            root: element,
            menu: element.querySelector('.page-header__company-structure-menu'),
            openBtn: element.querySelector('.page-header__company-structure'),
            closeBtn: element.querySelector('.page-header__company-structure-menu-close')
        };

        this.setupListeners();
    }

    setupListeners() {
        this.elements.openBtn.addEventListener('click', this.openMenu.bind(this));
        this.elements.closeBtn.addEventListener('click', this.closeMenu.bind(this));
    }

    openMenu() {
        this.elements.menu.classList.add('active');
        lockScroll(this.elements.menu, window.matchMedia("(max-width: 768px)").matches);
    }

    closeMenu() {
        this.elements.menu.classList.remove('active');
        unlockScroll();
    }
}

export default StructureMenu;