import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SmsService } from '../../services/sms.service';
import { MessageDetails, Stats } from '../../models/stats';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FilterComponent implements OnInit {
  accountId: number | 'all' = 'all';
  phoneNumber: string | 'all' = 'all';
  interval: string = '5minutes';
  messages: MessageDetails[] = [];
  accounts: (number | 'all')[] = [];
  phoneNumbers: (string | 'all')[] = [];

  constructor(private smsService: SmsService) { }

  ngOnInit(): void {
    this.fetchAccounts();
    this.fetchPhoneNumbers();
    this.getFilteredMessages();
  }

  fetchAccounts(): void {
    this.smsService.getAccounts().subscribe(data => {
      this.accounts = ['all', ...data];
    });
  }

  fetchPhoneNumbers(): void {
    this.smsService.getPhoneNumbers().subscribe(data => {
      this.phoneNumbers = ['all', ...data];
    });
  }

  getFilteredMessages(): void {
    // Ensure that 'all' is sent as the value when 'all' is selected
    let selectedAccountId = this.accountId === 'all' ? 'all' : this.accountId.toString();
    let selectedPhoneNumber = this.phoneNumber === 'all' ? 'all' : this.phoneNumber;

    this.smsService.getFilteredMessages(selectedAccountId, selectedPhoneNumber, this.interval).subscribe(
      data => {
        this.messages = data;
      },
      error => {
        console.error('Error fetching messages', error);
      }
    );
  }
}

