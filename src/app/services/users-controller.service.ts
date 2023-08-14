import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersControllerService {
  private baseUrl = 'http://localhost:4000/users';
  constructor(private http: HttpClient) {}

  public getAllUsers() {
    this.http.get(this.baseUrl);
  }
  public getOneUser() {
    this.http.get(`${this.baseUrl}/1`);
  }
  public addOne(user){
    return this.http.post(this.baseUrl, {user})
  }
  public addMany(){
    const users = [{
      userId: "multiplepost",
      username: "multiplepost",
      email: "multiplepost",
      password: "multiplepost"
    },{
      userId: "multiplepost",
      username: "multiplepost",
      email: "multiplepost",
      password: "multiplepost"
    },{
      userId: "multiplepost",
      username: "multiplepost",
      email: "multiplepost",
      password: "multiplepost"
    }];
    this.http.post(this.baseUrl, {users})
  }
}
