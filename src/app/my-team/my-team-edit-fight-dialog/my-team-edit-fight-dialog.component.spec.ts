import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamEditFightDialogComponent } from './my-team-edit-fight-dialog.component';

describe('MyTeamEditFightDialogComponent', () => {
  let component: MyTeamEditFightDialogComponent;
  let fixture: ComponentFixture<MyTeamEditFightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamEditFightDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamEditFightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
