import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
  }

}
