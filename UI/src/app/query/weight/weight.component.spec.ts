import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { WeightComponent } from './weight.component';

describe('WeightComponent', () => {
  let component: WeightComponent;
  let fixture: ComponentFixture<WeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
