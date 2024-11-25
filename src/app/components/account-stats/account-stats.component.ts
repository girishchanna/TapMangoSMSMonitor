import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsService } from '../../services/sms.service';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MessageDetails, Stats } from '../../models/stats';


@Component({
  selector: 'app-account-stats',
  templateUrl: './account-stats.component.html',
  styleUrls: ['./account-stats.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatMomentDateModule, MatFormFieldModule, MatInputModule]
})
export class AccountStatsComponent implements OnInit {
  stats: Stats = new Stats();
  accountId: string = 'all';
  accountIds: string[] = [];
  messages: MessageDetails[] = [];
  startDateTime: Date = new Date(new Date().setDate(new Date().getDate() - 1));;
  endDateTime: Date = new Date();
  totalMessagesInPeriod: number = 0;

  constructor(private smsService: SmsService) { }

  ngOnInit(): void {
    this.fetchAccounts();
    this.fetchStats();
    this.getMessagesByDateRange();
  }

  fetchAccounts(): void {
    this.smsService.getAccounts().subscribe(data => {
      this.accountIds = ['all', ...data.map(accountId => accountId.toString())];
    });
  }

  fetchStats(): void {
    this.smsService.getStats().subscribe(data => {
      this.stats = data;
    });
  }

  getMessagesByDateRange(): void {
    const startDateTimeString = this.startDateTime.toISOString(); // Convert to ISO string
    const endDateTimeString = this.endDateTime.toISOString(); // Convert to ISO string
    this.smsService.getFilteredMessagesByDateRange(this.accountId, startDateTimeString, endDateTimeString).subscribe(data => {
      this.messages = data;
      this.totalMessagesInPeriod = data.length;
    });
  }
}
