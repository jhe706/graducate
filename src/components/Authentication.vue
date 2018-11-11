<template>
	<v-form>
    <!-- <v-form> -->
		<h1 style="margin-top:10px; margin-bottom:20px">Sign in to your account.</h1>
		<v-text-field v-model="email" label="Email" required class="margins" style="float:left"></v-text-field>
		<v-btn @click="hideLogin === true">Exit</v-btn>
		<v-btn @click="submit()">Submit</v-btn>
	</v-form>
</template>

<script>
/* eslint-disable */ 
import { userRef } from "../database";
export default {
	name: "Authentication",
	data: {
        email: null,
        hideLogin: false
	},
	props: ['user', 'setUser'],
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
                    console.log(myAccount);
                }
            }

            this.hideLogin = true;
            myAccount ? this.setUser(myAccount) : this.setUser(null);
        }
	}
}
</script>
