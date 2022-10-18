export interface Ticket {

    id: string;
    title:string;
    description:string;
    reporter:string;
    assigned: any[];
    status:string;
    severity: string;
    priority: string;
    category:string;
    project:string;
    creationDate: Date;
    lastUpdateChange: Date;

}
