<template>
<div>
        <v-content>
			<h1>Profile card showed up!</h1>
            
            <!-- <v-card app height="350px">
                <span>{{user.firstName}} {{user.lastName}}</span>
                <span>{{user.school}}, Class of {{user.gradYear}}</span>
                <span>{{user.degree.degree}} in {{user.degree.major}}</span>
				<span>{{user.hometown.city}}, {{user.hometown.state}}, {{user.hometown.country}}</span>
                <button>Contact</button>	<!--Send email, mailto:-->
				<!-- <span v-if="isUndergrad && adviceNeeded.length">{{user.firstName}} is looking for:
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
					<span>{{tag}}</span>
				</span>
            </v-card> -->
        </v-content>
</div>
</template>

<script>
// render profile information onto HTML template
import Vue from "vue";
import Firebase from 'firebase';
import {
    db,
    userRef
} from "../database";
// const Users = require('../users.json');
// var users = JSON.parse("./users.json");

export default {
    name: "ProfileCard",
    components: {

    },
    data() {
        // any params accessed by HTML
        return {
            user: null 
        };
    },
    computed: {
        // variables referenced in HTML generated using complex logic
    },
    firebase: {
        // reference passed b/w Firebase and program
        user: userRef
    },
    methods: {
        // any functionality defined specifically for this component
        getUser(uuid) {
			console.log("We made it");

            // for (let u in users) {
			// 	console.log(users[u].firstName);	// or alert
            //     if (users[u].firstName === uuid) {
            //         return entry;
            //     }
			// }
			// return this.user;
		},
		
		isUndergrad(){
			return user.status === "undergrad";
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
</style>
