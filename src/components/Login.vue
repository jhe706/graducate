<template>
  <div id="app">
	  <nav class="navbar navbar-light">
		<div class="container">
			<router-link class="navbar-brand"
				:to="{ name: 'home' }">
				grunch
			</router-link>
			<ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
				<li class="nav-item">
				<router-link class="nav-link"
					active-class="active"
					exact
					:to="{ name: 'home' }">
					About
				</router-link>
				</li>
				<li class="nav-item">
				<router-link class="nav-link"
					active-class="active"
					exact
					:to="{ name: 'login' }">
					<i class="ion-compose"></i>Sign in
				</router-link>
				</li>
				<li class="nav-item">
				<router-link
					class="nav-link"
					active-class="active"
					exact
					:to="{ name: 'register' }">
					<i class="ion-compose"></i>Sign up
				</router-link>
				</li>
			</ul>
			<ul v-else class="nav navbar-nav pull-xs-right">
				<li class="nav-item">
				<router-link
					class="nav-link"
					active-class="active"
					exact
					:to="{ name: 'home' }"> 
					Home
				</router-link>
				</li>
				<li class="nav-item">
				<router-link
					class="nav-link"
					active-class="active"
					exact
					:to="{ name: 'home' }">
					View Matches
				</router-link>
				</li>
				<li class="nav-item">
				<router-link class="nav-link"
					active-class="active"
					exact
					:to="{ name: 'settings' }">
					<i class="ion-gear-a"></i>&nbsp;Settings
				</router-link>
				</li>
				<li class="nav-item" v-if="currentUser.username">
				<router-link class="nav-link"
					active-class="active"
					exact
					:to="{ name: 'profile', params: { username: currentUser.username } }">
					{{ currentUser.username }}
				</router-link>
				</li>
			</ul>
		</div>
	  </nav>
	
    <img alt="Vue logo" src="./assets/logo.png">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
	<Header></Header>
  </div>
</template>

<script>
import Firebase from 'firebase'
import { db, userRef, matchesRef } from './database'
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'

export default {
	name: 'Login',
	components: {	// components that this component needs to render
		Header
	},
	data (){		// any params sent/returned to/from Firebase

	},
	computed: {		// any global 'variables' that need to be reference by HTML in this component

	}, 
	firebase: {		// reference passed b/w Firebase and program
		user: userRef,
		matches: matchesRef
	},
	methods: {		// any functionality defined specifically for this component

	},
    props: [		// methods provided to change value of user in parent component
	
	]
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
