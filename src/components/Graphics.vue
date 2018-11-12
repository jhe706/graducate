<template>
<div id="container">
    <div id="body">
        <h1 style="transform: scale(2, 2)" id="title">graducate</h1>
        <h5 style="transform: scale(2, 2)">The leading platform to connect Duke undergraduate, graduate, and professional students.</h5>

        <!--TODO: arrange-->
        <v-icon class="material-icons" id="icon">recent_actors</v-icon>
        <!-- <h3>1. Fill out your profile</h3> -->
        <v-icon class="material-icons" id="icon">search</v-icon>
        <!-- <h3>2. Browse matches</h3> -->
        <v-icon class="material-icons" id="icon">group</v-icon>
        <!-- <h3>3. Connect!</h3> -->
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
