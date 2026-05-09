import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgDetailComponent } from './pg-detail.component';

describe('PgDetailComponent', () => {
  let component: PgDetailComponent;
  let fixture: ComponentFixture<PgDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
