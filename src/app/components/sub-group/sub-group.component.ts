import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sub-group',
  templateUrl: './sub-group.component.html',
  styleUrls: ['./sub-group.component.scss']
})
export class SubGroupComponent {
  @Input() subGroup: {title:string, total:number, elements:any[]} | undefined;
  @Input() index:number | undefined;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  coll:boolean = false;
  tog:boolean = false;

  collapse() {
    this.coll = !this.coll;
  }
  updateSubGroup(e:any) {
    if(this.subGroup == undefined) return;
    this.subGroup.title = e.target.value;
    this.onUpdate.emit([this.subGroup, this.index]);
  }
  deleteSubGroup() {
    this.onUpdate.emit([this.subGroup, this.index]);
  }
  toggle() {
    this.tog = !this.tog;
  }
  addSubElement() {
    if(this.subGroup == undefined) return;
    let el = {
      name: "",
      quantity : 0,
      unit : "",
      priceUnit : 0,
      total : 0
    }
    if(this.subGroup.elements == null) this.subGroup.elements = [];
    this.subGroup.elements.push(el);
    this.onUpdate.emit([this.subGroup, this.index]);
    this.tog = false;
  }
  updateSubElement(e:any) {
    if(this.subGroup == undefined) return;
    let i = e[1];
    this.subGroup.elements[i] = e[0];
    let total:number = 0;
    this.subGroup.elements.forEach((el:any) => {
      total = Number(el.total) + total;
    })
    this.subGroup.total = total;
    this.onUpdate.emit([this.subGroup, this.index]);
  }
  deleteSubElement(e:any) {
    if(this.subGroup == undefined) return;
    let filter = this.subGroup.elements.filter((el:any) => {
      return el.name != e[0].name;
    })
    this.subGroup.elements = filter;
    this.onUpdate.emit([this.subGroup, this.index]);
  }
}

