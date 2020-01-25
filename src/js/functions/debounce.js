function debounce(handler, delay = 100) {
    let timer;
    const debouncedHandler = function() {
        clearTimeout(timer);
        timer = setTimeout(handler, delay);
    }
    return debouncedHandler;
}


export default debounce;