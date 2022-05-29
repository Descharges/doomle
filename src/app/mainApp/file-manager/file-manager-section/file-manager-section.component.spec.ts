import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagerSectionComponent } from './file-manager-section.component';

describe('FileManagerSectionComponent', () => {
  let component: FileManagerSectionComponent;
  let fixture: ComponentFixture<FileManagerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileManagerSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileManagerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
