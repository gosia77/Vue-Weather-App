<template>
    <div class="inputContainer">
        <input :type="type" list="cities" v-model="internalValue" @input="onInput" :placeholder="placeholder" @keydown.enter="onSearch">
        <datalist id="cities">
            <option v-for="(city, index) in cities" :key="index" :value="city"></option>
        </datalist>
        <p>{{ props.label }}</p>
        <font-awesome-icon icon="search" class="img" @click="onSearch" aria-label="search"
            :style="{ fontSize: '15px', cursor: 'pointer' }" />
    </div>
</template>

<script setup>

import { defineProps, defineEmits, watch, ref } from 'vue'



/** */
const emit = defineEmits({

    events: (event) => event,
});

/** @type {props} */
const props = defineProps({
    type: {
        type: String,
        required: false,
        default: "text",
    },
    inputValue: {
        type: [String, Number],
        required: false,
        default: "",
    },
    placeholder: {
        type: String,
        required: false,
        default: "",
    },
    label: {
        type: String,
        required: false,
        default: "",
    },
    isAutoFocus: {
        type: Boolean,
        required: false,
        default: false,
    },

    uErrorMessage: {
        type: String,
        required: false,
        default: "",
    },
    name: {
        type: String,
        required: false,
        default: "input",
    },

})

const internalValue = ref(props.inputValue)

watch(() => props.inputValue, val => {
  internalValue.value = val
});

const onInput = () => {
        emit("events", {
            name: props.name,
            value: internalValue.value
        })
    
};

const onSearch = () => {
    emit("events", {
        name: props.name,
        value: internalValue.value
    });
}

// Cities for datalist
const cities = ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', "Pisarzowa", "Limanowa", "Nowy Sącz", "Zakopane", "Szczecin", "Lublin"];

</script>

<style scoped>
.inputContainer {
    display: flex;
    align-items: center;
}

.inputContainer input {
    border: none;
    border-bottom: 2px solid #ccc;
    outline: none;
    transition: border-color 0.3s ease;
    margin-bottom: 0;
    padding: 5px 0;
}
</style>
