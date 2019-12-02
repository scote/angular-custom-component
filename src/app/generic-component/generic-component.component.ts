import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-component',
  templateUrl: './generic-component.component.html',
  styleUrls: ['./generic-component.component.sass']
})
export class GenericComponentComponent {
  @Input() title: string;
}
