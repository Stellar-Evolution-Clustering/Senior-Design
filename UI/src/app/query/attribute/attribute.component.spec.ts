import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VariablesService } from 'src/app/api/variables.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import {MatChipsModule} from '@angular/material/chips';

import { AttributeComponent } from './attribute.component';

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
      providers: [VariablesService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
