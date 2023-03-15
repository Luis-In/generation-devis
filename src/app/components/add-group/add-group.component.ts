import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent{
  @Input() title:string | undefined;
  @Output() onToggle:  EventEmitter<any> = new EventEmitter();
  @Output() onAddGroup:  EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  error:string | undefined;

  constructor(private fb: FormBuilder) {
    let elements: any[] = [];
    let subGroup: any[] = [];
    this.form = this.fb.group({
      title: "",
      total: 0,
      elements,
      subGroup
    })
  }

  addGroup(e:any) {
    e.preventDefault();
    if (this.form.value.title == "") {
      this.error = "attribuer un nom au groupe";
      return
    }
    this.onAddGroup.emit(this.form.value);
    this.onToggle.emit("Groupe de Chiffrage");
    e.target.querySelector("input.inpt").value = "";
    this.error = undefined;
  }
  toggle() {
    this.error = undefined;
    this.onToggle.emit("Groupe de Chiffrage");
  }
}
