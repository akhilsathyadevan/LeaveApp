
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../employee.service';
import { Leave } from './admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  leaves:Leave[]=[];
  totalleaves:any;
  constructor(private e_service:EmployeeService,private router:Router) { }

  ngOnInit(): void {
    this.e_service.getDatas().subscribe((data)=>{
      console.log("recieved from backend")
      this.leaves=JSON.parse(JSON.stringify(data));
    })
    
  } 
  delete(leave:any){
    console.log(leave._id)
    var statu=false;
    
    this.e_service.deleteLeave(leave._id)
   .subscribe((data)=>{
     console.log("deletion success");
     this.leaves=this.leaves.filter(p=> p !== leave)
     this.e_service.insertStatus(leave.eId,statu)
   })
   

  }
  accept(leave:any){
    console.log(leave._id)
    var statu=true;

     this.e_service.acceptStatus(leave.eId,statu)
     .subscribe((data)=>{
      // alert("Leave Accepted");
      this.leaves=this.leaves.filter(p=> p !== leave)
      console.log(data);
      })
  }

}
