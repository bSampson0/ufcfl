import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFightsTableComponent } from './team-fights-table.component';

describe('TeamFightsTableComponent', () => {
  let component: TeamFightsTableComponent;
  let fixture: ComponentFixture<TeamFightsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamFightsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFightsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
