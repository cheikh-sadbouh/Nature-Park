import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParkComponent } from './create-park.component';

describe('CreateParkComponent', () => {
  let component: CreateParkComponent;
  let fixture: ComponentFixture<CreateParkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateParkComponent]
    });
    fixture = TestBed.createComponent(CreateParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
