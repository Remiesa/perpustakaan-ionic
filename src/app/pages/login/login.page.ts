import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private router: Router
  ) {}

  login() {
    const apiUrl = 'http://127.0.0.1:8000/api/data';

    this.http.get(apiUrl).subscribe((data: any) => {
      const user = data.data1.find(
        (u: any) => u.email === this.email && u.password === this.password
      );

      if (user) {
        const userId = user.id;
        const userName = user.name;

        this.router.navigate(['home'], {
          queryParams: {
            userId: userId,
            userName: userName,
          },
        });
      } else {
        this.presentToast('Login Failed');
        this.email = '';
        this.password = '';
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // 2 seconds
      position: 'top',
      color: 'danger',
    });

    toast.present();
  }

  registerPage() {
    this.router.navigate(['register']);
  }

  ngOnInit() {}
}
