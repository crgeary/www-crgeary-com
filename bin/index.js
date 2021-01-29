const { program } = require('commander');

const buildCommand = require('../generator/commands/build');

program
    .command(`build`)
    .description(`Build a production copy`)
    .action(async () => await buildCommand());

// @todo, create a development server
// program
//     .command(`watch`)
//     .description(`Start a development server`)
//     .action(async () => {
//         await run(server);
//     });

program.parse(process.argv);
