<template>
<div id="app">
    <v-app>
        <v-content>
            <!--Header-->
            <v-toolbar color="green lighten-1">
                <h1>graducate</h1>
                <ul>
                    <v-btn v-if="currentUser" @click="toggleMatchesPage()">My Matches</v-btn>
                    <v-btn v-if="currentUser" @click="toggleProfilePage()">My Profile</v-btn>
                    <v-btn v-if="!currentUser" @click="toggleSignUpPage()">Sign Up</v-btn>
                    <v-btn v-if="!currentUser" @click="toggleLoginPage()">Sign In</v-btn>
                    <v-btn v-if="currentUser" @click="toggleGraphicsPage()">Logout</v-btn>
                </ul>
            </v-toolbar>

            <!--TODO: split into different containers?-->
            <v-container>
                <!--Idle graphics-->
                <graphics v-if="showGraphicsPage()"></graphics>
                
                <!--Log in-->
                <sign-in v-if="showLoginPage()" :user="currentUser" :setUser="setUser" 
                :profile="showProfilePage" :graphics="toggleGraphicsPage" :home="toggleHomePage"></sign-in>

                <!--Create profile-->
                <sign-up v-if="showSignUpPage()" :setUser="setUser" :user="currentUser" 
                :graphics="toggleGraphicsPage" :calculateMatches="calculateMatches" :toggleProfile="toggleProfilePage"></sign-up>

                <!--View profile-->
                <profile v-if="showProfilePage()" :user="currentUser"></profile>

                <!--View existing matches-->
                <div v-if="showMatchesPage()" id="container">
                    <div id="flex-display left">
                        <match-filter></match-filter>
                    </div>
                    <div id="flex-display right">
                        <match-header :user="currentUser" :refreshMatches="calculateMatches"></match-header>

                        <v-container v-model="matches" v-for="match in getMatchesObj(currentUser)" :key="match">
                            <match :user="getUserObj(match)"></match>
                        </v-container>
                    </div>
                </div>
            </v-container>

            <!--Footer-->
            <v-footer app>
                <span>&copy; Molly Chen, 2018</span>
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
    components: { // other components that this component needs to render
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
            showHome: false,                    // match carousel
            showGraphics: true,                 // assumes user is signed out at page reload

            // user data
            currentUser: null,

            // matches data
            matches: []
        };
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
            this.showHome = false;
        },
        toggleMatchesPage() {
            this.showMatches = true;
            this.showProfile = false;
            this.signUp = false;
            this.showLogin = false;
            this.showGraphics = false;
            this.showHome = false;
        },
        toggleLoginPage(){
            this.showLogin = true;
            this.showMatches = false;
            this.showProfile = false;
            this.signUp = false;
            this.showGraphics = false;
            this.showHome = false;
        },
        toggleGraphicsPage(){
            this.showGraphics = true;
            this.showLogin = false;
            this.showMatches = false;
            this.showProfile = false;
            this.signUp = false;
            this.showHome = false;
            this.currentUser = null;        // TODO: check
        },
        toggleHomePage(){
            this.showHome = true;
            this.showGraphics = false;
            this.showLogin = false;
            this.showMatches = false;
            this.showProfile = false;
            this.signUp = false;
        },  
        // TODO: add checks for currentUser
        showSignUpPage() {
            return this.signUp && !this.showProfile && !this.showMatches && !this.showLogin;
        },
        showProfilePage() {
            return this.showProfile && !this.signUp && !this.showMatches && !this.showLogin;
        },
        showMatchesPage() {
            return this.showMatches && !this.signUp && !this.showProfile && !this.showLogin;
        },
        showLoginPage(){
            return this.showLogin && !this.showMatches && !this.signUp && !this.showProfile;  // TODO: fix
        },
        showGraphicsPage(){
            return this.showGraphics /*&& this.showLogin && !this.showMatches && !this.signUp && !this.showProfile*/;
        },
        showHomePage(){
            return this.showHome && this.currentUser;
        },
        signOut() {
            this.currentUser = null;
        },
        getMatchesObj(user){
          return this.matchesObj[user.uuid]
        },
        getUserObj(uuid){
            return this.userObj[uuid]
        },

        // dynamically calculate matches
        calculateMatches(user) {
            let uuid = user.uuid;
            let matchMap = new Map();

            let users = null;
            userRef.on('value', function (snapshot) {
                users = snapshot.val();
            });

            let matches = [];
            for (let u in users) {
                // make sure you don't match with yourself
                if (users[u].uuid != uuid){
                    console.log("User ", users[u]);
                    let score = this.matchScore(user, users[u]);
                    console.log("Match score: ", score);
                    if (score > 65) {
                        matches.push(users[u].uuid);
                    }
                }
            }

            // set final values in map and DB table
            matchMap.set(uuid, matches);
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
            forEach(u2.degrees, function (degree, key) { // TODO: change from id to key    
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
    /* margin: 0px 10px 0px 10px; */
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
</style>
