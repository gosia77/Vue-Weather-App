<template>
  <div class="search_box">
    <input 
      type="text" 
      placeholder="Search..." 
      ref="refSearch" 
      v-model="inputText"
      @keydown.enter="onSearch"
      @input="onInputChange"
      list="cities"
    />
    <font-awesome-icon 
      icon="search"
      @click="onSearch"
      aria-label="search"
      :style="{ fontSize: '24px', cursor: 'pointer' }"
    />
    <datalist id="cities">
      <option 
        v-for="(city, index) in citiesProp" 
        :key="index" 
        :value="city.name || city"
      ></option>
    </datalist>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

const refSearch = ref(null)
const inputText = ref('')

// props od nadrzędnego komponentu
const props = defineProps({
  cities: {
    type: Array,
    default: () => []
  },
  inputValue: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(["inputChange", "search"])

// Watch inputValue z nadrzędnego komponentu
watch(() => props.inputValue, val => {
  inputText.value = val
})

// Emit inputChange przy wpisywaniu
const onInputChange = (event) => {
  inputText.value = event.target.value
  emits("inputChange", inputText.value)
}

// Emit search przy Enter lub kliknięciu lupki
const onSearch = (event) => {
  if (!event || event.key === 'Enter' || event.type === 'click') {
    emits("search", inputText.value)
    inputText.value = ''
    refSearch.value.focus()
  }
}

// Używamy props, a nie lokalnego ref
const citiesProp = props.cities
</script>

<style scoped>
.search_box {
  display: flex;
  align-items: center;
  gap: 8px; 
}
</style>