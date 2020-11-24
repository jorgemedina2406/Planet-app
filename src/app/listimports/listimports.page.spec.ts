import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImportsPage } from './listimports.page';

describe('ListImportsPage', () => {
  let component: ListImportsPage;
  let fixture: ComponentFixture<ListImportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListImportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
