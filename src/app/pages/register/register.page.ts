import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  checking() {
    const apiUrl = 'http://127.0.0.1:8000/api/users';
    this.http.get(apiUrl).subscribe((data: any) => {
      const check = data.find((item: any) => item.email == this.email);
      if (check) {
        this.warningToast('Account with this email is already exist');
        this.email = '';
      } else {
        if (this.password !== this.confirmPassword) {
          this.warningToast('Password and Confirm Password do not match');
          this.confirmPassword = '';
        } else {
          this.register();
        }
      }
    });
  }

  register() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.http.post('http://127.0.0.1:8000/api/users', userData).subscribe(
      (response) => {
        this.presentToast('Account Registered');
        this.router.navigate(['login']);
      },
      (error) => {
        this.failToast('Something Went Wrong');
        console.log(error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // 2 seconds
      position: 'top',
      color: 'success',
    });

    toast.present();
  }

  async failToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // 2 seconds
      position: 'top',
      color: 'danger',
    });

    toast.present();
  }

  async warningToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // 2 seconds
      position: 'top',
      color: 'warning',
    });

    toast.present();
  }

  loginPage() {
    this.router.navigate(['login']);
  }

  ngOnInit() {}
}
