<template>
<div id="app">
    <v-app>
        <!--Header-->
        <!-- <header>show up</header> -->
        <v-toolbar app color="green lighten-1">
            <h1>graducate</h1>
            <authentication class="z nav navbar-nav navbar-right right-justify">
                <!--:getUser="getUser" :setUser="setUser" :viewProfile="viewProfile" :show="showPopup"-->
            </authentication>
            <button v-bind:click="getUserDetails">Click Me</button>
        </v-toolbar>

        <!--Navigation drawer-->
        <v-card height="350px">
            <v-navigation-drawer permanent>
                <v-toolbar flat>
                    <v-list>
                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <img src="https://randomuser.me/api/portraits/men/85.jpg"></v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>Molly Chen</v-list-tile-title>
                                </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>

                <v-list dense class="pt-0">
                    <v-divider>
                    </v-divider>
                    <v-list-tile v-for="page in pages" :key="page.title">
                        <v-list-tile-action>
                            <v-icon>{{ page.icon }}</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ page.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <!--insert v-content somewhere-->
            <v-carousel>
                <!-- <v-carousel-item v-for="(match,m) in matches" :key="m" :src="match.src" :onClick="checkJSON"></v-carousel-item> -->
                <v-carousel-item>
                    <profile-card></profile-card>
                </v-carousel-item>
            </v-carousel>
        </v-card>

        <!--Footer-->
        <v-footer :fixed="fixed" app>
            <span>&copy; Molly Chen, 2018</span>
        </v-footer>
        <!-- </v-content> -->
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

export default {
    name: "App",
    components: {
        // components that this component needs to render
        Authentication,
        CreateProfile,
        Header,
        ProfileCard
    },
    data() {                                // TIED TO V-MODEL
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
            users: userRef 
        };
    },
    computed: {
        // variables referenced in HTML generated using complex logic
    },
    firebase: {
        // reference passed b/w Firebase and program
        user: userRef,
        matches: matchesRef
    },
    methods: {
        // any functionality defined specifically for this component
        getUserDetails() {
            console.log("Hi");
            userRef.on('value', function(snapshot){
                var jsonData = snapshot.val();
                console.log(jsonData);
            })
        }
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

.right-justify {

}
</style>
