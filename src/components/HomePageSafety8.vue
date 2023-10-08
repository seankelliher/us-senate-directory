<script setup>
import { senators } from "../data/us-senators-with-tags.js";
import { ref, computed } from "vue";

// Variables for categories.
const searchTerm = ref("");
const party = ref("All Party");
const gender = ref("All Gender");
const reelection = ref("All Election");
const homeState = ref("");

// Variable for selected Senators.
const selects = ref([
    [], // [0] searchbar
    [], // [1] party
    [], // [2] gender
    [], // [3] reelection
    [] // [4] homeState
]);

// Variable for common items in categories.
const commons = computed(() => {
    return selects.value.reduce((p,c) => p.filter(e => c.includes(e)));
});

// NEED TO ADD SOMETHING SO IF USER DOES NOT CHOOSE A CATEGORY, ALL SENATORS ARE INCLUDED.

// Function to process user selections.
function processInputs() {
    // Empty arrays in selects.
    selects.value[0].length = 0;
    selects.value[1].length = 0;
    selects.value[2].length = 0;
    selects.value[3].length = 0;
    selects.value[4].length = 0;

    // Loop through senators data.
    senators.map(function (senator) {
        const searchTermLc = searchTerm.value.toLowerCase();
        // Process names in search bar.
        if (searchTerm.value === "") {
            selects.value[0].push(senator.bioguideId);
        }
        if (searchTerm.value !== "") {
            senator.fullNames.map(function (fullName) {
                if (fullName.includes(searchTermLc)) {
                    selects.value[0].push(senator.bioguideId);
                }
            });
        }
        // Process party in radio buttons.
        if (party.value === "All Party") {
            selects.value[1].push(senator.bioguideId);
        }
        if (senator.party === party.value) {
            selects.value[1].push(senator.bioguideId);
        }
        // Process gender in radio buttons.
        if (gender.value === "All Gender") {
            selects.value[2].push(senator.bioguideId);
        }
        if (senator.gender === gender.value) {
            selects.value[2].push(senator.bioguideId);
        }
        // Process reelection (class) in radio buttons.
        if (reelection.value === "All Election") {
            selects.value[3].push(senator.bioguideId);
        }
        if (senator.senateClass === reelection.value) {
            selects.value[3].push(senator.bioguideId);
        }
        // Process state in selection (pull down).
        if (homeState.value === "") {
            selects.value[4].push(senator.bioguideId);
        }
        if (senator.state === homeState.value) {
            selects.value[4].push(senator.bioguideId);
        }
    });
}
</script>

<template>
    <p>{{ searchTerm }} {{ party }} {{ gender }} {{ reelection }} {{ homeState }}</p>
    <p>Selects 0 {{ selects[0] }}</p>
    <p>Selects 1 {{ selects[1] }}</p>
    <p>Selects 2 {{ selects[2] }}</p>
    <p>Selects 3 {{ selects[3] }}</p>
    <p>Selects 4 {{ selects[4] }}</p>

    <form @submit.prevent="processInputs()">
        <label>Name</label>
        <input
            :tabindex="0"
            v-model="searchTerm"
            placeholder="Ex., Susan Collins"
        />

        <div>Party</div>
        <input type="radio" id="all-party" value="All Party" v-model="party" />
        <label for="all-party">All</label>
        <input type="radio" id="democrat" value="Democrat" v-model="party" />
        <label for="democrat">Democrat</label>
        <input type="radio" id="republican" value="Republican" v-model="party" />
        <label for="republican">Republican</label>
        <input type="radio" id="independent" value="Independent" v-model="party" />
        <label for="independent">Independent</label>

        <div>Gender</div>
        <input type="radio" id="all-gender" value="All Gender" v-model="gender" />
        <label for="all-gender">All</label>
        <input type="radio" id="male" value="male" v-model="gender" />
        <label for="male">male</label>
        <input type="radio" id="female" value="female" v-model="gender" />
        <label for="female">female</label>

        <div>Up for re-election</div>
        <input type="radio" id="all-election" value="All Election" v-model="reelection" />
        <label for="all-election">All</label>
        <input type="radio" id="class1" value="class1" v-model="reelection" />
        <label for="class1">November 2024</label>
        <input type="radio" id="class2" value="class2" v-model="reelection" />
        <label for="class2">November 2026</label>
        <input type="radio" id="class3" value="class3" v-model="reelection" />
        <label for="class3">November 2028</label>

        <div>State</div>
        <select v-model="homeState">
            <option disabled value="">Please select one</option>
            <option>Alabama</option>
            <option>Alaska</option>
            <option>Arizona</option>
            <option>Arkansas</option>
            <option>California</option>
            <option>Colorado</option>
            <option>Connecticut</option>
            <option>Delaware</option>
            <option>Florida</option>
            <option>Georgia</option>
            <option>Hawaii</option>
            <option>Idaho</option>
            <option>Illinois</option>
            <option>Indiana</option>
            <option>Iowa</option>
            <option>Kansas</option>
            <option>Kentucky</option>
            <option>Louisiana</option>
            <option>Maine</option>
            <option>Maryland</option>
            <option>Massachusetts</option>
            <option>Michigan</option>
            <option>Minnesota</option>
            <option>Mississippi</option>
            <option>Missouri</option>
            <option>Montana</option>
            <option>Nebraska</option>
            <option>Nevada</option>
            <option>New Hampshire</option>
            <option>New Jersey</option>
            <option>New Mexico</option>
            <option>New York</option>
            <option>North Carolina</option>
            <option>North Dakota</option>
            <option>Ohio</option>
            <option>Oklahoma</option>
            <option>Oregon</option>
            <option>Pennsylvania</option>
            <option>Rhode Island</option>
            <option>South Carolina</option>
            <option>South Dakota</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Utah</option>
            <option>Vermont</option>
            <option>Virginia</option>
            <option>Washington</option>
            <option>West Virginia</option>
            <option>Wisconsin</option>
            <option>Wyoming</option>
        </select>

        <button type="submit">Submit</button>

    </form>
    <section v-for="senator in senators" :key="senator.bioguideId">
        <div v-if="commons.includes(senator.bioguideId)">
            <p>{{ senator.firstName }} {{ senator.lastName }}</p>
        </div>
    </section>
</template>

<style scoped>

</style>