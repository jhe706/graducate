<template>
<v-content>
    <h1>{{user.firstName}}'s Profile</h1>
    <v-card>
        <v-container grid-list-md text-xs-center style="padding: 20px">
            <v-layout row wrap>
                <!--Default cover photo-->
                <v-flex xs12>
                    <img src="../assets/coverphoto.jpg" height="200px" width="100%"/>
                </v-flex>

                <!--Profile picture-->
                <v-flex xs3>
                    <v-avatar class="avatar">
                        <img
                        :src="user.profileImageUrl"
                        alt="Profile picture"
                    >
                </v-avatar>
                </v-flex>

                <!--Name + Summary-->
                <v-flex xs6 style="height:150px">
                    <ul style="float:left; text-align:left">
                        <li>
                            <h2>{{user.firstName}} {{user.lastName}}</h2>
                        </li>
                        <li>Trinity, Class of {{user.gradYear}}</li>
                        <li v-for="degree in user.degrees" :key="degree">{{degree.type}} {{degree.major}}</li>
                        <li v-if="!user.hometown.state">From {{user.hometown.city}}, {{user.hometown.country}}</li>
                        <li v-else>From {{user.hometown.city}}, {{user.hometown.state}}, {{user.hometown.country}}</li>
                    </ul>
                </v-flex>

                <!--Row 1-->
                <v-flex xs6>
                    <v-card class="profile-text">
                        <v-card-text class="left-margin px-0">
                            <h3>Intro</h3>
                            {{user.bio}}
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs6>
                    <v-card class="profile-text">
                        <v-card-text class="left-margin px-0">
                            <h3>Contact</h3>
                            <ul class="square">
                                <li>Email: {{user.email}}</li>
                                <li>Phone: {{user.phoneNumber}}</li>
                            </ul>
                        </v-card-text>
                    </v-card>
                </v-flex>

                <!--Row 2-->
                <v-flex xs6>
                    <v-card class="profile-text">
                        <v-card-text class="left-margin px-0">
                            <h3 v-if="user.status==='Undergraduate'">{{user.firstName}} would like advice on: </h3>
                            <h3 v-else>{{user.firstName}} would like to help with: </h3>
                            <ul class="square" v-for="topic in user.advice" :key="topic">
                                <li>{{topic}}</li>
                            </ul>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs6>
                    <v-card class="profile-text">
                        <v-card-text class="left-margin px-0">
                            <h3>Interests</h3>
                            <ul class="square" v-for="interest in user.interests" :key="interest">
                                <li>{{interest}}</li>
                            </ul>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */
import {
    userRef,
    db,
    storageRef
} from "../database";
import * as areasOfStudy from "../assets/areasOfStudy.js";

export default {
    name: "Profile",
    components: {},
    data() {
        return {
            imgUrl: ""
        };
    },
    computed: {},
    firebase: {
        users: userRef,
        storage: storageRef
    },
    methods: {
        typeOfAdvice() {
            if (user.status === "Undergraduate") {
                return user.name + " would like advice about: ";
            } else {
                return user.name + " would like to give advice about: ";
            }
        },

        getPicURL() {
            let imgRef = storageRef.child("images");
            imgRef.getDownloadURL().then(function (url) {
                // TODO: ?????
                // Insert url into an <img> tag to "download"
                console.log(url);
            }).catch(function (error) {
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            });
            // let url = imageRef.getDownloadURL(url)       // doesnt work
            // console.log(url);
        }
    },
    props: ['user']
};
</script>

<style>
.profile-text {
    height: 150px;
    margin: 10px;
    text-align: left;
}

.left-margin {
    margin-left: 15px;
}

ul.square {
    list-style-type: square;
}

.avatar {
    float: left;
    margin-left: 20px;
    height: 150px !important;
    width: 150px !important;
}
</style>
