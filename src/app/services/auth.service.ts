import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Profile {
  username: string;
  full_name: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get user() {
    return this.supabase.auth.getUser();
  }

  get session() {
    return this.supabase.auth.getSession();
  }

  async getProfile() {
    try {
      const userResponse = await this.supabase.auth.getUser();
  
      if (!userResponse || !userResponse.data.user?.id) {
        return { data: null, error: "User information or id not available", status: 404 };
      }
  
      const userId = userResponse.data.user.id;
  
      const profile = await this.supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name`)
        .eq('id', userId)
        .single();
  
      return { data: profile, error: null, status: 200 };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return { data: null, error: 'Error fetching user profile', status: 500 };
    }
  }
  
  
  

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signUp(credentials: { name: string; email: string; password: string }) {
    return this.supabase.auth.signUp(credentials);
  }
  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      id: this.user,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  async createNotice(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 5000 });
    await toast.present();
  }

  createLoader() {
    return this.loadingCtrl.create();
  }
}
