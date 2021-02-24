import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Variable } from '../../api/models/variable.model';
import { VariablesService } from '../../api/variables.service';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {
  public variables: Observable<Variable[]>;
  public selectedAttributes: string[];

  constructor(
    private variableService: VariablesService,
  ) {

  }

  ngOnInit(): void {
    this.variables = this.variableService.getVariables();
    this.selectedAttributes = new Array();
  }

  addAttribute(): void {
    this.selectedAttributes.push("test");

    //TODO: Add logic to store selected attributes
  }

  deleteAttribute(): void {
    this.selectedAttributes.pop();

    //TODO: Add logic to store selected attributes
  }
}
