import '../sass/main.scss';

(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const themeSwitch = document.querySelector('#theme-switch');
        const switchTheme = (theme) => {
            document.body.setAttribute('data-theme', theme);
            if (themeSwitch) {
                themeSwitch.setAttribute('aria-checked', theme === 'dark');
            }
        };
        const themeMQ = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = window.localStorage.getItem('color-scheme');
        if (currentTheme === 'dark' || currentTheme === 'light') {
            switchTheme(currentTheme === 'dark' ? 'dark' : 'light');
        } else {
            switchTheme(themeMQ.matches ? 'dark' : 'light');
            themeMQ.addEventListener('change', (e) => {
                switchTheme(e.matches ? 'dark' : 'light');
            });
        }
        if (themeSwitch) {
            const { body } = document;
            themeSwitch.addEventListener('click', () => {
                const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                window.localStorage.setItem('color-scheme', newTheme);
                switchTheme(newTheme);
            });
        }
    });

    const matchesSelector = (node, selector) => {
        try {
            return node.matches.call(node, selector);
        } catch (error) {
            return false;
        }
    };

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
})();
