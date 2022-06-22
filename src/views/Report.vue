<template>
  <app-layout>
    <v-container style="max-width: 1100px">
       <v-row class="align-center justify-center mb-1">
        <div class="text-h2 font-weight-bold">El Clima</div>
      </v-row>
   <!--  <v-row class="align-center justify-center">
        <v-btn-toggle
          v-model="step"
           shaped
           color="deep-purple accent-3"
           group
           
        >
          <v-btn class="px-3">           
              Actual      
          </v-btn>

          <v-btn class="px-3">       
              Historico
          </v-btn>
        </v-btn-toggle>
      </v-row>-->

      <v-row class="align-center justify-center">
      <!--  <v-window v-model="step" class="col-12">
          <v-window-item :value="0">
           
          </v-window-item>

          <v-window-item :value="1">
           
          </v-window-item>
        </v-window>-->
         <report-table class="mb-15"/>

         <historical-report class="mt-15"/>
      </v-row>
    </v-container>
  </app-layout>
</template>

<script>
import AppLayout from "../layout/AppLayout.vue";
import ReportTable from "../components/ReportTable.vue";
import HistoricalReport from "../components/HistoricalReport.vue";

export default {
  name: "Report",
  components: {
    AppLayout,
    ReportTable,
    HistoricalReport,
  },
  data: () => ({
    step: 0,
  }),
};
</script>
