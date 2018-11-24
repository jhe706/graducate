<template>
<v-card>
    <v-container grid-list-md text-xs-center id="matches-header">
        <v-layout row wrap>
            <v-flex xs12>
                <div id="matches-header">
                    <h1 v-if="numMatches != 1">{{numMatches}} Matches</h1>
                    <h1 v-else>{{numMatches}} Match</h1>
                    <v-btn @click="refresh()">Refresh Matches</v-btn>
                </div>
                <!-- <div id="matches-header">
                    <h4>Filtered by:</h4>
                    <ul v-for="school in schools" :key="school">
                        <li>{{school}}</li>
                    </ul>
                </div> -->
            </v-flex>
        </v-layout>
    </v-container>
</v-card>
</template>

<script>
/* eslint-disable */
import {
    matchesRef
} from "../database";
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
    computed: {
        numMatches() {
            let list = [];
            if (this.filterApplied) {
                list = this.applyFilter(this.user, this.selectedSchools);
            } else {
                list = this.getMatchesObj(this.user);
            }

            if (!list || list.length === 0) {
                return 0;
            }
            return list.length;
        }
    },
    props: ['match', 'user', 'refreshMatches', 'getMatchesObj', 'filterApplied', 'selectedSchools'],
    methods: {
        refresh() {
            this.refreshMatches(this.user);
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
