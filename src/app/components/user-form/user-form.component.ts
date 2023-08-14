import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

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
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe, private router: Router) {}

  ngOnInit() {
    this.retrieveSpecifiedUser().pipe(
       tap((selectedUser: any) => {
        this.selectedUser = selectedUser;
        this.initForm(selectedUser);
       })
    ).subscribe();
  }

  retrieveSpecifiedUser(){
    return this.http.get(`http://localhost:4000/users/${this.route.snapshot.params['id']}`);
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      const req = {id: +this.route.snapshot.params['id'],...this.userForm.value};
      console.log(JSON.stringify(req));
      this.http.put(`http://localhost:4000/users/${+this.route.snapshot.params['id']}`,JSON.stringify(req), {headers: {'Content-type': 'application-json'}} ).subscribe()
      // You can perform further actions here, such as sending data to the server
      this.router.navigate(['../'],{relativeTo: this.route})
    }
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
