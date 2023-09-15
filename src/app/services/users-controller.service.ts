import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersControllerService {
  private baseUrl = 'http://localhost:4000/users';
  constructor(private http: HttpClient) {}

  public getAllUsers() {
    return this.http.get(this.baseUrl);
  }
  
  public getOneUser() {
    this.http.get(`${this.baseUrl}/1`);
  }

  public addOne(user){
    return this.http.post(this.baseUrl, user)
  }

  public addMany(users){ 
    return this.http.post(`${this.baseUrl}/insert-users`, users)
  }
  public setUser(user){
    return user.id? this.http.put(`${this.baseUrl}/${user.id}`, user) : this.addOne(user);
  }
  public setUsers(users){
    return users.find(user => user.id)? this.http.put(`${this.baseUrl}/update-users`, users) : this.addMany(users);
  }

  public deleteUser(id){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  public deleteUsers(ids){
    return this.http.delete(`${this.baseUrl}`, {body: ids});
  }

  public deleteAll(){
    return this.http.delete(`${this.baseUrl}/all`);
  }

  public updateUser(user){
     return this.http.patch<User>(`${this.baseUrl}/${user.id}`, { username: user.changes['username'] });
  }
}
