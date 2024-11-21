import { reactive } from "vue";
import { senators } from "../data/us-senators-with-stats.js";

export const store = reactive({
    badges: false,
    searchTerm: "",
    party: "all",
    gender: "all",
    reelection: "all",
    stateAbbr: "all",
    selects: [],
    commons: [],
    menu: false,
    noResults: false,
    showMenu: function() {
        const body = document.querySelector("body");
        store.menu = true;
        body.style.overflow = "hidden";
        store.badges = true;
    },
    hideMenu: function() {
        const body = document.querySelector("body");
        store.menu = false;
        body.style.overflow = "scroll";
    },
    checkNoResults: function() {
        if (store.commons.length === 0) {
            store.noResults = true;
        } else {
            store.noResults = false;
        }
    },
    clearSelects: function() {
        store.selects.length = 0;
    },
    showAll: function() {
        senators.map((senator)=> {
            store.commons.push(senator.bioguideId);
        });
    },
    clearAll: function() {
        store.searchTerm = "";
        store.party = "all";
        store.gender = "all";
        store.reelection = "all";
        store.stateAbbr = "all";
        store.noResults = false;
        store.showMenu();
    },
    reset: function() {
        store.searchTerm = "";
        store.party = "all";
        store.gender = "all";
        store.reelection = "all";
        store.stateAbbr = "all";
        store.noResults = false;
        store.showAll();
    }
});