<template>
    <div>
    <h1>counter: {{ count }}</h1>
    <button @click="increment">add one</button>
    <button @click="decrement">remove one</button>
    <button @click="reset">reset</button>
    </div>

    <div>
        <input v-model="initialValue" type="number" placeholder="Enter a initial value">
        <button @click="setInitialValue">Set up initial value</button>
    </div>



</template>

<script setup>
    import { ref } from 'vue'

    const count = ref(0);
    const initialValue = ref(0);
    

    const increment = () => {
        count.value++;
    }

    const decrement = () => {
        count.value--;
    }

    const reset = () => {
        count.value = initialValue.value;
    }

    const setInitialValue = () => {
        if(initialValue.value >=0) {
        count.value = initialValue.value
        } else {
            alert('Initial value cant be less than 0')
        }
    }

</script>


