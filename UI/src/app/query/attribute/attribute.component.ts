import { Component, OnInit, Input } from '@angular/core';
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
  @Input() public selectedAttributes: any[];

  constructor(
    private variableService: VariablesService,
  ) {
    //TODO: Don't allow duplicate attributes
    //TODO: Make a search box to help navigate large attribute lists
  }

  ngOnInit(): void {
    this.variables = this.variableService.getVariables();
  }

  addAttribute(): void {
    this.selectedAttributes.push({
      "att": "",
      "weight": 0.0
    });
  }

  deleteAttribute(i: number): void {
    this.selectedAttributes.splice(i, 1);
  }

  trackByAtt(index: number, att: any): number {
    return index;
  }
}
