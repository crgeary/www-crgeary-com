const path = require('path');
const fs = require('fs-extra');
const recursive = require('recursive-readdir');

(async () => {
    const paths = {
        content: path.resolve(process.cwd(), 'src/content'),
        dist: path.resolve(process.cwd(), 'dist'),
    };

    const files = await recursive(paths.content, ['!*.html']);

    for (let i = 0; i < files.length; i++) {
        let slug = files[i].replace(new RegExp(`${paths.content}/(.+)(?:.js|.html)$`), '$1');
        await fs.copy(
            files[i],
            path.join(paths.dist, slug === '404' ? '404.html' : path.join(slug === 'index' ? '' : slug, 'index.html'))
        );
    }
})();
