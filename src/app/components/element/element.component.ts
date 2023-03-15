import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent {
  @Input() element:any;
  @Input() index:number | undefined;
  @Input() subEl:boolean = false;
  @Output() onUpdElement: EventEmitter<any> = new EventEmitter();
  @Output() onAddElement:  EventEmitter<any> = new EventEmitter();
  @Output() onDeleteElement:  EventEmitter<any> = new EventEmitter();
  tog:boolean = false;

  ngOnChanges() {
    this.element.total = (this.element.quantity * this.element.priceUnit).toFixed(2);
  }

  toggleMenu() {
    this.tog = !this.tog;
  }
  addElement() {
    this.onAddElement.emit();
    this.tog = false;
  }
  deleteElement() {
    this.onDeleteElement.emit([this.element, this.index]);
  }
  updateElement(e:any) {
    switch(e.target.name) {
      case "name":
        this.element.name = e.target.value;
        break;
      case "quantity":
        let unit = document.querySelector("select[name='units']") as HTMLSelectElement;
        let value;
        if(unit.value == "m" || "m2" || "m3") {
          value = Number(e.target.value);
        }
        if(unit.value == "pce") {
          value = Math.ceil(e.target.value);
        }
        if(unit.value == "heure") {
          value = Math.ceil(e.target.value / 0.25 ) * 0.25;
          console.log(value)
        }
        this.element.quantity = value;
        break;
      case "units":
        this.element.unit = e.target.value;
        break;
      case "priceUnit":
        this.element.priceUnit = Number(e.target.value).toFixed(2);
        break;
    }
    this.element.total = (this.element.quantity * this.element.priceUnit).toFixed(2);
    this.onUpdElement.emit([this.element, this.index]);
  }
}
