import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-component',
  templateUrl: './custom-component.component.html',
  styleUrls: ['./custom-component.component.sass']
})
export class CustomComponentComponent {
  @Input() title: string;
}
