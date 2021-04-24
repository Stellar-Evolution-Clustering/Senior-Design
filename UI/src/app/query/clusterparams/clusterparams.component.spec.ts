import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ClusterparamsComponent } from './clusterparams.component';

describe('ClusterparamsComponent', () => {
  let component: ClusterparamsComponent;
  let fixture: ComponentFixture<ClusterparamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClusterparamsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterparamsComponent);
    component = fixture.componentInstance;
    component.paramsControl = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
