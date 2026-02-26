<template>
    <div class="search_box">
    <input type="text" 
    placeholder="Search..." 
    ref="refSearch" 
    v-model="inputText"
    @keydown.enter="onSearch"
    @input="onInputChange"
    list="cities"
    >
    <font-awesome-icon icon="search"
    @click="onSearch"
    aria-label="search"
    :style="{ fontSize: '24px', cursor: 'pointer' }"
     />
    <datalist id="cities">
        <option v-for="(city, index) in cities" :key="index" :value="city"></option>
    </datalist>
    <p>Wpisane: {{ inputText }}</p>
  </div>
    
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const refSearch = ref(null);
const inputText = ref('');

const emits = defineEmits(["inputChange", "search"]);

defineProps({
  datalist: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const onSearch = (event) => {
  if (!event || event.key === 'Enter' || event.type === 'click') {
    console.log(inputText.value)
    emits("search", inputText.value);
    inputText.value = '';
    refSearch.value.focus();
  }
}
const onInputChange = (event) => {
  inputText.value = event.target.value
  emits("inputChange", inputText.value);
}

// Lista miast
const cities = ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław']

</script>

<style lang="css" scoped>
.search_box {
display: flex;
  align-items: center;
  gap: 8px; 
}

</style>