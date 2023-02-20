import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private readonly supabase: AuthService) { }

  ngOnInit() { }

  async handleLogin(event: any) {
    event.preventDefault();
    const loader = await this.supabase.createLoader();
    await loader.present();
    try {
      await this.supabase.signIn(this.email, this.password);
      await loader.dismiss();
      await this.supabase.createNotice('Check your email for the login link!');
    } catch (error: any) {
      await loader.dismiss();
      await this.supabase.createNotice(error.error_description || error.message)
    }
  }


}
