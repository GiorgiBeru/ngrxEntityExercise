import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../store/actions'
import { User } from 'src/app/models/user.model';
import { selectAllUsers } from 'src/app/store/reducer';
@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss']
})
export class UsersDashboardComponent implements OnInit {
  employees: any = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private store:Store) {}

  ngOnInit() {
    this.retrieveUsers();
  }

  private retrieveUsers() {
    // this.http.get('http://localhost:4000/users').subscribe((x) => {
    //   this.employees = x;
    //   console.log(this.employees, 'employees on dashboard')
    // });
    this.store.dispatch(userActions.loadUsers());
    this.store.select(selectAllUsers).subscribe(x => this.employees = x);
    // this.store.pipe(select(selectAllUsers)).subscribe(x => this.employees =x)

  }
  public handleSelectedUser(user: any){
    this.router.navigate(['./', user.id.toString()], {relativeTo: this.route})
  }
  public updateOneUser(){
    
  }
  public addOneUser(){
    const user: User = {
      userId: "mypost1",
      username: "mypost1",
      email: "mypost1",
      password: "mypost1"
    }
    this.store.dispatch(userActions.addUser({user}))
  }
}
