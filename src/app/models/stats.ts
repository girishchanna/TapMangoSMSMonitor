export class Stats {
    totalMessagesSent: number = 0;
    messagesSentToday: number = 0;
    messagesPerSecond: number = 0;
    accountStats: AccountStats[] = [];
  }
  
  export class AccountStats {
    accountId: number = 0;
    totalMessagesSent: number = 0;
    messagesSentToday: number = 0;
    messages: MessageDetails[] = []; // Provide a default value here
  }
  
  export interface MessageDetails {
    phoneNumber: string;
    message: string;
    timestamp: Date;
    accountId: string; // Add AccountId property
  }
  
  