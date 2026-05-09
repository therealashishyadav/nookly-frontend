import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TennetpgComponent } from './tennetpg.component';

describe('TennetpgComponent', () => {
  let component: TennetpgComponent;
  let fixture: ComponentFixture<TennetpgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TennetpgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TennetpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
