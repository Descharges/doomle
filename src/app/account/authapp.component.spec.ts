import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthappComponent } from './authapp.component';

describe('AuthappComponent', () => {
  let component: AuthappComponent;
  let fixture: ComponentFixture<AuthappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
