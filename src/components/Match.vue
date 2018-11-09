<template>
<v-card>
    <v-container grid-list-md text-xs-center id="matches">
        <v-layout row wrap>
            <!--Profile picture-->
            <v-flex xs4>
                <v-avatar style="margin-left:50px">
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="Profile picture"
                        >
                    </v-avatar>
            </v-flex>

            <!--Information-->
            <v-flex xs4>
                <ul style="float:left; text-align:left">
                    <li>
                        <h2>{{user.firstName}} {{user.lastName}}</h2>
                    </li>
                    <li>{{user.school}}, Class of {{user.gradYear}}</li>
                    <li v-for="degree in user.degrees" :key="degree">{{degree.type}} {{degree.major}}</li>
                </ul>
            </v-flex>

            <v-flex xs4>
                <v-tooltip bottom>
                    <span slot="activator">90% MATCH</span>
                    <span>Match score is generated based on your profile.</span>
                </v-tooltip>
            </v-flex>

        </v-layout>
    </v-container>
</v-card>
</template>

<script>
import { userRef } from "../database.js";

export default {
    firebase: {
        userRef
    },
    props: ['match', 'user'],
    methods: {
        calculateMatches(){
            let uuid = this.user.uuid;      // this?
            let matches = [];               // matrix

            let users = null;
            userRef.on('value', function(snapshot){
                users = snapshot.val();
            })

            let i = 0;
            for (let user in users){
                if (this.matchScore(users[user]) > 65){
                    matches[uuid][i] = user[user];
                }
            }

            return matches[uuid];
        },
        matchScore(u1, u2){
            let rawScore = 0;
            let adviceScore = 0;
            let degreeScore = 0;
            let interestsScore = 0;
            let concentrationScore = 0;
            let hometownScore = 0;

            // advice
            for (let i in u1.advice){
                for (let j in u2.advice){
                    if (u1.advice[i].selected && u2.advice[j].selected){
                        adviceScore++;
                    }
                    j++;
                }
                i++;
            }

            // degree
            if (u1.degree.school === u2.degree.school){
                degreeScore += 5;
            }
            if (u1.degree.major === u2.degree.major){           // TODO: count pre-professional as same
                degreeScore += 25;
            }

            // concentration TODO: group w/ degree?
            if (u1.degree.concentration === u2.degree.concentration){
                concentrationScore += 10;
            }

            // interests
            for (let i in u1.interests){
                for (let j in u2.interests){
                    if (u1.interests[i].selected && u2.interests[j].selected){
                        interestsScore++;
                    }
                    j++;
                }
                i++;
            }

            // hometown


            rawScore = (0.4 * adviceScore) + (0.3 * degreeScore) + (0.1 * concentrationScore)
            + (0.1 * interestsScore) + (0.1 * hometownScore);

            return rawScore;        // rawScore *= 1.2;
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
</style>
