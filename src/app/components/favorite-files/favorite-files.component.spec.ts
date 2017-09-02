import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFilesComponent } from './favorite-files.component';

describe('FavoriteFilesComponent', () => {
  let component: FavoriteFilesComponent;
  let fixture: ComponentFixture<FavoriteFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
