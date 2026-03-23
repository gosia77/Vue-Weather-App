<template>
    <div class="search_box">
        <input type="text" placeholder="Search..." ref="refSearch" v-model="inputText" @keydown.enter="onSearch" @input="onInputChange" list="cities" />
        <font-awesome-icon icon="search" @click="onSearchClick" aria-label="search" :style="{ fontSize: '24px', cursor: 'pointer' }" />
        <datalist id="cities">
            <option v-for="city in cityOptions" :key="city.lat + city.lon" :value="`${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`"></option>
        </datalist>
    </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
import { fetchCityList, getCurrentWeather } from "../api/client.js";

/** Reference to the input field, used for focus management.
 * @type {import('vue').Ref<HTMLInputElement|null>}
 */
const refSearch = ref(null);
/** @type {import('vue').Ref<string>} */
const inputText = ref("");
/**@type {import('vue').Ref<array>} */
const cityOptions = ref([]);

const emits = defineEmits(["inputChange", "search"]);

/**
 * Watcher for `inputText`.
 * Calls `fetchCityList` whenever the user types, updating city suggestions.
 * @param {string} val - Current input value
 */
watch(inputText, async (val) => {
    if (!val) {
        cityOptions.value = [];
        return;
    }
    try {
        cityOptions.value = await fetchCityList(val);
    } catch (error) {
        console.error("Error fetching cities:", error.message);
        cityOptions.value = [];
    }
});

/**
 * Handle input changes in the text field.
 * Emits 'inputChange' event with the current input value.
 * @param {Event} event - Input event
 */
const onInputChange = (event) => {
    inputText.value = event.target.value;
    emits("inputChange", inputText.value);
};

/**
 * Handles the search action for both Enter key and search icon click.
 * Finds the selected city based on input text or defaults to first suggestion.
 * Fetches current weather for the selected city and emits 'search' event.
 */
const handleSearch = async () => {
    if (!inputText.value) return;

    let selectedCity = cityOptions.value.find((city) => {
        const label = `${city.name}, ${city.state ? city.state + ", " : ""}${city.country}`;
        return label === inputText.value;
    });

    if (!selectedCity && cityOptions.value.length) {
        selectedCity = cityOptions.value[0];
    }

    if (!selectedCity) {
        console.error("City not found");
        return;
    }

    const cityLabel = `${selectedCity.name}${selectedCity.state ? ", " + selectedCity.state : ""}, ${selectedCity.country}`;

    refSearch.value.focus();

    try {
        const data = await getCurrentWeather(selectedCity.lat, selectedCity.lon);
        emits("search", { city: cityLabel, weather: data });
    } catch (error) {
        console.error("Error fetching weather:", error.message);
    }
    inputText.value = "";
};

/**Handler for pressing Enter in the input field*/
const onSearch = () => handleSearch();

/**Handler for clicking the search icon*/
const onSearchClick = () => handleSearch();
</script>

<style scoped>
.search_box {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
