import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowShelterComponent } from './show-shelter.component';

describe('ShowShelterComponent', () => {
  let component: ShowShelterComponent;
  let fixture: ComponentFixture<ShowShelterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowShelterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
