import '../sass/main.scss';

(function () {
    const switchTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
    };
    document.addEventListener('DOMContentLoaded', () => {
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
        const themeSwitch = document.querySelector('#theme-switch');
        if (themeSwitch) {
            const { body } = document;
            themeSwitch.addEventListener('click', () => {
                const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                window.localStorage.setItem('color-scheme', newTheme);
                switchTheme(newTheme);
                // @todo: update #theme-switch with relevant theme info
            });
        }
    });
})();
