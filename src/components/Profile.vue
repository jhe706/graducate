<template>
<v-content>
    <h1>My Profile</h1>
    <v-card>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
                <!--Profile picture-->

                <!--Default cover photo-->
                <v-flex xs12>
                    <img src="../assets/coverphoto.jpg" height="200px" width="1090px"/>
                </v-flex>

                <v-flex xs12>
                    <v-avatar style="float:left; margin-left:20px">
                        <img
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            alt="Profile picture"
                        >
                    </v-avatar>
                </v-flex>

                <!--Name + Summary-->
                <v-flex xs12>
                    <ul style="float:left; text-align:left">
                        <li><h2>{{user.firstName}} {{user.lastName}}</h2></li>
                        <li>Trinity, Class of {{user.gradYear}}</li>
                        <li v-for="degree in user.degrees" :key="degree">{{degree.type}} {{degree.major}}</li>
                        <li>From {{user.hometown.city}}, {{user.hometown.state}}, {{user.hometown.country}}</li>
                    </ul>
                </v-flex>
                
                <!--2x3 grid of info-->
                <v-flex v-for="i in 2" :key="`6${i}`" xs6>
                    <v-card v-for="item in row1" :key="item">
                        <v-card-text class="px-0"><h2>{{row1[item].title}}</h2></v-card-text>
                        <v-card-text v-for="c in item.content" :key="c">{{row1[item][c]}}</v-card-text>
                    </v-card>
                </v-flex>


            <!-- <button>Contact</button> -->
            <!--Send email, mailto:-->
            <!-- <span v-if="user.status==='Undergraduate' || user.status==='undergrad'">{{user.firstName}} is looking for:
            <ul v-for="advice in user.adviceNeeded" v-bind:key="advice">
                <li v-if="advice.selected">{{advice.tag}}</li>
            </ul>
            </span>
                <span v-else>{{user.firstName}} can offer help with:
            <ul v-for="advice in user.adviceGiven" v-bind:key="advice">
                <li v-if="advice.selected">{{advice.tag}}</li>
            </ul> -->

            </v-layout>
        </v-container>
    </v-card>
</v-content>
</template>

<script>
// render profile information onto HTML template
import {
    userRef,
    db
} from "../database";
import App from "../App";
import * as areasOfStudy from "../assets/areasOfStudy.js";
/* eslint-disable */

export default {
    name: "Profile",
    components: {
        App
    },
    data() {
        return {
            row1: [
                {
                    title: "Intro",
                    content: [
                        user.bio
                    ]
                },
                {
                    title: "Contact",
                    content: [
                        user.email,
                        user.phoneNumber
                    ]
                }
            ],
            row2: [
                {
                    title: this.typeOfAdvice(),
                    content: [
                        user.bio
                    ]
                },
                {
                    title: "Links",
                    content: [
                        // insert social media links
                        "mollymolichen",
                        "mollsprobs",
                        "mc-squared"
                    ]
                }
            ],
            row3: [
                {
                    title: "Interests",
                    content: user.interests     // already a list, iterate through
                }
            ]
        };
    },
    computed: {
        //  user () {
        //     console.log("usr");
        //     console.log(this.getUser());
        //     return this.getUser();
        // }
    },
    firebase: {

    },
    methods: {
        typeOfAdvice(){
            if (user.status === "Undergraduate"){
                return user.name + " would like advice about: ";
            } else {
                return user.name + " would like to give advice about: ";
            }
        }
    },
    props: ['user']
};
</script>
