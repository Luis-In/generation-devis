import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
@Input() table:Array<any> = [

  ];
  total:{gross:number, net:number, tva:number} = {
    gross: 0,
    net: 0,
    tva: 0
  };
  tog: boolean = false;
  groupTitle:string | undefined;
  groupName:string = "";
  groupIndex:Array<any> | undefined;
  toggle(title:string) {
    if(title[2] == "Sous-groupe de chiffrage") {
      this.groupName = title[2];
      this.groupIndex = [title[0], title[1]];
    } else {
      this.groupName = title
    }
    this.tog = !this.tog;
  }

  addGroup(group:any) {
    if(this.groupName == "Sous-groupe de chiffrage") {
      if(this.groupIndex == undefined) return;
      let mainGroup = this.groupIndex[0]
      if(mainGroup.subGroup == null) mainGroup.subGroup = [];
      mainGroup.subGroup.push(group);
      let index = this.groupIndex[1]
      this.table[index] = mainGroup;
      console.log(this.table)
      window.localStorage.setItem("table", JSON.stringify(this.table))
      return
    }
    this.table.push(group);
    window.localStorage.setItem("table", JSON.stringify(this.table))
  }
  update(e:any) {
    let i = e[1];
    this.table[i] = e[0];
    this.totalCalc();
    window.localStorage.setItem("table", JSON.stringify(this.table))
  }
  deleteGroup(e:any) {
    let i = e[1];
    let filter = this.table.filter((el:any) => {
      return el.title != e[0].title;
    })
    this.table = filter;
    window.localStorage.setItem("table", JSON.stringify(this.table))
  }
  ngOnInit() {
    this.totalCalc()
    if(localStorage.getItem("table")) {
      let storage:any = (window.localStorage.getItem("table"));
      this.table = JSON.parse(storage);
    }
  }
  ngOnchange() {
    this.totalCalc();
    window.localStorage.setItem("table", JSON.stringify(this.table))
  }
  totalCalc() {
    let total:number = 0;
    this.table.forEach((el:any) => {
      total = Number(el.total) + total;
    })
    this.total.gross = total;
    let tva = (total * 7.7 / 100).toFixed(2);
    this.total.tva = Number(tva);
    let net = (total + this.total.tva).toFixed(2);
    this.total.net = Number(net);
  }
}
