import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ITeam } from '../../interfaces/team.interface';
import { IRole } from '../../interfaces/role.interface';
import { EmployeeDashboardService } from '../../services/employee-dashboard.service';
import { IEmployeeDashboard } from '../../interfaces/employee-dashboard';
import { Router } from '@angular/router';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css',
})
export class EmployeeDashboardComponent {
  isLoading: boolean = false;
  workOrders!: any;
  employee_id!: number;
  count: number = 0;
  role_id!: number;
  employee_access!: string;

  public chartOptions: any;
  public radialChart: any;
  public errorChart: any;

  constructor(
    private api: EmployeeDashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private workflowApi: WorkflowService
  ) {

    // Radial Chart

    this.radialChart = {
      series: [ 83,67,5],
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Total",
              formatter: function(w : any) {
                return "249";
              }
            }
          }
        }
      },
      labels: ["Requested", "Completed","Pending"]
    };

    // Bar Chart
    this.chartOptions = {
      series: [
        {
          name: "Pending",
          data: [4, 5, 3, 6, 1, 5, 3, 6, 2]
        },
        {
          name: "Completed",
          data: [31, 35, 40, 38, 40, 35, 35, 44, 32]
        },
        {
          name: "Requested",
          data: [35, 40, 43, 44, 41, 40, 38, 50, 34]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "75%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 0.5,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val: any) {
            return "$ " + val + " thousands";
          }
        }
      }
    };

    // Error Chart

    this.errorChart = {
      series: [
        {
          name: "Pending",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Completed",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: "Requested",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Work Statistics",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val: any, opts: any) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan",
          "08 Jan",
          "09 Jan",
          "10 Jan",
          "11 Jan",
          "12 Jan"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val: any) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function(val: any) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function(val: any) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employee_id = params['id'];
      this.role_id = params['role'];
    });
    this.showLoader();
    this.workflowApi.getWorkflowByRoleId(this.role_id).subscribe((data) => {
      this.employee_access = data.access;
      this.getAllById(this.employee_id);
    })
  }
  showLoader() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2500);
  }

  getAllById(id: number) {

    if(this.employee_access == 'Read'){
      this.api.getAllWorkById(id).subscribe((data) => {
        this.workOrders = data;
      });
    }

    else {
      this.api.getAllById(id).subscribe((data) => {
        // this.workOrders = data.filter((item) => item.status !== 'approved');
        // console.log('employee data check', data )
        this.workOrders = data;
        // console.log(this.workOrders);
      });
  
    }
  }

  workOn(acc_id: number, team_id: number, customer_id: number,order_id: number) {
   if(this.employee_access == 'Read') this.router.navigate(['/reviewer', acc_id, team_id, customer_id,this.employee_id]);
   if(this.employee_access == 'Write') {
    this.router.navigate(['/write', this.employee_id, order_id]);
   }
   if(this.employee_access == 'Read_Write') {
    console.log(this.employee_id, order_id);
    this.router.navigate(['/read-write', this.employee_id, order_id]);
   }
  }
}
