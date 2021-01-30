const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const express = require('express');
const webpackConfig = require('../webpack.config.dev');

const compiler = webpack(webpackConfig);

const paths = {
    content: path.resolve(process.cwd(), 'src/content'),
    views: path.resolve(process.cwd(), 'src/views'),
    dist: path.resolve(process.cwd(), 'dist'),
};

const convertRequestPathToContentPath = (requestPath) => {
    let slug = requestPath
        .replace(/\/index\.html$/, '')
        .replace(/\.html$/, '')
        .replace(/\/$/, '');
    return path.join(paths.content, `${slug === '' ? 'index' : slug}.html`);
};

module.exports = async () => {
    const app = express();
    app.use(require('webpack-dev-middleware')(compiler));
    app.use(require('webpack-hot-middleware')(compiler));
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store');
        next();
    });
    app.get('*', async (req, res) => {
        const attemptedPath = convertRequestPathToContentPath(req.path);
        console.log(attemptedPath);
        if (await fs.exists(attemptedPath)) {
            const layout = await fs.readFile(path.join(paths.views, 'layout.html'), 'utf8');
            const content = await fs.readFile(attemptedPath, 'utf8');
            return res.send(layout.replace(/{{\s*main\s*}}/, content));
        }
        res.status(404).send('Not Found');
    });
    app.listen(3000, () => {
        console.log(`Server: http://localhost:3000/`);
    });
};
