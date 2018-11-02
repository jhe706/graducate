<template>
<a
    v-bind:href="href"
    v-bind:class="{ active: isActive }"
    v-on:click="go"
  >
    <slot></slot>
  </a>
</template>

<script>
import { routes } from "../main.js";

export default {
    props: {
        href: {
            type: String,
            required: true
        }
    },
    computed: {
        isActive() {
            return this.href === this.$root.currentRoute;
        }
    },
    methods: {
        go(event) {
            console.log("fuk");
            event.preventDefault();
            this.$root.currentRoute = this.href;
            console.log(routes);
            console.log(routes[this.href]);
            window.history.pushState(
                null,
                routes[this.href],
                this.href
            );
        }
    }
}
</script>
