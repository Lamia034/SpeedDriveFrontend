import {Component, OnInit} from '@angular/core';
import {ChatService} from "../services/ChatService.service";
import {Message} from "../models/interfaces/Message";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ChatRoom} from "../models/interfaces/ChatRoom";
import {ChatRoomService} from "../services/ChatRoomService";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements  OnInit {
  showChat: boolean = true;

  sendMessageForm!: FormGroup;
logged:any;
  agencyIdParam: any ;
  chatRoomId: any;
  messages: Message[] = [];
  chatRooms: ChatRoom[] = [];
chatRoomId2:any;
// clientId: any ;
receiver2:any;
clientId3:any;
agencyId3:any;
  constructor(private chatService: ChatService, private formBuilder: FormBuilder ,private route: ActivatedRoute,private chatRoomService: ChatRoomService) {
  }

  ngOnInit(): void {
    // this.chatService.getMessagesByChatRoom('chatroomId').subscribe(messages => {
    //   this.messages = messages;
    // });
    this.sendMessageForm = this.formBuilder.group({
      text: new FormControl('', Validators.required)
    });

      this.route.params.subscribe(params => {
        this.agencyIdParam = params['agencyId'];
        console.log('Agency ID:', this.agencyIdParam);
      });


      if(localStorage.getItem('clientId') !== 'undefined'){
        this.logged = localStorage.getItem('clientId');
        console.log(localStorage.getItem('clientId'))
        console.log("logged client:", this.logged);
      }else{
        this.logged = localStorage.getItem('agencyId');
        console.log(localStorage.getItem('agencyId'))
        console.log("logged agency:", this.logged);
      }

    // this.logged  =localStorage.getItem('clientId') || localStorage.getItem('agencyId')  ;
    // const clientId = localStorage.getItem('clientId');
    // const agencyId = localStorage.getItem('agencyId');


// this.logged = clientId || agencyId;



    // if (clientId) {
    //   this.logged = clientId;
    // } else {
    //   this.logged = agencyId;
    // }


    // if (this.clientId ) {
    //   this.logged = this.clientId;
    //   console.log("Logged in as client:", this.logged);
    // } else {
    //   this.logged = this.agencyId;
    //   console.log("Logged in as agency:", this.logged);
    // }




    this.chatRoomService.getChatRoomsByLoggedOne(this.logged).subscribe(
      chatRooms => {
        this.chatRooms = chatRooms;

        console.log("chatrooms:",this.chatRooms);
      },
      error => {
        console.error('Failed to fetch chat rooms:', error);
      }
    );
      }

  openChat(chatRoomId: string, receiver:any) {
    this.showChat = !this.showChat;
this.chatRoomId2 = chatRoomId;
this.receiver2 = receiver;
    console.log('Opening chat for receiver:', this.receiver2);

    console.log('Opening chat for chatRoomId:', chatRoomId);
    this.chatService.getMessagesByChatRoom(chatRoomId).subscribe(messages => {
      this.messages = messages;

      console.log("the message text:",this.messages);
    });
  }

  sendMessage(): void {
    console.log("enter");
    if (this.sendMessageForm.valid) {

        const text = this.sendMessageForm.get('text')?.value; // Extract text from form control
console.log("other chat room id checking:",this.chatRoomId2);
        // const LoggedClientId = localStorage.getItem('clientId') || '';
        // const agencyId = this.route.snapshot.queryParams.agencyId;
        // const agencyId = +params.get('carRentId');
        // const agencyId = this.route.snapshot.params['agencyId']  || '';

        const message: Message = {

          text: text,
          // sender: LoggedClientId || this.agencyId,
          sender: this.logged,
          // receiver: this.agencyId || this.clientId,
          receiver:this.receiver2,
          sent: new Date(),
          chatRoomId:this.chatRoomId2,
        };
        console.log("new message", message);

        this.chatService.sendMessage(message).subscribe(
          response => {
            console.log('message sent successfully:', response);
            // this.sendMessageForm.patchValue({
            //   imagePath: response.imagePath
            // });
            this.messages.push(response); // Assuming response contains the newly sent message

            this.chatRoomId = response.chatRoomId;
            this.sendMessageForm.reset();

          },
          error => {
            console.error('Failed to send message:', error);
          }
        );
      }

    }



}
