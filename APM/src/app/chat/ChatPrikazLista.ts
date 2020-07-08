export class ChatPrikazLista{
    chatId:number;
    userEmail:string;
    //messagesCount:number;

    constructor(chatId:number, userEmail:string){
        this.chatId=chatId;
       // this.messagesCount=messagesCount;
        this.userEmail=userEmail;
    }
}