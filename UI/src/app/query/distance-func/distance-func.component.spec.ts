import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceFuncComponent } from './distance-func.component';

describe('DistanceFuncComponent', () => {
  let component: DistanceFuncComponent;
  let fixture: ComponentFixture<DistanceFuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistanceFuncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
