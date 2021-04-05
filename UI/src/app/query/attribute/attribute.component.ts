import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { QueryService } from 'src/app/api/query.service';
import { Attribute } from '../../api/models/attribute.model';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss'],
})
export class AttributeComponent implements OnInit {
  @Input() formArray: FormArray;
  @Output() selectAttributeEvent = new EventEmitter<Attribute>();
  @Output() deleteAttributeEvent = new EventEmitter<Attribute>();
  attributes: Attribute[];
  selectedAvailibleAttributes: Attribute[];
  selectedSelectedAttributes: Attribute[];
  _filteredAttributes: Observable<Attribute[]>;

  constructor(private queryService: QueryService) {
    //TODO: Don't allow duplicate attributes
    //TODO: Make a search box to help navigate large attribute lists
  }

  ngOnInit(): void {
    this.queryService.getAttributes().subscribe((attributes) => {
      this.attributes = attributes;
      this._filteredAttributes = this.formArray.valueChanges.pipe(
        startWith([]),
        map((selectedAttributes: Attribute[]) => {
          return this.attributes.filter((attribute) => {
            return selectedAttributes.indexOf(attribute) === -1;
          });
        })
      );
    });
  }

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

  remove(event: any) {
    this.selectedSelectedAttributes.forEach((attribute) => {
      this.deleteAttributeEvent.emit(attribute);
    });
  }
  add(event: any) {
    this.selectedAvailibleAttributes.forEach((attribute) => {
      this.selectAttributeEvent.emit(attribute);
    });
  }
}
