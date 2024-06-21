import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewPaymentComponent } from './main-view-payment.component';

describe('MainViewPaymentComponent', () => {
  let component: MainViewPaymentComponent;
  let fixture: ComponentFixture<MainViewPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainViewPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainViewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
