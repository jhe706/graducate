<template>
<v-card>
    <v-container grid-list-md text-xs-center id="matches-header">
        <v-layout row wrap>
            <v-flex xs12>
                <div id="matches-header">
                    <h1>{{this.numMatches()}} Matches</h1>
                    <!-- <v-btn @click="numMatches()">Num</v-btn> -->
                    <v-btn @click="refresh()">Refresh Matches</v-btn>
                </div>
                <div id="matches-header">
                    <h4>Filtered by:</h4>
                    <ul v-for="school in schools" :key="school">
                        <li>{{school}}</li>
                    </ul>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</v-card>
</template>

<script>
/* eslint-disable */
import { matchesRef } from "../database";
export default {
    data() {
        return {
            schools: ["Trinity", "Pratt", "Law", "Sanford", "Nicholas School", "Fuqua"],
            matchesObj: {
                source: matchesRef,
                asObject: true
            }
        }
    },
    firebase: {
        matchesRef
    },
    props: ['match', 'user', 'refreshMatches', 'getMatchesObj'],
    methods: {
        refresh() {
            this.refreshMatches(this.user);
        },
        numMatches(){
            let num = this.getMatchesObj(this.user);
            if (num){
                return num.length;
            }
            return 0;
        }
    }
}
</script>

<style>
#matches-header {
    display: flex;
    margin: 15px;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}
</style>
