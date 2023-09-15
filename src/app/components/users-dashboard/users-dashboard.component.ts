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
  employees: User[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private store:Store) {}

  ngOnInit() {
    this.retrieveUsers();
    this.listenToRetrievedUsers();
  }

  private retrieveUsers() {
    this.store.dispatch(userActions.loadUsers());
  }
  
  private listenToRetrievedUsers(){
    this.store.select(selectAllUsers).subscribe(x => {
      this.employees = x
    });
  }

  public handleSelectedUser(user: User){
    this.store.dispatch(userActions.setUserId({userId: user.id}))
    this.router.navigate(['./', user.id.toString()], {relativeTo: this.route})
  }

  //UPDATE
  public updateOneUser(){
    this.store.dispatch(userActions.updateUser({update: {id: 36, changes: {username: 'blax'}}}))
  }
  
  public updateManyUsers() {
    this.store.dispatch(userActions.updateUsers({updates: [{id: 40, changes: {username: 'blax1'}}, {id: 39, changes: {username: 'blax2'}}]}));
  }
  //UPSERT
  public upsertOneUser(){
    const user: User = {
      id: 17,
      userId: "upsertoneUPDATE",
      username: "upsertoneUPDATE",
    };
    // const user: User = {
    //   userId: "upsertoneADD",
    //   username: "upsertoneADD",
    //   email: "upsertoneADD",
    //   password: "upsertoneADD"
    // };
    this.store.dispatch(userActions.upsertUser({user}))
  }

  public upsertManyUsers(){
    // const users: User[] = [{
    //   userId: "upsertManyUpdate",
    //   username: "upsertManyUpdate",
    //   email: "upsertManyUpdate",
    //   password: "upsertManyUpdate"
    // }, 
    // {
    //   userId: "upsertManyUpdate",
    //   username: "upsertManyUpdate",
    //   email: "upsertManyUpdate",
    //   password: "upsertManyUpdate"
    // },
    // {
    //   userId: "upsertManyUpdate",
    //   username: "upsertManyUpdate",
    //   email: "upsertManyUpdate",
    //   password: "upsertManyUpdate"
    // }];
    const users: User[] = [{
      userId: "upsertManyADD",
      username: "upsertManyADD",
      email: "upsertManyADD",
      password: "upsertManyADD"
    }, 
    {
      userId: "upsertManyADD",
      username: "upsertManyADD",
      email: "upsertManyADD",
      password: "upsertManyADD"
    },
    {
      userId: "upsertManyADD",
      username: "upsertManyADD",
      email: "upsertManyADD",
      password: "upsertManyADD"
    }
  ];
    this.store.dispatch(userActions.upsertUsers({users}))
  }

  //ADD
  public addOneUser(){
    const user: User = {
      userId: "mypost5",
      username: "mypost5",
      email: "mypost5",
      password: "mypost5"
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

  //SET
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

  //REMOVE
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
