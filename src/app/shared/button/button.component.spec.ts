import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show text ', () => {
    //GIVEN
    component.text = 'button';
    fixture.detectChanges();
    const elmtText = fixture.nativeElement.querySelector('.button');
    //WHEN

    //THEN
    expect(elmtText.textContent).toEqual('button');
  });

  it('should emit value on click ', () => {
    //GIVEN
    component.text = 'button';
    const elmtText = fixture.debugElement.nativeElement.querySelector(
      '.button'
    );
    const spy = jest.spyOn(component, 'emitValue');
    const spyEmit = jest.spyOn(component.newItemEvent, 'emit');
    //WHEN
    elmtText.click();
    //THEN
    expect(spy).toBeCalledWith('button');
    expect(spyEmit).toHaveBeenCalledWith('button');
  });
});
