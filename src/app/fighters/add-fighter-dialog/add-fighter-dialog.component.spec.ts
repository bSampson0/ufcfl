import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFighterDialogComponent } from './add-fighter-dialog.component';

describe('AddFighterDialogComponent', () => {
  let component: AddFighterDialogComponent;
  let fixture: ComponentFixture<AddFighterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFighterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFighterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
