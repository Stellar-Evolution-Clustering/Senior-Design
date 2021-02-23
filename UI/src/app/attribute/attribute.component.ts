import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Variable } from '../api/models/variable.model';
import { VariablesService } from '../api/variables.service';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {
  public variables: Observable<Variable[]>;

  constructor(private variableService: VariablesService) { }

  ngOnInit(): void {
    this.variables = this.variableService.getVariables();
  }
}
