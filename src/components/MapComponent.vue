<template>
    <div>
        <div id="map" class="map"></div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getCurrentWeather } from "@/api/client";

let map;
let popup = L.popup();
let timeout = null;
const weatherCache = new Map();

onMounted(() => {
    //create map
    map = L.map("map").setView([52.2297, 21.0122], 6);

    // touch map tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    // 3mouse move event with debounce
    map.on("mousemove", async (e) => {
        clearTimeout(timeout);

        timeout = setTimeout(async () => {
            const { lat, lng } = e.latlng;
            const key = `${lat.toFixed(2)}-${lng.toFixed(2)}`;

            // if we have casched data for this location, show it immediately
            if (weatherCache.has(key)) {
                showPopup(weatherCache.get(key), lat, lng);
                return;
            }

            try {
                const data = await getCurrentWeather(lat, lng);
                weatherCache.set(key, data);
                showPopup(data, lat, lng);
            } catch (err) {
                console.error(err);
            }
        }, 300); // debounce 300ms
    });
});

/** Function to show popup with weather information */
function showPopup(data, lat, lng) {
    const city = data.name || "Unknown";
    const temp = Math.round(data.main.temp);
    const weather = data.weather[0].main;

    popup.setLatLng([lat, lng]).setContent(`<div><strong>${city}</strong><br/>🌡️ ${temp}°C<br/>☁️ ${weather}</div>`).openOn(map);
}
</script>

<style scoped>
.map {
    height: 500px;
    width: 500px;
    border-radius: 6px;
    margin-top: 10px;
}
</style>
