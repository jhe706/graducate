<template>
<div id="app">
    <v-app>
        <!--Header-->
        <v-toolbar app color="green lighten-1">
            <h1>graducate</h1>
            <!-- <authentication class="z nav navbar-nav navbar-right">
            </authentication> -->
            <ul>
                <!-- <li v-if="isSignedIn" style="color: white; font-size: 18px; font-weight: bold;">Hi, {{user.name}}!</li> -->
                <!-- <v-btn href="" @click="getUser"><a><span class="glyphicon glyphicon-log-out"></span>Get User Details</a></v-btn> -->
                <v-btn @click="showProfile=true"><span class="glyphicon glyphicon-log-out"></span>Create Profile</v-btn>
                <!-- <v-btn @click="signOut"><a><span class="glyphicon glyphicon-log-out"></span>Logout</a></v-btn>
                <v-btn @click="signIn"><a><span class="glyphicon glyphicon-user right-justify"></span>Sign In</a></v-btn> -->
                <!-- <div id="firebaseui-auth-container" :class="{ popup: isShown }"></div> -->
            </ul>
        </v-toolbar>
        <create-profile v-if="showProfile"></create-profile>

        <v-content>
            <!--Carousel of new profiles for review-->
            <v-card>
                <v-carousel>
                    <!-- <v-carousel-item v-for="(match,m) in matches" :key="m" :src="match.src" :onClick="checkJSON"></v-carousel-item> -->
                    <v-carousel-item>
                        <h1>Carousel item!</h1>
                    </v-carousel-item>
                </v-carousel>
            </v-card>
        </v-content>

        <!--Footer-->
        <v-footer app>
            <span>&copy; Molly Chen, 2018</span>
        </v-footer>
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
import ProfileCard from "./components/ProfileCard";
import VLink from "./components/VLink";

export default {
    name: "App",
    components: {
        // components that this component needs to render
        Authentication,
        CreateProfile,
        Header,
        ProfileCard,
        VLink
    },
    data() { // TIED TO V-MODEL
        return {
            matches: [{
                    src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
                },
                {
                    src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
                },
                {
                    src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
                },
                {
                    src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
                }
            ],
            pages: [{
                    title: "Home",
                    icon: "dashboard"
                },
                {
                    title: "About",
                    icon: "question_answer"
                }
            ],
            right: null,
            users: userRef,
            showProfile: false, // TODO: switch from flags to actual routing and layout rendering
            creatingProfile: false
        };
    },
    computed: {
        // variables referenced in HTML generated using complex logic
        showProfile: function () {
            if (creatingProfile) { // TODO: add second condition
                return false;
            }
        }
    },
    firebase: {
        // reference passed b/w Firebase and program
        user: userRef,
        matches: matchesRef
    },
    methods: {
        // any functionality defined specifically for this component
        // getUserDetails() {
        //     console.log("Hi");
        //     userRef.on('value', function(snapshot){
        //         var jsonData = snapshot.val();
        //         console.log(jsonData);
        //     })
        // },
        // getAreasOfStudy(){
        //     var parsed = JSON.parse(majors);
        //     console.log(parsed);
        // }
    },
    props: {}
};
</script>

<style>
/* #: id, .: class*/
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.right-justify {}
</style>
