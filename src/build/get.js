const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const imageFilter = require('./imageFilter');

let token = process.env.DIGITALOCEAN_TOKEN;
if (fs.existsSync(path.join(__dirname, '..', '..', 'config.js'))) {
    const config = require('../../config');
    token = config.token;
}

const get = async url => {
    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
};

const save = async data => {
    await fs.promises.writeFile(path.join(__dirname, `${process.env.IMAGE_TYPE}s.json`), JSON.stringify(data));
};

const main = async () => {
    const results = [];
    let nextPage = `https://api.digitalocean.com/v2/images?page=1&type=${process.env.IMAGE_TYPE}`;
    while (nextPage) {
        const data = await get(nextPage);
        results.push(...data.images);
        nextPage = data.links.pages.next;
    }
    await save(results.filter(imageFilter));
};

main();
