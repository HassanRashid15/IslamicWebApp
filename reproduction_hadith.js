const https = require('https');

const apiKey = "$2y$10$eXEGjayONqLhdcuSQ3SD11ei3FEyh2WF96c3I0AH05zgPb3h7Sjm";

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    console.log("Raw Response during JSON parse error:", data);
                    reject(e);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function test() {
    try {
        console.log("Fetching books...");
        const booksUrl = `https://hadithapi.com/api/books?apiKey=${apiKey}`;
        const booksRes = await makeRequest(booksUrl);

        if (!booksRes.books) {
            console.error("No books found in response:", booksRes);
            return;
        }

        console.log(`Found ${booksRes.books.length} books.`);

        for (const book of booksRes.books) {
            console.log(`Testing book: ${book.bookSlug}...`);
            const hadithUrl = `https://hadithapi.com/api/hadiths?apiKey=${apiKey}&book=${book.bookSlug}&limit=1`;
            try {
                const hadithRes = await makeRequest(hadithUrl);
                if (hadithRes.hadiths && hadithRes.hadiths.data && hadithRes.hadiths.data.length > 0) {
                    console.log(`  SUCCESS: Fetching from ${book.bookSlug} worked.`);
                } else {
                    console.error(`  FAILURE: Fetching from ${book.bookSlug} returned unexpected structure.`, hadithRes);
                }
            } catch (e) {
                console.error(`  ERROR: Failed to fetch for ${book.bookSlug}`, e.message);
            }
        }
        console.log("Finished testing all books.");

    } catch (error) {
        console.error("Error:", error);
    }
}

test();
