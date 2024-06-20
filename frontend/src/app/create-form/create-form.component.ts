import { Component } from '@angular/core';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {
  form= {title : '', components: []};
  header='';
  disabled = true;
  onChange(event:any) {
    //console.log(event.form,'formdata')
  }
  title()
  {
    if(this.header.length===0)
    {
       this.disabled=true;
    }
    else
    this.disabled=false;
  }
  save()
  {
    this.disabled=true;
    this.form.title=this.header;
    console.log(this.form);
    //this.service.ngsavedata(this.form).subscribe();
  }

  constructor() { }
  ngOnInit() {
  this.disabled=true;
  }

}