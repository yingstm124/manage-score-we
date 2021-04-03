import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExamScoreComponent } from './edit-exam-score.component';

describe('EditExamScoreComponent', () => {
  let component: EditExamScoreComponent;
  let fixture: ComponentFixture<EditExamScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExamScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExamScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
