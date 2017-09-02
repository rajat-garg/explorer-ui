import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashedFileComponent } from './trashed-file.component';

describe('TrashedFileComponent', () => {
  let component: TrashedFileComponent;
  let fixture: ComponentFixture<TrashedFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashedFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashedFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
