import React, { useState, useEffect } from "react";
import axios from "axios";

// Separate PrayerCountdown Component
const PrayerCountdown = ({ nextPrayer, prayerTimes }) => {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentTime =
        now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();

      const prayers = [
        { name: "Fajr", time: convertTimeToMinutes(prayerTimes.fajr) * 60 },
        {
          name: "Sunrise",
          time: convertTimeToMinutes(prayerTimes.sunrise) * 60,
        },
        { name: "Dhuhr", time: convertTimeToMinutes(prayerTimes.dhuhr) * 60 },
        { name: "Asr", time: convertTimeToMinutes(prayerTimes.asr) * 60 },
        {
          name: "Maghrib",
          time: convertTimeToMinutes(prayerTimes.maghrib) * 60,
        },
        { name: "Isha", time: convertTimeToMinutes(prayerTimes.isha) * 60 },
      ];

      let nextTime = 0;
      for (let i = 0; i < prayers.length; i++) {
        if (currentTime < prayers[i].time) {
          nextTime = prayers[i].time;
          break;
        }
      }

      if (!nextTime) {
        nextTime = prayers[0].time + 24 * 60 * 60; // Add 24 hours for next day
      }

      const timeUntilNext = nextTime - currentTime;
      const hours = Math.floor(timeUntilNext / 3600);
      const minutes = Math.floor((timeUntilNext % 3600) / 60);
      const seconds = timeUntilNext % 60;

      setCountdown({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const convertTimeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="text-sm font-medium text-blue-600 mb-2">
        Time Until {nextPrayer}
      </h3>
      <div className="flex items-center justify-center space-x-2">
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-900">
            {countdown.hours}
          </span>
          <span className="text-xs text-blue-600 block">Hours</span>
        </div>
        <span className="text-2xl font-bold text-blue-900">:</span>
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-900">
            {countdown.minutes.toString().padStart(2, "0")}
          </span>
          <span className="text-xs text-blue-600 block">Minutes</span>
        </div>
        <span className="text-2xl font-bold text-blue-900">:</span>
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-900">
            {countdown.seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-xs text-blue-600 block">Seconds</span>
        </div>
      </div>
    </div>
  );
};

const getLocationName = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const { address } = response.data;
    console.log("Reverse geocode address:", address); // Debug log
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

const formatLocation = ({ country, state, city, area }) => {
  let parts = [];
  if (country) parts.push(country);
  if (state) parts.push(state);
  if (city) parts.push(city);
  if (area) parts.push(area);
  let location = parts.join(", ");
  if (!area) {
    location += (location ? " - " : "") + "Area not available";
  }
  return location;
};

const PrayerTimings = () => {
  const [prayerTimes, setPrayerTimes] = useState({
    fajr: "05:30",
    sunrise: "06:45",
    dhuhr: "12:30",
    asr: "15:45",
    maghrib: "18:30",
    isha: "20:00",
  });

  const [currentPrayer, setCurrentPrayer] = useState("");
  const [nextPrayer, setNextPrayer] = useState("");
  const [locationDetails, setLocationDetails] = useState({
    city: "",
    state: "",
    country: "",
    lat: "",
    lon: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateInfo, setDateInfo] = useState({
    hijriDate: "",
    gregorianDate: "",
  });
  const [locationLoading, setLocationLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  // Get user's location using IP-API
  const getUserLocation = async () => {
    setLocationLoading(true);
    try {
      // Get location from IP-API
      const ipResponse = await axios.get("http://ip-api.com/json/");
      const { city, regionName, country, lat, lon } = ipResponse.data;

      setLocationDetails({
        city,
        state: regionName,
        country,
        lat,
        lon,
      });

      // Get prayer times using coordinates
      const response = await axios.get(
        `https://api.aladhan.com/v1/timings/${new Date().getTime() / 1000}`,
        {
          params: {
            latitude: lat,
            longitude: lon,
            method: "2", // Using ISNA method by default
          },
        }
      );

      const data = response.data.data;
      const timings = data.timings;
      const hijri = data.date.hijri;
      const gregorian = data.date.gregorian;

      setPrayerTimes({
        fajr: timings.Fajr,
        sunrise: timings.Sunrise,
        dhuhr: timings.Dhuhr,
        asr: timings.Asr,
        maghrib: timings.Maghrib,
        isha: timings.Isha,
      });

      setDateInfo({
        hijriDate: `${hijri.day} ${hijri.month.en} ${hijri.year} AH`,
        gregorianDate: `${gregorian.day} ${gregorian.month.en} ${gregorian.year}`,
      });

      setLocationLoading(false);
    } catch (err) {
      console.error("Error getting location:", err);
      setError("Error getting location. Please try again.");
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation(); // Get user's location when component mounts
  }, []);

  useEffect(() => {
    const updatePrayerTimes = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const prayers = [
        { name: "Fajr", time: convertTimeToMinutes(prayerTimes.fajr) },
        { name: "Sunrise", time: convertTimeToMinutes(prayerTimes.sunrise) },
        { name: "Dhuhr", time: convertTimeToMinutes(prayerTimes.dhuhr) },
        { name: "Asr", time: convertTimeToMinutes(prayerTimes.asr) },
        { name: "Maghrib", time: convertTimeToMinutes(prayerTimes.maghrib) },
        { name: "Isha", time: convertTimeToMinutes(prayerTimes.isha) },
      ];

      let current = "";
      let next = "";

      for (let i = 0; i < prayers.length; i++) {
        if (currentTime < prayers[i].time) {
          next = prayers[i].name;
          current = i === 0 ? "Isha" : prayers[i - 1].name;
          break;
        }
      }

      if (!current) {
        current = "Isha";
        next = "Fajr";
      }

      setCurrentPrayer(current);
      setNextPrayer(next);
    };

    updatePrayerTimes();
    const interval = setInterval(updatePrayerTimes, 60000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    updateCurrentTime();
    const timeInterval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const convertTimeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Format time to 12-hour format with AM/PM
  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert to 12-hour format
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Prayer Times</h2>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <p className="text-lg text-gray-700">
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
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center flex justify-between">
            {locationDetails.city && (
              <span className="text-sm text-gray-500 mt-1">
                {formatLocation(locationDetails)}
              </span>
            )}

            <p className="text-lg text-gray-700">
              <span className="font-semibold">Gregorian Date:</span>{" "}
              {dateInfo.gregorianDate}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-indigo-600">
                Current Prayer
              </h3>
              <p className="text-2xl font-bold text-indigo-900">
                {currentPrayer}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-600">
                Next Prayer
              </h3>
              <p className="text-2xl font-bold text-green-900">{nextPrayer}</p>
            </div>
            <PrayerCountdown
              nextPrayer={nextPrayer}
              prayerTimes={prayerTimes}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(prayerTimes).map(([prayer, time]) => (
              <div
                key={prayer}
                className={`p-3 rounded-lg ${
                  prayer.toLowerCase() === currentPrayer.toLowerCase()
                    ? "bg-indigo-100"
                    : "bg-gray-50"
                }`}
              >
                <h4 className="text-sm font-medium text-gray-600 capitalize">
                  {prayer}
                </h4>
                <p className="text-lg font-semibold text-gray-900">
                  {formatTime(time)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PrayerTimings;
