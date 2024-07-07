import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ApexOptions } from 'apexcharts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexTooltip,
  ApexResponsive,
  ApexFill,
  ApexPlotOptions,
} from 'ng-apexcharts';

export interface ChartOptions1 {
  // series: ApexNonAxisChartSeries;
  // chart: ApexChart;
  // responsive: ApexResponsive[];
  // labels: any;
  // fill: ApexFill;
  // legend: ApexLegend;
  // dataLabels: ApexDataLabels;
}
export interface ChartOptions2 {
  // series: ApexAxisChartSeries;
  // chart: ApexChart;
  // xaxis: ApexXAxis;
  // stroke: ApexStroke;
  // dataLabels: ApexDataLabels;
  // markers: ApexMarkers;
  // tooltip: ApexTooltip;
  // grid: ApexGrid;
  // legend: ApexLegend;
  // title: ApexTitleSubtitle;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  team: boolean = false;
  isLoading = false;

  // @ViewChild("chart") chart: ChartComponent;
  public chartOptions1!: Partial<ChartOptions1>;
  public chartOptions2!: ChartOptions2;

  ngOnInit(): void {
    this.initializeChartOptions();
  }
  series!: ApexAxisChartSeries;
  chart!: ApexChart;
  title!: ApexTitleSubtitle;

  title1!: ApexTitleSubtitle;
  series1!: ApexNonAxisChartSeries;
  chart1!: ApexChart;
  responsive1!: ApexResponsive[];
  labels1!: any;
  fill1!: ApexFill;
  legend1!: ApexLegend;
  dataLabels1!: ApexDataLabels;
  plotOptions1!: ApexPlotOptions;

  series2!: ApexAxisChartSeries;
  chart2!: ApexChart;
  xaxis2!: ApexXAxis;
  stroke2!: ApexStroke;
  dataLabels2!: ApexDataLabels;
  markers2!: ApexMarkers;
  tooltip2!: ApexTooltip;
  grid2!: ApexGrid;
  legend2!: ApexLegend;
  title2!: ApexTitleSubtitle;
  annotations2!: any;

  title3!: ApexTitleSubtitle;
  series3!: ApexNonAxisChartSeries;
  chart3!: ApexChart;
  responsive3!: ApexResponsive[];
  plotOptions3!: ApexPlotOptions;
  grid3!: ApexGrid;
  labels3!: any;

  initializeChartOptions() {
    this.title = {
      text: 'Completion Time',
      align: 'left',
    };
    this.series = [
      {
        name: 'A/C Opening',
        data: [12, 10, 19],
      },
      {
        name: 'A/C closing',
        data: [23, 18, 20],
      },
      {
        name: 'A/C Servicing',
        data: [10, 15, 12],
      },
    ];
    this.chart = {
      type: 'bar',
      width: 300,
      height: 210,
    };

    (this.labels1 = ['Successful - 150', 'Unsuccessful - 7']),
      (this.title1 = {
        text: 'A/C opening success rate',
        align: 'center',
      }),
      (this.series1 = [150, 10]),
      (this.plotOptions1 = {
        pie: {
          customScale: 1,
        },
      });
    (this.chart1 = {
      width: 300,
      height: 500,
      type: 'donut',
    }),
      (this.dataLabels1 = {
        enabled: false,
      }),
      (this.fill1 = {
        type: 'gradient',
      }),
      (this.legend1 = {
        formatter: function (val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
        },
      }),
      (this.responsive1 = [
        {
          // breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ]);

    this.series2 = [
      {
        name: 'A/C opening',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
      },
      {
        name: 'A/C closing',
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
      },
      {
        name: 'A/C servicing',
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
      },
    ];

    this.annotations2 = {
      xaxis: [
        {
          x: new Date('23 Nov 2017').getTime(),
          strokeDashArray: 0,
          borderColor: '#775DD0',
          label: {
            borderColor: '#775DD0',
            style: {
              color: '#fff',
              background: '#775DD0',
            },
            text: 'Anno Test',
          },
        },
        {
          x: new Date('26 Nov 2017').getTime(),
          x2: new Date('28 Nov 2017').getTime(),
          fillColor: '#B3F7CA',
          opacity: 0.4,
          label: {
            borderColor: '#B3F7CA',
            style: {
              fontSize: '10px',
              color: '#fff',
              background: '#00E396',
            },
            offsetY: -10,
            text: 'X-axis range',
          },
        },
      ],
    };
    this.chart2 = {
      height: 220,
      type: 'line',
    };
    this.xaxis2 = {
      labels: {
        trim: false,
      },
      categories: [
        '01 Jan',
        '02 Jan',
        '03 Jan',
        '04 Jan',
        '05 Jan',
        '06 Jan',
        '07 Jan',
        '08 Jan',
        '09 Jan',
        '10 Jan',
        '11 Jan',
        '12 Jan',
      ],
    };
    this.stroke2 = {
      width: 5,
      curve: 'straight',
      // dashArray: [0, 8, 5]
    };
    this.dataLabels2 = {
      enabled: false,
    };
    this.markers2 = {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    };
    this.tooltip2 = {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + ' (mins)';
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val + ' per session';
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
      ],
    };
    this.grid2 = {
      borderColor: '#f1f1f1',
    };
    this.legend2 = {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          ' - <strong>' +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          '</strong>'
        );
      },
    };
    this.title2 = {
      text: 'Error Rate',
      align: 'left',
    };

    this.title3 = {
      text: 'Daily Target Achieved',
      align: 'left',
    };
    (this.labels3 = [
      'A/C opened - 44',
      'A/C closed - 55',
      'A/C serviced - 41',
    ]),
      (this.series3 = [44, 55, 41]),
      (this.chart3 = {
        width: 380,
        type: 'donut',
      }),
      (this.plotOptions3 = {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
        },
      }),
      (this.grid3 = {
        padding: {
          bottom: -80,
        },
      }),
      (this.responsive3 = [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ]);
  }

  teamClicked(team: boolean) {
    this.team = !team;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2500);
  }

  constructor() {}
}
