<template>
<v-content>
    <h1>My Profile Card</h1>
    <!-- <img src="../assets/sampleprofile.png" style="width=100px"/> -->
    <v-text-field></v-text-field>
    <span>{{user.firstName}} {{user.lastName}}</span>
    <span>{{user.school}}, Class of {{user.gradYear}}</span>
    <!-- <span>{{user.degrees.degree}} in {{user.degree.major}}</span> -->
    <!-- <span>{{user.hometown.city}}, {{user.hometown.state}}, {{user.hometown.country}}</span> -->
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
            </ul>
        </span> -->
    <!-- <span v-if="user.bio">{{user.bio}}</span> -->
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
    },
    props: ['user']
};
</script>
