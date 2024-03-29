import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
 providedIn: 'root'
})
export class AuthService{
 constructor(private readonly http:HttpClient){}
 login(email:string, password:string){
  return this.http.post('http://localhost:3000/auth',{
   email,
   password,
  });
 }
}