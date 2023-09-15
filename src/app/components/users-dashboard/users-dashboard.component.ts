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
    this.store.dispatch(userActions.updateUser({update: {id: 36, changes: {username: 'bla'}}}))
  }
  
  public updateManyUsers() {
    this.store.dispatch(userActions.updateUsers({updates: [{id: 40, changes: {username: 'blabla1'}}, {id: 39, changes: {username: 'blabla2'}}]}));
  }
  //UPSERT
  public upsertOneUser(){
    const user: User = {
      id: 17,
      userId: "upsertoneUPDATEPRESENTATION",
      username: "upsertoneUPDATEPRESENTATION",
      password: 'upsertoneUPDATEPRESENTATION'
    };
    this.store.dispatch(userActions.upsertUser({user}))
  }

  public upsertManyUsers(){
    const users: User[] = [{
      userId: "upsertManyADDPRESENTATION",
      username: "upsertManyADDPRESENTATION",
      email: "upsertManyADDPRESENTATION",
      password: "upsertManyADDPRESENTATION"
    }, 
    {
      userId: "upsertManyADDPRESENTATION",
      username: "upsertManyADDPRESENTATION",
      email: "upsertManyADDPRESENTATION",
      password: "upsertManyADDPRESENTATION"
    },
    {
      userId: "upsertManyADDPRESENTATION",
      username: "upsertManyADDPRESENTATION",
      email: "upsertManyADDPRESENTATION",
      password: "upsertManyADDPRESENTATION"
    }
  ];
    this.store.dispatch(userActions.upsertUsers({users}))
  }

  //ADD
  public addOneUser(){
    const user: User = {
      userId: "addOnePRESENTATION",
      username: "addOnePRESENTATION",
      email: "addOnePRESENTATION",
      password: "addOnePRESENTATION"
    }
    this.store.dispatch(userActions.addUser({user}))
  }

  public addManyUsers(){
    const users = [
      {
        userId: 'addMultiplePRESENTATION',
        username: 'addMultiplePRESENTATION',
        email: 'addMultiplePRESENTATION',
        password: 'addMultiplePRESENTATION',
      },
      {
        userId: 'addMultiplePRESENTATION',
        username: 'addMultiplePRESENTATION',
        email: 'addMultiplePRESENTATION',
        password: 'addMultiplePRESENTATION',
      },
      {
        userId: 'addMultiplePRESENTATION',
        username: 'addMultiplePRESENTATION',
        email: 'addMultiplePRESENTATION',
        password: 'addMultiplePRESENTATION',
      },
    ];
    this.store.dispatch(userActions.addUsers({ users }));
  }

  //SET
  public setOne(){
    const user = {
      userId: 'addingThtoughSetOnePRESENTATION',
      username: 'addingThtoughSetOnePRESENTATION',
      email: 'addingThtoughSetOnePRESENTATION',
      password: 'addingThtoughSetOnePRESENTATION',
    }
    this.store.dispatch(userActions.setUser({ user }));
  }

  public setMany(){
    const users = [{
      id: 2,
      userId: "setManyReplacePRESENTATION",
      username: "setManyReplacePRESENTATION",
      email: "setManyReplacePRESENTATION",
      password: "setManyReplacePRESENTATION"
    },
    {
      id: 3,
      userId: "setManyReplacePRESENTATION",
      username: "setManyReplacePRESENTATION",
      email: "setManyReplacePRESENTATION",
      password: "setManyReplacePRESENTATION"
    },{
      id: 4,
      userId: "setManyReplacePRESENTATION",
      username: "setManyReplacePRESENTATION",
      email: "setManyReplacePRESENTATION",
      password: "setManyReplacePRESENTATION"
    }
  ]

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
