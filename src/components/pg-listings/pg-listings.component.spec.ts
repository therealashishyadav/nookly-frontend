import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgListingsComponent } from './pg-listings.component';

describe('PgListingsComponent', () => {
  let component: PgListingsComponent;
  let fixture: ComponentFixture<PgListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgListingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
