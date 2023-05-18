import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamFighterProfileComponent } from './my-team-fighter-profile.component';

describe('MyTeamFighterProfileComponent', () => {
  let component: MyTeamFighterProfileComponent;
  let fixture: ComponentFixture<MyTeamFighterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamFighterProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamFighterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
