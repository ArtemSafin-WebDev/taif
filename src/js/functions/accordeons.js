function openAccordeon(element) {
    element.style.maxHeight = 'none';
    element.style.overflow = 'visible';
    const computedStyle = getComputedStyle(element);
    const computedHeight = computedStyle.height;

    const offsetHeight = element.offsetHeight;
    element.style.maxHeight = '';
    element.style.overflow = '';
    
    console.log('Offset height', offsetHeight);

    setTimeout(() => {
        element.style.maxHeight = `${computedHeight}`;
    }, 20);
}

function closeAccordeon(element) {
    element.style.maxHeight = '';
    element.style.overflow = '';
}

export { openAccordeon, closeAccordeon };
