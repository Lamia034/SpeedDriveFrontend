import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentsbyagencyComponent } from './rentsbyagency.component';

describe('RentsbyagencyComponent', () => {
  let component: RentsbyagencyComponent;
  let fixture: ComponentFixture<RentsbyagencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentsbyagencyComponent]
    });
    fixture = TestBed.createComponent(RentsbyagencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
