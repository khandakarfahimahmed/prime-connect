import { Component } from '@angular/core';
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
  selector: 'app-team-admin-dashboard',
  templateUrl: './team-admin-dashboard.component.html',
  styleUrl: './team-admin-dashboard.component.css',
})
export class TeamAdminDashboardComponent {
  public chartOptions1: any;
  public chartOptions2: any;
  public chartOptions3: any;
  constructor() {
    this.chartOptions1 = {
      series: [
        {
          name: 'A/C Opening',
          type: 'column',
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
          // color: '#5d8ac4',
        },
        {
          name: 'A/C Closing',
          type: 'area',
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
          // color: '#8ab7f1',
        },
        {
          name: 'A/C Servicing',
          type: 'line',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
          // color: '#bdd4f1',
        },
      ],
      chart: {
        height: 420,
        // width: 700,
        type: 'line',
        stacked: false,
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
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          borderRadius: 4,
          // endingShape: 'rounded',
        },
      },

      fill: {
        colors: ['#5d8ac4', '#8ab7f1', '#bdd4f1'],
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [
        '01/01/2003',
        '02/01/2003',
        '03/01/2003',
        '04/01/2003',
        '05/01/2003',
        '06/01/2003',
        '07/01/2003',
        '08/01/2003',
        '09/01/2003',
        '10/01/2003',
        '11/01/2003',
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
      },

      yaxis: {
        title: {
          text: 'Points',
        },
        min: 0,
      },

      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y: any) {
            if (typeof y !== 'undefined') {
              return y.toFixed(0) + ' points';
            }
            return y;
          },
        },
      },
    };

    this.chartOptions2 = {
      series: [70],
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
      labels: ['Percent'],
    };

    this.chartOptions3 = {
      series: [
        {
          name: 'South',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2017 GMT').getTime(),
            20,
            {
              min: 10,
              max: 60,
            }
          ),
        },
        {
          name: 'North',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2017 GMT').getTime(),
            19,
            {
              min: 30,
              max: 20,
            }
          ),
        },
        {
          name: 'Central',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2017 GMT').getTime(),
            20,
            {
              min: 10,
              max: 15,
            }
          ),
        },
      ],
      chart: {
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 500,
          animateGradually: {
            enabled: true,
            delay: 170,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
        type: 'area',
        height: 420,
        stacked: true,
        events: {
          selection: function (chart: any, e: any) {
            console.log(new Date(e.xaxis.min));
          },
        },
      },
      colors: ['#008FFB', '#00E396', '#CED4DC'],
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
      stroke: {
        width: 2, // Adjust the width to make the line thinner
      },
    };
  }
  public generateDayWiseTimeSeries = function (
    baseval: any,
    count: any,
    yrange: any
  ) {
    var i = 0;
    var series: any = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  };
  public generateData(count: any, yrange: any) {
    var i = 0;
    var series: { x: string; y: string }[] = [];
    while (i < count) {
      var x: string = 'w' + (i + 1).toString();
      var y: string =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  }
}
