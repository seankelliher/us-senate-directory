<script setup>
import HeaderIcons from "./components/HeaderIcons.vue";
import BadgePanel from "./components/BadgePanel.vue";
import MenuForm from "./components/MenuForm.vue";
import SenatorCard from "./components/SenatorCard.vue";
import { store } from "./composables/store.js";
import { onMounted } from "vue";

onMounted(() => {
    store.showAll();
});
</script>

<template>
    <div id="container">
        <HeaderIcons headline="United States Senate" />
        <main>
            <div v-if="store.menu" class="overlay"></div>
            <BadgePanel />
            <MenuForm />
            <SenatorCard />
        </main>
    </div>
</template>

<style scoped>
</style>