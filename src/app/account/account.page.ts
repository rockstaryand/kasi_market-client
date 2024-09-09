import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Profile, AuthService } from '../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  profile: Profile = {
    username: '',
    full_name: '',
    avatar_url: '',
    website: '',
  };

  session = this.supabase.session;

  constructor(
    private readonly supabase: AuthService,
    private navController: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    try {
      let { data: profileData, error, status } = await this.supabase.getProfile();

      if (error && status !== 406) {
        throw error;
      }
      if (profileData) {
        const profile: Profile = {
          username: profileData.data?.username,
          full_name: profileData.data?.full_name,
          website: profileData.data?.website,
          avatar_url: profileData.data?.avatar_url,
        };
        this.profile = profile;
      }
    } catch (error: any) {
      alert(error?.message);
    }
  }
  async updateProfile(avatar_url: string = '') {
    const loader = await this.supabase.createLoader();
    await loader.present();
    try {
      await this.supabase.updateProfile({ ...this.profile, avatar_url });
      await loader.dismiss();
      await this.supabase.createNotice('Profile updated!');
    } catch (error: any) {
      await this.supabase.createNotice(error.message);
    }
  }
  goBack() {
    this.navController.pop();
  }

  async signOut() {
    console.log('testing?');
    await this.supabase.signOut();
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
