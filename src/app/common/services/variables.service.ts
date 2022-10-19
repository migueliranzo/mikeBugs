import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  priority: any = { 0:"Low", 1:"Medium", 2:"High", 3: "Critical"};
  status: any = { 0:"Proposed", 1:"Active", 2:"Closed"};
  severity: any = {0:"expand_more", 1:"remove", 2:" expand_less", 3: "error"};
  displayedColumns: string[] = ["id", "priority" , "title" , "project", "severity","status", "category", "lastUpdateChange"];

  constructor() { }
}
