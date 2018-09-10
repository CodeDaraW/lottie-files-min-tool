const fs = require('fs');
const meow = require('meow');

const info = `
    Usage
      $ lottiemin <file> <output>

    Examples
      $ lottiemin data.json data-min.json
`;

const config = {
    autoHelp: true,
    autoVersion: true,
};

const cli = meow(info, config);

const read = path => new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
        if (err) reject(err);
        resolve(data);
    });
});

const write = (path, data) => new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
        if (err) reject(err);
        resolve();
    });
});

module.exports = {
    cli,
    read,
    write,
};
