import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() tog: boolean = false;
  @Output() onToggle:  EventEmitter<any> = new EventEmitter();
  @Output() onAddElement:  EventEmitter<any> = new EventEmitter();
  @Output() OnDelete:  EventEmitter<any> = new EventEmitter();

  toggle() {
    this.onToggle.emit();
  }
  addElement() {
    this.onAddElement.emit();
  }
  deleteEl() {
    this.OnDelete.emit();
  }
}
