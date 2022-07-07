import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyOnAccountComponent } from './add-money-on-account.component';

describe('AddMoneyOnAccountComponent', () => {
  let component: AddMoneyOnAccountComponent;
  let fixture: ComponentFixture<AddMoneyOnAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoneyOnAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoneyOnAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
