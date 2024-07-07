import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexYAxis,
  ApexMarkers,
  ApexTooltip,
  ApexLegend,
  ApexFill,
  ApexGrid,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-gradient-circle-chart',
  templateUrl: './gradient-circle-chart.component.html',
  styleUrl: './gradient-circle-chart.component.css',
})
export class GradientCircleChartComponent implements OnChanges {
  @Input() activePercentage: number = 0;
  @Input() inActivePercentage: number = 0;
  @Input() labels1: string[] = [];
  public chartOptions2: any;
  value: number = 0;
  labels: string[] = [];
  constructor() {
    this.updateValue();
    this.chartOptions2 = {
      series: [this.value],
      chart: {
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              formatter: function (val: any) {
                return parseInt(val);
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: this.labels,
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activePercentage']) {
      this.updateValue();
      this.chartOptions2.series = [this.value];
      this.chartOptions2.labels = this.labels1;
    }
  }
  updateValue(): void {
    this.value = this.activePercentage;
    this.labels = this.labels1;
  }
}
