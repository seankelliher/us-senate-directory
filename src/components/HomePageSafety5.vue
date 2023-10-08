<script setup>
import { senators } from "../data/us-senators-with-tags.js";
import { ref } from "vue";

// Variables for categories.
const searchTerm = ref("");
const party = ref("");
const gender = ref("");
const reelection = ref("");
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
const commons = selects.value.shift().reduce(function(res, v) {
    if (res.indexOf(v) === -1 && selects.value.every(function(a) {
        return a.indexOf(v) !== -1;
    })) res.push(v);
    return res;
}, []);




// NEED TO ADD A "SUBMIT" LIKE BUTTON SO FUNCTION GETS INVOKED ONCE.
// Function to process user selections.
function processInputs() {
    // selects.value.length = 0;
    senators.map(function (senator) {
        const searchTermLc = searchTerm.value.toLowerCase();
        // Process names in search bar.
        senator.fullNames.map(function (fullName) {
            if (fullName.includes(searchTermLc)) {
                selects.value[0].push(senator.bioguideId);
            }
        });
        // Process party in radio buttons.
        if (senator.party === party.value) {
            selects.value[1].push(senator.bioguideId);
        }
        // Process gender in radio buttons.
        if (senator.gender === gender.value) {
            selects.value[2].push(senator.bioguideId);
        }
        // Process reelection (class) in radio buttons.
        if (senator.senateClass === reelection.value) {
            selects.value[3].push(senator.bioguideId);
        }
        // Process state in selection (pull down).
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
        <input type="radio" id="democrat" value="Democrat" v-model="party" />
        <label for="democrat">Democrat</label>
        <input type="radio" id="republican" value="Republican" v-model="party" />
        <label for="republican">Republican</label>
        <input type="radio" id="independent" value="Independent" v-model="party" />
        <label for="independent">Independent</label>

        <div>Gender</div>
        <input type="radio" id="male" value="male" v-model="gender" />
        <label for="male">male</label>
        <input type="radio" id="female" value="female" v-model="gender" />
        <label for="female">female</label>

        <div>Up for re-election</div>
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
