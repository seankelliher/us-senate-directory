<script setup>
import { senators } from "../data/us-senators-with-stats.js";
import { ref, computed, onMounted } from "vue";

// Variables for categories.
const searchTerm = ref("");
const party = ref("All Parties");
const gender = ref("All Genders");
const reelection = ref("All Elections");
const homeState = ref("All States");

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

// Variables for counts in form.
const byParty = ref([]);
const byPartyDem = ref(0);
const byPartyRep = ref(0);
const byPartyInd = ref(0);

const byGender = ref([]);
const byGenderMale = ref(0);
const byGenderFemale = ref(0);

const bySenateClass = ref([]);
const bySenateClass1 = ref(0); // Nov 2024
const bySenateClass2 = ref(0); // Nov 2026
const bySenateClass3 = ref(0); // Nov 2028

// When component mounts...
onMounted(() => {
    // Hides the "no results" message
    const noResults = document.getElementById("no-results");
    noResults.style.display = "none";

    // Get the "submit" button, simulate click to display all Senators.
    const btn = document.getElementById("btn-submit");
    btn.click();

    // Party counts within form.
    byParty.value = Object.groupBy(senators, ({ party }) => party);
    byPartyDem.value = byParty.value.Democrat.length;
    byPartyRep.value = byParty.value.Republican.length;
    byPartyInd.value = byParty.value.Independent.length;

    // Gender counts within form.
    byGender.value = Object.groupBy(senators, ({ gender }) => gender);
    byGenderMale.value = byGender.value.male.length;
    byGenderFemale.value = byGender.value.female.length;

    // Senate class counts within form.
    bySenateClass.value = Object.groupBy(senators, ({ senateClass }) => senateClass);
    bySenateClass1.value = bySenateClass.value.class1.length;
    bySenateClass2.value = bySenateClass.value.class2.length;
    bySenateClass3.value = bySenateClass.value.class3.length;
});

// Checks results after user clicks "submit". Displays "no results" if needed.
function checkCommons() {
    const commonsLength = commons.value.length;
    const noResults = document.getElementById("no-results");
    if (commonsLength === 0) {
        noResults.style.display = "flex";
    }
    if (commonsLength !== 0) {
        noResults.style.display = "none";
    }
}

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
        if (party.value === "All Parties") {
            selects.value[1].push(senator.bioguideId);
        }
        if (senator.party === party.value) {
            selects.value[1].push(senator.bioguideId);
        }
        // Process gender in radio buttons.
        if (gender.value === "All Genders") {
            selects.value[2].push(senator.bioguideId);
        }
        if (senator.gender === gender.value) {
            selects.value[2].push(senator.bioguideId);
        }
        // Process reelection (class) in radio buttons.
        if (reelection.value === "All Elections") {
            selects.value[3].push(senator.bioguideId);
        }
        if (senator.senateClass === reelection.value) {
            selects.value[3].push(senator.bioguideId);
        }
        // Process state in selection (pull down).
        if (homeState.value === "All States") {
            selects.value[4].push(senator.bioguideId);
        }
        if (senator.state === homeState.value) {
            selects.value[4].push(senator.bioguideId);
        }
    });
    checkCommons();
}

function clearAll() {
    searchTerm.value = "";
    party.value = "All Parties";
    gender.value = "All Genders";
    reelection.value = "All Elections";
    homeState.value = "All States";
}

</script>

<template>
    <main>
        <form @submit.prevent="processInputs()">
            <figure class="seal-box">
                <img src="/images/us-senate-logo.svg" alt="decorative seal for the United States Senate">
                <figcaption hidden>seal, United States Senate</figcaption>
            </figure>

            <div class="search-box">
                <label for="search-term">Name</label>
                <input
                    type="text"
                    id="search-term"
                    v-model="searchTerm"
                    placeholder="eg, Susan Collins"
                />
            </div>

            <fieldset>
                <legend>Party</legend>
                <input type="radio" id="all-parties" value="All Parties" v-model="party" />
                <label for="all-parties">All</label><br />
                <input type="radio" id="democrat" value="Democrat" v-model="party" />
                <label for="democrat">Democrat <span class="count">{{ byPartyDem }}</span></label><br />
                <input type="radio" id="republican" value="Republican" v-model="party" />
                <label for="republican">Republican <span class="count">{{ byPartyRep }}</span></label><br />
                <input type="radio" id="independent" value="Independent" v-model="party" />
                <label for="independent">Independent <span class="count">{{ byPartyInd }}</span></label>
            </fieldset>

            <fieldset>
                <legend>Gender</legend>
                <input type="radio" id="all-genders" value="All Genders" v-model="gender" />
                <label for="all-genders">All</label><br />
                <input type="radio" id="male" value="male" v-model="gender" />
                <label for="male">Male <span class="count">{{ byGenderMale }}</span></label><br />
                <input type="radio" id="female" value="female" v-model="gender" />
                <label for="female">Female <span class="count">{{ byGenderFemale }}</span></label>
            </fieldset>

            <fieldset>
                <legend>Up for re-election</legend>
                <input type="radio" id="all-elections" value="All Elections" v-model="reelection" />
                <label for="all-elections">All</label><br />
                <input type="radio" id="class1" value="class1" v-model="reelection" />
                <label for="class1">November 2024 <span class="count">{{ bySenateClass1 }}</span></label><br />
                <input type="radio" id="class2" value="class2" v-model="reelection" />
                <label for="class2">November 2026 <span class="count">{{ bySenateClass2 }}</span></label><br />
                <input type="radio" id="class3" value="class3" v-model="reelection" />
                <label for="class3">November 2028 <span class="count">{{ bySenateClass3 }}</span></label>
            </fieldset>

            <div class="states-box">
                <label for="states-list">State</label>
                <select id="states-list" v-model="homeState">
                    <!--<option disabled value="">Please select one</option>-->
                    <option>All States</option>
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
            </div>

            <div class="btn-box">
                <button id="btn-clear" @click="clearAll()">Clear</button>
                <button id="btn-submit" type="submit">Submit</button>   
            </div>
        </form>
        <section>
            <p id="no-results">No matching results.</p>
            <template v-for="senator in senators" :key="senator.bioguideId">
                <div v-if="commons.includes(senator.bioguideId)" class="card">
                    <figure class="portrait">
                        <img
                            :src="`./images/${senator.portrait}.jpg`"
                            :alt="`portrait of Senator ${senator.firstName} ${senator.lastName}`"
                            class="rounded"
                        >
                        <figcaption hidden>{{ senator.firstName }} {{ senator.lastName }}</figcaption>
                    </figure>
                    <dl>
                        <dt>{{ senator.firstName }} {{ senator.lastName }}</dt>
                        <dd>{{ senator.state }} - {{ senator.party }}</dd>
                        <dd>Since {{ senator.assumedOffice }}</dd>
                        <dd><a :href="`https://www.${senator.website}`" target="_blank">{{ senator.website }}</a></dd>
                    </dl>
                </div>
            </template>
        </section>
    </main>
</template>

<style scoped>
</style>