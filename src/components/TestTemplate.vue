<template>
	<!-- <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet"> -->
	<!-- <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet"> -->
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"> -->

	<!-- <div id="app">
		<v-app>
			<v-content>
				<v-toolbar>
					<h1>GRUNCH</h1>
				</v-toolbar>
			</v-content>
		</v-app>
  	</div> -->
	<div id="app">
    <v-app>
      <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
      >
        <v-list>
          <v-list-tile :value="true" v-for="(item, i) in items" :key="item.title">
            <v-list-tile-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn 
          icon
          @click.stop="miniVariant = !miniVariant"
        >
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
        <v-btn
          icon
          @click.stop="clipped = !clipped"
        >
          <v-icon>web</v-icon>
        </v-btn>
        <v-btn
          icon
          @click.native.stop="fixed = !fixed"
        >
          <v-icon>remove</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click.native.stop="rightDrawer = !rightDrawer"
        >
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar>
      <main>
        <v-content>
          <v-container fluid>
            <page></page>
          </v-container>
        </v-content>
      </main>
      <v-navigation-drawer
        fixed
        temporary
        :right="right"
        v-model="rightDrawer"
        app
      >
        <v-list>
          <v-list-tile @click.native="right = !right">
            <v-list-tile-action>
              <v-icon light>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-footer :fixed="fixed" app>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
	import Vue from 'vue';
	import Firebase from 'firebase';
	import { db, userRef, matchesRef } from './database';
	import HelloWorld from './components/HelloWorld.vue';
	import Header from './components/Header.vue';

	export default {
		name: 'App',
		components: {	// components that this component needs to render
			HelloWorld
		},
    data: {		// any params sent/returned to/from Firebase
        clipped: true,
        drawer: true, 
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
		},
		computed: {		// any global variables that need to be reference by HTML in this component

		}, 
		firebase: {		// reference passed b/w Firebase and program
			user: userRef,
			matches: matchesRef
		},
		methods: {		// any functionality defined specifically for this component

		}
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
