import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { first, from } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  tickets: Ticket[] = [{"id":1,"name":"Anogenital herpesviral [herpes simplex] infections","description":"Anogenital herpesviral [herpes simplex] infections","reporter":"mbarkley0","assigned":"gduffyn0","status":2,"severity":1,"priority":1,"category":"China","project":3,"creationDate":"7/24/2022","lastUpdateChange":"9/14/2022"},
  {"id":2,"name":"Other specified headache syndromes","description":"Other specified headache syndromes","reporter":"doliff1","assigned":"ccremen1","status":0,"severity":0,"priority":1,"category":"Afghanistan","project":0,"creationDate":"4/29/2022","lastUpdateChange":"12/15/2021"},
  {"id":3,"name":"Unspecified open-angle glaucoma, mild stage","description":"Unspecified open-angle glaucoma, mild stage","reporter":"ggresswood2","assigned":"tvanyatin2","status":2,"severity":3,"priority":3,"category":"Indonesia","project":2,"creationDate":"11/21/2021","lastUpdateChange":"1/19/2022"},
  {"id":4,"name":"Burn of second degree of right foot, sequela","description":"Burn of second degree of right foot, sequela","reporter":"llawfull3","assigned":"cszymanski3","status":2,"severity":3,"priority":3,"category":"Ukraine","project":1,"creationDate":"2/26/2022","lastUpdateChange":"8/5/2022"},
  {"id":5,"name":"Pathological fracture in neoplastic disease, shoulder","description":"Pathological fracture in neoplastic disease, shoulder","reporter":"cerrichi4","assigned":"vsheaber4","status":1,"severity":3,"priority":1,"category":"Russia","project":0,"creationDate":"7/1/2022","lastUpdateChange":"3/21/2022"},
  {"id":6,"name":"Acute embolism and thombos unsp veins of up extrem, bi","description":"Acute embolism and thrombosis of unspecified veins of upper extremity, bilateral","reporter":"cmccorkindale5","assigned":"awloch5","status":1,"severity":1,"priority":3,"category":"Russia","project":3,"creationDate":"11/22/2021","lastUpdateChange":"1/26/2022"},
  {"id":7,"name":"Nonspecific symptoms peculiar to infancy","description":"Nonspecific symptoms peculiar to infancy","reporter":"cplayden6","assigned":"dsimmings6","status":1,"severity":0,"priority":0,"category":"Indonesia","project":2,"creationDate":"8/31/2022","lastUpdateChange":"2/7/2022"},
  {"id":8,"name":"Sltr-haris Type II physl fx low end ulna, r arm, 7thD","description":"Salter-Harris Type II physeal fracture of lower end of ulna, right arm, subsequent encounter for fracture with routine healing","reporter":"dgirdwood7","assigned":"tgrzelak7","status":1,"severity":2,"priority":2,"category":"China","project":0,"creationDate":"8/4/2022","lastUpdateChange":"8/28/2022"},
  {"id":9,"name":"Infective myositis, right upper arm","description":"Infective myositis, right upper arm","reporter":"nkarlmann8","assigned":"gmassen8","status":2,"severity":3,"priority":3,"category":"Poland","project":2,"creationDate":"12/23/2021","lastUpdateChange":"3/16/2022"},
  {"id":10,"name":"Pnctr w foreign body of left thumb w damage to nail, subs","description":"Puncture wound with foreign body of left thumb with damage to nail, subsequent encounter","reporter":"billyes9","assigned":"ikeogh9","status":0,"severity":1,"priority":1,"category":"Poland","project":3,"creationDate":"12/7/2021","lastUpdateChange":"6/19/2022"},
  {"id":11,"name":"Laceration w/o fb of finger w/o damage to nail, subs","description":"Laceration without foreign body of other finger without damage to nail, subsequent encounter","reporter":"oahreniusa","assigned":"bheinricia","status":0,"severity":0,"priority":1,"category":"China","project":3,"creationDate":"9/19/2022","lastUpdateChange":"4/30/2022"},
  {"id":12,"name":"Unspecified dislocation of right toe(s), subs encntr","description":"Unspecified dislocation of right toe(s), subsequent encounter","reporter":"wjennawayb","assigned":"ssalleryb","status":2,"severity":2,"priority":1,"category":"Indonesia","project":3,"creationDate":"6/3/2022","lastUpdateChange":"5/5/2022"},
  {"id":13,"name":"Wedge compression fracture of T11-T12 vertebra","description":"Wedge compression fracture of T11-T12 vertebra","reporter":"hquarryc","assigned":"afranssonc","status":0,"severity":1,"priority":3,"category":"Malaysia","project":0,"creationDate":"7/19/2022","lastUpdateChange":"4/6/2022"},
  {"id":14,"name":"Inj intrinsic msl/tnd at ank/ft level, unsp foot, subs","description":"Other specified injury of intrinsic muscle and tendon at ankle and foot level, unspecified foot, subsequent encounter","reporter":"jyeatsd","assigned":"skollatschd","status":1,"severity":2,"priority":3,"category":"Nicaragua","project":1,"creationDate":"3/28/2022","lastUpdateChange":"11/24/2021"},
  {"id":15,"name":"Recurrent dislocation, unspecified finger","description":"Recurrent dislocation, unspecified finger","reporter":"ebreckene","assigned":"gbricknalle","status":0,"severity":0,"priority":0,"category":"China","project":0,"creationDate":"12/12/2021","lastUpdateChange":"10/8/2022"},
  {"id":16,"name":"Adverse effect of other synthetic narcotics, sequela","description":"Adverse effect of other synthetic narcotics, sequela","reporter":"alyddonf","assigned":"gsappsonf","status":1,"severity":1,"priority":3,"category":"China","project":2,"creationDate":"2/4/2022","lastUpdateChange":"10/2/2022"},
  {"id":17,"name":"Cmplx tear of medial mensc, current injury, unsp knee, init","description":"Complex tear of medial meniscus, current injury, unspecified knee, initial encounter","reporter":"fvoletteg","assigned":"sloadsg","status":1,"severity":1,"priority":0,"category":"Croatia","project":0,"creationDate":"4/11/2022","lastUpdateChange":"3/20/2022"},
  {"id":18,"name":"Contact with and (suspected) exposure to anthrax","description":"Contact with and (suspected) exposure to anthrax","reporter":"aryburnh","assigned":"mvernallsh","status":0,"severity":1,"priority":1,"category":"China","project":3,"creationDate":"5/31/2022","lastUpdateChange":"11/8/2021"},
  {"id":19,"name":"Biliary acute pancreatitis without necrosis or infection","description":"Biliary acute pancreatitis without necrosis or infection","reporter":"edowningi","assigned":"bgroombridgei","status":0,"severity":0,"priority":3,"category":"China","project":2,"creationDate":"11/30/2021","lastUpdateChange":"5/11/2022"},
  {"id":20,"name":"Other superficial bite of unspecified ear, sequela","description":"Other superficial bite of unspecified ear, sequela","reporter":"dsolonj","assigned":"bfaussetj","status":1,"severity":0,"priority":2,"category":"Portugal","project":3,"creationDate":"4/27/2022","lastUpdateChange":"11/20/2021"},
  {"id":21,"name":"Varicose veins of right lower extremity with inflammation","description":"Varicose veins of right lower extremity with inflammation","reporter":"abrightwellk","assigned":"sklejnak","status":2,"severity":0,"priority":2,"category":"Brazil","project":3,"creationDate":"2/5/2022","lastUpdateChange":"1/17/2022"},
  {"id":22,"name":"Other sprain of left little finger, subsequent encounter","description":"Other sprain of left little finger, subsequent encounter","reporter":"kcarpl","assigned":"rsowdenl","status":2,"severity":0,"priority":2,"category":"China","project":1,"creationDate":"12/21/2021","lastUpdateChange":"8/20/2022"},
  {"id":23,"name":"Corrosion of unspecified degree of lip(s)","description":"Corrosion of unspecified degree of lip(s)","reporter":"rhariotm","assigned":"lhullesm","status":2,"severity":0,"priority":3,"category":"Syria","project":0,"creationDate":"6/6/2022","lastUpdateChange":"2/15/2022"},
  {"id":24,"name":"Injury of cutan sensory nerve at forarm lv, left arm, subs","description":"Injury of cutaneous sensory nerve at forearm level, left arm, subsequent encounter","reporter":"tkinneallyn","assigned":"abrittann","status":1,"severity":3,"priority":0,"category":"Japan","project":1,"creationDate":"8/3/2022","lastUpdateChange":"7/24/2022"},
  {"id":25,"name":"Zellweger syndrome","description":"Zellweger syndrome","reporter":"jspottswoodo","assigned":"mfobidgeo","status":1,"severity":1,"priority":0,"category":"Armenia","project":2,"creationDate":"8/26/2022","lastUpdateChange":"11/23/2021"},
  {"id":26,"name":"Oth fx upr end unsp rad, 7thJ","description":"Other fracture of upper end of unspecified radius, subsequent encounter for open fracture type IIIA, IIIB, or IIIC with delayed healing","reporter":"bcarressp","assigned":"dtancockp","status":1,"severity":3,"priority":2,"category":"Bosnia and Herzegovina","project":2,"creationDate":"1/10/2022","lastUpdateChange":"2/4/2022"},
  {"id":27,"name":"Acantholytic disorder, unspecified","description":"Acantholytic disorder, unspecified","reporter":"wmeddowsq","assigned":"ctillq","status":1,"severity":1,"priority":0,"category":"Sweden","project":0,"creationDate":"11/6/2021","lastUpdateChange":"3/8/2022"},
  {"id":28,"name":"Drown due to fall/jump fr crushed (nonpowered) inflatbl crft","description":"Drowning and submersion due to falling or jumping from crushed (nonpowered) inflatable craft","reporter":"nconanr","assigned":"cshillsr","status":0,"severity":3,"priority":3,"category":"Colombia","project":2,"creationDate":"2/28/2022","lastUpdateChange":"5/31/2022"},
  {"id":29,"name":"Nondisp fx of coronoid pro of l ulna, 7thF","description":"Nondisplaced fracture of coronoid process of left ulna, subsequent encounter for open fracture type IIIA, IIIB, or IIIC with routine healing","reporter":"jphillinss","assigned":"osalvadors","status":1,"severity":1,"priority":1,"category":"China","project":0,"creationDate":"11/3/2021","lastUpdateChange":"4/27/2022"},
  {"id":30,"name":"Unsp inj unsp musc/fasc/tend at thi lev, left thigh, init","description":"Unspecified injury of unspecified muscles, fascia and tendons at thigh level, left thigh, initial encounter","reporter":"lkiliust","assigned":"tsidawayt","status":2,"severity":3,"priority":1,"category":"Egypt","project":2,"creationDate":"12/16/2021","lastUpdateChange":"3/20/2022"},
  {"id":31,"name":"Laceration w/o foreign body of unsp part of thorax, sequela","description":"Laceration without foreign body of unspecified part of thorax, sequela","reporter":"kickoviczu","assigned":"nbeckeu","status":0,"severity":1,"priority":2,"category":"Uruguay","project":3,"creationDate":"11/21/2021","lastUpdateChange":"5/10/2022"},
  {"id":32,"name":"Cntct w & expsr to pediculosis, acariasis & oth infestations","description":"Contact with and (suspected) exposure to pediculosis, acariasis and other infestations","reporter":"tmcilwainv","assigned":"jwynrehamev","status":1,"severity":0,"priority":2,"category":"Syria","project":0,"creationDate":"9/4/2022","lastUpdateChange":"5/17/2022"},
  {"id":33,"name":"Laceration of brachial artery, left side, sequela","description":"Laceration of brachial artery, left side, sequela","reporter":"rdiggarw","assigned":"belliottw","status":2,"severity":0,"priority":0,"category":"Philippines","project":0,"creationDate":"10/19/2021","lastUpdateChange":"7/30/2022"},
  {"id":34,"name":"Toxic effect of pesticides","description":"Toxic effect of pesticides","reporter":"sdigmanx","assigned":"bgoudyx","status":2,"severity":0,"priority":1,"category":"Argentina","project":0,"creationDate":"10/15/2022","lastUpdateChange":"1/16/2022"},
  {"id":35,"name":"Disp fx of low epiphy (separation) of r femr, 7thM","description":"Displaced fracture of lower epiphysis (separation) of right femur, subsequent encounter for open fracture type I or II with nonunion","reporter":"gbonnicky","assigned":"cfrankisy","status":1,"severity":3,"priority":2,"category":"Russia","project":3,"creationDate":"8/12/2022","lastUpdateChange":"1/29/2022"},
  {"id":36,"name":"Other sprain of unspecified thumb","description":"Other sprain of unspecified thumb","reporter":"cduhamz","assigned":"fscopynz","status":1,"severity":1,"priority":1,"category":"Philippines","project":3,"creationDate":"3/6/2022","lastUpdateChange":"6/9/2022"},
  {"id":37,"name":"Estrogen receptor status","description":"Estrogen receptor status","reporter":"fandreaccio10","assigned":"apoupard10","status":2,"severity":2,"priority":1,"category":"Japan","project":2,"creationDate":"9/16/2022","lastUpdateChange":"5/7/2022"},
  {"id":38,"name":"Displ bimalleol fx r low leg, 7thM","description":"Displaced bimalleolar fracture of right lower leg, subsequent encounter for open fracture type I or II with nonunion","reporter":"scourse11","assigned":"rsidwick11","status":1,"severity":2,"priority":2,"category":"Zambia","project":3,"creationDate":"10/20/2021","lastUpdateChange":"7/22/2022"},
  {"id":39,"name":"Newborn light for gestational age, 1750-1999 grams","description":"Newborn light for gestational age, 1750-1999 grams","reporter":"jdangl12","assigned":"cwimmers12","status":1,"severity":0,"priority":1,"category":"China","project":0,"creationDate":"12/29/2021","lastUpdateChange":"4/3/2022"},
  {"id":40,"name":"Fracture of orbital floor, right side, init","description":"Fracture of orbital floor, right side, initial encounter for closed fracture","reporter":"eocklin13","assigned":"cleathers13","status":2,"severity":1,"priority":0,"category":"Costa Rica","project":2,"creationDate":"10/22/2021","lastUpdateChange":"6/27/2022"},
  {"id":41,"name":"Oth symptoms and signs involving the circ and resp systems","description":"Other specified symptoms and signs involving the circulatory and respiratory systems","reporter":"kaime14","assigned":"pollis14","status":0,"severity":1,"priority":3,"category":"China","project":0,"creationDate":"10/23/2021","lastUpdateChange":"10/13/2022"},
  {"id":42,"name":"Fracture of unspecified part of body of left mandible, 7thK","description":"Fracture of unspecified part of body of left mandible, subsequent encounter for fracture with nonunion","reporter":"pscriver15","assigned":"emillions15","status":1,"severity":3,"priority":1,"category":"United States","project":0,"creationDate":"6/25/2022","lastUpdateChange":"5/8/2022"},
  {"id":43,"name":"Mult fx of pelv w/o disrupt of pelv ring, 7thD","description":"Multiple fractures of pelvis without disruption of pelvic ring, subsequent encounter for fracture with routine healing","reporter":"aharesnape16","assigned":"lquincey16","status":2,"severity":2,"priority":0,"category":"Armenia","project":0,"creationDate":"5/23/2022","lastUpdateChange":"10/14/2022"},
  {"id":44,"name":"Abdominal aortic aneurysm, without rupture","description":"Abdominal aortic aneurysm, without rupture","reporter":"escholte17","assigned":"jdradey17","status":1,"severity":1,"priority":0,"category":"Poland","project":2,"creationDate":"2/7/2022","lastUpdateChange":"8/27/2022"},
  {"id":45,"name":"Nondisplaced fracture of body of right talus, sequela","description":"Nondisplaced fracture of body of right talus, sequela","reporter":"mgreenway18","assigned":"igrime18","status":2,"severity":1,"priority":0,"category":"Venezuela","project":2,"creationDate":"7/30/2022","lastUpdateChange":"12/23/2021"},
  {"id":46,"name":"External constriction of left back wall of thorax, sequela","description":"External constriction of left back wall of thorax, sequela","reporter":"avynehall19","assigned":"wkenshole19","status":0,"severity":0,"priority":2,"category":"Czech Republic","project":1,"creationDate":"8/30/2022","lastUpdateChange":"4/30/2022"},
  {"id":47,"name":"Cystic kidney disease, unspecified","description":"Cystic kidney disease, unspecified","reporter":"nsprankling1a","assigned":"gbrownsett1a","status":1,"severity":1,"priority":2,"category":"Lithuania","project":2,"creationDate":"9/3/2022","lastUpdateChange":"8/10/2022"},
  {"id":48,"name":"Other retinal disorders","description":"Other retinal disorders","reporter":"mhaines1b","assigned":"bhyde1b","status":2,"severity":0,"priority":2,"category":"Brazil","project":3,"creationDate":"5/25/2022","lastUpdateChange":"8/10/2022"},
  {"id":49,"name":"Nondisp spiral fx shaft of r tibia, 7thH","description":"Nondisplaced spiral fracture of shaft of right tibia, subsequent encounter for open fracture type I or II with delayed healing","reporter":"binston1c","assigned":"mjakubowicz1c","status":1,"severity":2,"priority":1,"category":"Sweden","project":3,"creationDate":"3/4/2022","lastUpdateChange":"8/27/2022"},
  {"id":50,"name":"Disp fx of dist phalanx of l rng fngr, 7thK","description":"Displaced fracture of distal phalanx of left ring finger, subsequent encounter for fracture with nonunion","reporter":"ykalkofer1d","assigned":"fbalmforth1d","status":2,"severity":3,"priority":2,"category":"Tunisia","project":2,"creationDate":"10/5/2022","lastUpdateChange":"2/28/2022"},
  {"id":51,"name":"Burn of first degree of unspecified ear","description":"Burn of first degree of unspecified ear [any part, except ear drum]","reporter":"khebbs1e","assigned":"dtrippack1e","status":1,"severity":2,"priority":1,"category":"Philippines","project":1,"creationDate":"3/22/2022","lastUpdateChange":"7/9/2022"},
  {"id":52,"name":"Oth superficial bite of left front wall of thorax, subs","description":"Other superficial bite of left front wall of thorax, subsequent encounter","reporter":"tvanin1f","assigned":"krichie1f","status":0,"severity":2,"priority":1,"category":"Indonesia","project":2,"creationDate":"10/21/2021","lastUpdateChange":"12/30/2021"},
  {"id":53,"name":"Path fx in neopltc disease, pelvis, subs for fx w malunion","description":"Pathological fracture in neoplastic disease, pelvis, subsequent encounter for fracture with malunion","reporter":"bmcnicol1g","assigned":"pcartlidge1g","status":0,"severity":2,"priority":1,"category":"Germany","project":1,"creationDate":"3/9/2022","lastUpdateChange":"4/9/2022"},
  {"id":54,"name":"Path fracture in neopltc disease, unsp ulna and radius, init","description":"Pathological fracture in neoplastic disease, unspecified ulna and radius, initial encounter for fracture","reporter":"dstickney1h","assigned":"xditer1h","status":1,"severity":3,"priority":0,"category":"China","project":1,"creationDate":"11/22/2021","lastUpdateChange":"3/1/2022"},
  {"id":55,"name":"Poisoning by other psychodysleptics [hallucinogens], assault","description":"Poisoning by other psychodysleptics [hallucinogens], assault","reporter":"edigan1i","assigned":"cszymanowicz1i","status":2,"severity":3,"priority":0,"category":"Russia","project":0,"creationDate":"3/29/2022","lastUpdateChange":"1/9/2022"},
  {"id":56,"name":"Athscl autologous vein bypass of the left leg w ulceration","description":"Atherosclerosis of autologous vein bypass graft(s) of the left leg with ulceration","reporter":"jtakos1j","assigned":"mtschirasche1j","status":0,"severity":2,"priority":3,"category":"China","project":0,"creationDate":"11/25/2021","lastUpdateChange":"9/2/2022"},
  {"id":57,"name":"Drug induced acute dystonia","description":"Drug induced acute dystonia","reporter":"fnussen1k","assigned":"bbutter1k","status":1,"severity":0,"priority":0,"category":"China","project":2,"creationDate":"2/20/2022","lastUpdateChange":"6/9/2022"},
  {"id":58,"name":"Subluxation of proximal interphaln joint of r thm, subs","description":"Subluxation of proximal interphalangeal joint of right thumb, subsequent encounter","reporter":"blinstead1l","assigned":"dslidders1l","status":2,"severity":2,"priority":3,"category":"Brazil","project":0,"creationDate":"4/24/2022","lastUpdateChange":"4/15/2022"},
  {"id":59,"name":"Driver of hv veh inj in clsn w rail trn/veh nontraf, init","description":"Driver of heavy transport vehicle injured in collision with railway train or railway vehicle in nontraffic accident, initial encounter","reporter":"bbartunek1m","assigned":"erosenauer1m","status":1,"severity":1,"priority":1,"category":"Denmark","project":1,"creationDate":"1/30/2022","lastUpdateChange":"11/15/2021"},
  {"id":60,"name":"Unspecified acquired deformity of unspecified limb","description":"Unspecified acquired deformity of unspecified limb","reporter":"aobell1n","assigned":"cingrey1n","status":2,"severity":0,"priority":2,"category":"Ireland","project":0,"creationDate":"10/12/2022","lastUpdateChange":"7/13/2022"},
  {"id":61,"name":"Other secondary chronic gout, left elbow, with tophus","description":"Other secondary chronic gout, left elbow, with tophus (tophi)","reporter":"rkiellor1o","assigned":"rfinlator1o","status":1,"severity":1,"priority":1,"category":"China","project":0,"creationDate":"11/20/2021","lastUpdateChange":"1/13/2022"},
  {"id":62,"name":"Fall (on)(from) escalator, initial encounter","description":"Fall (on)(from) escalator, initial encounter","reporter":"eschuelcke1p","assigned":"nviles1p","status":1,"severity":0,"priority":2,"category":"China","project":0,"creationDate":"4/1/2022","lastUpdateChange":"3/11/2022"},
  {"id":63,"name":"Unsp fx lower end of right ulna, subs for clos fx w nonunion","description":"Unspecified fracture of lower end of right ulna, subsequent encounter for closed fracture with nonunion","reporter":"jbown1q","assigned":"gsabater1q","status":1,"severity":1,"priority":0,"category":"Tanzania","project":0,"creationDate":"5/3/2022","lastUpdateChange":"4/15/2022"},
  {"id":64,"name":"Pnctr w fb of r little finger w/o damage to nail, sequela","description":"Puncture wound with foreign body of right little finger without damage to nail, sequela","reporter":"lextance1r","assigned":"bhamlett1r","status":2,"severity":1,"priority":3,"category":"China","project":1,"creationDate":"2/21/2022","lastUpdateChange":"5/25/2022"},
  {"id":65,"name":"Laceration without foreign body of left hand, subs encntr","description":"Laceration without foreign body of left hand, subsequent encounter","reporter":"jcasterot1s","assigned":"mcodman1s","status":0,"severity":1,"priority":3,"category":"Portugal","project":3,"creationDate":"8/13/2022","lastUpdateChange":"11/30/2021"},
  {"id":66,"name":"Occup of bus injured in clsn w nonmtr vehicle in traf, subs","description":"Unspecified occupant of bus injured in collision with other nonmotor vehicle in traffic accident, subsequent encounter","reporter":"iwallworth1t","assigned":"ebonnyson1t","status":2,"severity":3,"priority":1,"category":"China","project":0,"creationDate":"8/26/2022","lastUpdateChange":"9/15/2022"},
  {"id":67,"name":"Late congenital syphilitic chorioretinitis","description":"Late congenital syphilitic chorioretinitis","reporter":"tdacre1u","assigned":"jkneale1u","status":2,"severity":0,"priority":0,"category":"Indonesia","project":1,"creationDate":"12/31/2021","lastUpdateChange":"1/7/2022"},
  {"id":68,"name":"Rh incompat reaction due to transfusion of bld/bld prod","description":"Rh incompatibility reaction due to transfusion of blood or blood products","reporter":"amccaskell1v","assigned":"swaddams1v","status":2,"severity":3,"priority":1,"category":"Denmark","project":1,"creationDate":"8/28/2022","lastUpdateChange":"12/6/2021"},
  {"id":69,"name":"Displ transverse fx shaft of unsp rad, 7thR","description":"Displaced transverse fracture of shaft of unspecified radius, subsequent encounter for open fracture type IIIA, IIIB, or IIIC with malunion","reporter":"lchantree1w","assigned":"sbenjefield1w","status":2,"severity":3,"priority":3,"category":"Italy","project":3,"creationDate":"5/23/2022","lastUpdateChange":"11/25/2021"},
  {"id":70,"name":"Anaphylactic reaction due to eggs, initial encounter","description":"Anaphylactic reaction due to eggs, initial encounter","reporter":"jwillingam1x","assigned":"maves1x","status":0,"severity":2,"priority":3,"category":"Philippines","project":0,"creationDate":"3/12/2022","lastUpdateChange":"5/14/2022"},
  {"id":71,"name":"Minor opacity of cornea, right eye","description":"Minor opacity of cornea, right eye","reporter":"gstocker1y","assigned":"rguidone1y","status":0,"severity":1,"priority":3,"category":"France","project":1,"creationDate":"7/31/2022","lastUpdateChange":"10/6/2022"},
  {"id":72,"name":"Failed or difficult intubation for anesth dur labor and del","description":"Failed or difficult intubation for anesthesia during labor and delivery","reporter":"ebarribal1z","assigned":"ltrevenu1z","status":0,"severity":1,"priority":0,"category":"Venezuela","project":1,"creationDate":"2/21/2022","lastUpdateChange":"4/30/2022"},
  {"id":73,"name":"Other superficial bite of hand","description":"Other superficial bite of hand","reporter":"cyushachkov20","assigned":"sadkin20","status":0,"severity":0,"priority":2,"category":"Indonesia","project":2,"creationDate":"6/25/2022","lastUpdateChange":"1/31/2022"},
  {"id":74,"name":"Stenosis of other vascular prosth dev/grft, init","description":"Stenosis of other vascular prosthetic devices, implants and grafts, initial encounter","reporter":"nalenov21","assigned":"gmcmorran21","status":2,"severity":1,"priority":3,"category":"Sweden","project":1,"creationDate":"11/10/2021","lastUpdateChange":"7/11/2022"},
  {"id":75,"name":"Complete traumatic transphalangeal amputation of r idx fngr","description":"Complete traumatic transphalangeal amputation of right index finger","reporter":"lgowrich22","assigned":"afilippi22","status":2,"severity":3,"priority":1,"category":"China","project":3,"creationDate":"11/30/2021","lastUpdateChange":"9/26/2022"},
  {"id":76,"name":"Exposure to other inanimate mechanical forces","description":"Exposure to other inanimate mechanical forces","reporter":"sbiscomb23","assigned":"pcrathorne23","status":0,"severity":2,"priority":1,"category":"South Korea","project":3,"creationDate":"4/12/2022","lastUpdateChange":"5/23/2022"},
  {"id":77,"name":"Gen skin eruption due to drugs and meds taken internally","description":"Generalized skin eruption due to drugs and medicaments taken internally","reporter":"askryne24","assigned":"bswainger24","status":2,"severity":3,"priority":0,"category":"Cambodia","project":2,"creationDate":"2/26/2022","lastUpdateChange":"11/11/2021"},
  {"id":78,"name":"Laceration without foreign body of unsp hand, init encntr","description":"Laceration without foreign body of unspecified hand, initial encounter","reporter":"gackwood25","assigned":"kturfs25","status":2,"severity":3,"priority":3,"category":"Peru","project":0,"creationDate":"3/14/2022","lastUpdateChange":"10/13/2022"},
  {"id":79,"name":"Displ transverse fx shaft of unsp rad, 7thH","description":"Displaced transverse fracture of shaft of unspecified radius, subsequent encounter for open fracture type I or II with delayed healing","reporter":"csaphin26","assigned":"cforsdicke26","status":2,"severity":3,"priority":3,"category":"Portugal","project":1,"creationDate":"9/21/2022","lastUpdateChange":"10/8/2022"},
  {"id":80,"name":"Congenital central alveolar hypoventilation syndrome","description":"Congenital central alveolar hypoventilation syndrome","reporter":"pblueman27","assigned":"mboddymead27","status":1,"severity":2,"priority":1,"category":"Czech Republic","project":1,"creationDate":"7/8/2022","lastUpdateChange":"7/3/2022"},
  {"id":81,"name":"Unsp complication of internal prosth dev/grft, sequela","description":"Unspecified complication of internal prosthetic device, implant and graft, sequela","reporter":"mmcellen28","assigned":"apyner28","status":2,"severity":2,"priority":2,"category":"France","project":3,"creationDate":"11/27/2021","lastUpdateChange":"3/26/2022"},
  {"id":82,"name":"Inferior dislocation of right acromioclavicular joint","description":"Inferior dislocation of right acromioclavicular joint","reporter":"gexter29","assigned":"pmarkovich29","status":2,"severity":0,"priority":2,"category":"Japan","project":3,"creationDate":"4/3/2022","lastUpdateChange":"10/18/2021"},
  {"id":83,"name":"Hormone sensitivity malignancy status","description":"Hormone sensitivity malignancy status","reporter":"rzuanelli2a","assigned":"cfundell2a","status":0,"severity":0,"priority":1,"category":"Albania","project":2,"creationDate":"7/14/2022","lastUpdateChange":"10/7/2022"},
  {"id":84,"name":"Other orthopoxvirus infections","description":"Other orthopoxvirus infections","reporter":"fbentke2b","assigned":"fbellas2b","status":0,"severity":2,"priority":3,"category":"Indonesia","project":0,"creationDate":"10/17/2022","lastUpdateChange":"6/22/2022"},
  {"id":85,"name":"Nondisp fx of third metatarsal bone, unsp foot, init","description":"Nondisplaced fracture of third metatarsal bone, unspecified foot, initial encounter for closed fracture","reporter":"cseymour2c","assigned":"cregis2c","status":1,"severity":1,"priority":2,"category":"Russia","project":3,"creationDate":"7/21/2022","lastUpdateChange":"4/5/2022"},
  {"id":86,"name":"Bilateral inguinal hernia, with gangrene, recurrent","description":"Bilateral inguinal hernia, with gangrene, recurrent","reporter":"amarchment2d","assigned":"chindrick2d","status":0,"severity":2,"priority":0,"category":"China","project":0,"creationDate":"3/7/2022","lastUpdateChange":"4/24/2022"},
  {"id":87,"name":"Fall same lev from slip/trip w strk agnst sharp glass, subs","description":"Fall on same level from slipping, tripping and stumbling with subsequent striking against sharp glass, subsequent encounter","reporter":"bbythell2e","assigned":"jgentreau2e","status":1,"severity":1,"priority":1,"category":"Uzbekistan","project":2,"creationDate":"12/21/2021","lastUpdateChange":"8/30/2022"},
  {"id":88,"name":"Unsp opn wnd l bk wl of thorax w/o penet thor cavity, sqla","description":"Unspecified open wound of left back wall of thorax without penetration into thoracic cavity, sequela","reporter":"dabramson2f","assigned":"ctrunchion2f","status":1,"severity":3,"priority":2,"category":"Colombia","project":1,"creationDate":"5/12/2022","lastUpdateChange":"7/21/2022"},
  {"id":89,"name":"Partial traumatic amputation of one right lesser toe, init","description":"Partial traumatic amputation of one right lesser toe, initial encounter","reporter":"ibruntje2g","assigned":"mbubbings2g","status":0,"severity":1,"priority":0,"category":"Philippines","project":3,"creationDate":"1/16/2022","lastUpdateChange":"2/8/2022"},
  {"id":90,"name":"Acute leukemia of unspecified cell type, in remission","description":"Acute leukemia of unspecified cell type, in remission","reporter":"abalsdon2h","assigned":"jdavana2h","status":2,"severity":3,"priority":0,"category":"Philippines","project":3,"creationDate":"4/23/2022","lastUpdateChange":"10/22/2021"},
  {"id":91,"name":"Dislocation of MCP joint of right ring finger, sequela","description":"Dislocation of metacarpophalangeal joint of right ring finger, sequela","reporter":"aimlin2i","assigned":"czanettini2i","status":2,"severity":1,"priority":3,"category":"Panama","project":2,"creationDate":"2/6/2022","lastUpdateChange":"7/22/2022"},
  {"id":92,"name":"Flail joint, right knee","description":"Flail joint, right knee","reporter":"ckoenen2j","assigned":"ehaskur2j","status":0,"severity":3,"priority":2,"category":"China","project":2,"creationDate":"5/13/2022","lastUpdateChange":"10/18/2021"},
  {"id":93,"name":"Tinea nigra","description":"Tinea nigra","reporter":"kderges2k","assigned":"adibernardo2k","status":0,"severity":2,"priority":0,"category":"Brazil","project":1,"creationDate":"6/4/2022","lastUpdateChange":"3/1/2022"},
  {"id":94,"name":"Jump/div from boat striking surfc causing drown, sequela","description":"Jumping or diving from boat striking water surface causing drowning and submersion, sequela","reporter":"wgrafom2l","assigned":"gclissold2l","status":2,"severity":1,"priority":2,"category":"Indonesia","project":1,"creationDate":"9/27/2022","lastUpdateChange":"4/29/2022"},
  {"id":95,"name":"Nondisp articular fracture of head of unsp femur, sequela","description":"Nondisplaced articular fracture of head of unspecified femur, sequela","reporter":"imerkel2m","assigned":"bkender2m","status":0,"severity":0,"priority":0,"category":"Indonesia","project":3,"creationDate":"6/2/2022","lastUpdateChange":"8/8/2022"},
  {"id":96,"name":"Oth war operations occurring after, milt, init","description":"Other war operations occurring after cessation of hostilities, military personnel, initial encounter","reporter":"zsteptowe2n","assigned":"wwesson2n","status":1,"severity":1,"priority":1,"category":"Chile","project":0,"creationDate":"3/5/2022","lastUpdateChange":"2/3/2022"},
  {"id":97,"name":"Pathological fracture, r shoulder, subs for fx w malunion","description":"Pathological fracture, right shoulder, subsequent encounter for fracture with malunion","reporter":"glanfere2o","assigned":"nkesper2o","status":1,"severity":0,"priority":2,"category":"Indonesia","project":0,"creationDate":"6/21/2022","lastUpdateChange":"1/17/2022"},
  {"id":98,"name":"Subluxation of left acromioclavicular joint, init encntr","description":"Subluxation of left acromioclavicular joint, initial encounter","reporter":"ttommasetti2p","assigned":"ldeclerc2p","status":2,"severity":1,"priority":1,"category":"France","project":1,"creationDate":"3/6/2022","lastUpdateChange":"4/9/2022"},
  {"id":99,"name":"Coital incontinence","description":"Coital incontinence","reporter":"jrabbatts2q","assigned":"ibrooksby2q","status":0,"severity":0,"priority":2,"category":"Italy","project":1,"creationDate":"4/20/2022","lastUpdateChange":"10/21/2021"},
  {"id":100,"name":"Maternal care for abnlt of vulva and perineum, first tri","description":"Maternal care for abnormality of vulva and perineum, first trimester","reporter":"eizac2r","assigned":"emenichini2r","status":0,"severity":0,"priority":3,"category":"Indonesia","project":0,"creationDate":"3/13/2022","lastUpdateChange":"4/15/2022"}]

  constructor(private store: AngularFirestore) { }

  getAllTickets(){
    return of(this.tickets);
  }

  saveTicket(ticket: any){
  
    this.store.collection("tickets",ref => ref.where("project", "==", 0)).get().subscribe(x=> this.store.collection("tickets").add({...ticket, id: x.size}));
  
  }

}
