<template>
  <v-card
    color="grey lighten-4"
    flat
    tile
  >
    <v-toolbar dense>

      <v-toolbar-title>SEROPOST</v-toolbar-title>

      <v-spacer></v-spacer>
      
      <v-btn icon>
        <router-link to="/admin">
          <v-icon>mdi-cogs</v-icon>
        </router-link>
      </v-btn>
      
    </v-toolbar>
  </v-card>
</template>

<script>
  export default {
    name: 'Home',
    computed: {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>