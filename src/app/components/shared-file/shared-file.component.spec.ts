import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFileComponent } from './shared-file.component';

describe('SharedFileComponent', () => {
  let component: SharedFileComponent;
  let fixture: ComponentFixture<SharedFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
