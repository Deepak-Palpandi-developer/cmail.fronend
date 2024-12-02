import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { _connections } from '../shared/constant-data';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  constructor() {
    this.startConnection();
    this.addEmailSentListener();
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.mail_box_api + _connections._hub_connenction, {
        withCredentials: true, // Important if your SignalR requires credentials
      }) // Replace with your backend URL
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection Established'))
      .catch((err) => console.error('Error while starting connection: ' + err));
  }

  private addEmailSentListener() {
    this.hubConnection.on('ReceiveEmailNotification', (message) => {
      console.log(message);
      alert(message);
    });
  }
}
