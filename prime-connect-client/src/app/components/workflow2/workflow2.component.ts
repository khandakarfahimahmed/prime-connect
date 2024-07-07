import { Component,EventEmitter,OnInit, Output,Input, OnChanges,ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormArray } from '@angular/forms';
import { TeamApiService } from '../../services/team-api.service';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { WorkflowService } from '../../services/workflow.service';
import { ITeam } from '../../interfaces/team.interface';
import { IRole } from '../../interfaces/role.interface';
import { AddFormService } from '../../services/add-form.service';
import { ImageContainerComponent } from '../image-container/image-container.component';

interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}


@Component({
  selector: 'app-workflow2',
  templateUrl: './workflow2.component.html',
  styleUrl: './workflow2.component.css'
})
export class Workflow2Component implements OnInit{
  teamName: string = 'A/C opening List';
  teamId!: number;
  isLoading: boolean = false;
  roles: IRole[] = []; 
  updatedWorkflow: IRole[] = [];
  addForm: boolean = false;
  teams: ITeam[] = [];
  addNewRole!: FormGroup;
  roleId!: number | undefined;
  formRoles!: any;
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;
  formInfo!: any;
  fieldCoord!: number[];

  @ViewChild(ImageContainerComponent) imageContainer!: ImageContainerComponent;

  fieldImage(event: any){

    this.imageContainer.imageLoade = true;
    this.imageContainer.myThumbnail = event;
    
  }
  changeVisible(event: boolean) {
    this.showAddForm = event;
  }
  changeUpdateVisible(event: boolean) {
    this.showUpdateForm = event;
  }
  constructor( private formApi: AddFormService,private route: ActivatedRoute, private workflowService: WorkflowService, private fb: FormBuilder, private roleApi: RoleService, private teamApi: TeamApiService) { }

  i = 0;
  editId!: number|undefined;
  listOfData: ItemData[] = [];

  startEdit(id: number|undefined): void {
    this.editId = id;
  }

  createForm(id: number | undefined): void {
    this.showAddForm = !this.showAddForm;
    this.roleId = id;
    // console.log(this.showAddForm,this.roleId);
  }

  updateForm(id: number | undefined): void {
    this.showUpdateForm= !this.showUpdateForm;
    this.roleId = id;
    // console.log(this.roleId,this.teamId);
    this.formApi.getFormByTeamRoleId(this.teamId,this.roleId).subscribe(data => {
      this.formInfo = data;
      // console.log(this.formInfo.name, this.formInfo.fields);   
    })
    // console.log(this.showAddForm,this.roleId);
  }
  stopEdit(): void {
    this.editId = 0;
  }

  deleteRole(id: number|undefined): void {
    this.workflowService.deleteWorkflow(this.teamId, id).subscribe(res => {
      if(res) this.updatedWorkflow = this.updatedWorkflow.filter(role => role.id !== id);
      this.ngOnInit();
    });
  }

  editRole(id: number | undefined) {

  }


  ngOnInit(): void {
    this.showLoader();
    this.route.params.subscribe(params => {
      this.teamId = params['id'];

      this.formApi.getAllFormByTeamId(this.teamId).subscribe(data => {
        this.formRoles = data;
        // console.log(this.formRoles);
      });

      this.roleApi.getAllRole(this.teamId).subscribe(data => {
        this.teamName = data.name;
        this.roles = data.roles;
        // console.log(data);
        const roleLen = data.roles.length;
        const workflowLen = data.workflows.length;
        this.updatedWorkflow = [];
        if(workflowLen == 0) this.updatedWorkflow = [];

        for(let i = 0; i < roleLen; i++) {
          for(let j = 0; j < workflowLen; j++) {
            if(data.roles[i].id === data.workflows[j].role_id) {
              const workflow = {name: data.roles[i].name, description: data.roles[i].description,id: data.roles[i].id, access: data.workflows[j].access, sequence: data.workflows[j].sequence, isAuthor: data.workflows[j].isAuthor};
              this.updatedWorkflow.push(workflow);
            }
          }
          if(i == roleLen - 1) {
           this.updatedWorkflow = this.updatedWorkflow.sort((a: any, b: any) => a.sequence - b.sequence);
          }
          // console.log(this.updatedWorkflow);
        }
      })

      this.addNewRole = this.fb.group({
        roleId: this.fb.control('',[Validators.required]),
        access: this.fb.control('',[Validators.required]),
        sequence: this.fb.control('',[Validators.required]),
        isAuthor: this.fb.control('true'),
      })
    })
  }


  cancelClicked(){
    this.addForm = false;
  }
  removeRole(id: number | undefined) {
    this.roleApi.deleteTeamRole(id,this.teamId).subscribe( );
  }
  showLoader() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2500);
   }

   // Update role ts

   

  // @Input() team_id!: number;
  visible: boolean = false;
  onAddRole(){   
    // this.addRoleEvent.emit(false);
    const { roleId,access,sequence,isAuthor } = this.addNewRole.value;
    const role = {role_id: roleId,access,sequence,isAuthor,team_id: this.teamId};
    // console.log(role);
    this.workflowService.createWorkflow(role).subscribe(res => {
      // console.log(res);
      this.updatedWorkflow.push(res);
      this.ngOnInit();
      this.updatedWorkflow = this.updatedWorkflow.sort((a: any, b: any) => a.sequence - b.sequence);
    });
    
    // this.addNewRole.reset();
  }

  close(): void {
    this.visible = false;
  }
  create(): void {
    this.visible = false;
  }
  
  getCoord(event: number[]) {
    this.fieldCoord = event;
    // console.log(this.fieldCoord);
  }
}
