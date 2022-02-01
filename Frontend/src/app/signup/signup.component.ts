import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user={
    eId:'',
    emailId:'',
    userName:'',
    password:''
  }

  constructor(private e_service:EmployeeService,private router:Router) { }

  ngOnInit(): void {
  }
  insertUsers(){
   this.e_service.insertUser(this.user);
   this.router.navigate(['/']);
   
  }


}
