import axios from "axios";

const API_KEY = "$2y$10$eXEGjayONqLhdcuSQ3SD11ei3FEyh2WF96c3I0AH05zgPb3h7Sjm";
const BASE_URL = "https://hadithapi.com/api";

// Book slug mapping to handle invalid API names
const bookSlugMapping = {
    'al-silsila-sahiha': 'sahih-bukhari',
    'musnad-ahmad': 'sahih-bukhari',
    'silsila-sahiha': 'sahih-bukhari',
    'musnad-ahmad-hanbal': 'sahih-bukhari'
};

// Map invalid book slugs to valid ones
const mapBookSlug = (slug) => {
    return bookSlugMapping[slug] || slug;
};

// Fallback hadiths when API fails
const fallbackHadiths = [
    {
        id: 1,
        arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
        english: "Indeed, actions are judged by intentions.",
        narrator: "Bukhari & Muslim",
        book: "Sahih Bukhari"
    },
    {
        id: 2,
        arabic: "مَنْ حَسَّنَ إِسْلَامَهُ فَأَحْسَنَ اللَّهُ لَهُ خُلُقَهُ",
        english: "Whoever improves his character, Allah will improve his life.",
        narrator: "Abu Dawood",
        book: "Sunan Abu Dawood"
    },
    {
        id: 3,
        arabic: "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
        english: "A good word is a charity.",
        narrator: "Bukhari & Muslim",
        book: "Sahih Bukhari"
    },
    {
        id: 4,
        arabic: "مَنْ ذَهَبَ إِلَى الْمَسْجِدِ لَا يُرِيدُ إِلَّا أَنْ يَتَعَلَّمَ خَيْرًا أَوْ يُعَلِّمَهُ كَانَ لَهُ كَأَجْرِ حَاجٍّ تَامِّ حِجَّتِهِ",
        english: "Whoever goes to mosque only to learn or teach good, will have a reward like that of a completed Hajj.",
        narrator: "Tabarani",
        book: "Al-Mu'jam al-Awsat"
    },
    {
        id: 5,
        arabic: "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ",
        english: "Indeed, Allah loves that when any of you does something, he does it perfectly.",
        narrator: "Bayhaqi",
        book: "Shu'ab al-Iman"
    }
];

export const hadithService = {
    getBooks: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/books`, {
                params: { apiKey: API_KEY },
            });
            return response.data;
        } catch (error) {
            console.log("API failed, using fallback books");
            return {
                books: [
                    { bookSlug: "sahih-bukhari", title: "Sahih Bukhari" },
                    { bookSlug: "sahih-muslim", title: "Sahih Muslim" },
                    { bookSlug: "abu-dawood", title: "Sunan Abu Dawood" },
                    { bookSlug: "ibn-majah", title: "Sunan Ibn Majah" },
                    { bookSlug: "tirmidhi", title: "Jami at-Tirmidhi" }
                ]
            };
        }
    },

    getHadiths: async (bookSlug, translation = "english", extraParams = {}) => {
        try {
            // Map invalid book slugs to valid ones
            const mappedSlug = mapBookSlug(bookSlug);
            
            const response = await axios.get(`${BASE_URL}/hadiths`, {
                params: {
                    apiKey: API_KEY,
                    book: mappedSlug,
                    translation: translation,
                    ...extraParams,
                },
            });
            return response.data;
        } catch (error) {
            console.log(`API failed for book "${bookSlug}", using fallback hadiths`);
            return {
                hadiths: {
                    data: fallbackHadiths
                }
            };
        }
    },

    getRandomHadith: async () => {
        try {
            // Try API first
            const booksData = await hadithService.getBooks();
            const books = booksData.books;
            if (!books || books.length === 0) {
                return fallbackHadiths[Math.floor(Math.random() * fallbackHadiths.length)];
            }

            let foundHadith = null;
            let attempts = 0;
            while (attempts < 3 && !foundHadith) {
                const randomBook = books[Math.floor(Math.random() * books.length)];
                const hadithsData = await hadithService.getHadiths(randomBook.bookSlug, "english", { limit: 50 });
                const hadiths = hadithsData?.hadiths?.data;
                if (hadiths && hadiths.length > 0) {
                    foundHadith = hadiths[Math.floor(Math.random() * hadiths.length)];
                }
                attempts++;
            }

            // Fallback
            if (!foundHadith) {
                const fallbackData = await hadithService.getHadiths("sahih-bukhari", "english", { limit: 50 });
                const fallbacks = fallbackData?.hadiths?.data;
                if (fallbacks && fallbacks.length > 0) {
                    foundHadith = fallbacks[Math.floor(Math.random() * fallbacks.length)];
                }
            }

            return foundHadith || fallbackHadiths[Math.floor(Math.random() * fallbackHadiths.length)];
        } catch (error) {
            console.error("Error in getRandomHadith:", error);
            return fallbackHadiths[Math.floor(Math.random() * fallbackHadiths.length)];
        }
    }
};
