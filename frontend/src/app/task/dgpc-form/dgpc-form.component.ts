import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup ,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import {camundaService} from '../../services/camunda.service';
@Component({
  selector: 'app-dgpc-form',
  templateUrl: './dgpc-form.component.html',
  styleUrls: ['./dgpc-form.component.css']
})
export class DgpcFormComponent {
   
   leaveForm: any;
   isLoading=true;
   userDetails:any;
   isGuideApproved=false;
   guide_options=[
      { label:'Approved',value:'guide_app'},
      { label:'DisApproved',value:'guide_dis'}
    ];
    dgpc_options=[
      { label:'Approved',value:'dgpc_app'},
      { label:'DisApproved',value:'dgpc_dis'}
    ];
   taskId:any;
   taskDetails:any
  constructor(private fb: FormBuilder,
    private http:HttpClient,
    private route: ActivatedRoute,
    private camundaService:camundaService,
    private router:Router
  ){}

  ngOnInit() {
    this.initializeForm();
    this.getTask();
  }

  initializeForm(){
    this.leaveForm = this.fb.group({
      rollNum: [{value:'',disabled: true}, Validators.required],
      name: [{value:'',disabled: true}, Validators.required],
      course: [{value:'',disabled: true}, Validators.required],
      dept: [{value:'',disabled: true}, Validators.required],
      fromDate:[{value:'',disabled: true}, Validators.required],
      toDate:[{value:'',disabled: true}, Validators.required],
      remLeave:[{value:'',disabled: true}, Validators.required],
      assignee:[{value:'',disabled: true}, Validators.required],
      comment:[{value:'',disabled: true}, Validators.required],
      guide_approval:['', Validators.required],
      guide_comment:[{value:'',disabled: true}, Validators.required],
      dgpc_approval:[{value:'guide_dis'}, Validators.required],
      dgpc_comment:['', Validators.required]
    });
  }
  getTask(){
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.camundaService.getTask(this.taskId).subscribe(response=>{
      this.userDetails=response;
      this.updateForm();
      this.isLoading=false;
    });
    
  }
  updateForm(){
    console.log(this.userDetails.guide_approval.value);
    this.leaveForm.patchValue({
      rollNum: this.userDetails.roll_num.value,
      name: this.userDetails.name.value,
      course: this.userDetails.course.value,
      dept: this.userDetails.department.value,
      assignee: this.userDetails.assignee.value,
      fromDate:this.userDetails.from.value,
      toDate:this.userDetails.to.value,
      remLeave:this.userDetails.rem_leave.value,
      comment:this.userDetails.reason.value,
      guide_comment:this.userDetails.comments.value,
      guide_approval:this.userDetails.guide_approval.value
    });
  }
  onSubmit() {
    if (this.leaveForm.valid) {
      
      const data={
      'taskID':this.taskId,
      'taskName':'Approval For DGPRC',
      'camunda_data':{
        "variables": {
          "dgpc_approval": {"value":this.leaveForm.get('dgpc_approval').value,"type":"String"},
          "dgprc_comment":{"value":this.leaveForm.get('dgpc_comment').value,"type":"String"},
        }
      }
      }
      this.camundaService.completeTask(data).subscribe(response=>{
        if(response)this.router.navigate(['/']);
      });
    } else {
      console.log('Form is invalid');
      return;
    }
  }
}
