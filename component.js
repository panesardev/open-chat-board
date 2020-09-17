const { exec } = require('child_process');

/*
Structure of your command should be :
node component test <component-name> <component-name> ...

To skip tests
node component no-test <component-name> <component-name> ...
*/

let args = process.argv;

args.shift();
args.shift();
const tests = args.shift();

if (tests === 'no-test')
    args = args.map(arg => `ng g c ${arg} --skipTests`);
else if (tests === 'test')
    args = args.map(arg => `ng g c ${arg}`);
else 
    throw Error('Unexpected Arguments');

let cmd = args[0];

if (args.length !== 1)
    cmd = args.join(' && ');

exec(cmd, (error, stdout, stderr) => {
    if (error)
        console.log(`error: ${error.message}`);
    if (stderr)
        console.log(`stderr: ${stderr}`);

    console.log(`stdout: ${stdout}`);
});