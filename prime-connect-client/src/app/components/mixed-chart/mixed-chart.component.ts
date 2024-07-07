import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { labels } from './m';
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
interface WorkStatus {
  completedWorkOrder: number[];
  targetWorkOrder: number[];
  workLeft: number[];
}
@Component({
  selector: 'app-mixed-chart',
  templateUrl: './mixed-chart.component.html',
  styleUrl: './mixed-chart.component.css',
})
export class MixedChartComponent implements OnChanges {
  public chartOptions1: any;
  @Input() months: string[] = [];
  completedWorkOrder: number[] = [];
  targetWorkOrder: number[] = [];
  workLeft: number[] = [];
  @Input() workStatus: WorkStatus = {
    completedWorkOrder: [],
    targetWorkOrder: [],
    workLeft: [],
  };

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workStatus'] && changes['months']) {
      this.updateMonths();

      this.updateChartOptions();
    }
  }
  updateChartOptions(): void {
    this.chartOptions1 = {
      series: [
        {
          name: 'Completed',
          type: 'column',
          data: this.workStatus.completedWorkOrder,
          // color: '#5d8ac4',
        },
        {
          name: 'Backlog',
          type: 'area',
          data: this.workStatus.workLeft,
          // color: '#8ab7f1',
        },
        {
          name: 'Target',
          type: 'line',
          data: this.workStatus.targetWorkOrder,
          // color: '#bdd4f1',
        },
      ],
      chart: {
        height: 420,
        width: 870,
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
      labels: labels, //this.months,
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
  }
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
  updateMonths(): void {
    // Get the start and end dates from the provided months
    const startDate = new Date(this.months[0]);
    const endDate = new Date(this.months[this.months.length - 1]);

    // Calculate the number of months between start and end dates
    const monthsInRange = this.getMonthsInRange(startDate, endDate);

    // Ensure the length of months matches the length of series data
    const seriesLength = Math.max(
      this.workStatus.completedWorkOrder.length,
      this.workStatus.targetWorkOrder.length,
      this.workStatus.workLeft.length
    );

    // Interpolate additional months if needed
    while (monthsInRange.length < seriesLength) {
      const lastMonth = new Date(monthsInRange[monthsInRange.length - 1]);
      const nextMonth = new Date(lastMonth.setMonth(lastMonth.getMonth() + 1));
      monthsInRange.push(this.formatMonth(nextMonth));
    }

    // Update the months array
    this.months = monthsInRange;
  }

  getMonthsInRange(startDate: Date, endDate: Date): string[] {
    const months = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      months.push(this.formatMonth(currentDate));
      currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    }

    return months;
  }

  formatMonth(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}-01`;
  }
}
