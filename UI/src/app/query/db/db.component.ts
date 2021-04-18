import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Database } from 'src/app/api/models/cluster-request.model';

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.scss']
})
export class DBComponent implements OnInit {
  dbs: string[] = [];

  @Input() fc: FormControl;

  constructor() {}

  ngOnInit(): void {
    for (const key in Database) {
      this.dbs.push(Database[key]);
    }
  }

}
