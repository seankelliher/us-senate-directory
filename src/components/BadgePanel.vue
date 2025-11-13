<script setup>
import { computed } from "vue";
import { store } from "../composables/store.js";

// Converts class to date. Example: class1 -> Nov 2024.
const convertClass = computed(() => {
    if (store.reelection === "class1") { // class1" - Nov 2024.
        return "Nov 2024";
    } else if (store.reelection === "class2") { // class2" - Nov 2026.
        return "Nov 2026";
    } else if (store.reelection === "class3") { // class3" - Nov 2028.
        return "Nov 2028";
    } else {
        return "all";
    }
});

const upperCaseState = computed(() => {
    if (store.stateAbbr === "all") {
        return "all";
    } else {
        return store.stateAbbr.toUpperCase();
    }
});
</script>

<template>
    <div class="badge-panel">
        <div class="badge noto-sans-eight">Viewing:</div>
        <div class="badge noto-sans-five">Party: {{ store.party}}</div>
        <div class="badge noto-sans-five">Gender: {{ store.gender }}</div>
        <div class="badge noto-sans-five">Re-election: {{ convertClass }}</div>
        <div class="badge noto-sans-five">State: {{ upperCaseState }}</div>
        <div
            v-if="store.searchTerm !== ''"
            class="badge noto-sans-five"
        >
            Search: {{ store.searchTerm }}
        </div>
        <div
            class="badge noto-sans-five link-like"
            tabindex="0"
            role="button"
            @click="store.reset()"
            @keyup.enter="store.reset()"
        >
            reset filters
        </div>
    </div>
</template>

<style scoped>
</style>