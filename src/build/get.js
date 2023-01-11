/*
Copyright 2022 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const fs = require('fs');
const path = require('path');
const imageFilter = require('./imageFilter');

const fetch = import('node-fetch');

let token = process.env.DIGITALOCEAN_TOKEN;
if (fs.existsSync(path.join(__dirname, '..', '..', 'config.js'))) {
    const config = require('../../config');
    token = config.token;
}

const get = async url => {
    const res = await fetch.then(({ default: run }) => run(url, {
        headers: { Authorization: `Bearer ${token}` },
    }));
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    return await res.json();
};

const save = async data => {
    await fs.promises.writeFile(path.join(__dirname, `${process.env.IMAGE_TYPE}s.json`), JSON.stringify(data, null, 2));
};

const main = async () => {
    if (process.env.STUB_IMAGE_DATA === 'true') {
        await save([]);
        return;
    }

    const results = [];
    let nextPage = `https://api.digitalocean.com/v2/images?page=1&per_page=200&type=${process.env.IMAGE_TYPE}`;
    while (nextPage) {
        const data = await get(nextPage);
        results.push(...data.images);
        nextPage = data.links?.pages?.next;
    }
    await save(results.filter(imageFilter));
};

main().catch(err => {
    console.error(err);
    process.exit(1);
});
