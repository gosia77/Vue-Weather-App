<template>
    <div ref="table" id="table" v-if="table !== undefined"></div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

/**@typedef  {Object} tableProps*/
const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    tabulatorData: {
        type: Array,
        required: true,
    },
});

/**@type {import('vue').Ref<object>} */
const table = ref(null);
/**@type {import('vue').Ref<object>} */
const tabulator = ref(null);

onMounted(() => {
    new Tabulator(table.value, {
        height: 180,
        data: props.tabulatorData,
        reactiveData: true,
        layout: "fitColumns",
        columns: [{ title: "Example", field: "example2" }, ...props.columns],
    });
    return { tabulator, table };
});
</script>

<style>
.tabulator {
    background-color: transparent !important;
    width: 100%;
    border-collapse: collapse;
}

.tabulator,
.tabulator_row,
.tabulator_cell,
.tabulator_header {
    border: none;
}

.tabulator_row {
    background-color: hsla(194, 58%, 31%, 0.486);
}

.tabulator_tableholder {
    background-color: rgba(0, 0, 0, 0, 5);
}

.tabulator_tableholder::-webkit-scrollbar {
    width: 16px;
    height: 10px;
}

.tabulator_cell {
    text-align: center;
}

.tabulator .tabulator_header .tabulator_col {
    background-color: hsla(194, 58%, 31%, 0.747);
    color: white;
}

.tabulator .tabulator_row:hover {
    background-color: hsla(194, 68%, 25%, 0.596);
    color: white;
}
</style>
