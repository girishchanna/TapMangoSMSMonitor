import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
///import { SmsRequest, ApiResponse, Stats } from './models';
import { MessageDetails, Stats } from '../models/stats';
import { SmsRequest } from '../models/sms-request';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class SmsService {
  private baseUrl = 'https://localhost:44361/api/sms';

  constructor(private http: HttpClient) {}

  sendSms(request: SmsRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/send`, request);
  }

  getStats(): Observable<Stats> {
    return this.http.get<Stats>(`${this.baseUrl}/stats`);
  }

  getMessagesPerSecond(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/stats/messagesPerSecond`);
  }

  getFilteredMessages(
    accountId: string,
    phoneNumber: string,
    interval: string
  ): Observable<MessageDetails[]> {
    let params = new HttpParams();
    params = params.append('accountId', accountId);
    params = params.append('phoneNumber', phoneNumber);
    params = params.append('interval', interval);

    return this.http.get<MessageDetails[]>(`${this.baseUrl}/stats/messages`, {
      params,
    });
  }

  getAccounts(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/accounts`);
  }

  getPhoneNumbers(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/phoneNumbers`);
  }

  getAllPhoneNumbersAndMessages(): Observable<
    {
      phoneNumber: string;
      message: string;
      timestamp: Date;
      accountId: string;
    }[]
  > {
    return this.http.get<
      {
        phoneNumber: string;
        message: string;
        timestamp: Date;
        accountId: string;
      }[]
    >(`${this.baseUrl}/stats/allPhoneNumbersAndMessages`);
  }

  getFilteredPhoneNumberMessages(
    phoneNumber: string,
    startDateTime?: Date,
    endDateTime?: Date
  ): Observable<MessageDetails[]> {
    let params = new HttpParams().set('phoneNumber', phoneNumber);
    if (startDateTime) {
      params = params.set('startDateTime', startDateTime.toISOString());
    }
    if (endDateTime) {
      params = params.set('endDateTime', endDateTime.toISOString());
    }
    return this.http.get<MessageDetails[]>(
      `${this.baseUrl}/stats/phonenumbermessages`,
      { params }
    );
  }

  getFilteredMessagesByDateRange(
    accountId: string,
    startDateTime?: string,
    endDateTime?: string
  ): Observable<MessageDetails[]> {
    let params = new HttpParams().set('accountId', accountId);
    if (startDateTime) {
      params = params.set('startDateTime', startDateTime);
    }
    if (endDateTime) {
      params = params.set('endDateTime', endDateTime);
    }
    return this.http.get<MessageDetails[]>(
      `${this.baseUrl}/stats/messagesByDateRange`,
      { params }
    );
  }
}
