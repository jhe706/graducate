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
export default {
    props: ['match', 'user']
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
