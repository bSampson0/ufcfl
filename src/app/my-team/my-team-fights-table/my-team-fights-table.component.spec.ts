import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamFightsTableComponent } from './my-team-fights-table.component';

describe('MyTeamFightsTableComponent', () => {
  let component: MyTeamFightsTableComponent;
  let fixture: ComponentFixture<MyTeamFightsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamFightsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamFightsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
