<template>
    <div class="tab_panel">
        <button v-for="tab in tabs" :key="tab.name" @click="activeTab = tab.name" :class="{ active: activeTab === tab.name }">{{ tab.label }}</button>
    </div>
    <div>
        <component :is="activeTabComponent" />
    </div>
</template>

<script setup>
const WeatherCard = defineAsyncComponent(() => import("./WeatherCard.vue"));
const MapComponent = defineAsyncComponent(() => import("./MapComponent.vue"));

import { computed, ref, defineAsyncComponent } from "vue";
const tabs = [
    { name: "MapComponent", label: "Map Component", component: MapComponent },
    { name: "WeatherCard", label: "Weather Card", component: WeatherCard },
];

const activeTab = ref("MapComponent");
const activeTabComponent = computed(() => {
    return tabs.find((tab) => tab.name === activeTab.value)?.component;
});
</script>

<style scoped>
.tab_panel {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.tab_panel button {
    padding: 6px;
    border-radius: 5px;
    margin: 10px;
    border: none;
    background-color: hsla(193, 91%, 18%, 0.486);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    position: relative;
}

.tab_panel button:hover {
    background-color: hsla(194, 52%, 51%, 0.486);
}

.tab_panel button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(134, 167, 202, 0.5);
}

.tab_panel button.active {
    background-color: #3ea7d8;
}

.tab_panel button.active:hover {
    background-color: #71caf3;
}

.tab_panel button.active::after {
    content: "";
    display: block;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #0056b3;
}
</style>
