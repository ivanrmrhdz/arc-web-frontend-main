<template>
  <!--Icono para opciones de barra superior   -->
  <v-menu
    :close-on-content-click="false"
    :nudge-width="100"
    offset-x
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon size="35">mdi-account-circle-outline</v-icon>
      </v-btn>
    </template>

    <v-card dark max-width="290">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPNbOneenDa9mbmD7tjFZgsWnd1BhhAPA5GUwBvtAm9ANMe-_PN1lQL3W2FSPq7J2iXDU&usqp=CAU"
              alt="User"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ FullName }}</v-list-item-title>
            <v-list-item-subtitle>{{ Role }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          link
          @click="signOut"
        >
          <v-list-item-icon>
            <v-icon size="30">mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <!-- <router-link :to="item.path">{{ item.title }}</router-link> -->
              Salir
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "AppMenuBarUser",
  computed: {
    FullName() {
      if(!this.$store.getters.user) {
        return '';
      }

      return this.$store.getters.user.firstName + ' ' + this.$store.getters.user.lastName;
    },
    Role() {
      if(!this.$store.getters.user) {
        return '';
      }

      return this.$store.getters.user.role.name;
    },
  },
  methods: {
    signOut() {
      this.$services.socketio.close();
      localStorage.removeItem("token");
      this.$store.dispatch("setUserAction", null);
      this.$router.push("/");
    },
  },
};
</script>