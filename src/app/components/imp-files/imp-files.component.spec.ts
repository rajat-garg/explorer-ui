import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpFilesComponent } from './imp-files.component';

describe('ImpFilesComponent', () => {
  let component: ImpFilesComponent;
  let fixture: ComponentFixture<ImpFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
