#!/usr/bin/env node
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

const { cli, read, write } = require('./util');

const minPngConfig = {
    use: [
        imageminPngquant(),
    ],
};

const minPng = (source) => {
    const bufferData = Buffer.from(source, 'base64');
    return imagemin
        .buffer(bufferData, minPngConfig)
        .then(res => res.toString('base64'));
};

const main = async (params) => {
    const [sourceFilePath, outputFilePath] = params;
    const file = await read(sourceFilePath);
    const data = JSON.parse(file);

    /* eslint-disable no-plusplus */
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < data.assets.length; i++) {
        const item = data.assets[i];
        if (item.p) {
            const source = item.p.replace(/data:image\/png;base64,/, '');
            const result = await minPng(source);
            item.p = `data:image/png;base64,${result}`;
        }
    }

    await write(outputFilePath, JSON.stringify(data));
    console.log('🎉  Success!');
};

if (cli.input.length === 0) {
    console.error('⚠️  Please specify file path!');
    process.exit(1);
}

try {
    main(cli.input);
} catch (err) {
    console.error(err);
}
