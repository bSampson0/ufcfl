import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEditFightDialogComponent } from './team-edit-fight-dialog.component';

describe('TeamEditFightDialogComponent', () => {
  let component: TeamEditFightDialogComponent;
  let fixture: ComponentFixture<TeamEditFightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamEditFightDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEditFightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
