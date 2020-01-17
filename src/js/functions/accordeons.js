function openAccordeon(element) {
    element.style.maxHeight = 'none';
    const computedStyle = getComputedStyle(element);
    const computedHeight = computedStyle.height;
    element.style.maxHeight = '';
    setTimeout(() => {
        const transitionEndHandler = () => {
            console.log('Tranisitionnd Initiated');
            element.style.maxHeight = 'none';
            element.removeEventListener('transitionend', transitionEndHandler);
        };
        element.addEventListener('transitionend', transitionEndHandler);
        element.style.maxHeight = `${computedHeight}`;
    }, 20);
}

function closeAccordeon(element) {
    const computedStyle = getComputedStyle(element);
    const computedHeight = computedStyle.height;
    element.style.maxHeight = `${computedHeight}`;
    setTimeout(() => {
        element.style.maxHeight = '';
    }, 20);
}

export { openAccordeon, closeAccordeon };
