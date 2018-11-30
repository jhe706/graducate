<template>
<v-card>
    <v-container grid-list-md text-xs-center id="matches">
        <v-layout row wrap>
            <!--Profile picture-->
            <v-flex xs4 v-if="!view">
                <v-avatar class="avatar">
                    <img
                        :src="user.profileImageUrl"
                        alt="Profile picture"
                        >
                    </v-avatar>
            </v-flex>

            <!--Information-->
            <v-flex xs4 v-if="!view">
                <ul style="float:left; text-align:left">
                    <li>
                        <h2>{{user.firstName}} {{user.lastName}}</h2>
                    </li>
                    <li>{{user.school}}, Class of {{user.gradYear}}</li>
                    <li v-for="degree in user.degrees" :key="degree">{{degree.type}} {{degree.major}}</li>
                    <li style="margin-top:15px">{{user.bio}}</li>
                </ul>
            </v-flex>
            <v-flex xs4 v-if="!view" style="align-text:right">
                <v-tooltip bottom>
                    <span slot="activator"><h4>{{score}}% MATCH</h4></span>
                    <span>Match score is generated based on your profile.</span>
                </v-tooltip>
                <br>
                <v-btn @click="viewProfile()">View Profile</v-btn>
            </v-flex>
        </v-layout>
    </v-container>

    <v-container v-if="view">
        <v-icon class="material-icons" style="margin-left:98%" @click="exit()">clear</v-icon>
        <profile :user="user"></profile>
    </v-container>
</v-card>
</template>

<script>
import {
    userRef
} from "../database.js";
import Profile from "./Profile";

export default {
    data() {
        return {
            view: false
        }
    },
    components: {
        Profile
    },
    firebase: {
        userRef
    },
    props: ['match', 'user', 'toggleProfile', 'score'],
    methods: {
        viewProfile() {
            this.view = true;
            this.toggleProfile();
        },

        exit() {
            this.view = false;
        }
    }
}
</script>

<style>
#matches {
    display: flex;
    margin: 15px;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    text-align: left !important;
}

.avatar {
    float: left;
    margin-left: 20px;
    height: 150px !important;
    width: 150px !important;
    margin-left: 50px;
}
</style>
