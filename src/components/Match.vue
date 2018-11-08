<template>
<v-card>
    <v-container grid-list-md text-xs-center style="padding: 20px">
        <v-layout row wrap>
            <!--Profile picture-->
            <v-flex xs6>
            </v-flex>

            <!--Information-->
            <v-flex xs6>
                <ul style="float:left; text-align:left">
                    <li>
                        <h2>{{user.firstName}} {{user.lastName}}</h2>
                    </li>
                    <li>{{user.school}}, Class of {{user.gradYear}}</li>
                    <li v-for="degree in user.degrees" :key="degree">{{degree.type}} {{degree.major}}</li>
                </ul>
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
