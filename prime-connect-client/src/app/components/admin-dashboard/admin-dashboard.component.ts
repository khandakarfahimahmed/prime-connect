import { Component, ViewChild, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
interface WorkStatus {
  completedWorkOrder: number[];
  targetWorkOrder: number[];
  workLeft: number[];
}
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  // @ViewChild('chart') chart: ChartComponent;
  activePercentage: number = 0;
  inActivePercentage: number = 0;
  months: string[] = [];
  completedWorkOrder: number[] = [];
  targetWorkOrder: number[] = [];
  workStatus: WorkStatus = {
    completedWorkOrder: [],
    targetWorkOrder: [],
    workLeft: [],
  };

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.getActiveInfo();
    this.getWorkStats();
  }

  getActiveInfo() {
    this.adminDashboardService.getActiveInfo().subscribe((res) => {
      this.activePercentage = res.activePercentage;
      this.inActivePercentage = res.inActivePercentage;
      console.log(this.activePercentage, this.inActivePercentage);
    });
  }
  getWorkStats() {
    this.adminDashboardService.getWorkStats().subscribe((res) => {
      this.months = res.months;
      this.workStatus = res.workStatus;

      console.log(
        this.months,
        this.workStatus.completedWorkOrder,
        this.workStatus.targetWorkOrder,
        this.workStatus.workLeft
      );
    });
  }
}
