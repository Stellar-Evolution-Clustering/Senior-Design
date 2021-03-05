import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.scss']
})
export class DBComponent implements OnInit {
  dbs: string[] = [
    "COSMIC",
    "Database #2",
    "Database #3"
  ];

  @Input() fc: FormControl;

  constructor() {}

  ngOnInit(): void {
  }

}
