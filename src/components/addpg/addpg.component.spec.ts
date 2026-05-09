import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpgComponent } from './addpg.component';

describe('AddpgComponent', () => {
  let component: AddpgComponent;
  let fixture: ComponentFixture<AddpgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
