<script setup>
defineProps({
    headline: {
        type: String,
        required: true
    }
});

import { store } from "../composables/store.js";
</script>

<template>
    <header>
        <!-- US Senate seal  
        <figure class="seal-box">
            <img src="/images/us-senate-logo.svg" alt="decorative seal for the United States Senate">
            <figcaption hidden>seal, United States Senate</figcaption>
        </figure>-->

        <!-- Headline -->
        <h1 class="roboto-flex five">{{ headline }}</h1>

        <!-- Menu "hamburger" icon -->
        <figure
            v-if="!store.menu"
            class="menu-icon"
            @click="store.showMenu()"
            @keyup.enter="store.showMenu()"
            role="button"
            tabindex="0"
            aria-haspopup="menu"
        >
            <img src="/images/menu-icon-32.svg" alt="three horizontal lines 'hamburger' menu icon">
            <figcaption hidden>icon for the website's menu</figcaption>
        </figure>

        <!-- Close "x" icon -->
        <figure
            v-if="store.menu"
            class="menu-icon"
            @click="store.hideMenu()"
            @keyup.enter="store.hideMenu()"
            role="button"
            tabindex="0"
            aria-haspopup="menu"
        >
            <img src="/images/close-icon-32.svg" alt="the letter 'x'">
            <figcaption hidden>icon to close an open dialogue</figcaption>
        </figure>
    </header>
</template>

<style scoped>
</style>