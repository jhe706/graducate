<template>
<div id="app">
    <v-app>
        <v-content>
            <!--Header-->
            <v-toolbar color="green lighten-1">
                <h1>graducate</h1>
                <!-- <authentication class="z nav navbar-nav navbar-right"></authentication> -->
                <ul>
                    <!-- :disabled="!currentUser"-->
                    <v-btn v-if="currentUser" @click="toggleMatchesPage()">My Matches</v-btn>
                    <v-btn v-if="currentUser" @click="toggleProfilePage()">My Profile</v-btn>
                    <v-btn v-if="!currentUser" @click="toggleSignUpPage()">Sign Up</v-btn>
                    <v-btn v-if="!currentUser" @click="signIn()">Sign In</v-btn>
                    <v-btn v-if="currentUser" @click="signOut()">Logout</v-btn>
                </ul>
            </v-toolbar>

            <!--TODO: Instead of placing all possible homepage views in one container, use conditional render/routing-->
            <v-container>
                <!--Create profile-->
                <sign-up v-if="showSignUpPage()" :setUser="setUser" :user="currentUser"></sign-up>

                <!--View profile-->
                <profile v-if="showProfilePage()" :user="currentUser"></profile>

                <!--Scroll through potential matches on homepage-->
                <!-- <v-card>
                    <v-carousel>
                        <v-carousel-item v-for="(match,m) in matches" :key="m" :src="match.src" :onClick="checkJSON"></v-carousel-item>
                        <v-carousel-item>
                            <match :user="currentUser"></match>
                        </v-carousel-item>
                    </v-carousel>
                </v-card> -->

                <!--View existing matches-->
                <div v-if="showMatchesPage()" id="container">
                    <!-- <div>
                        <v-btn @click="calculateMatches(currentUser)">Get Matches</v-btn>
                    </div> -->
                    <div id="flex-display left">
                        <match-filter></match-filter>
                    </div>
                    <div id="flex-display right">
                        <match-header :user="currentUser"></match-header>
                        <match :user="currentUser"></match>
                        <match :user="currentUser"></match>
                        <match :user="currentUser"></match>
                        <match :user="currentUser"></match>
                        <match :user="currentUser"></match>
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
import Authentication from "./components/Authentication";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Match from "./components/Match";
import MatchFilter from "./components/MatchFilter";
import MatchHeader from "./components/MatchHeader";
import Profile from "./components/Profile";
import VLink from "./components/VLink";

export default {
    name: "App",
    components: { // other components that this component needs to render
        Authentication,
        SignUp,
        Header,
        Match,
        MatchFilter,
        MatchHeader,
        Profile,
        VLink
    },
    data() {
        return {
            right: null,
            signUp: false,
            showProfile: false,
            showMatches: false,
            currentUser: null,
            currentUser2: { // temporary for testing
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
                bio: "Hi, I'm Molly!"
            }
        };
    },
    computed: { // variables referenced in HTML generated using complex logic

    },
    firebase: { // reference passed b/w Firebase and program
        user: userRef,
        matches: matchesRef
    },
    methods: {
        // setUser() is defined in parent, set in child component SignUp so that App can access value of user
        setUser(user) {
            this.currentUser = user;
        },
        toggleSignUpPage() {
            this.signUp = true;
            this.showProfile = false;
            this.showMatches = false;
        },
        toggleProfilePage() {
            this.showProfile = true;
            this.signUp = false;
            this.showMatches = false;
        },
        toggleMatchesPage() {
            this.showMatches = true;
            this.showProfile = false;
            this.signUp = false;
        },
        showSignUpPage() {
            return this.signUp && !this.showProfile && !this.showMatches;
        },
        showProfilePage() {
            return this.showProfile && !this.signUp && !this.showMatches;
        },
        showMatchesPage() {
            return this.showMatches && !this.signUp && !this.showProfile;
        },
        signOut() {
            this.currentUser = null;
        },
        signIn(){
            let retrievedAccount = null;
            userRef.on('value', function (snapshot) {
                retrievedAccount = snapshot.val();
            });
            // TODO: need to enter uuid or something to log in
            let account = retrievedAccount["3ad93560-ad8b-483f-9f87-40246c9dac1c"];
            this.setUser(account);
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
