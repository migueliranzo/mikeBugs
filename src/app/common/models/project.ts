export class Project {

    public id:string;
    public title:string;
    public subtitle: string;
    public description:string;
    public tickets: any[];
    public users:any[];

    constructor(id:string, title:string, subtitle:string, desription:string, tickets:{}[], users:{}[]){
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.description = desription;
        this.tickets = tickets;
        this.users = users;
    };

    getCompletionProgress():number{
       return (this.tickets.filter((x:any)=> x.completed).length / this.tickets.length) * 100
    }
}
