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
                    <!-- <v-btn @click="signOut"><a><span class="glyphicon glyphicon-log-out"></span>Logout</a></v-btn>
                    <v-btn @click="signIn"><a><span class="glyphicon glyphicon-user right-justify"></span>Sign In</a></v-btn> -->
                </ul>
            </v-toolbar>

            <!--TODO: Instead of placing all possible homepage views in one container, use conditional render/routing-->
            <v-container>
                <!--Create profile-->
                <create-profile v-if="showSignUpPage()" :setUser="setUser" :user="currentUser"></create-profile>

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
                    <div id="flex-display left">
                        <match-filter v-if="showMatchesPage()"></match-filter>
                    </div>
                    <div id="flex-display right">
                        <match-header v-if="showMatchesPage()" :user="currentUser"></match-header>
                        <match v-if="showMatchesPage()" :user="currentUser"></match>
                        <match v-if="showMatchesPage()" :user="currentUser"></match>
                        <match v-if="showMatchesPage()" :user="currentUser"></match>
                        <match v-if="showMatchesPage()" :user="currentUser"></match>
                        <match v-if="showMatchesPage()" :user="currentUser"></match>
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
import CreateProfile from "./components/CreateProfile";
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
        CreateProfile,
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
            createProfile: false,
            showProfile: false,
            showMatches: false,
            currentUser: { // temporary for testing
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
                        concentration: "NA"
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
                interests: [{
                        "description": "Art",
                        "selected": false
                    },
                    {
                        "description": "Coding",
                        "selected": false
                    },
                    {
                        "description": "Music",
                        "selected": false
                    },
                    {
                        "description": "Travel",
                        "selected": true
                    },
                    {
                        "description": "Reading",
                        "selected": true
                    },
                    {
                        "description": "Cooking",
                        "selected": true
                    },
                    {
                        "description": "Exercise",
                        "selected": false
                    },
                    {
                        "description": "Other",
                        "selected": false
                    }
                ],
                advice: [{
                        "description": "Duke's major departments",
                        "selected": true
                    },
                    {
                        "description": "Graduate programs or professional schools",
                        "selected": true
                    },
                    {
                        "description": "Duke extracurriculars",
                        "selected": false
                    },
                    {
                        "description": "Life",
                        "selected": true
                    },
                    {
                        "description": "Career",
                        "selected": false
                    },
                    {
                        "description": "Cool ideas",
                        "selected": true
                    }
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
        // setUser() is defined in parent, set in child component CreateProfile so that App can access value of user
        setUser(user) {
            this.currentUser = user;
        },
        toggleSignUpPage() {
            this.createProfile = true;
            this.showProfile = false;
            this.showMatches = false;
        },
        toggleProfilePage() {
            this.showProfile = true;
            this.createProfile = false;
            this.showMatches = false;
        },
        toggleMatchesPage() {
            this.showMatches = true;
            this.showProfile = false;
            this.createProfile = false;
        },
        showSignUpPage() {
            return this.createProfile && !this.showProfile && !this.showMatches;
        },
        showProfilePage() {
            return this.showProfile && !this.createProfile && !this.showMatches;
        },
        showMatchesPage() {
            return this.showMatches && !this.createProfile && !this.showProfile;
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
