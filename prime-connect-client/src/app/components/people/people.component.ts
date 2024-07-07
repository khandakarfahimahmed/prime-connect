import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IPeople } from '../../interfaces/people.interface';
import { EmployeeService } from '../../services/employee.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  ApexAxisChartSeries,
  ApexChart,
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
// import { EventTarget } from 'rxjs';

export interface SelectedPeople {
  id: number;
  employee: IPeople;
  roleName: string;
  teamName: string;
}

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.css',
})
export class PeopleComponent implements OnInit {
  peoples!: IPeople[];
  isLoading: boolean = false;
  selectedPeople!: SelectedPeople | '';
  searchTerm$ = new Subject<string>();
  employee_id!: number;
  editPeople!: any;

  showForm: boolean | IPeople = false;
  showAddForm: boolean = false;
  updateForm: boolean = false;

  totalErrorCount: number = 0;
  totalTasksByEmployee: number = 0;
  restPercentage: number = 0;
  workFrequency: number = 0;
  workPercentageById: number = 0;
  completedTasks: number = 0;
  changeVisible(event: boolean) {
    this.showAddForm = event;
  }
  changeUpdateVisible(event: boolean) {
    this.updateForm = event;
  }
  hideAddEmployeeForm(event: boolean | IPeople) {
    if (typeof event === 'boolean') this.showForm = event;
    else {
      this.peoples.push(event);
      this.peoples.sort((a, b) => a.id! - b.id!);
    }
  }

  updateEmployee(event: IPeople) {
    this.peoples = this.peoples.filter((people) => people.id !== event.id);
    this.peoples.push(event);
    this.peoples.sort((a, b) => a.id! - b.id!);
  }
  public chartOptions1: any;
  public chartOptions2: any;

  constructor(
    private peopleApi: EmployeeService,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.chartOptions1 = {
      series: [
        {
          name: 'Completed',
          type: 'column',
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
          // color: '#5d8ac4',
        },
        {
          name: 'Backlog',
          type: 'area',
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
          // color: '#8ab7f1',
        },
        {
          name: 'Target',
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
        '01/01/2024',
        '02/01/2024',
        '03/01/2024',
        '04/01/2024',
        '05/01/2024',
        '06/01/2024',
        '07/01/2024',
        '08/01/2024',
        '09/01/2024',
        '10/01/2024',
        '11/01/2024',
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
    // this.chartOptions2 = {
    //   series: [70],
    //   chart: {
    //     animations: {
    //       enabled: true,
    //       easing: 'easeinout',
    //       speed: 800,
    //       animateGradually: {
    //         enabled: true,
    //         delay: 150,
    //       },
    //       dynamicAnimation: {
    //         enabled: true,
    //         speed: 350,
    //       },
    //     },
    //     height: 350,
    //     type: 'radialBar',
    //     toolbar: {
    //       show: true,
    //     },
    //   },
    //   plotOptions: {
    //     radialBar: {
    //       startAngle: -135,
    //       endAngle: 225,
    //       hollow: {
    //         margin: 0,
    //         size: '70%',
    //         background: '#fff',
    //         image: undefined,
    //         imageOffsetX: 0,
    //         imageOffsetY: 0,
    //         position: 'front',
    //         dropShadow: {
    //           enabled: true,
    //           top: 3,
    //           left: 0,
    //           blur: 4,
    //           opacity: 0.24,
    //         },
    //       },
    //       track: {
    //         background: '#fff',
    //         strokeWidth: '67%',
    //         margin: 0, // margin is in pixels
    //         dropShadow: {
    //           enabled: true,
    //           top: -3,
    //           left: 0,
    //           blur: 4,
    //           opacity: 0.35,
    //         },
    //       },

    //       dataLabels: {
    //         show: true,
    //         name: {
    //           offsetY: -10,
    //           show: true,
    //           color: '#888',
    //           fontSize: '17px',
    //         },
    //         value: {
    //           formatter: function (val: any) {
    //             return parseInt(val);
    //           },
    //           color: '#111',
    //           fontSize: '36px',
    //           show: true,
    //         },
    //       },
    //     },
    //   },
    //   fill: {
    //     type: 'gradient',
    //     gradient: {
    //       shade: 'dark',
    //       type: 'horizontal',
    //       shadeIntensity: 0.5,
    //       gradientToColors: ['#ABE5A1'],
    //       inverseColors: true,
    //       opacityFrom: 1,
    //       opacityTo: 1,
    //       stops: [0, 100],
    //     },
    //   },
    //   stroke: {
    //     lineCap: 'round',
    //   },
    //   labels: ['Percent'],
    // };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employee_id = params['id'];
    });
    this.searchTerm$
      .pipe(
        debounceTime(2000), // Adjust the debounce time as needed
        distinctUntilChanged()
      )
      .subscribe((searchTerm: string | number) => {
        // Call your search function here with the searchTerm
        this.search(searchTerm);
      });

    this.showLoader();
    this.peopleApi.getAllPeople().subscribe((res: IPeople[]) => {
      this.peoples = res.sort((a, b) => a.id! - b.id!).filter((people) => people.name !== "Super Admin");
    });

    this.showDetails(this.employee_id);
  }

  search(searchTerm: string | number) {
    // console.log(searchTerm);
    this.showLoader();
    this.peopleApi.getOnePeople(searchTerm).subscribe({
      next: res => {
        this.createPopupMessage('success', "Find Searched Employee");
        this.selectedPeople = res;
      },
      error: err => {
        this.selectedPeople = '';
        this.createPopupMessage('error',  "This employee is not found in the system. Please try again with a valid employee id.");   
        console.error(err);
      }
    });
  }

  createPopupMessage( type: string, message: string): void {
    this.message.create(type, message, { nzDuration: 5000, nzPauseOnHover: true });
  }

  showLoader() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  showDetails(id: number | undefined) {
    this.showLoader();
    this.peopleApi.getOnePeople(id).subscribe((res) => {
      this.selectedPeople = res;
      this.getTaskStatusById(id);
    });
  }

  editClicked(id: number | undefined) {
    // this.showLoader();
    console.log(id);
    this.editPeople = id;
  }
  getTaskStatusById(id: number | undefined) {
    this.peopleApi.getTaskStatusById(id).subscribe((res) => {
      // this.workPercentageById = res.workPercentageById;
      this.totalTasksByEmployee = res.totalTasksByEmployee;
      (this.totalErrorCount = res.totalErrorCount),
        (this.workFrequency = res.workFrequency);
      this.completedTasks = res.completedTasks;
      if (res.workPercentageById == null) {
        this.workPercentageById = 0;
        this.restPercentage = 100;
      } else {
        this.workPercentageById = res.workPercentageById;
        this.restPercentage = 100 - res.workPercentageById;
      }
      console.log(this.completedTasks, res);
    });
  }
}
