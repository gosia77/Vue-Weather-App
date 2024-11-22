
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
        modelValue: String,
    },
    data() {
        return{
            cityName: this.modelValue,
        };
    },
    watch: {
        cityName(newCity) {
            this.$emit("update:modelValue", newCity);
        }
    },
    methods: {
        onEnter() {
            this.$emit("search", this.cityName);
        },
    },
};
</script>