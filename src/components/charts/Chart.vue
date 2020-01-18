<script>
import { Bar, mixins } from "vue-chartjs";
export default {
  extends: Bar,
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                min: 0
              }
            }
          ],
          xAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                categoryPercentage: 0.5,
                barPercentage: 1
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  props: ["chartData"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
