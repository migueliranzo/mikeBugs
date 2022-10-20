import { FieldValue } from "@angular/fire/firestore";

export interface User {

    id:string;
    username:string;
    email:string;
    createdAt?: FieldValue
}
