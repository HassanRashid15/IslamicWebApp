import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PrayerContext = createContext();

export const usePrayer = () => useContext(PrayerContext);

export const PrayerProvider = ({ children }) => {
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [nextPrayer, setNextPrayer] = useState("");
    const [currentPrayer, setCurrentPrayer] = useState("");
    const [locationDetails, setLocationDetails] = useState(null);
    const [hijriDate, setHijriDate] = useState(null);
    const [dayName, setDayName] = useState("");
    const [ramadanInfo, setRamadanInfo] = useState({ isRamadan: false, daysToRamadan: null });
    const [isAudioEnabled, setIsAudioEnabled] = useState(() => {
        const saved = localStorage.getItem("adhanAudioEnabled");
        return saved !== "false"; // Enable by default, only disable if explicitly set to "false"
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [locationPermission, setLocationPermission] = useState('prompt');
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const adhanAudioRef = useRef(new Audio("https://cdn.islamic.network/adhan/1.mp3"));
    const duaAudioRef = useRef(new Audio("https://cdn.islamic.network/dua/1.mp3"));
    const hasPlayedAdhanRef = useRef({}); // Track per prayer name to avoid repeat triggers
    const toastIdRef = useRef(null);

    const stopAudio = () => {
        const adhanAudio = adhanAudioRef.current;
        const duaAudio = duaAudioRef.current;

        adhanAudio.pause();
        adhanAudio.currentTime = 0;
        duaAudio.pause();
        duaAudio.currentTime = 0;

        setIsPlaying(false);
        if (toastIdRef.current) {
            toast.dismiss(toastIdRef.current);
            toastIdRef.current = null;
        }
    };

    const playDuaOnly = () => {
        if (!isAudioEnabled) return;
        
        const duaAudio = duaAudioRef.current;
        duaAudio.currentTime = 0;
        
        showAdhanToast("Dua After Adhan", true);
        duaAudio.play()
            .then(() => {
                console.log("Manual dua started playing successfully");
                setIsPlaying(true);
                
                duaAudio.onended = () => {
                    console.log("Manual dua ended");
                    setIsPlaying(false);
                    if (toastIdRef.current) {
                        toast.dismiss(toastIdRef.current);
                        toastIdRef.current = null;
                    }
                };
            })
            .catch(e => {
                console.error("Manual dua playback failed:", e);
                setIsPlaying(false);
                if (toastIdRef.current) {
                    toast.dismiss(toastIdRef.current);
                    toastIdRef.current = null;
                }
            });
    };

    const testAdhanAndDua = (prayerName = "Test Prayer") => {
        console.log("Testing Adhan and Dua sequence");
        playAdhan(prayerName);
    };

    const showAdhanToast = (prayerName, isDua = false) => {
        if (toastIdRef.current) toast.dismiss(toastIdRef.current);

        toastIdRef.current = toast(
            <div className="flex flex-col gap-2">
                <div className="font-bold text-emerald-700">
                    {isDua ? "Adhan Dua is playing..." : `Adhan: ${prayerName}`}
                </div>
                <p className="text-xs text-gray-600">
                    {isDua ? "Reciting Dua after Adhan" : "It's time for prayer"}
                </p>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            stopAudio();
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-600 transition-colors"
                    >
                        STOP {isDua ? "DUA" : "ADHAN"} ⏹️
                    </button>
                    {!isDua && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                playDuaOnly();
                            }}
                            className="bg-emerald-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-emerald-600 transition-colors"
                        >
                            PLAY DUA 🕌
                        </button>
                    )}
                </div>
            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                position: "top-right",
                toastId: "adhan-toast"
            }
        );
    };

    const showAlertToast = (message, type = "info") => {
        toast[type](message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const playAdhan = (prayerName) => {
        if (!isAudioEnabled) return;

        const adhanAudio = adhanAudioRef.current;
        const duaAudio = duaAudioRef.current;

        // Reset audio elements
        adhanAudio.currentTime = 0;
        duaAudio.currentTime = 0;
        
        // Set up dua playback before starting adhan
        const playDuaAfterAdhan = () => {
            showAdhanToast(prayerName, true);
            duaAudio.play()
                .then(() => {
                    console.log("Dua started playing successfully");
                })
                .catch(e => {
                    console.error("Dua playback failed:", e);
                    // Try alternative approach - create new audio element
                    const fallbackDua = new Audio("https://www.islamcan.com/audio/adhan/dua_after_adhan.mp3");
                    fallbackDua.play().catch(fallbackError => {
                        console.error("Fallback dua also failed:", fallbackError);
                        setIsPlaying(false);
                        if (toastIdRef.current) {
                            toast.dismiss(toastIdRef.current);
                            toastIdRef.current = null;
                        }
                    });
                });
        };

        // Set up dua ended event listener
        const setupDuaEndedListener = () => {
            duaAudio.onended = () => {
                console.log("Dua ended");
                setIsPlaying(false);
                if (toastIdRef.current) {
                    toast.dismiss(toastIdRef.current);
                    toastIdRef.current = null;
                }
            };
        };

        // Set up adhan ended event listener
        adhanAudio.onended = () => {
            console.log("Adhan ended, starting dua");
            setupDuaEndedListener();
            playDuaAfterAdhan();
        };

        // Start playing adhan
        adhanAudio.play()
            .then(() => {
                setIsPlaying(true);
                showAdhanToast(prayerName);
                console.log("Adhan started playing successfully");
            })
            .catch(e => {
                console.error("Adhan autoplay blocked:", e);
                // Show user interaction prompt
                showAlertToast("Click the play button to start Adhan", "warning");
            });
    };

    // User-initiated geolocation function
    const requestPreciseLocation = async () => {
        if (!navigator.geolocation) {
            throw new Error('Geolocation is not supported by this browser');
        }

        setIsGettingLocation(true);
        
        try {
            const position = await new Promise((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                    reject(new Error('Geolocation timeout after 10 seconds'));
                }, 10000);
                
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        clearTimeout(timeoutId);
                        resolve(pos);
                    },
                    (err) => {
                        clearTimeout(timeoutId);
                        reject(err);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 300000 // 5 minutes cache
                    }
                );
            });
            
            const { latitude, longitude } = position.coords;
        
            // Reverse geocoding to get detailed address
            const reverseGeoResponse = await axios.get(
                `https://nominatim.openstreetmap.org/reverse`,
                {
                    params: {
                        lat: latitude,
                        lon: longitude,
                        format: 'json',
                        addressdetails: 1
                    }
                }
            );
            
            const address = reverseGeoResponse.data.address;
            const locationData = {
                city: address.city || address.town || address.village || '',
                state: address.state || address.region || '',
                country: address.country || '',
                lat: latitude,
                lon: longitude,
                area: address.suburb || address.neighbourhood || address.district || '',
                street: address.road || address.street || ''
            };
            
            setLocationDetails(locationData);
            setLocationPermission('granted');
            return locationData;
            
        } catch (error) {
            setLocationPermission('denied');
            throw error;
        } finally {
            setIsGettingLocation(false);
        }
    };

    const fetchPrayerTimes = async () => {
        try {
            // Use IP-based location by default (no geolocation prompt)
            let locationData = { city: '', state: '', country: '', lat: '', lon: '', area: '', street: '' };
            
            // Only use IP-based location to avoid browser violations
            const ipResponse = await axios.get("http://ip-api.com/json/");
            const { city, regionName, country, lat, lon } = ipResponse.data;
            locationData = { city, state: regionName, country, lat, lon, area: '', street: '' };

            setLocationDetails(locationData);

            const response = await axios.get(
                `https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}`,
                { params: { latitude: locationData.lat, longitude: locationData.lon, method: "2" } }
            );

            const timings = response.data.data.timings;
            const hijri = response.data.data.date.hijri;

            const formattedTimings = {
                fajr: timings.Fajr,
                sunrise: timings.Sunrise,
                dhuhr: timings.Dhuhr,
                asr: timings.Asr,
                maghrib: timings.Maghrib,
                isha: timings.Isha,
            };

            setPrayerTimes(formattedTimings);
            setHijriDate(hijri);
            setDayName(response.data.data.date.gregorian.weekday.en);

            // Calculate Ramadan Info
            const currentMonth = parseInt(hijri.month.number);
            const currentDay = parseInt(hijri.day);

            if (currentMonth === 9) {
                setRamadanInfo({ isRamadan: true, daysToRamadan: 0 });
            } else if (currentMonth === 8) {
                const daysInMonth = 30; // Approximation or get from API
                setRamadanInfo({ isRamadan: false, daysToRamadan: daysInMonth - currentDay });
            } else {
                setRamadanInfo({ isRamadan: false, daysToRamadan: null });
            }

            return { timings: formattedTimings, allData: response.data.data };
        } catch (err) {
            console.error("Error fetching prayer times:", err);
            return null;
        }
    };

    useEffect(() => {
        fetchPrayerTimes();
    }, []);

    useEffect(() => {
        if (!prayerTimes) return;

        const convertTimeToMinutes = (timeStr) => {
            const [hours, minutes] = timeStr.split(":").map(Number);
            return hours * 60 + minutes;
        };

        const checker = setInterval(() => {
            const now = new Date();
            const currentTotalSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

            const prayers = [
                { name: "Fajr", time: convertTimeToMinutes(prayerTimes.fajr) * 60 },
                { name: "Sunrise", time: convertTimeToMinutes(prayerTimes.sunrise) * 60 },
                { name: "Dhuhr", time: convertTimeToMinutes(prayerTimes.dhuhr) * 60 },
                { name: "Asr", time: convertTimeToMinutes(prayerTimes.asr) * 60 },
                { name: "Maghrib", time: convertTimeToMinutes(prayerTimes.maghrib) * 60 },
                { name: "Isha", time: convertTimeToMinutes(prayerTimes.isha) * 60 },
            ];

            let current = "";
            let next = "";
            let nextTime = 0;

            for (let i = 0; i < prayers.length; i++) {
                if (currentTotalSeconds <= prayers[i].time) {
                    next = prayers[i].name;
                    nextTime = prayers[i].time;
                    current = i === 0 ? "Isha" : prayers[i - 1].name;
                    break;
                }
            }

            if (!current) {
                current = "Isha";
                next = "Fajr";
                nextTime = prayers[0].time + 24 * 3600;
            }

            setCurrentPrayer(current);
            setNextPrayer(next);

            // Time Remaining Alerts (Toasts)
            const timeUntilNext = nextTime - currentTotalSeconds;
            const markers = [
                { seconds: 3600, label: "1 Hour" },
                { seconds: 1800, label: "30 Minutes" },
                { seconds: 900, label: "15 Minutes" },
                { seconds: 300, label: "5 Minutes" }
            ];

            const activeMarker = markers.find(m => m.seconds === timeUntilNext);
            if (activeMarker) {
                showAlertToast(`${activeMarker.label} remaining for ${next}!`, "info");
            }

            // Trigger Adhan if time matches exactly or within 30 seconds after prayer time
            if (currentTotalSeconds >= nextTime && currentTotalSeconds <= nextTime + 30 && !hasPlayedAdhanRef.current[next]) {
                hasPlayedAdhanRef.current[next] = true;
                playAdhan(next);
                console.log(`Adhan triggered for ${next} - time difference: ${currentTotalSeconds - nextTime} seconds`);
            }

            // Reset play status for other prayers as time passes
            Object.keys(hasPlayedAdhanRef.current).forEach(key => {
                if (key !== next) hasPlayedAdhanRef.current[key] = false;
            });

        }, 1000);

        return () => clearInterval(checker);
    }, [prayerTimes, isAudioEnabled]);

    const toggleAudioEnabled = () => {
        const newState = !isAudioEnabled;
        setIsAudioEnabled(newState);
        localStorage.setItem("adhanAudioEnabled", newState ? "true" : "false");

        if (newState) {
            // Unlock both audio contexts briefly with better error handling
            const adhan = adhanAudioRef.current;
            const dua = duaAudioRef.current;

            // Try to unlock audio context, but don't fail if it doesn't work
            try {
                Promise.all([
                    adhan.play().catch(() => Promise.resolve()).then(() => adhan.pause()),
                    dua.play().catch(() => Promise.resolve()).then(() => dua.pause())
                ]).then(() => {
                    adhan.currentTime = 0;
                    dua.currentTime = 0;
                }).catch(() => {
                    // Silently handle audio unlock errors
                    console.log("Audio context unlock failed, but continuing...");
                });
            } catch (error) {
                // Handle any unexpected errors during audio unlock
                console.log("Audio initialization failed:", error.message);
            }
        } else {
            stopAudio();
        }
    };

    return (
        <PrayerContext.Provider value={{
            prayerTimes,
            nextPrayer,
            currentPrayer,
            locationDetails,
            isAudioEnabled,
            isPlaying,
            hijriDate,
            dayName,
            ramadanInfo,
            locationPermission,
            isGettingLocation,
            toggleAudioEnabled,
            stopAudio,
            playDuaOnly,
            testAdhanAndDua,
            fetchPrayerTimes,
            requestPreciseLocation
        }}>
            {children}
        </PrayerContext.Provider>
    );
};
