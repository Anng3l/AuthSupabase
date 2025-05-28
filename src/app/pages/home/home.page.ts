import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { supabase } from 'src/app/supabase.client';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})

export class HomePage implements OnInit {

  email: string = "";

  constructor(private router:Router) { }

  async ngOnInit() {

    //Obeniendo 
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user)
    {
      this.router.navigate(["/auth"]);
    }
    else
    {
      this.email = data.user?.email || "";
    }
  }

  async logout()
  {
    await supabase.auth.signOut();
    this.router.navigate(["/auth"])
  }

}
