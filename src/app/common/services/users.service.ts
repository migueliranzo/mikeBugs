import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [{"id":1,"username":"Tiphanie","email":"tvaldes0@nhs.uk"},
  {"id":2,"username":"Mose","email":"mqueripel1@istockphoto.com"},
  {"id":3,"username":"Paulie","email":"pmoubray2@patch.com"},
  {"id":4,"username":"Reynolds","email":"rmccarroll3@vk.com"},
  {"id":5,"username":"Coretta","email":"cveque4@pbs.org"},
  {"id":6,"username":"Martguerita","email":"mmonteath5@about.me"},
  {"id":7,"username":"Willabella","email":"wbampforth6@de.vu"},
  {"id":8,"username":"Ginni","email":"gorrocks7@arstechnica.com"},
  {"id":9,"username":"Rosina","email":"rsambedge8@dmoz.org"},
  {"id":10,"username":"Margarita","email":"melecum9@loc.gov"},
  {"id":11,"username":"Marijn","email":"mchrispa@bravesites.com"},
  {"id":12,"username":"John","email":"jmcgahernb@telegraph.co.uk"},
  {"id":13,"username":"Dru","email":"dfoulserc@google.pl"},
  {"id":14,"username":"Joshuah","email":"jnelhamsd@stumbleupon.com"},
  {"id":15,"username":"Brita","email":"bpandeye@chicagotribune.com"},
  {"id":16,"username":"Ardis","email":"ashadrackf@reuters.com"},
  {"id":17,"username":"Moreen","email":"mmcgillivrieg@simplemachines.org"},
  {"id":18,"username":"Gweneth","email":"gwolfordh@i2i.jp"},
  {"id":19,"username":"Marsha","email":"mfishbourni@shareasale.com"},
  {"id":20,"username":"Owen","email":"ostrephanj@theatlantic.com"}]

  constructor() { }
}
