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
  }

  private retrieveUsers() {
    this.store.dispatch(userActions.loadUsers());
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
      userId: "mypost2",
      username: "mypost2",
      email: "mypost2",
      password: "mypost2"
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
  public setOne(){
    const user = {
      id: 1,
      userId: "setOneReplace",
      username: "setOneReplace",
      email: "setOneReplace",
      password: "setOneReplace"
    }
    // const user = {
    //   userId: 'addingThtoughSetOne',
    //   username: 'addingThtoughSetOne',
    //   email: 'addingThtoughSetOne',
    //   password: 'addingThtoughSetOne',
    // }
    this.store.dispatch(userActions.setUser({ user }));
  }
  public setMany(){
    const users = [{
      id: 2,
      userId: "setManyReplace",
      username: "setManyReplace",
      email: "setManyReplace",
      password: "setManyReplace"
    },
    {
      id: 3,
      userId: "setManyReplace",
      username: "setManyReplace",
      email: "setManyReplace",
      password: "setManyReplace"
    },{
      id: 4,
      userId: "setManyReplace",
      username: "setManyReplace",
      email: "setManyReplace",
      password: "setManyReplace"
    }
  ]
  //   const users = [{
  //     userId: "addingThroughMultipleReplace",
  //     username: "addingThroughMultipleReplace",
  //     email: "addingThroughMultipleReplace",
  //     password: "addingThroughMultipleReplace"
  //   },
  //   {
  //     userId: "addingThroughMultipleReplace",
  //     username: "addingThroughMultipleReplace",
  //     email: "addingThroughMultipleReplace",
  //     password: "addingThroughMultipleReplace"
  //   },{
  //     userId: "addingThroughMultipleReplace",
  //     username: "addingThroughMultipleReplace",
  //     email: "addingThroughMultipleReplace",
  //     password: "addingThroughMultipleReplace"
  //   }
  // ]

    this.store.dispatch(userActions.setUsers({ users }));
  }
  public removeOne(){
    const id = 9;
    this.store.dispatch(userActions.deleteUser({ id }));
  }
  public removeMany(){
    const ids = [11,12,13];
    this.store.dispatch(userActions.deleteUsers({ ids }));
  }
  public removeAll(){
    this.store.dispatch(userActions.deleteAll());
  }
}
