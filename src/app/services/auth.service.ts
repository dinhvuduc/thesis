import { HttpClient } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";


@Injectable({
 providedIn: 'root'
})
export class AuthService{
 constructor(private readonly http:HttpClient){}
 login(email:string, password:string){
  return this.http.post<{token:string}>('http://localhost:3000/auth',{
   email,
   password,
  }).pipe(tap(({token})=> localStorage.setItem('token',token)));
 }
 me(token:string){
  return this.http.get('http://localhost:3000/auth/me',{
   headers:{
    Authorization:`Bearer ${token}`
   }
  })
 }
}