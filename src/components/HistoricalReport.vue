<template>
  <v-container style="max-width: 1200px">
    <h3 class="mb-6 text-h4">El Clima de los últimos 7 días</h3>
    <v-card class="mx-auto text-center" max-width="900">
      <!--<v-col cols="3" class="mx-auto">
        <v-select
          v-model="year"
          :items="years"
          label="Filtrar por año"
        ></v-select>
      </v-col>-->

      <v-card-text>
        <line-chart :data="Datacollection" :label="Label" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import LineChart from "./LineChart.vue";

export default {
  name: "HistoricalReport",
  components: {
    LineChart,
  },
  mounted() {
    this.updateChart(this.year);

    for (let i = this.year; i >= 2000; i--) {
      this.years.push(i);
    }
  },
  data() {
    return {
      datacollection: [],
      years: [],
      year: new Date().getFullYear(),
    };
  },
  methods: {
    updateChart(year) {
      this.$services.api
        .getRecordsData(year)
        .then((response) => {
          this.datacollection = response.data.monthsValues;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    year: function (value) {
      this.updateChart(value);
    },
  },
  computed: {
    Datacollection() {
      return this.datacollection;
    },
    Label() {
      return `Temperatura Registrada`;
    },
  },
};
</script>