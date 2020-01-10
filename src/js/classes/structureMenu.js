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
    }

    closeMenu() {
        this.elements.menu.classList.remove('active');
    }
}

export default StructureMenu;