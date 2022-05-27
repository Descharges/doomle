import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CringeComponent } from './cringe.component';

describe('CringeComponent', () => {
  let component: CringeComponent;
  let fixture: ComponentFixture<CringeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CringeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CringeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
