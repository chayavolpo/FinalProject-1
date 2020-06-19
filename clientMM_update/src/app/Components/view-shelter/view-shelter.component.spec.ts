import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShelterComponent } from './view-shelter.component';

describe('ViewShelterComponent', () => {
  let component: ViewShelterComponent;
  let fixture: ComponentFixture<ViewShelterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewShelterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
