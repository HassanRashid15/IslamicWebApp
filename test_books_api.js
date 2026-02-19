const https = require('https');

const apiKey = "$2y$10$eXEGjayONqLhdcuSQ3SD11ei3FEyh2WF96c3I0AH05zgPb3h7Sjm";
const url = `https://hadithapi.com/api/books?apiKey=${apiKey}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log("Status Code:", res.statusCode);
        console.log("Headers:", res.headers);
        console.log("Response Body:", data);
        try {
            const parsed = JSON.parse(data);
            console.log("Parsed JSON:", JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.error("JSON Parse Error:", e.message);
        }
    });
}).on('error', (err) => {
    console.error("Request Error:", err.message);
});
