const matchesSelector = (node, selector) => {
    try {
        return node.matches.call(node, selector);
    } catch (error) {
        return false;
    }
};

export default () => {
    const focusMarker = document.querySelector('#focus-marker');
    const removeFocusMarker = () => {
        if (document.body.contains(focusMarker)) {
            focusMarker.style.removeProperty('transform');
            focusMarker.style.removeProperty('width');
            focusMarker.style.removeProperty('height');
            focusMarker.style.opacity = 0;
        }
    };
    window.addEventListener('blur', removeFocusMarker, true);
    const addFocusMarker = (e) => {
        if (!(e.target instanceof HTMLElement) || !matchesSelector(e.target, ':focus-visible')) {
            return;
        }
        const rect = e.target.getBoundingClientRect();
        focusMarker.dataset.width = Math.ceil(rect.width);
        focusMarker.dataset.height = Math.ceil(rect.height);
        focusMarker.style.opacity = 1;
        focusMarker.style.transform = `translate(${Math.round(rect.left)}px, ${Math.round(rect.top)}px)`;
        focusMarker.style.width = `${Math.round(rect.width)}px`;
        focusMarker.style.height = `${Math.round(rect.height)}px`;
    };
    window.addEventListener('focus', addFocusMarker, true);
    // @todo, fix viewport resize issues
};
