const fs = require('fs');

const printIntro = () => {
    const intro = fs.readFileSync('./assets/hello.txt', 'utf8');
    console.log(intro);
}

const printOutro = () => {
    const outro = fs.readFileSync('./assets/goodbye.txt', 'utf8');
    console.log(outro);
}

module.exports.printIntro = printIntro;
module.exports.printOutro = printOutro;