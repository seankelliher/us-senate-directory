<script setup>
// THIS DOES NOT WORK.
// RETURNS ALL MATCHES. EXAMPLE ALL MALES AND ALL VERMONTS.
// ALSO ISSUES WITH TWO NAME STATES LIKE NEW YORK.
import { senators } from "../data/us-senators-with-tags.js";
import { ref } from "vue";


const searchTerm = ref();
const selects = ref([]);

function getSearch() {
    selects.value.length = 0;
    senators.map(function (senator) {

        const lower = searchTerm.value.toLowerCase();
        const arr = lower.split(" ");
        let intersection = senator.tags.filter(x => arr.includes(x));
        console.log(intersection);

        if (intersection.length >= 2) {
            selects.value.push(senator.bioguideId);
        }
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

