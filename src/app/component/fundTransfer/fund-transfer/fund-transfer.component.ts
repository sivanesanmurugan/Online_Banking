import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent {
  options:AnimationOptions={
    path:'/assets/Ticket.json'
  }
  options1:AnimationOptions={
    path:'/assets/self.json'
  }
  options2:AnimationOptions={
    path:'/assets/samebank.json'
  }
  options3:AnimationOptions={
    path:'/assets/otherBank.json'
  }
}
