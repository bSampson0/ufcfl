import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfcflTableComponent } from './ufcfl-table.component';

describe('UfcflTableComponent', () => {
  let component: UfcflTableComponent;
  let fixture: ComponentFixture<UfcflTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UfcflTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UfcflTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
