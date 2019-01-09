import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservePage } from './reserve.page';

describe('ReservePage', () => {
  let component: ReservePage;
  let fixture: ComponentFixture<ReservePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
