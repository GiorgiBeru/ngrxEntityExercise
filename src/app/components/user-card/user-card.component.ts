import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() public employee: any;
  @Output() public selectedUser = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
