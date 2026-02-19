const https = require('https');

const apiKey = "$2y$10$eXEGjayONqLhdcuSQ3SD11ei3FEyh2WF96c3I0AH05zgPb3h7Sjm";
const encodedKey = encodeURIComponent(apiKey);

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data }));
        }).on('error', reject);
    });
}

async function test() {
    console.log("Testing raw key...");
    // Node https sends raw string if not encoded manually
    const resRaw = await makeRequest(`https://hadithapi.com/api/books?apiKey=${apiKey}`);
    console.log("Raw Status:", resRaw.status);

    console.log("Testing encoded key...");
    const resEnc = await makeRequest(`https://hadithapi.com/api/books?apiKey=${encodedKey}`);
    console.log("Encoded Status:", resEnc.status);
    // console.log("Encoded Data prefix:", resEnc.data.substring(0, 50));
}

test();
