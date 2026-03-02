<template>
<div class="inputContainer">
    <input  
    :type="type"
    :value="value"
    @input="onInput"
    placeholder="Search" >
    <p>{{ props.label }}</p>
     <font-awesome-icon icon="search"
    @click="onSearch"
    aria-label="search"
    :style="{ fontSize: '24px', cursor: 'pointer' }"
     />
</div>
</template>

<script setup>

import {   defineProps, computed, defineEmits } from 'vue'

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
    value: {
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

const onInput = computed(() => {
    return (event) => {
        emit("events", {
            name: props.name,
            value: event.target.value
        })
    }
})

</script>

<style scoped>
.inputContainer {
    display: flex;
   
}

.inputContainer input {
    border: none;
     border-bottom: 2px solid #ccc;
     outline: none;
     padding: 5px 0;
     transition: border-color 0.3s ease;
}
</style>



