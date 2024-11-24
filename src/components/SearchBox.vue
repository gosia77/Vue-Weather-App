
<template>
<div class="search-box">
    <input type="text" placeholder="Search..." class="search-bar" 
    v-model="cityName"
    @keypress.enter="onEnter" />
   </div> 
</template>

<script>
export default {
    name: "SearchBox",
    props: {
        modelValue: {
            type: String,
            required: true,
        }
    },
    data() {
        return{
            cityName: this.modelValue,
        };
    },
    watch: {
        cityName(newCity) {
            this.$emit("update:modelValue", newCity);
        },
    },
    methods: {
        onEnter() {
            this.$emit("search", this.cityName);
        },
    },
};
</script>

<style scoped>
    .search-box {
        font-display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        
    }
    .search-box input {
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
    outline: none;
  }

</style>