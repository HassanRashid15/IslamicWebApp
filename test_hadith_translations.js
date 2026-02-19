const https = require('https');
const apiKey = "$2y$10$eXEGjayONqLhdcuSQ3SD11ei3FEyh2WF96c3I0AH05zgPb3h7Sjm";
async function makeRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
        }).on('error', (err) => { reject(err); });
    });
}
async function test() {
    const langs = ['turkish', 'bengali', 'indonesian', 'english'];
    for (const l of langs) {
        const url = `https://hadithapi.com/api/hadiths?apiKey=${apiKey}&book=sahih-bukhari&translation=${l}&limit=1`;
        const res = await makeRequest(url);
        const h = res.hadiths.data[0];
        console.log(l + " EN: " + h.hadithEnglish.substring(0, 30));
    }
}
test();
