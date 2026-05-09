import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerpageComponent } from './ownerpage.component';

describe('OwnerpageComponent', () => {
  let component: OwnerpageComponent;
  let fixture: ComponentFixture<OwnerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
