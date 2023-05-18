import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightersTableComponent } from './fighters-table.component';

describe('FightersTableComponent', () => {
  let component: FightersTableComponent;
  let fixture: ComponentFixture<FightersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FightersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FightersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
