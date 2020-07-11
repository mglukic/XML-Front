import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from "./Chat";
import { Message } from "./Message";

@Injectable()
export class ChatService{
  

    constructor(private http:HttpClient){
      
    }

    public vratiChatovePoKorisniku(email:string): Observable<Chat[]> {
        return this.http.get<Chat[]>("/api/chat/autor/"+email);
    }

    public vratiChatSaMicro(id:number):Observable<Chat>{
        return this.http.get<Chat>("http://localhost:8080/user/vratiChat/"+id);
    }

    public vratiPorukePoCetu(id:number): Observable<Message[]> {
        return this.http.get<Message[]>("/api/chat/message/"+id);
    }

    public posaljiPorukuNaCetMico(id:number,content:string,sender:string): Observable<Message> {
        return this.http.get<Message>("http://localhost:8080/user/postMessage/"+id+ "/"+ content+ "/" +sender);
    }

  

    //poziva se nakon odobrene rezervacije u listi zahteva za mene
    public kreirajChat(chat:number): Observable<Chat> {
        return this.http.post<Chat>("/api/chat/"+ chat,chat);
    }

    public VratiChat(): Observable<Chat[]> {
        return this.http.get<Chat[]>("http://localhost:8080/user/autorAG");
    }

    public vratiPorukeIzMikroservisa(id:number): Observable<Message[]> {
        return this.http.get<Message[]>("http://localhost:8080/user/messages/"+id);
    }

    public kreirajMessageMicroservices(message:Message): Observable<Message> {
        return this.http.post<Message>("http://localhost:8080/user/chat/message", message);
    }

}