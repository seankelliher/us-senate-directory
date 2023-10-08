<script setup>
// THIS WORKS EXCEPT FOR TWO TERM SEARCHES LIKE FEMALE AND NEW HAMPSHIRE.
import { senators } from "../data/us-senators-with-tags.js";
import { ref } from "vue";


const searchTerm = ref();
const selects = ref([]);

function getSearch() {
    selects.value.length = 0;
    senators.map(function (senator) {
        const searchTermLc = searchTerm.value.toLowerCase();
        senator.tags.map(function (stag) {
            if (stag.includes(searchTermLc)) {
                selects.value.push(senator.bioguideId);
            }
        });
    });
}

</script>

<template>
    <p>{{ searchTerm }}</p>
    <form>
        <label>Search for a senator</label>
        <input
            :tabindex="0"
            @focus="doingSearch = true"
            @input="getSearch()"
            v-model="searchTerm"
            placeholder="Bernie Sanders, Vermont, Independent, Class1" />
    </form>
    <section v-for="senator in senators" :key="senator.bioguideId">
        <div v-if="selects.includes(senator.bioguideId)">
            <p>{{ senator.firstName }} {{ senator.lastName }}</p>
        </div>

    </section>
</template>

<style scoped>

</style>

