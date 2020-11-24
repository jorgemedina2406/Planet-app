import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAppPage } from './info-app.page';

describe('InfoAppPage', () => {
  let component: InfoAppPage;
  let fixture: ComponentFixture<InfoAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAppPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
