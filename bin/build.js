const path = require('path');

const fs = require('fs-extra');
const recursive = require('recursive-readdir');
const webpack = require('webpack');
const webpackConfig = require('./configs/webpack.config');

(async () => {
    const paths = {
        content: path.resolve(process.cwd(), 'src/content'),
        views: path.resolve(process.cwd(), 'src/views'),
        dist: path.resolve(process.cwd(), 'dist'),
    };

    webpack(webpackConfig, async (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }
        const info = stats.toJson();
        if (stats.hasErrors()) {
            console.error(info.errors);
        }
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
        const files = await recursive(paths.content, ['!*.html']);
        const layout = await fs.readFile(path.join(paths.views, 'layout.html'), 'utf8');
        for (let i = 0; i < files.length; i++) {
            let slug = files[i].replace(new RegExp(`${paths.content}/(.+)(?:.html)$`), '$1');
            const content = await fs.readFile(files[i], 'utf8');
            await fs.outputFile(
                path.join(
                    paths.dist,
                    slug === '404' ? '404.html' : path.join(slug === 'index' ? '' : slug, 'index.html')
                ),
                layout.replace(/{{\s*main\s*}}/, content)
            );
        }
    });
})();
