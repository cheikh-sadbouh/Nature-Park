import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParkComponent } from './edit-park.component';

describe('EditParkComponent', () => {
  let component: EditParkComponent;
  let fixture: ComponentFixture<EditParkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditParkComponent]
    });
    fixture = TestBed.createComponent(EditParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
