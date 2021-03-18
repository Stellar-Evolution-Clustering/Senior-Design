import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureGraphComponent } from './configure-graph.component';

describe('ConfigureGraphComponent', () => {
  let component: ConfigureGraphComponent;
  let fixture: ComponentFixture<ConfigureGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
