import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
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
  @Input() formArray: FormArray;
  @Output() selectAttributeEvent = new EventEmitter<string>();
  @Output() deleteAttributeEvent = new EventEmitter<string>();

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

  selected(event: MatChipSelectionChange): void {
    if(event.selected) {
      this.selectAttributeEvent.emit(event.source.value);
    } else {
      this.deleteAttributeEvent.emit(event.source.value);
    }
  }
}
