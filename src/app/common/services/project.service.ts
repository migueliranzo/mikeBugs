import { Injectable } from '@angular/core';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projects: Project[] = [
    new Project(
      '0',
      'The best project',
      'This is the best project ever!',
      'Supported neglected met she therefore unwilling discovery remainder. Way sentiments two indulgence uncommonly own. Diminution to frequently sentiments he connection continuing indulgence. An my exquisite conveying up defective. Shameless see the tolerably',
      [
        { name: 'Overflow bug', completed: true },
        { name: 'API error control', completed: true },
        { name: 'Users can be created without name', completed: false },
      ],
      [{ name: 'Test' }]
    ),
    new Project(
      '1',
      'Svelte todo-list',
      'Always on the edge of tech',
      'An sincerity so extremity he additions. Her yet there truth merit. Mrs all projecting favourable now unpleasing. Son law garden chatty temper. Oh children provided to mr elegance marriage strongly. Off can admiration prosperous now devonshire diminution law.',
      [
        { name: 'Overflow bug', completed: false },
        { name: 'API error control', completed: false },
        { name: 'Users can be created without name', completed: false },
      ],
      [{ name: 'Test' }, { name: 'mike' }]
    ),
    new Project(
      '2',
      'PHP service',
      'Surely this is not out of date!',
      'For though result and talent add are parish valley. Songs in oh other avoid it hours woman style. In myself family as if be agreed.',
      [
        { name: 'Overflow bug', completed: false },
        { name: 'API error control', completed: true },
        { name: 'Users can be created without name', completed: false },
      ],
      [{ name: 'Test' }, { name: 'mike' }, { name: 'Gustav' }]
    ),
    new Project(
      '3',
      'Node REST API',
      'We think we are soo cool',
      'collected son him knowledge delivered put. Added would end ask sight and asked saw dried house. Property expenses yourself occasion endeavor two may judgment she. Me of soon rank be most head time tore. Colonel or passage to ability.',
      [
        { name: 'Overflow bug', completed: true },
        { name: 'API error control', completed: true },
        { name: 'Users can be created without name', completed: true },
      ],
      [{ name: 'Test' }, { name: 'mike' }, { name: 'Gustav' }, { name: 'mike' }, { name: 'Gustav' }]
    ),
  ];
  constructor() {}

  getProjects(){
    return of(this.projects);
  }


}
