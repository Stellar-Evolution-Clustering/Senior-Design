import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { Attribute } from '../../api/models/attribute.model';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss'],
})
export class AttributeComponent implements OnInit {
  @Input() public variables: Observable<Attribute[]>;
  @Input() formArray: FormArray;
  @Output() selectAttributeEvent = new EventEmitter<Attribute>();
  @Output() deleteAttributeEvent = new EventEmitter<Attribute>();

  constructor() {
    //TODO: Don't allow duplicate attributes
    //TODO: Make a search box to help navigate large attribute lists
  }

  ngOnInit(): void {}

  trackByAtt(index: number, att: any): number {
    return index;
  }

  selected(event: MatChipSelectionChange): void {
    if (event.selected) {
      this.selectAttributeEvent.emit(event.source.value);
    } else {
      this.deleteAttributeEvent.emit(event.source.value);
    }
  }
}
