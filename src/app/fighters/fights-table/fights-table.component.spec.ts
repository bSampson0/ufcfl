import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightsTableComponent } from './fights-table.component';

describe('FightsTableComponent', () => {
  let component: FightsTableComponent;
  let fixture: ComponentFixture<FightsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FightsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FightsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
