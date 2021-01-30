const path = require('path');

const cwd = process.cwd();

module.exports = {
    generator: path.resolve(cwd, 'generator'),
    dist: path.resolve(cwd, 'dist'),
    bin: path.resolve(cwd, 'bin'),
    content: path.resolve(cwd, 'src/content'),
    views: path.resolve(cwd, 'src/views'),
    src: path.resolve(cwd, 'src'),
};
