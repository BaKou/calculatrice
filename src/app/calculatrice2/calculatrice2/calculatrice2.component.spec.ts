import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculatrice2Component } from './calculatrice2.component';

describe('Calculatrice2Component', () => {
  let component: Calculatrice2Component;
  let fixture: ComponentFixture<Calculatrice2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Calculatrice2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Calculatrice2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
