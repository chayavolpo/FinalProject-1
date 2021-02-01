import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClerkComponent } from './update-clerk.component';

describe('UpdateClerkComponent', () => {
  let component: UpdateClerkComponent;
  let fixture: ComponentFixture<UpdateClerkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateClerkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
