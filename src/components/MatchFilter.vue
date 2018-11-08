<template>
<v-card>
    <v-container grid-list-md text-xs-center id="matches-filter" style="padding: 20px; margin: 15px;">
        <v-layout row wrap>
            <v-flex xs12>
                <div id="matches-filter">
                    <h1>Filters</h1>
                </div>
                <div id="matches-filter">
                    <h3>School</h3>
                    <v-checkbox :label="school" v-for="school in schools" :key="school"></v-checkbox>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            schools: ["Trinity", "Pratt", "Law", "Sanford", "Nicholas School", "Fuqua"]
        }
    },
    props: ['match', 'user']
}
</script>

<style>
#matches-filter {
    display: flex;
    flex-direction: column;
    /* margin: auto 10px; */
    justify-content: space-between;
    align-items: left;
    padding: 5px;
    /* width: 20%; */
    /* margin-right: 10px; */
    text-align: left;
}

#checkbox {
    /* list-style-image: url(check.gif); */
    /* list-style-image:  */
}
</style>
