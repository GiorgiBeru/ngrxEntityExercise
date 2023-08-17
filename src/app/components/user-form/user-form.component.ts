import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/actions'
import * as UserSelectors from '../../store/selectors'
import { BehaviorSubject, Subject, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup = this.fb.group({
    userId: [''],
    username: ['', Validators.required],
    email: [''],
    password: [''],
  });;
  selectedUser: any;
  unsubscribe$ = new Subject<void>();
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.store.select(UserSelectors.selectCurrentUserSecondWay(this.route.snapshot.params['id'])).pipe(takeUntil(this.unsubscribe$)).subscribe(x => 
      { 
        console.log(x, 'selected user second way')
        // this.selectedUser = x
        // this.initForm(this.selectedUser);
      });
    this.store.select(UserSelectors.selectCurrentUser).pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
      this.selectedUser = x;  
      this.initForm(this.selectedUser);
      console.log(x, 'selected user first way')
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      
    }
  }
  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  initForm(user: any){
    this.userForm = this.fb.group({
      userId: [user.userId],
      username: [user.username, Validators.required],
      email: [user.email],
      password: [user.password],
    });
  }
}
