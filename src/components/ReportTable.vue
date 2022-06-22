<template>
  <v-container>
    <v-row class="mt-2 mb-12" align="center" justify="center">
      <v-col cols="10" sm="6">
        <h3 class="text-h2">San Miguel</h3>
        <div class="text-subtitle-1">
          El lugar está condicionado a la ubicación del sensor.
        </div>
      </v-col>
      <v-col cols="11" sm="6">
        <v-card
          elevation="4"
          :class="clima[indexclima].textcolor"
          rounded="xl"
          min-height="200"
          min-width="200"
        >
          <v-img
            :src="clima[indexclima].src"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.5)"
            height="350px"
            min-height="200px"
          >
           <span class="d-flex justify-center text-body-1 font-italic">
            {{ date }}
          </span>
          <span style="height: 5px; display: block"></span>
          <span class="d-flex justify-center text-body-1 font-italic">
            Ultima actualización a las: {{ getTime() }}
          </span>
          <span class="d-flex justify-center mt-7 text-h1">{{ highs }} ºC</span>

          <v-row
            class="d-flex fill-height justify-center align-center mt-3 "
          >
            <v-col cols="11" class="d-flex justify-center">
              <v-icon
                class="mr-2"
                size="70"
                :color="clima[indexclima].iconcolor"
              >
                {{ clima[indexclima].icon }}
              </v-icon>
              <span class="text-h4 text-wrap d-flex align-center">{{
                clima[indexclima].text
              }}</span>
            </v-col>
          </v-row>
          </v-img>
         
        </v-card>
      </v-col>
    </v-row>

    <v-row class="elevation-4 pa-5 mt-10">
      <v-col cols="12" class="text-h4"
        >Detalles
        <v-divider class="my-1"></v-divider>
      </v-col>

      <v-col cols="11" sm="6">
        <span class="text-body-1 blue--text"> Presión Atmosférica:</span>
        <span style="height: 5px; display: block"></span>
        <span class="text-h4"> {{ presionAt }} hPa</span>
      </v-col>
      <v-col cols="11" sm="6">
        <span class="text-body-1 blue--text"> Humedad:</span>
        <span style="height: 5px; display: block"></span>
        <span class="text-h4"> {{ humedad }} %</span>
      </v-col>
      <v-col cols="11" sm="6">
        <span class="text-body-1 blue--text"> Sensor de Lluvia:</span>
        <span style="height: 5px; display: block"></span>
        <span class="text-h4"> {{ sensorLluvia }} mm</span>
      </v-col>
      <v-col cols="11" sm="6">
        <span class="text-body-1 blue--text"> Intensidad de Luz (UV):</span>
        <span style="height: 5px; display: block"></span>
        <span class="text-h4"> {{ intensidadLuz }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { alertMessage } from "../helpers/messages";

export default {
  name: "ReportTable",
  mounted() {
      

    this.indexclima = 4;

    this.filterDataTable(this.date);

  
    this.$services.socketio.getSendTemp((payload) => {
      if (payload && this.date === this.dateCurrent) {
        this.records = [...this.records, payload];

        if (payload.temperature > 37) {
          this.highs = this.highs + 1;
          alertMessage(
            `Se detecto una temperatura alta\n Hora ${payload.hour}`
          );
        } else {
          this.normals = this.normals + 1;
        }
      }
    });
  },
  data() {
    return {
      search: "",
      menu: false,
      date: new Date().toLocaleDateString("fr-CA"),

      dateCurrent: new Date().toLocaleDateString("fr-CA"),
      headers: [
        {
          text: "Numero Persona",
          align: "start",
          sortable: true,
          value: "number",
        },
        { text: "Fecha", value: "date" },
        { text: "Hora", value: "hour" },
        { text: "Temperatura (°C)", value: "temperature" },
        { text: "Resultado", value: "result" },
      ],
      records: [],
      highs: 0,
      normals: 0,

      clima: [
        {
          src: "https://cloudfront-eu-central-1.images.arcpublishing.com/larazon/SWJE3S44PJH6PG5Z22UXPRGRDE.gif", 
          icon: "mdi-weather-sunny",
          iconcolor: "yellow",
          text: "Soleado",
          textcolor: "black--text",
        },
        {
          src: "https://1.bp.blogspot.com/-twskQkPhi4k/XrF5PLD9eLI/AAAAAAAA1Kw/RCwjNk1kChoyW3E-nVp09Y5AqyT1zwyJQCLcBGAsYHQ/s640/rayo2.gif",
          icon: "mdi-weather-lightning",
          iconcolor: "white",
          text: "Tormenta Eléctrica",
          textcolor: "white--text",
        },
        {
          src: "https://consumer-tkbdownload.huawei.com/ctkbfm/applet/simulator/es-us08298338/img/12.gif",
          icon: "mdi-weather-partly-cloudy",
          iconcolor: "white",
          text: "Sol y Nubes",
          textcolor: "white--text",
        },
        {
          src: "https://dca.gob.gt/noticias-guatemala-diario-centro-america/wp-content/uploads/2017/08/lluvia-de-martes.gif",
          icon: "mdi-weather-pouring",
          iconcolor: "white",
          text: "Lluvia",
          textcolor: "white--text",
        },
        {
          src: "https://pa1.narvii.com/6485/864d38df0cc06918771b2fc48d9eb3b79cdb89e6_hq.gif",
          icon: "mdi-weather-cloudy",
          iconcolor: "white",
          text: "Nublado",
          textcolor: "white--text",
        },
      ],

      indexclima: 0,

      presionAt: 0,
      humedad: 0,
      sensorLluvia: 0,
      intensidadLuz: 0,
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    date(val) {
      this.filterDataTable(val);
    },
  },
  methods: {
    filterDataTable(date) {
      this.$services.api
        .getRecords(date)
        .then((response) => {
          this.records = response.data.records;
          this.highs = response.data.highs;
          this.normals = response.data.normals;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getColor(temperature) {
      if (temperature > 37) return "red";
      else return "green";
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    getTime(){
    const d = new Date();
    const dd = [d.getHours(), d.getMinutes(), d.getSeconds()].map((a)=>(a < 10 ? '0' + a : a));
    return dd.join(':');
     },

  },
};
</script>
