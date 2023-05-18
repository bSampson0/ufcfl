import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamTableComponent } from './my-team-table.component';

describe('MyTeamTableComponent', () => {
  let component: MyTeamTableComponent;
  let fixture: ComponentFixture<MyTeamTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
