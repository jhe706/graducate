<template>
<div id="app">
    <v-app>
        <v-content>
            <!--Header-->
            <v-toolbar color="green lighten-1">
                <h1>graducate</h1>
                <!-- <authentication class="z nav navbar-nav navbar-right">
            </authentication> -->
                <ul>
                    <!-- <li v-if="isSignedIn" style="color: white; font-size: 18px; font-weight: bold;">Hi, {{user.name}}!</li> -->
                    <!-- :disabled="!currentUser"-->
                    <v-btn v-if="currentUser" @click="showProfile=true"><span class="glyphicon glyphicon-log-out"></span>My Profile</v-btn>
                    <v-btn @click="createProfile=true"><span class="glyphicon glyphicon-log-out"></span>Sign Up</v-btn>
                    <!-- <v-btn @click="signOut"><a><span class="glyphicon glyphicon-log-out"></span>Logout</a></v-btn>
                    <v-btn @click="signIn"><a><span class="glyphicon glyphicon-user right-justify"></span>Sign In</a></v-btn> -->
                    <!-- <div id="firebaseui-auth-container" :class="{ popup: isShown }"></div> -->
                </ul>
            </v-toolbar>

            <!--TODO: Instead of placing all possible homepage views in one container, use conditional render/routing-->
            <v-container>
                <!--Create profile-->
                <create-profile v-if="createProfile" :setUser="setUser" :user="currentUser"></create-profile>

                <!--View profile-->
                <profile v-if="showProfile" :user="currentUser"></profile>

                <!--Scroll through potential matches-->
                <v-card v-else>
                    <v-carousel>
                        <!-- <v-carousel-item v-for="(match,m) in matches" :key="m" :src="match.src" :onClick="checkJSON"></v-carousel-item> -->
                        <v-carousel-item>
                            <h1>Carousel item!</h1>
                        </v-carousel-item>
                    </v-carousel>
                </v-card>

                <!--View existing matches-->
                <!-- <match v-for="match in matches" v-bind:key="match.uuid" v-bind:match="match"></match> -->
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
import Profile from "./components/Profile";
import VLink from "./components/VLink";

export default {
    name: "App",
    components: {
        // components that this component needs to render
        Authentication,
        CreateProfile,
        Header,
        Profile,
        VLink
    },
    data() {
        return {
            right: null,
            createProfile: false,   // TODO: switch from flags to actual routing and layout rendering
            showHome: true,         // home screen with matches
            showProfile: false,
            currentUser: {          // temporary for testing
                uuid: "42f9758b-0fbf-4aaf-9cfa-2406b1f8f942",
                firstName: "Molly",
                lastName: "Chen",
                email: "molly.chen@duke.edu",
                phoneNumber: "8322825093",
                status: "Undergraduate",
                gradYear: "2019",
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
                advice: [
                    {
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
    computed: {
        // variables referenced in HTML generated using complex logic
        // showProfile: function () {
        //     createProfile = false;
        //     showProfile = true;
        // }
    },
    firebase: {
        // reference passed b/w Firebase and program
        user: userRef,
        matches: matchesRef
    },
    methods: {
        showProfile() {
            createProfile = false;
            showProfile = true;
        },
        getMatches() {

        },
        // defined in parent, set in child component CreateProfile so that App can access value of user
        setUser(user) {
            this.currentUser = user;
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
</style>
