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
        v-for="(city, index) in props.cities" 
        :key="city.id || index" 
        :value="city.name || city"
      ></option>
    </datalist>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

const refSearch = ref(null)
const inputText = ref('')

// props from parent component
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

// Watch inputValue from parent component and update inputText accordingly
watch(() => props.inputValue, val => {
  inputText.value = val
})

// Emit inputChange with the current input value
const onInputChange = (event) => {
  inputText.value = event.target.value
  emits("inputChange", inputText.value)
}

// Emit search by enter or click yhe search icon
const onSearch = (event) => {
  if (!event || event.key === 'Enter' || event.type === 'click') {
    emits("search", inputText.value)
    inputText.value = ''
    refSearch.value.focus()
  }
}


</script>

<style scoped>
.search_box {
  display: flex;
  align-items: center;
  gap: 8px; 
}
</style>