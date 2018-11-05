<template>
<div>
    <v-content>
        <h1>Profile card showed up!</h1>

        <v-card app height="350px">
            <p>Ziyad was here</p>
            <span>{{userRef.firstName}} {{user.lastName}}</span>
            <span>{{user.school}}, Class of {{user.gradYear}}</span>
            <span>{{user.degree.degree}} in {{user.degree.major}}</span>
            <span>{{user.hometown.city}}, {{user.hometown.state}}, {{user.hometown.country}}</span>
            <button>Contact</button>
            <!--Send email, mailto:-->
            <span v-if="isUndergrad(0) && adviceNeeded.length">{{user.firstName}} is looking for:		
                <ul v-for="advice in user.adviceNeeded" v-bind:key="advice">		
                    <li v-if="advice.selected">{{advice.tag}}</li>		
                </ul>		
            </span> 
            <span v-else-if="user.adviceGiven.length">{{user.firstName}} can offer help with:		
                <ul v-for="advice in user.adviceGiven" v-bind:key="advice">		
                    <li v-if="advice.selected">{{advice.tag}}</li>		
                </ul>		
            </span> 
            <span v-if="user.bio">{{user.bio}}</span> 
                <span v-for="tag in tags" v-bind:key="tag">		
            <span>{{tag}}</span> </span>
        </v-card>
    </v-content>
</div>
</template>

<script>
// render profile information onto HTML template
import {
    userRef
} from "../database";
import * as areasOfStudy from "../assets/areasOfStudy.js";

export default {
    name: "Profile",
    components: {

    },
    data() {
        return {
            user: userRef
        };
    },
    computed: {},
    firebase: {
        user: userRef
    },
    methods: {
        getUserDetails() {
            // userRef.on('value', function (snapshot) {
            // var jsonData = snapshot.val();
            // });
        },
        getAreasOfStudy() {
            // console.log(majors.undergradMajors);
        },
        isUndergrad(index) {
            return userRef[index].status === "Undergrad";
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
}
</style>
