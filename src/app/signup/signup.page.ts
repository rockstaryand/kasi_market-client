import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private readonly supabase: AuthService) {}

  ngOnInit() {}

  async handleSignUp(event: any) {
    event.preventDefault();
    const loader = await this.supabase.createLoader();
    let credentials = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    await loader.present();
    try {
      await this.supabase.signUp(credentials);
      await loader.dismiss();
      await this.supabase.createNotice('Check your email for the login link!');
    } catch (error: any) {
      await loader.dismiss();
      await this.supabase.createNotice(
        error.error_description || error.message
      );
    }
  }
}
