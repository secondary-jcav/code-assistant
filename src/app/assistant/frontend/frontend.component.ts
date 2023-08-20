import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import OpenAI from 'openai';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css'],
})
export class FrontendComponent {
  private openai = new OpenAI(environment.OPENAI_API_KEY);
  userInput: string = '';
  messages: { user: string; bot: string }[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    //require('dotenv').config();
  }

  async sendPrompt(prompt: string) {
    console.log('Button clicked');
    await this.openai.chat.completions
      .create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      })
      .then((r) => {
        const botMessage =
          r.choices[0]?.message?.content || 'No response available.';
        const lastMessage = this.messages[this.messages.length - 1];
        lastMessage.bot = botMessage;

        this.messages.push({ user: '', bot: '' }); // Add an empty message for the next user input
        return botMessage;
      });
  }

  getBotResponse() {
    const userMessage = this.userInput.trim();
    if (userMessage === '') return;

    this.messages.push({ user: userMessage, bot: 'Loading...' });
    this.userInput = '';
    this.sendPrompt(userMessage);
  }
}
