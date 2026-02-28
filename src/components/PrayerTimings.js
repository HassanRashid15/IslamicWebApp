import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { usePrayer } from "../contexts/PrayerContext";

// Separate PrayerCountdown Component
const PrayerCountdown = ({ nextPrayer, prayerTimes }) => {
  const { isAudioEnabled, isPlaying, toggleAudioEnabled, stopAudio, testAdhanAndDua } = usePrayer();
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [visualState, setVisualState] = useState({
    isPulsing: false,
    isFastPulse: false,
    isRed: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentTime =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

      const prayers = [
        { name: "Fajr", time: convertTimeToMinutes(prayerTimes.fajr) * 60 },
        { name: "Sunrise", time: convertTimeToMinutes(prayerTimes.sunrise) * 60 },
        { name: "Dhuhr", time: convertTimeToMinutes(prayerTimes.dhuhr) * 60 },
        { name: "Asr", time: convertTimeToMinutes(prayerTimes.asr) * 60 },
        { name: "Maghrib", time: convertTimeToMinutes(prayerTimes.maghrib) * 60 },
        { name: "Isha", time: convertTimeToMinutes(prayerTimes.isha) * 60 },
      ];

      let nextTime = 0;
      for (let i = 0; i < prayers.length; i++) {
        if (currentTime <= prayers[i].time) {
          nextTime = prayers[i].time;
          break;
        }
      }

      if (!nextTime) {
        nextTime = prayers[0].time + 24 * 3600;
      }

      const timeUntilNext = nextTime - currentTime;
      const hours = Math.floor(timeUntilNext / 3600);
      const minutes = Math.floor((timeUntilNext % 3600) / 60);
      const seconds = timeUntilNext % 60;

      setCountdown({ hours, minutes, seconds, totalSeconds: timeUntilNext });

      // Visual Effects
      let pulsing = false;
      let fastPulse = false;
      let red = false;

      if (timeUntilNext <= 600 && timeUntilNext > 0) {
        pulsing = true;
        red = true;
        if (timeUntilNext <= 60) fastPulse = true;
      }
      setVisualState({ isPulsing: pulsing, isFastPulse: fastPulse, isRed: red });

      // Alerts
      if (timeUntilNext === 3600) setAlertMessage("1 Hour Remaining!");
      else if (timeUntilNext === 1800) setAlertMessage("30 Minutes Remaining!");
      else if (timeUntilNext === 900) setAlertMessage("15 Minutes Remaining!");
      else if (timeUntilNext === 300) setAlertMessage("5 Minutes Remaining!");
      else if (timeUntilNext === 0) setAlertMessage(`It's time for ${nextPrayer}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes, nextPrayer]); // nextPrayer dependency ensures alerts have correct name

  const convertTimeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const timerColor = visualState.isRed ? "text-red-600" : "text-blue-900";
  const timerLabelColor = visualState.isRed ? "text-red-500" : "text-blue-600";
  const pulseClass = visualState.isFastPulse ? "animate-pulse-fast" : (visualState.isPulsing ? "animate-pulse-custom" : "");

  return (
    <div
      className={`p-4 rounded-lg transition-all duration-500 cursor-pointer ${visualState.isRed ? "bg-red-50" : "bg-blue-50"} hover:shadow-md`}
      onClick={toggleAudioEnabled}
    >
      <style>
        {`
          @keyframes pulse-custom {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
          @keyframes pulse-fast {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
          .animate-pulse-custom {
            animation: pulse-custom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          .animate-pulse-fast {
            animation: pulse-fast 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}
      </style>
      {isPlaying ? (
        <div className="text-[10px] text-center text-red-500 mb-1 animate-pulse font-bold">
          Adhan Playing... Click to Stop ⏹️
        </div>
      ) : !isAudioEnabled ? (
        <div className="text-[10px] text-center text-blue-400 mb-1 animate-pulse">
          Click to enable Adhan sound 🔊
        </div>
      ) : (
        <div className="text-[10px] text-center text-emerald-500 mb-1">
          Sound Enabled ✅ (Triggers at 0:00)
        </div>
      )}
      <div className="flex justify-between items-center mb-2">
        <h3 className={`text-sm font-medium ${timerLabelColor}`}>
          Time Until {nextPrayer}
        </h3>
        <div className="flex items-center gap-2">
          {alertMessage && (
            <span className="text-xs font-bold text-red-500 animate-pulse">{alertMessage}</span>
          )}
          <button
            onClick={() => testAdhanAndDua(nextPrayer)}
            className="px-2 py-1 bg-emerald-500 text-white text-xs rounded hover:bg-emerald-600 transition-colors"
          >
            Test Adhan + Dua
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <div className="text-center">
          <span className={`text-2xl font-bold ${timerColor}`}>
            {countdown.hours}
          </span>
          <span className={`text-xs ${timerLabelColor} block`}>Hours</span>
        </div>
        <span className={`text-2xl font-bold ${timerColor}`}>:</span>
        <div className="text-center">
          <span className={`text-2xl font-bold ${timerColor}`}>
            {countdown.minutes.toString().padStart(2, "0")}
          </span>
          <span className={`text-xs ${timerLabelColor} block`}>Minutes</span>
        </div>
        <span className={`text-2xl font-bold ${timerColor}`}>:</span>
        <div className="text-center">
          <span className={`text-2xl font-bold ${timerColor} ${pulseClass} inline-block`}>
            {countdown.seconds.toString().padStart(2, "0")}
          </span>
          <span className={`text-xs ${timerLabelColor} block`}>Seconds</span>
        </div>
      </div>
    </div>
  );
};

// Parse "HH:MM" or "HH:MM (GMT+4)" to minutes since midnight
const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const part = String(timeStr).split(" ")[0];
  const [h, m] = part.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

const getLocationName = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      { headers: { "Accept-Language": "en", "User-Agent": "IslamicWebApp/1.0" } }
    );
    const { address } = response.data;
    return {
      area:
        address.suburb ||
        address.neighbourhood ||
        address.residential ||
        address.city_district ||
        address.quarter ||
        "",
      city: address.city || address.town || address.village || "",
      state: address.state || "",
      country: address.country || "",
    };
  } catch (error) {
    console.error("Error getting location name:", error);
    return { area: "", city: "", state: "", country: "" };
  }
};

const formatLocation = ({ country, state, city, area, street, zip, isp, houseNumber, quarter, district, county }) => {
  console.log("formatLocation received:", { country, state, city, area, street, zip, isp, houseNumber, quarter, district, county });
  
  const parts = [];
  
  // Build street address with house number
  if (houseNumber && street) {
    parts.push(`${houseNumber} ${street}`);
  } else if (street) {
    parts.push(street);
  }
  
  // Add area details in order of specificity
  if (quarter && quarter !== area && quarter !== city) parts.push(quarter);
  if (district && district !== area && district !== city) parts.push(district);
  if (area && area !== city) parts.push(area);
  if (county && county !== city && county !== state) parts.push(county);
  
  // Add main location components
  if (city) parts.push(city);
  if (state && state !== city) parts.push(state);
  if (zip) parts.push(zip);
  if (country) parts.push(country);
  
  const location = parts.join(", ") || "Location not available";
  
  // Add ISP info if available
  const result = isp ? `${location} (${isp})` : location;
  console.log("formatLocation result:", result);
  return result;
};

const PrayerTimings = () => {
  const {
    prayerTimes: contextPrayerTimes,
    nextPrayer: contextNextPrayer,
    currentPrayer: contextCurrentPrayer,
    locationDetails: contextLocationDetails,
    ramadanInfo,
    fetchPrayerTimes
  } = usePrayer();

  const [localPrayerTimes, setLocalPrayerTimes] = useState({
    fajr: "05:30",
    sunrise: "06:45",
    dhuhr: "12:30",
    asr: "15:45",
    maghrib: "18:30",
    isha: "20:00",
  });

  const [otherTimes, setOtherTimes] = useState({
    imsak: null,
    sunset: null,
    midnight: null,
    firstThird: null,
    lastThird: null,
  });

  const [locationDetails, setLocationDetails] = useState({
    city: "", state: "", country: "", area: "", lat: "", lon: "", street: "", zip: "", isp: "",
    houseNumber: "", quarter: "", district: "", county: ""
  });
  const [error, setError] = useState("");
  const [dateInfo, setDateInfo] = useState({ hijriDate: "", gregorianDate: "" });
  const [qibla, setQibla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [refreshingLocation, setRefreshingLocation] = useState(false);

  // Sync with context
  useEffect(() => {
    if (contextPrayerTimes) {
      setLocalPrayerTimes(contextPrayerTimes);
      setLoading(false);
    }
    if (contextLocationDetails) setLocationDetails(prev => ({ ...prev, ...contextLocationDetails }));
  }, [contextPrayerTimes, contextLocationDetails]);

  // Still fetch detailed info for the UI (hijri, qibla, etc)
  useEffect(() => {
    const getDetailedInfo = async () => {
      try {
        let locationData = {};
        let bestAccuracy = Infinity;
        let bestPosition = null;
        
        // Primary: Try browser geolocation with multiple attempts for best accuracy
        if (navigator.geolocation) {
          console.log("✅ Geolocation supported, attempting multiple readings for accuracy...");
          
          // Try up to 3 times to get most accurate reading
          for (let attempt = 1; attempt <= 3; attempt++) {
            try {
              console.log(`📍 Attempt ${attempt} of 3...`);
              const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    console.log(`📍 Attempt ${attempt} success:`, pos);
                    resolve(pos);
                  }, 
                  (error) => {
                    console.log(`❌ Attempt ${attempt} error:`, error);
                    reject(error);
                  }, {
                  enableHighAccuracy: true,
                  timeout: 10000 + (attempt * 2000), // Increasing timeout
                  maximumAge: 0 // Force fresh location each time
                });
              });
              
              const { latitude, longitude, accuracy } = position.coords;
              console.log(`📍 Attempt ${attempt} coordinates:`, { latitude, longitude, accuracy });
              
              // Keep the most accurate reading
              if (accuracy < bestAccuracy) {
                bestAccuracy = accuracy;
                bestPosition = position;
                console.log(`🎯 New best accuracy: ${accuracy}m (previous: ${bestAccuracy}m)`);
              }
              
              // If we got a very accurate reading, stop early
              if (accuracy <= 10) {
                console.log(`✅ Good accuracy achieved: ${accuracy}m, stopping early`);
                break;
              }
              
              // Wait between attempts
              if (attempt < 3) {
                console.log(`⏱️ Waiting 2 seconds before next attempt...`);
                await new Promise(resolve => setTimeout(resolve, 2000));
              }
            } catch (attemptError) {
              console.log(`❌ Attempt ${attempt} failed:`, attemptError);
              if (attempt === 3) {
                throw attemptError;
              }
            }
          }
          
          if (bestPosition) {
            const { latitude, longitude } = bestPosition.coords;
            console.log("🏆 Using best position:", { latitude, longitude, accuracy: bestAccuracy });
            
            // Use reverse geocoding to get detailed address
            console.log("🔍 Making reverse geocoding request...");
            const reverseGeoResponse = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
              { headers: { "Accept-Language": "en" } }
            );
            
            const address = reverseGeoResponse.data.address;
            console.log("Reverse geocoding response:", address);
            
            locationData = {
              city: address.city || address.town || address.village || "",
              state: address.state || "",
              country: address.country || "",
              area: address.suburb || address.neighbourhood || address.residential || "",
              street: address.road || address.street || "",
              houseNumber: address.house_number || "",
              lat: latitude,
              lon: longitude,
              zip: address.postcode || "",
              isp: "",
              quarter: address.quarter || "",
              district: address.city_district || "",
              county: address.county || ""
            };
            
            console.log("Browser geolocation data:", locationData);
            
          } catch (geoError) {
            console.log("Browser geolocation denied/failed, using IPFind fallback:", geoError.message);
            
            // Fallback to IPFind API
            const apiKey = process.env.REACT_APP_IPFIND_API_KEY;
            const ipResponse = await axios.get(`https://api.ipfind.com/me?auth=${apiKey}`);
            const data = ipResponse.data;
            
            console.log("IPFind API fallback response:", data);
            
            locationData = {
              city: data.city || "",
              state: data.region || "",
              country: data.country || "",
              area: data.county || data.region || "",
              lat: data.latitude || "",
              lon: data.longitude || "",
              zip: "",
              isp: "",
              street: "",
              houseNumber: "", quarter: "", district: "", county: ""
            };
          }
        } else {
          // No geolocation support, use IPFind
          const apiKey = process.env.REACT_APP_IPFIND_API_KEY;
          const ipResponse = await axios.get(`https://api.ipfind.com/me?auth=${apiKey}`);
          const data = ipResponse.data;
          
          console.log("IPFind API (no geolocation support):", data);
          
          locationData = {
            city: data.city || "",
            state: data.region || "",
            country: data.country || "",
            area: data.county || data.region || "",
            lat: data.latitude || "",
            lon: data.longitude || "",
            zip: "",
            isp: "",
            street: "",
            houseNumber: "", quarter: "", district: "", county: ""
          };
        }
        
        console.log("Final location data:", locationData);
        setLocationDetails(prev => ({ ...prev, ...locationData }));

        // Qibla and prayer times (only if we have coordinates)
        if (locationData.lat && locationData.lon) {
          const qiblaRes = await axios.get(`https://api.aladhan.com/v1/qibla/${locationData.lat}/${locationData.lon}`);
          if (qiblaRes.data?.data) setQibla(qiblaRes.data.data.direction);

          const dateRes = await axios.get(`https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}`, {
            params: { latitude: locationData.lat, longitude: locationData.lon, method: "2" }
          });
          const dateData = dateRes.data.data;
          setDateInfo({
            dayName: dateData.date.gregorian.weekday.en,
            hijriDate: `${dateData.date.hijri.day} ${dateData.date.hijri.month.en} ${dateData.date.hijri.year} AH`,
            gregorianDate: `${dateData.date.gregorian.day} ${dateData.date.gregorian.month.en} ${dateData.date.gregorian.year}`,
          });

          // Other times
          const timings = dateData.timings;
          const nightStart = parseTimeToMinutes(timings.Maghrib);
          const nightEnd = parseTimeToMinutes(timings.Fajr) + 24 * 60;
          const nightDuration = nightEnd - nightStart;

          const minutesToTime = (mins) => {
            const h = Math.floor(mins / 60) % 24;
            const m = Math.round(mins % 60);
            return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
          };

          setOtherTimes({
            imsak: timings.Imsak,
            sunset: timings.Sunset || timings.Maghrib,
            midnight: minutesToTime(nightStart + nightDuration / 2),
            firstThird: minutesToTime(nightStart + nightDuration / 3),
            lastThird: minutesToTime(nightStart + (nightDuration * 2) / 3),
          });
        }

      } catch (err) {
        console.error("Error getting location:", err);
      }
    };
    getDetailedInfo();
  }, []);

  const refreshLocation = async () => {
    setRefreshingLocation(true);
    try {
      if (navigator.geolocation) {
        console.log("🔄 Refreshing location...");
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              console.log("📍 Refresh geolocation success:", pos);
              resolve(pos);
            }, 
            (error) => {
              console.log("❌ Refresh geolocation error:", error);
              reject(error);
            }, {
            enableHighAccuracy: true,
            timeout: 15000, // Longer timeout for refresh
            maximumAge: 0 // Force fresh location
          });
        });
        
        const { latitude, longitude } = position.coords;
        console.log("🔄 Refresh coordinates:", { latitude, longitude });
        
        const reverseGeoResponse = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
          { headers: { "Accept-Language": "en" } }
        );
        
        const address = reverseGeoResponse.data.address;
        console.log("🔄 Refresh reverse geocoding:", address);
        
        const locationData = {
          city: address.city || address.town || address.village || "",
          state: address.state || "",
          country: address.country || "",
          area: address.suburb || address.neighbourhood || address.residential || "",
          street: address.road || address.street || "",
          houseNumber: address.house_number || "",
          lat: latitude,
          lon: longitude,
          zip: address.postcode || "",
          isp: "",
          quarter: address.quarter || "",
          district: address.city_district || "",
          county: address.county || ""
        };
        
        console.log("🔄 Refresh location data:", locationData);
        setLocationDetails(prev => ({ ...prev, ...locationData }));
        
        // Update prayer times with new coordinates
        if (latitude && longitude) {
          const qiblaRes = await axios.get(`https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`);
          if (qiblaRes.data?.data) setQibla(qiblaRes.data.data.direction);

          const dateRes = await axios.get(`https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}`, {
            params: { latitude, longitude, method: "2" }
          });
          const dateData = dateRes.data.data;
          setDateInfo({
            dayName: dateData.date.gregorian.weekday.en,
            hijriDate: `${dateData.date.hijri.day} ${dateData.date.hijri.month.en} ${dateData.date.hijri.year} AH`,
            gregorianDate: `${dateData.date.gregorian.day} ${dateData.date.gregorian.month.en} ${dateData.date.gregorian.year}`,
          });
        }
      }
    } catch (err) {
      console.error("❌ Refresh location failed:", err);
    } finally {
      setRefreshingLocation(false);
    }
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
      }));
    };
    updateCurrentTime();
    const t = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(t);
  }, []);

  const convertTimeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Format time to 12-hour format with AM/PM (handles "HH:MM" or "HH:MM (GMT+4)")
  const formatTime = (timeStr) => {
    if (!timeStr) return "—";
    const part = String(timeStr).split(" ")[0];
    const [hours, minutes] = part.split(":");
    const hour = parseInt(hours, 10) || 0;
    const min = String(minutes || "00").replace(/\D/g, "").slice(0, 2);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${min.padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Prayer Times</h2>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">{dateInfo.dayName},</span>{" "}
            <span className="font-semibold">Hijri Date:</span>{" "}
            {dateInfo.hijriDate}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Current Time:</span>{" "}
            <span className="text-indigo-600 font-medium">{currentTime}</span>
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Loading prayer times...</div>
      ) : (
        <>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
            {(() => {
              console.log("Final locationDetails before render:", locationDetails);
              return locationDetails.city;
            })() && (
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Location</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700 font-medium">
                    {formatLocation(locationDetails)}
                  </span>
                  <button
                    onClick={refreshLocation}
                    disabled={refreshingLocation}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
                  >
                    {refreshingLocation ? "🔄 Refreshing..." : "🔄 Refresh"}
                  </button>
                </div>
              </div>
            )}

            {qibla && (
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Qibla Direction</span>
                <div className="flex items-center gap-2 text-indigo-600">
                  <svg className="w-5 h-5 transition-transform duration-1000" style={{ transform: `rotate(${qibla}deg)` }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                  </svg>
                  <span className="text-lg font-bold">
                    {Math.round(qibla)}°
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center sm:items-end">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date & Day</span>
              <p className="text-sm text-gray-700 font-medium">
                {dateInfo.dayName}, {dateInfo.gregorianDate} 
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-indigo-600">
                Current Prayer
              </h3>
              <p className="text-2xl font-bold text-indigo-900">
                {contextCurrentPrayer || "..."}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-600">
                Next Prayer
              </h3>
              <p className="text-2xl font-bold text-green-900">{contextNextPrayer || "..."}</p>
            </div>
            <PrayerCountdown
              nextPrayer={contextNextPrayer}
              prayerTimes={localPrayerTimes}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(localPrayerTimes).map(([prayer, time]) => (
              <div
                key={prayer}
                className={`p-3 rounded-lg ${prayer.toLowerCase() === (contextCurrentPrayer || "").toLowerCase()
                  ? "bg-indigo-100"
                  : "bg-gray-50"
                  }`}
              >
                <h4 className="text-sm font-medium text-gray-600 capitalize">
                  {prayer === "maghrib" && ramadanInfo?.isRamadan ? "Maghrib (Iftar)" : prayer}
                </h4>
                <p className="text-lg font-semibold text-gray-900">
                  {formatTime(time)}
                </p>
              </div>
            ))}
          </div>

          {/* Other prayers & times: Tahajjud, Imsak, Midnight, etc. */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {ramadanInfo?.isRamadan ? "Ramadan Timings" : "Other prayers & times"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {ramadanInfo?.isRamadan ? "Suhoor stop time, Tahajjud, and Iftar details." : "Imsak, Tahajjud (last third of night), Midnight, and first third of night."}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherTimes.imsak && (
                <div className="p-3 rounded-lg bg-amber-50 border-2 border-amber-200 shadow-sm">
                  <h4 className="text-sm font-medium text-amber-800">
                    {ramadanInfo?.isRamadan ? "Suhoor Ends (Imsak)" : "Imsak"}
                  </h4>
                  <p className="text-xs text-amber-700 mb-1">
                    {ramadanInfo?.isRamadan ? "Stop eating now" : "Stop eating (fasting)"}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatTime(otherTimes.imsak)}
                  </p>
                </div>
              )}
              {otherTimes.lastThird && (
                <div className="p-3 rounded-lg bg-violet-50">
                  <h4 className="text-sm font-medium text-violet-800">Tahajjud</h4>
                  <p className="text-xs text-violet-700 mb-1">Last third of night</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatTime(otherTimes.lastThird)}
                  </p>
                </div>
              )}
              {otherTimes.midnight && (
                <div className="p-3 rounded-lg bg-slate-50">
                  <h4 className="text-sm font-medium text-slate-700">Midnight</h4>
                  <p className="text-xs text-slate-600 mb-1">Islamic midnight</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatTime(otherTimes.midnight)}
                  </p>
                </div>
              )}
              {otherTimes.firstThird && (
                <div className="p-3 rounded-lg bg-sky-50">
                  <h4 className="text-sm font-medium text-sky-800">First third of night</h4>
                  <p className="text-xs text-sky-700 mb-1">After Maghrib</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatTime(otherTimes.firstThird)}
                  </p>
                </div>
              )}
              {otherTimes.sunset && otherTimes.sunset !== localPrayerTimes.maghrib && (
                <div className="p-3 rounded-lg bg-orange-50">
                  <h4 className="text-sm font-medium text-orange-800">Sunset</h4>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatTime(otherTimes.sunset)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div >
  );
};

export default PrayerTimings;
