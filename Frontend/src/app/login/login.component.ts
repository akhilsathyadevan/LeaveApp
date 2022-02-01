import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users={
    username:'',
    password:''
  }

  constructor(private router:Router,private e_service:EmployeeService ) { 
    
  }

  ngOnInit(): void {
    console.log(this.users);
  }
  loginUser(){
    // console.log(this.user.username);
    this.e_service.loginUser(this.users)
    .subscribe((res)=>{
      // if(res.session=='adminsession'){
      //   console.log("admin token",res.token);
      //   localStorage.setItem('admintoken',res.token)
      //   this.router.navigate(['/home'])
      // }else{
      //   if(res.session=='usersession'){
      //     console.log('usertoken',res.token);
      //     localStorage.setItem('usertoken',res.token)
      //     this.router.navigate(['/home'])
      //   }
      // }
      localStorage.setItem('token',res.token);
      localStorage.setItem('session',res.session);
      this.router.navigate(['/home']);
      
    })
  //   if(err:any)=>{
  //     console.log(err);
  //     alert('please signup')
  //     this.router.navigate(['/signup'])

  //   }
  }
  }
  





