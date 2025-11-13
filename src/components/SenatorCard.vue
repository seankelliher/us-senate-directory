<script setup>
import { senators } from "../data/us-senators-with-stats.js";
import { store } from "../composables/store.js";
</script>

<template>
    <section>
        <p
            v-if="store.noResults"
            id="no-results"
            class="noto-sans-four">
                No matching results.
        </p>
        <TransitionGroup name="cards">
        <template v-for="senator in senators" :key="senator.bioguideId">
            <div v-if="store.commons.includes(senator.bioguideId)" class="card rounded-card">
                <dl>
                    <dt class="noto-sans-eight">{{ senator.firstName }} {{ senator.lastName }}</dt>
                    <dd class="noto-sans-four">{{ senator.stateName }} ({{ senator.party.substring(0,1) }})</dd>
                    <dd class="noto-sans-four">Since {{ senator.assumedOffice }}</dd>
                    <dd class="noto-sans-four"><a :href="`https://www.${senator.website}`" target="_blank">{{ senator.website }}</a></dd>
                </dl>
                <figure class="portrait">
                    <img
                        :src="`./images/${senator.portrait}.jpg`"
                        :alt="`portrait of Senator ${senator.firstName} ${senator.lastName}`"
                        class="rounded-img"
                    >
                    <figcaption hidden>{{ senator.firstName }} {{ senator.lastName }}</figcaption>
                </figure>
            </div>
        </template>
        </TransitionGroup>
    </section>
</template>

<style scoped>
</style>