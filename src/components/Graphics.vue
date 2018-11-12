<template>
<div id="container">
    <div id="body">
        <v-container justify-center>
            <v-layout row wrap>
                <v-flex xs12>
        <h1 style="text-align: center; transform: scale(2, 2)" id="title">graducate</h1>
                    </v-flex>
    </v-layout>
            <v-layout row wrap>
                <v-flex xs12>
        <h5 style="transform: scale(2, 2)">The leading platform to connect Duke undergraduate, graduate, and professional students.</h5>
    </v-flex>
    </v-layout>

        <!--TODO: arrange-->
            <v-layout row wrap>
            <v-flex xs4>
        <v-icon class="material-icons" id="icon">recent_actors</v-icon>
                
         <h3 class="label">1. Fill out your profile</h3> 
                </v-flex>
            <v-flex xs4>
        <v-icon class="material-icons" id="icon">search</v-icon>
         <h3 class="label">2. Browse matches</h3> 
    </v-flex>
            <v-flex xs4>
        <v-icon class="material-icons" id="icon">group</v-icon>
         <h3 class="label">3. Connect!</h3> 
    </v-flex>
    </v-layout>
            </v-container>
    </div>
</div>
</template>

<style>
#container {
    display: flex;
}

#body {
    flex-direction: row;
}

    
    .label{
        margin-top:80px
    }

#icon {
    margin-left: 150px;
    margin-right: 150px;
    margin-top: 150px;
    transform: scale(10, 10);
}

#title {
    margin-top: 50px;
    margin-bottom: 100px;
}

#make-text-bigger {
    transform: scale(2, 2);
}
</style>
