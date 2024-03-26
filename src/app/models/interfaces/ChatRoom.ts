import {Client} from "./Client";
import {Agency} from "./Agency";
import {Message} from "./Message";

export interface ChatRoom{

 chatRoomId:string;
sender:string;

senderName:String;
receiverName:String;
  receiver:string;
message:Message[];
}
