<script setup>
import { senators } from "../data/us-senators-with-stats.js";
import { store } from "../composables/store.js";

// STEP 2 - Process each form input individually.
function processInputs() {
    store.clearSelects();

    // Search term fields.
    if (store.searchTerm !== "") {
        const searchSelects = [];
        senators.map(function (senator) {
            const searchTermLc = store.searchTerm.toLowerCase();
            // Process input from search bar.
            senator.fullNames.map(function (fullName) {
                if (fullName.includes(searchTermLc)) {
                    searchSelects.push(senator.bioguideId);
                }
            });
        });
        // Removes dups. Ex: "Ed" returns Ed Markey and Edward Markey.
        const cleaned = [...new Set(searchSelects)];

        // Push matching senators to selects array.
        store.selects.push(cleaned);
    }

    // Party radio buttons.
    const byParty = Object.groupBy(senators, ({ party }) => party);
    if (store.party !== "all") {
        const partySelects = [];
        for (const item in byParty[store.party]) {
            partySelects.push(byParty[store.party][item].bioguideId);
        }
        store.selects.push(partySelects);
    }

    // Gender radio buttons.
    const byGender = Object.groupBy(senators, ({ gender }) => gender);
    if (store.gender !== "all") {
        const genderSelects = [];
        for (const item in byGender[store.gender]) {
            genderSelects.push(byGender[store.gender][item].bioguideId);
        }
        store.selects.push(genderSelects);
    }

    // Reelection radio buttons.
    const byReelection = Object.groupBy(senators, ({ reelection }) => reelection);
    if (store.reelection !== "all") {
        const reelectionSelects = [];
        for (const item in byReelection[store.reelection]) {
            reelectionSelects.push(byReelection[store.reelection][item].bioguideId);
        }
        store.selects.push(reelectionSelects);
    }

    // State pull down menu.
    const byStateAbbr = Object.groupBy(senators, ({ stateAbbr }) => stateAbbr);
    if (store.stateAbbr !== "all") {
        const stateAbbrSelects = [];
        for (const item in byStateAbbr[store.stateAbbr]) {
            stateAbbrSelects.push(byStateAbbr[store.stateAbbr][item].bioguideId);
        }
        store.selects.push(stateAbbrSelects);
    }
    // Filter arrays within selects array to find common senators.
    store.commons = store.selects.reduce((p,c) => p.filter(e => c.includes(e)));

    // Hide the menu.
    store.hideMenu();

    // If no matching senators, display "no results".
    store.checkNoResults();
}

// STEP 1 - Check what user selected on form.
// If user selected no filters, show all senators.
// Otherwise, filter the senators.
function checkInputs() {
    if (store.searchTerm === "" && store.party === "all" && store.gender === "all" && store.reelection === "all" && store.stateAbbr === "all") {
        store.hideMenu();
        store.showAll();

    } else {
        store.hideMenu();
        processInputs();
    }
}
</script>

<template>
    <form v-if="store.menu" @submit.prevent="checkInputs()">
        <div class="search-box">
            <label for="search-term" class="roboto-condensed seven">Name</label>
            <input
                type="text"
                id="search-term"
                class="roboto-flex four"
                v-model="store.searchTerm"
                placeholder="Susan Collins"
            />
        </div>

        <fieldset>
            <legend class="roboto-condensed seven">Party</legend>
            <input type="radio" id="all-parties" value="all" v-model="store.party" />
            <label for="all-parties" class="roboto-flex four">All</label><br />
            <input type="radio" id="democrat" value="Democrat" v-model="store.party" />
            <label for="democrat" class="roboto-flex four">Democrat</label><br />
            <input type="radio" id="republican" value="Republican" v-model="store.party" />
            <label for="republican" class="roboto-flex four">Republican</label><br />
            <input type="radio" id="independent" value="Independent" v-model="store.party" />
            <label for="independent" class="roboto-flex four">Independent</label>
        </fieldset>

        <fieldset>
            <legend class="roboto-condensed seven">Gender</legend>
            <input type="radio" id="all-genders" value="all" v-model="store.gender" />
            <label for="all-genders" class="roboto-flex four">All</label><br />
            <input type="radio" id="male" value="male" v-model="store.gender" />
            <label for="male" class="roboto-flex four">Male</label><br />
            <input type="radio" id="female" value="female" v-model="store.gender" />
            <label for="female" class="roboto-flex four">Female</label>
        </fieldset>

        <fieldset>
            <legend class="roboto-condensed seven">Up for re-election</legend>
            <input type="radio" id="all-elections" value="all" v-model="store.reelection" />
            <label for="all-elections" class="roboto-flex four">All</label><br />
            <input type="radio" id="class1" value="class1" v-model="store.reelection" />
            <label for="class1" class="roboto-flex four">November 2024</label><br />
            <input type="radio" id="class2" value="class2" v-model="store.reelection" />
            <label for="class2" class="roboto-flex four">November 2026</label><br />
            <input type="radio" id="class3" value="class3" v-model="store.reelection" />
            <label for="class3" class="roboto-flex four">November 2028</label>
        </fieldset>

        <div class="states-box">
            <label for="states-list" class="roboto-condensed seven">State</label>
            <select
                id="states-list"
                v-model="store.stateAbbr"
            >
                <!--<option disabled value="">Please select one</option>-->
                <option value="all">All States</option>
                <option value="al">Alabama</option>
                <option value="ak">Alaska</option>
                <option value="az">Arizona</option>
                <option value="ar">Arkansas</option>
                <option value="ca">California</option>
                <option value="co">Colorado</option>
                <option value="ct">Connecticut</option>
                <option value="de">Delaware</option>
                <option value="fl">Florida</option>
                <option value="ga">Georgia</option>
                <option value="hi">Hawaii</option>
                <option value="id">Idaho</option>
                <option value="il">Illinois</option>
                <option value="in">Indiana</option>
                <option value="ia">Iowa</option>
                <option value="ks">Kansas</option>
                <option value="ky">Kentucky</option>
                <option value="la">Louisiana</option>
                <option value="me">Maine</option>
                <option value="md">Maryland</option>
                <option value="ma">Massachusetts</option>
                <option value="mi">Michigan</option>
                <option value="mn">Minnesota</option>
                <option value="ms">Mississippi</option>
                <option value="mo">Missouri</option>
                <option value="mt">Montana</option>
                <option value="ne">Nebraska</option>
                <option value="nv">Nevada</option>
                <option value="nh">New Hampshire</option>
                <option value="nj">New Jersey</option>
                <option value="nm">New Mexico</option>
                <option value="ny">New York</option>
                <option value="nc">North Carolina</option>
                <option value="nd">North Dakota</option>
                <option value="oh">Ohio</option>
                <option value="ok">Oklahoma</option>
                <option value="or">Oregon</option>
                <option value="pa">Pennsylvania</option>
                <option value="ri">Rhode Island</option>
                <option value="sc">South Carolina</option>
                <option value="sd">South Dakota</option>
                <option value="tn">Tennessee</option>
                <option value="tx">Texas</option>
                <option value="ut">Utah</option>
                <option value="vt">Vermont</option>
                <option value="va">Virginia</option>
                <option value="wa">Washington</option>
                <option value="wv">West Virginia</option>
                <option value="wi">Wisconsin</option>
                <option value="wy">Wyoming</option>
            </select>
        </div>

        <div class="btn-box">
            <!-- @click.prevent keeps menu open when user clears inputs -->
            <button id="btn-clear" class="roboto-flex four" @click.prevent="store.clearAll()">Clear</button>
            <button id="btn-submit" class="roboto-flex four" type="submit">Submit</button>   
        </div>
    </form>
</template>

<style scoped>
</style>