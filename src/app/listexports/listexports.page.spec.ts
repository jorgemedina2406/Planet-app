import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LispropertiesPage } from './lisproperties.page';

describe('LispropertiesPage', () => {
  let component: LispropertiesPage;
  let fixture: ComponentFixture<LispropertiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LispropertiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LispropertiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
