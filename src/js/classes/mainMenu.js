class MainMenu {
    constructor(element) {
        this.elements = {
            nav: element.querySelector('.main-nav'),
            navOpen: element.querySelector('.page-header__burger-btn'),
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
            if (this.state.open) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        });
    }

    openMenu() {
        this.elements.nav.classList.add('shown');
        this.elements.navOpen.classList.add('active');
        this.setState({
            open: true
        });
    }


    closeMenu() {
        this.elements.nav.classList.remove('shown');
        this.elements.navOpen.classList.remove('active');
        this.setState({
            open: false
        });
    }
}

export default MainMenu;
