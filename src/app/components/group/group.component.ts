import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  @Input() group:{title:string, total:number, elements:any[], subGroup:any[]} | undefined;
  @Input() index:number | undefined;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onToggleGroup:  EventEmitter<any> = new EventEmitter();
  @Output() onDelete:  EventEmitter<any> = new EventEmitter();
  tog:boolean = false
  coll:boolean = false;
  collapse() {
    this.coll = !this.coll;
  }
  toggle() {
    this.tog = !this.tog;
  }
  onToggle() {
    this.onToggleGroup.emit([this.group, this.index, "Sous-groupe de chiffrage"]);
    this.toggle();
  }
  updateGroup(e:any) {
    if(this.group == undefined) return;
    this.group.title = e.target.value;
    this.onUpdate.emit([this.group, this.index]);
  }
  updateElement(e:any) {
    if(this.group == undefined) return;
    let i = e[1];
    this.group.elements[i] = e[0];
    let total:number = 0;
    this.group.elements.forEach((el:any) => {
      total = Number(el.total) + total;
    })
    this.group.total = total;
    this.onUpdate.emit([this.group, this.index]);
  }
  addElement() {
    if(this.group == undefined) return;
    let el = {
      name: "",
      quantity : 0,
      unit : "",
      priceUnit : 0,
      total : 0
    }
    if(this.group.elements == null) this.group.elements = [];
    this.group.elements.push(el);
    this.onUpdate.emit([this.group, this.index]);
    this.tog = false;
  }
  deleteElement(e:any) {
    if(this.group == undefined) return;
    let filter = this.group.elements.filter((el:any) => {
      return el.name != e[0].name;
    })
    this.group.elements = filter;
    this.onUpdate.emit([this.group, this.index]);
  }
  deleteGroup() {
    if(this.group == undefined) return;
    this.onDelete.emit([this.group, this.index]);
  }
  totalCalc() {
    if(this.group == undefined || this.group.elements == null) return;
    let total:number = 0;
    this.group.elements.forEach((el:any) => {
      el.total = (el.quantity * el.priceUnit).toFixed(2);
      total = Number(el.total) + total;
    })
    this.group.total = total;
    this.onUpdate.emit([this.group, this.index]);
  }
  updateSubGroup(e:any) {
    if(this.group == undefined) return;
    let i = e[1];
    this.group.subGroup[i] = e[0];
    this.onUpdate.emit([this.group, this.index]);
  }
  deleteSubGroup(e:any) {
    if(this.group == undefined) return;
    let filter = this.group.subGroup.filter((el:any) => {
      return el.title != e[0].title;
    })
    this.group.subGroup = filter;
    this.onUpdate.emit([this.group, this.index]);
  }
  ngOnChanges() {
    this.totalCalc();
  }
  ngOnInit() {
    this.totalCalc();
  }
}
