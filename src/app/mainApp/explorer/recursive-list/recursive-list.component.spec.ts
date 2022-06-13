import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveListComponent } from './recursive-list.component';

describe('RecursiveListComponent', () => {
  let component: RecursiveListComponent;
  let fixture: ComponentFixture<RecursiveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursiveListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
