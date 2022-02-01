import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  status: any;
  id:any;
  currentstatus:any
   
  
 
  constructor(private e_service:EmployeeService,private router:Router) {
    
   }
   
    
   
   details={
    eId:'',
    fromdate:'',
    todate:'',
    reason:'',
   }

  ngOnInit(): void {
  }
getDetails(){
 
  console.log(this.details);
  if(this.details.eId!=null&&this.details.fromdate!=null&&this.details.todate!=null){
    var from = new Date(this.details.fromdate);
    var to = new Date(this.details.todate);

    var result=Math.floor((to.getTime() - from.getTime()) / 1000 / 60 / 60 / 24);
    this.e_service.getDetails(result,this.details)
    .subscribe((data)=>{
      console.log(data);
      alert("Request Submitted");
      console.log("details of leaves eneterd in backend")
      this.router.navigate(['home'])
    })
   

  }

 }
 
 checkStatus(id:any){
   console.log("checking initiated for status"+id);
   this.e_service.getStatus(id).subscribe((data)=>{
   this.status=JSON.parse(JSON.stringify(data))
   console.log(this.status);
   if(this.status.statu=="true"){
     this.currentstatus="your leave application is accepted";
   }
   if(this.status.statu=="false"){
     this.currentstatus="your leave application is rejected";
   }
   
   })
   
 }

}
