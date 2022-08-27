import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from 'ag-grid-community';
@Component({
    selector:'btn-cell-rederer',
    template:`<button type="button" class="{{cssClass}}" (click)="onClick($event)">{{label}}</button>`,
    styles:[]
})
export class BtnCellRendererComponent implements ICellRendererAngularComp{
    params:any;
    label!: string;
    cssClass!:string;
  
  agInit(params:ICellRendererParams): void {
    this.params = params;
    this.label = this.params.label || null;
    this.cssClass=this.params.cssClass;
  }

  refresh(params?: ICellRendererParams): boolean {
    return true;
  }

  onClick($event:any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }

}