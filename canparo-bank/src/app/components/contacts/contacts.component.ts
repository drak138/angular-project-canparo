import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormsModule],
  providers:[ContactService],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
private lastEmailSentAt: number | null = null;
@ViewChild("contactForm")form:NgForm|undefined
constructor(private contactService:ContactService){}
contactHandler(){
  const { email, theme, content } = this.form?.value;

  // Check if any field is empty
  if (!email || !theme || !content) {
      alert('Всички полета трябва да са попълнени!');
      return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert('Invalid email format!');
      return;
  }
  const now = Date.now();
  if (this.lastEmailSentAt && now - this.lastEmailSentAt < 5 * 60 * 1000) {
      const remainingTime = Math.ceil((5 * 60 * 1000 - (now - this.lastEmailSentAt)) / 1000);
      alert(`Please wait ${remainingTime} seconds before sending another email.`);
      return;
  }

  this.contactService.contact({email, theme, content}).subscribe((response)=>{
  })
  this.lastEmailSentAt = now; // Update the timestamp
  this.form?.reset()
}
}
