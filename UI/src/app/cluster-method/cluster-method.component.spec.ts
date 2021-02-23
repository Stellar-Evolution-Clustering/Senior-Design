import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterMethodComponent } from './cluster-method.component';

describe('ClusterMethodComponent', () => {
  let component: ClusterMethodComponent;
  let fixture: ComponentFixture<ClusterMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
