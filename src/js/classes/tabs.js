class Tabs {
    constructor(element) {
        this.elements = {
            tabItems: Array.from(element.querySelectorAll('.tabs__content-item')),
            tabButtons: Array.from(element.querySelectorAll('.tabs__navigation-btn')).concat(Array.from(element.querySelectorAll('.tabs__navigation-more-menu-link')))
        };


        if (this.elements.tabItems.length !== this.elements.tabButtons.length) {
            console.error('Not equal amount of elements provided');
            return;
        }

        this.setListeners();
        this.setActiveTab(0);
    }

    setActiveTab(index) {
        const { tabItems, tabButtons } = this.elements;
        tabItems.forEach(item => item.classList.remove('active'));
        tabButtons.forEach(item => item.classList.remove('active'));
        tabItems[index].classList.add('active');
        tabButtons[index].classList.add('active');
    }

    setListeners() {
        const { tabButtons } = this.elements;

        tabButtons.forEach((btn, btnIndex) => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                this.setActiveTab(btnIndex);
            })
        })
    }
}

export default Tabs;
