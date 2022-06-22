<template>
  <v-app >
    <v-main >
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { decodeToken } from "./helpers/decode-token";

export default {
  name: "App",
  mounted() {
    
          if (response.data.success) {
            
            this.$services.socketio.initialize();

            const token = response.data.token;

            const tokenData = decodeToken(token);

            this.$store.dispatch("setUserAction", tokenData.data);

            localStorage.setItem("token", token);
          }
        
  },
};
</script>
