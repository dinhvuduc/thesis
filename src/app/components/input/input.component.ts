
import { ChangeDetectionStrategy, Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  private _onChange: any|undefined;
  private _ontouch: any|undefined
  @Input() type:string='text';
  @Input() placeholder: string | undefined;

  value = ''

  constructor(@Self() @Optional() private readonly ngControl:NgControl){
    if (ngControl) ngControl.valueAccessor = this;
  }

  writeValue(value: string): void {
      this.value=value;
  }

  registerOnChange(fn: any): void {
      this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
      this._ontouch = fn;
  }

  onChange(event:Event){
    if (this._onChange) this._onChange((event.target as HTMLInputElement).value);
  }

  onTouch(){
    if (this._ontouch) this._ontouch();
  }
}
