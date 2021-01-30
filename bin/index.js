const { program } = require('commander');

program
    .command(`build`)
    .description(`Build a production copy`)
    .action(async () => await require('../generator/commands/build')());

program
    .command(`watch`)
    .description(`Start a development server`)
    .action(async () => await require('../generator/commands/watch')());

program.parse(process.argv);
