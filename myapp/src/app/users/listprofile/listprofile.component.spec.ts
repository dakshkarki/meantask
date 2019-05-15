import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListprofileComponent } from './listprofile.component';

describe('ListprofileComponent', () => {
  let component: ListprofileComponent;
  let fixture: ComponentFixture<ListprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
