<template>
<div id="app">
    <v-app>
        <v-content>
            <!--Header-->
            <v-toolbar app color="green lighten-1">
                <h1>graducate</h1>
                <authentication class="z nav navbar-nav navbar-right" :getUser="getUser" :setUser="setUser" :viewProfile="viewProfile" :show="showPopup">
                </authentication>
            </v-toolbar>

			<!--Navigation drawer-->
            <v-card app height="350px">
                <v-navigation-drawer permanent>
                    <v-toolbar flat>
                        <v-list>
                            <v-list-tile avatar>
                                <v-list-tile-avatar>
                                    <img src="https://randomuser.me/api/portraits/men/85.jpg">		</v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Molly Chen</v-list-tile-title>
                                    </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-toolbar>

                    <v-list dense class="pt-0">
                        <v-divider>
                        </v-divider>
                        <v-list-tile v-for="page in pages" :key="page.title" :onClick="checkJSON">
                            <v-list-tile-action>
                                <v-icon>{{ page.icon }}</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>{{ page.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-navigation-drawer>
            </v-card>

            <v-carousel app>
                <v-carousel-item v-for="(match,m) in matches" :key="m" :src="match.src" :onClick="checkJSON"></v-carousel-item>
            </v-carousel>

            <v-footer :fixed="fixed" app>
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
import HelloWorld from "./components/HelloWorld";
import Header from "./components/Header";
import Authentication from "./components/Authentication"
// const Users = require('users.json');    // TODO: change to import from Firebase

export default {
    name: "App",
    components: {
        // components that this component needs to render
        Authentication
    },
    data() {
        // any params accessed by HTML
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
            users: userRef // is this enough to access the .json stored in db?
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
        checkJSON() {
            // for (let user in userRef){
            //   console.log(user.first-name);
            // }
        }
    },
    props: {}
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.matches-carousel {
    /*width: 1000px;*/
}
</style>
