<script>
import { Line } from "vue-chartjs";

export default {
  name: "LineChart",
  extends: Line,
  props: {
    data: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.updateChart(this.data);
  },
  watch: {
    data(value) {
      this.updateChart(value);
    },
  },
  methods: {
    updateChart(data) {
      this.renderChart(
        {
          labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abri",
            "Mayo",
            "Junio",
            "Julio",
            "Augosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
          datasets: [
            {
              label: this.label,
              backgroundColor: "#E53935",
              data,
            },
          ],
        },
        { responsive: true, maintainAspectRatio: false }
      );
    },
  },
};
</script>