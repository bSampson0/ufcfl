import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFighterProfileComponent } from './team-fighter-profile.component';

describe('TeamFighterProfileComponent', () => {
  let component: TeamFighterProfileComponent;
  let fixture: ComponentFixture<TeamFighterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamFighterProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFighterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
