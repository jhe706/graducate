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

            <v-container>
                <!--Idle graphics-->
                <graphics v-if="showGraphicsPage()"></graphics>
                
                <!--Log in-->
                <sign-in v-if="showLoginPage()" :user="currentUser" :setUser="setUser" 
                :profile="showProfilePage" :graphics="toggleGraphicsPage" :home="toggleHomePage"></sign-in>

                <!--Create profile-->
                <sign-up v-if="showSignUpPage()" :setUser="setUser" :user="currentUser" 
                :graphics="toggleGraphicsPage"></sign-up>

                <!--View profile-->
                <profile v-if="showProfilePage()" :user="currentUser"></profile>

                <!--Scroll through potential profiles on homepage-->
                <v-card v-if="showHomePage()"> <!--TODO: add discover carousel component-->
                    <!-- <discover></discover> -->
                
                    <v-carousel v-model="matches" v-for="match in getMatches(currentUser)" :key="match">
                        <match :user="currentUser" :toggleProfile="toggleProfilePage"></match>
                    </v-carousel>
                </v-card>

                <!--View existing matches-->
                <div v-if="showMatchesPage()" id="container">
                    <div id="flex-display left">
                        <match-filter></match-filter>
                    </div>
                    <div id="flex-display right">
                        <match-header :user="currentUser"></match-header>

                        <v-container v-model="matches" v-for="match in getMatches(currentUser)" :key="match">
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
            currentUser2: {                     // temporary for testing
                uuid: "42f9758b-0fbf-4aaf-9cfa-2406b1f8f942",
                firstName: "Molly",
                lastName: "Chen",
                email: "molly.chen@duke.edu",
                phoneNumber: "8322825093",
                status: "Undergraduate",
                gradYear: "2019",
                school: "Trinity",
                degrees: {
                    "0": {
                        major: "Computer Science",
                        type: "BS",
                        concentration: "Software"
                    },
                    "1": {
                        major: "Psychology",
                        type: "BA",
                        concentration: "Abnormal"
                    }
                },
                hometown: {
                    city: "Cary",
                    state: "North Carolina",
                    country: "United States"
                },
                interests: ["Art", "Coding", "Travel", "Music"],
                advice: [
                    "Duke's major departments",
                    "Graduate programs or professional schools",
                    "Duke extracurriculars"
                ],
                bio: "Hi, I'm Molly!",
            },

            // matches data
            matches: []
            // matches: this.getMatches(this.currentUser)
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
        getMatches(user){
          return this.matchesObj[user.uuid]
        },
        getUserObj(uuid){
            return this.userObj[uuid]
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
