import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { Variable, DisplayNames } from '../../api/models/variable.model';
import { VariablesService } from '../../api/variables.service';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {
  @Input() public variables: Observable<string[]>;
  @Input() formArray: FormArray;
  @Output() selectAttributeEvent = new EventEmitter<string>();
  @Output() deleteAttributeEvent = new EventEmitter<string>();

  public varList : Variable[] = [];

  constructor() {
    //TODO: Don't allow duplicate attributes
    //TODO: Make a search box to help navigate large attribute lists
  }

  ngOnInit(): void {
    this.variables.subscribe(async (vars : string[]) => {
      for await (const iterator of vars) {
        //console.log(iterator);
        if(DisplayNames.hasOwnProperty(iterator)) {
          this.varList.push({name: DisplayNames[iterator], db_name: iterator});
        }
      }
    })
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
