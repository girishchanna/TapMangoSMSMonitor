import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsService } from '../../services/sms.service';
import { MessageDetails } from '../../models/stats';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-phone-stats',
  standalone: true,
  templateUrl: './phone-stats.component.html',
  styleUrls: ['./phone-stats.component.css'],
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule]
})
export class PhoneStatsComponent implements OnInit {
  phoneNumber: string = 'all';
  phoneNumbers: string[] = [];
  messages: MessageDetails[] = [];
  startDateTime: Date = new Date(new Date().setDate(new Date().getDate() - 1)); 
  endDateTime: Date = new Date();   

  constructor(private smsService: SmsService) { }

  ngOnInit(): void {
    this.fetchAllPhoneNumbersAndMessages();
  }

  fetchAllPhoneNumbersAndMessages(): void {
    this.smsService.getAllPhoneNumbersAndMessages().subscribe(data => {
      this.phoneNumbers = ['all', ...data.map(d => d.phoneNumber)];
      this.messages = data;
    });
  }

  getMessages(): void {
    this.smsService.getFilteredPhoneNumberMessages(this.phoneNumber, this.startDateTime, this.endDateTime).subscribe(data => {
      this.messages = data;
    });
  }
}
