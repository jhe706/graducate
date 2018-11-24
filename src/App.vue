<template>
<div id="app">
    <v-app>
        <v-content>
            <!--Header-->
            <v-toolbar color="green lighten-1" id="toolbar">
                <h1 style="text-align:center">graducate</h1>
                <ul>
                    <v-btn v-if="currentUser" @click="toggleMatchesPage()">My Matches</v-btn>
                    <v-btn v-if="currentUser" @click="toggleProfilePage()">My Profile</v-btn>
                    <v-btn v-if="!currentUser" @click="toggleSignUpPage()">Sign Up</v-btn>
                    <v-btn v-if="!currentUser" @click="toggleLoginPage()">Sign In</v-btn>
                    <v-btn v-if="currentUser" @click="toggleGraphicsPage()">Logout</v-btn>
                </ul>
            </v-toolbar>

            <v-container>
                <!--Idle graphics-->
                <graphics v-if="showGraphicsPage()"></graphics>

                <!--Log in-->
                <sign-in v-if="showLoginPage()" :user="currentUser" :setUser="setUser" :profile="showProfilePage" :graphics="toggleGraphicsPage" :toggleProfile="toggleProfilePage"></sign-in>

                <!--Create profile-->
                <sign-up v-if="showSignUpPage()" :setUser="setUser" :user="currentUser" :graphics="toggleGraphicsPage" :calculateMatches="calculateMatches" :toggleProfile="toggleProfilePage"></sign-up>

                <!--View profile-->
                <profile v-if="showProfilePage()" :user="currentUser"></profile>

                <!--View existing matches-->
                <div v-if="showMatchesPage()" id="container">
                    <!--Match filter-->
                    <v-flex xs3>
                        <!-- <match-filter></match-filter> -->
                        <v-card>
                            <v-container grid-list-md text-xs-center id="matches-filter" style="padding: 20px; margin: 15px;">
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <div id="matches-filter">
                                            <h1>Filters</h1>
                                        </div>
                                        <div id="matches-filter">
                                            <h3>School</h3>
                                            <h3>{{selectedSchools}}</h3>
                                            <!-- <v-checkbox v-model="selectedSchools" v-for="school in schools" :value="schools[school]" :key="school"></v-checkbox> -->
                                            <v-checkbox v-model="selectedSchools" :label="schools[0]" :value="schools[0]"></v-checkbox>
                                            <v-checkbox v-model="selectedSchools" :label="schools[1]" :value="schools[1]"></v-checkbox>
                                            <v-checkbox v-model="selectedSchools" :label="schools[2]" :value="schools[2]"></v-checkbox>
                                            <v-checkbox v-model="selectedSchools" :label="schools[3]" :value="schools[3]"></v-checkbox>
                                            <v-checkbox v-model="selectedSchools" :label="schools[4]" :value="schools[4]"></v-checkbox>
                                            <v-checkbox v-model="selectedSchools" :label="schools[5]" :value="schools[5]"></v-checkbox>
                                        </div>
                                        <!-- <div id="matches-filter">
                                            <v-btn @click="filterApplied = true">Apply</v-btn>
                                        </div> -->
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>

                    <!--Display matches and header-->
                    <v-flex xs9 style="margin-left: 50px">
                        <match-header 
                            :user="currentUser" 
                            :refreshMatches="calculateMatches" 
                            :getMatchesObj="getMatchesObj"
                            :filterApplied="filterApplied"
                            :selectedSchools="selectedSchools"
                            :applyFilter="applyFilter"
                        ></match-header>
                         <div v-if="filterApplied">
                            <div v-for="match in applyFilter(currentUser, selectedSchools)" :key="match">                           
                                <match :user="match" :score="filteredScore(currentUser, match)"></match>
                            </div>
                        </div>
                        <div v-else>
                            <div v-for="match in getSortedMatches(currentUser)" :key="match">                           
                                <match :user="getUserObj(match.uuid)" :score="match.score"></match>
                            </div>
                        </div>
                    </v-flex>
                </div>
            </v-container>

            <!--Footer-->
            <v-footer app>
                <span>&copy; Grunch Studios, 2018</span>
            </v-footer>
        </v-content>
    </v-app>
</div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import Firebase from 'firebase';
import {
    db,
    userRef,
    matchesRef
} from "./database";
import Discover from "./components/Discover";
import Header from "./components/Header";
import Graphics from "./components/Graphics";
import Match from "./components/Match";
import MatchFilter from "./components/MatchFilter";
import MatchHeader from "./components/MatchHeader";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
let forEach = require('lodash.foreach');

export default {
    name: "App",
    components: { 
        Discover,
        Header,
        Graphics,
        Match,
        MatchFilter,
        MatchHeader,
        Profile,
        SignIn,
        SignUp
    },
    data() {
        return {
            // show-hide
            right: null,
            signUp: false,
            showProfile: false,
            showMatches: false,
            showLogin: false,
            showGraphics: true,     // assumes user is signed out at page reload

            // user data
            currentUser: null,

            // matches data
            matches: [],
            schools: ["Trinity", "Pratt", "Law", "Sanford", "Nicholas School", "Fuqua"],
            selectedSchools: []

            // filtering
            // filterApplied: false
        };
    },
    computed: {
        filterApplied(){
            if (this.selectedSchools.length === 0){
                return false;
            }
            return true;
        }
    },
    firebase: { // reference passed b/w Firebase and program
        user: userRef,
        userObj: {
            source: userRef,
            asObject: true
        },
        matches: matchesRef,
        matchesObj: {
            source: matchesRef,
            asObject: true
        }
    },
    methods: {
        setUser(user) {
            this.currentUser = user;
        },

        // show hide
        toggleSignUpPage() {
            this.signUp = true;
            this.showProfile = false;
            this.showMatches = false;
            this.showLogin = false;
            this.showGraphics = false;
            this.showHome = false;
        },
        toggleProfilePage() {
            this.showProfile = true;
            this.signUp = false;
            this.showMatches = false;
            this.showLogin = false;
            this.showGraphics = false;
        },
        toggleMatchesPage() {
            this.showMatches = true;
            this.showProfile = false;
            this.signUp = false;
            this.showLogin = false;
            this.showGraphics = false;
        },
        toggleLoginPage() {
            this.showLogin = true;
            this.showMatches = false;
            this.showProfile = false;
            this.signUp = false;
            this.showGraphics = false;
        },
        toggleGraphicsPage() {
            this.showGraphics = true;
            this.showLogin = false;
            this.showMatches = false;
            this.showProfile = false;
            this.signUp = false;
            this.currentUser = null;
        },
        showSignUpPage() {
            return this.signUp && !this.showProfile && !this.showMatches && !this.showLogin;
        },
        showProfilePage() {
            return this.showProfile && !this.signUp && !this.showMatches && !this.showLogin;
        },
        showMatchesPage() {
            return this.showMatches && !this.signUp && !this.showProfile && !this.showLogin;
        },
        showLoginPage() {
            return this.showLogin && !this.showMatches && !this.signUp && !this.showProfile;
        },
        showGraphicsPage() {
            return this.showGraphics;
        },
        showHomePage() {
            return this.showHome && this.currentUser;
        },
        signOut() {
            this.currentUser = null;
        },

        // object retrieval
        getMatchesObj(user) {
            return this.matchesObj[user.uuid] ? this.matchesObj[user.uuid] : null;
        },
        getUserObj(uuid) {
            return this.userObj[uuid] ? this.userObj[uuid] : null;
        },

        // filters
        getSortedMatches(user){
            let myMatches = [...this.matchesObj[user.uuid]];        // spread operator to create new instance, prevent infinite loop
            let direction = "desc";
            let sorted = myMatches.sort(this.compareValues("score", direction));
            return sorted ? sorted : null;
        },
        applyFilter(user, key){
            this.filterApplied = true;
            let myMatches = [...this.matchesObj[user.uuid]];

            // key = school
            if (!this.selectedSchools.length) {                     // no filter selected
                return myMatches;
            }
            let filtered = [];
            for (let match in myMatches){
                let userObj = this.getUserObj(myMatches[match].uuid);
                if (this.selectedSchools.includes(userObj.school)){
                    filtered.push(userObj);
                }
            }
            return filtered;    // should return a list of USERS that point to each match's user obj
        },
        filteredScore(user, match){
            let matches = this.getMatchesObj(user);
            let score = 0;
            if (!matches){
                return 0;
            }
            for (let m in matches){
                if (matches[m].uuid === match.uuid){
                    score = matches[m].score;
                    return score;
                }
            }
            return 0;
        },
        compareValues(key, order){
            return function(a, b){
                if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)){
                    return 0;
                }
                let varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
                let varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
                let comparison = 0;
                if (varA > varB){
                    comparison = 1;
                } else if (varA < varB){
                    comparison = -1;
                }
                return (
                    (order === 'desc') ? (comparison * -1) : comparison       
                );
            }
        },

        // matches
        calculateMatches(user) {
            let uuid = user.uuid;
            let matchScores = [];

            let users = null;
            userRef.on('value', function (snapshot) {
                users = snapshot.val();
            });

            let matches = [];
            for (let u in users) {
                // make sure you don't match with yourself
                if (users[u].uuid != uuid) {
                    console.log("User ", users[u]);
                    let score = this.matchScore(user, users[u]);
                    console.log("Match score: ", score);
                    if (score >= 65) {
                        matches.push({ // make obj instead
                            firstName: users[u].firstName,
                            lastName: users[u].lastName,
                            uuid: users[u].uuid,
                            score: score
                        });
                    }
                }
            }

            matchesRef.child(uuid).set(matches);
            console.log("User's matches: ", matches);

            return matches;
        },

        matchScore(u1, u2) {
            let rawScore = 0;
            let adviceScore = 0;
            let degreeScore = 0;
            let interestsScore = 0;
            let concentrationScore = 0;
            let hometownScore = 0;

            // advice
            console.log(u1.advice);
            console.log(u2.advice);
            let intersection = u1.advice.filter(value => -1 !== u2.advice.indexOf(value));
            adviceScore = intersection.length * 6.67;

            // degree
            if (u1.school === u2.school) {
                degreeScore += 5;
            }

            let u1Majors = [];
            let u2Majors = [];
            let u1Concentrations = [];
            let u2Concentrations = [];
            forEach(u1.degrees, function (degree, key) {
                if (u1.status === "Undergraduate") {
                    console.log("My major: ", degree.major);
                    u1Majors.push(degree.major);
                } else {
                    console.log("My prev major: ", degree.previousMajor);
                    u1Majors.push(degree.previousMajor);
                }
                u1Concentrations.push(degree.concentration);
            });
            forEach(u2.degrees, function (degree, key) {    
                if (u2.status === "Undergraduate") {
                    console.log("Their major: ", degree.major);
                    u2Majors.push(degree.major);
                } else {
                    console.log("Their prev major: ", degree.previousMajor);
                    u2Majors.push(degree.previousMajor);
                }
                u2Concentrations.push(degree.concentration);
            });

            intersection = u1Majors.filter(value => -1 !== u2Majors.indexOf(value));
            degreeScore += intersection.length * 20;
            intersection = u1Concentrations.filter(value => -1 !== u2Concentrations.indexOf(value));
            degreeScore += intersection.length * 10;
            console.log("degreeScore ", degreeScore);

            // interests
            intersection = u1.interests.filter(value => -1 !== u2.interests.indexOf(value));
            interestsScore = intersection.length * 2;
            console.log("interestsScore ", interestsScore);

            // hometown
            if (u1.hometown.country === u2.hometown.country) {
                hometownScore += 5;
            }
            if (u1.hometown.state && u2.hometown.state && (u1.hometown.state === u2.hometown.state)) {
                hometownScore += 2.5;
                if (u1.hometown.city === u2.hometown.city) {
                    hometownScore += 2.5;
                }
            } else {
                if (u1.hometown.city === u2.hometown.city) {
                    hometownScore += 5;
                }
            }
            console.log("hometownScore ", hometownScore);

            rawScore = 2 * (adviceScore + degreeScore + interestsScore + hometownScore);
            console.log("raw match score ", rawScore);

            return Math.min(rawScore, 100);
        }
    },
    props: ['match']
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#flex-display {
    display: flex;
}

#left {
    width: 20%;
    flex-direction: column;
    margin-right: 40px;
}

#right {
    width: 80%;
    flex-direction: row;
}

#container {
    display: flex;
    width: 100%;
}

#toolbar {
    display: flex;
    justify-content: flex-end;
}

/* #title {
    display: flex;
    justify-content: flex-start;
} */

#matches-filter {
    display: flex;
    flex-direction: column;
    /* margin: auto 10px; */
    justify-content: space-between;
    align-items: left;
    padding: 5px;
    /* width: 20%; */
    /* margin-right: 10px; */
    text-align: left;
}
</style>