import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsService } from '../services/sms.service';
import { Stats } from '../models/stats';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class SummaryComponent implements OnInit{

  stats: Stats = new Stats(); // Initialize the stats property
  messagesPerSecond: number = 0; // Add property to hold messages per second
  constructor(private smsService: SmsService) { }

  ngOnInit(): void {
    this.fetchStats();
    this.fetchMessagesPerSecond(); // Fetch messages per second on initialization
  }

  fetchStats(): void {
    this.smsService.getStats().subscribe(data => {
      this.stats = data;
    });
  }

  fetchMessagesPerSecond(): void {
    this.smsService.getMessagesPerSecond().subscribe(data => {
      this.messagesPerSecond = data; // Update the value from backend response
    });
  }
}


