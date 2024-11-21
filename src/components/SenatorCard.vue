<script setup>
import { senators } from "../data/us-senators-with-stats.js";
import { store } from "../composables/store.js";
</script>

<template>
    <section>
        <!--<div v-if="store.menu" class="overlay"></div>-->
        <p
            v-if="store.noResults"
            id="no-results"
            class="roboto-flex four">
                No matching results.
        </p>
        <template v-for="senator in senators" :key="senator.bioguideId">
            <div v-if="store.commons.includes(senator.bioguideId)" class="card rounded-card">
                <dl>
                    <dt class="roboto-condensed seven">{{ senator.firstName }} {{ senator.lastName }}</dt>
                    <dd class="roboto-flex four">{{ senator.stateName }} ({{ senator.party.substring(0,1) }})</dd>
                    <dd class="roboto-flex four">Since {{ senator.assumedOffice }}</dd>
                    <dd class="roboto-flex four"><a :href="`https://www.${senator.website}`" target="_blank">{{ senator.website }}</a></dd>
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
    </section>
</template>

<style scoped>
</style>