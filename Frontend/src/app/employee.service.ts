import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  insertUser(user:any){
   return this.http.post('http://localhost:3000/signup',user)
   .subscribe((data)=>{
     console.log(data);
     
   })
  }
  loginUser(users:any){
    return this.http.post<any>('http://localhost:3000/login',users)
  }
  getDetails(result:any,details:any){
    return this.http.post<any>('http://localhost:3000/leaveapp',{result,details})
    
  }
  getDatas(){
    return this.http.get('http://localhost:3000/getusers')
  }
  deleteLeave(id:any){
    return this.http.delete('http://localhost:3000/deleteuser/'+id)
  }
  insertStatus(id:any,statu:any){
    console.log("status deletion updation initiated");
    return this.http.post<any>('http://localhost:3000/deletestatus/',{statu,id})
    .subscribe((data)=>{
      console.log("status update in backend");
      console.log(data);
  })

  }
  acceptStatus(id:any,statu:any){
    console.log("status updation initiated");
    return this.http.post<any>('http://localhost:3000/acceptstatus/',{statu,id})
    
 
  }
  getStatus(id:any){
    return this.http.get('http://localhost:3000/getstatus/'+id)
  }
  gettotalleaves(){
    return this.http.get('http://localhost:3000/gettotalleaves/')
  }
  // getSingleDatas(id:any){
  //   return this.http.get('http://localhost:3000/getsingledata/'+id)
  // }
}
