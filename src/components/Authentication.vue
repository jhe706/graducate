<template>
	<v-form>
		<h1 style="margin-top:10px; margin-bottom:20px">Sign in to your account.</h1>
		<v-text-field v-model="email" label="Email" required class="margins" style="float:left"></v-text-field>
		<v-btn @click="exit()">Exit</v-btn>
		<v-btn @click="submit()">Submit</v-btn>
	</v-form>
</template>

<script>
/* eslint-disable */ 
import { userRef } from "../database";
export default {
	name: "Authentication",
	data: {
        email: null
    },
    computed: {
        //  exit(){
        //     this.showLogin = false;
        //     this.profile();
        // }
    },
    props: ['user', 'setUser', 'showLogin', 'profile'],
	methods: {
		submit(){
            let myAccount = null;
            let users = null;

            userRef.on('value', function (snapshot) {
                users = snapshot.val();
            });
           
            for (let user in users){
                if (users[user].email === this.email){
                    myAccount = users[String(user)];
                }
            }
            myAccount ? this.setUser(myAccount) : this.setUser(null);
        },
       exit (){
           this.profile();
       }
	}
}
</script>
