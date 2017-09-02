import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagFileComponent } from './tag-file.component';

describe('TagFileComponent', () => {
  let component: TagFileComponent;
  let fixture: ComponentFixture<TagFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
