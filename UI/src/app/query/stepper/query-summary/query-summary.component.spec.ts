import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiModule } from 'src/app/api/api.module';

import { QuerySummaryComponent } from './query-summary.component';

describe('QuerySummaryComponent', () => {
  let component: QuerySummaryComponent;
  let fixture: ComponentFixture<QuerySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuerySummaryComponent],
      imports: [ApiModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
