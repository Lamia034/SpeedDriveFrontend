export interface Message {
  messageId?: string;
  text: string;
  sender: string;
  receiver: string;
  sent: Date;
  chatRoomId?:string;
}
