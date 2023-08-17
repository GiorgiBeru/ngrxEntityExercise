import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../store/actions'
import { User } from 'src/app/models/user.model';
import { selectAllUsers, selectUserEntities } from 'src/app/store/selectors';
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
    this.listenToRetrievedUsers();
    // this.store.select(selectAllUsers).subscribe(x => console.log('user entities', x))
  }

  private retrieveUsers() {
    this.store.dispatch(userActions.loadUsers());
    // this.http.get('http://localhost:4000/users').subscribe(x => console.log('get', x))
  }
  
  private listenToRetrievedUsers(){
    this.store.select(selectAllUsers).subscribe(x => this.employees = x);
  }

  public handleSelectedUser(user: any){
    this.store.dispatch(userActions.setUserId({userId: user.id}))
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
  public addManyUsers(){
    const users = [
      {
        userId: 'multiplepost',
        username: 'multiplepost',
        email: 'multiplepost',
        password: 'multiplepost',
      },
      {
        userId: 'multiplepost',
        username: 'multiplepost',
        email: 'multiplepost',
        password: 'multiplepost',
      },
      {
        userId: 'multiplepost',
        username: 'multiplepost',
        email: 'multiplepost',
        password: 'multiplepost',
      },
    ];
    this.store.dispatch(userActions.addUsers({ users }));
  }
}
