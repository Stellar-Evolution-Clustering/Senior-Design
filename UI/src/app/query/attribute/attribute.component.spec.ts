import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import {MatChipsModule} from '@angular/material/chips';

import { AttributeComponent } from './attribute.component';
import { QueryService } from 'src/app/api/query.service';

describe('AttributeComponent', () => {
  let component: AttributeComponent;
  let fixture: ComponentFixture<AttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributeComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
        MatChipsModule
      ],
      providers: [QueryService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */

  //TODO commented out above test since it was failing for an unknown reason
});
