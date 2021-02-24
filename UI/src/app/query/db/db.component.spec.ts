import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DBComponent } from './db.component';

describe('DBComponent', () => {
  let component: DBComponent;
  let fixture: ComponentFixture<DBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
