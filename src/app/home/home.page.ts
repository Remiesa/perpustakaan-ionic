import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  books: any[] = [];
  savedBooks: any[] = [];
  userId: any;
  userName: any;

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.userName = this.route.snapshot.queryParamMap.get('userName');
    this.fetchData();
  }

  fetchData() {
    const apiUrl = 'http://127.0.0.1:8000/api/data';

    this.http.get(apiUrl).subscribe((data: any) => {
      this.books = data.data2;
      const data3 = data.data3;

      this.books.forEach((item) => {
        const genre = data3.find((g: any) => g.id === item.genre_id);
        if (genre) {
          item.genre_name = genre.name;
        }
      });
    });
  }

  checking(book: any) {
    this.http.get('http://127.0.0.1:8000/api/data').subscribe((data: any) => {
      const data4 = data.data4;
      const check = data4.find(
        (d: any) => d.buku_id == book.id && d.user_id == this.userId
      );
      if (check) {
        this.presentToast('This book is already on your personal list');
      } else {
        this.saveBook(book.id);
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // 2 seconds
      position: 'top',
      color: 'warning',
    });

    toast.present();
  }

  async successToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // 2 seconds
      position: 'top',
      color: 'success',
    });

    toast.present();
  }

  saveBook($id: any) {
    this.dataService.saveUserData(this.userId, $id).subscribe(
      (response) => {
        this.successToast('Saved to your personal list');
        console.log('data saved:', response);
      },
      (error) => {
        console.error('Error :', error);
      }
    );
  }

  savedBooksNavigate() {
    this.router.navigate(['saved-books'], {
      queryParams: {
        userId: this.userId,
        userName: this.userName,
      },
    });
  }

  showBook(book: any) {
    this.router.navigate(['book'], {
      queryParams: {
        userId: this.userId,
        userName: this.userName,
        bookId: book.id,
      },
    });
  }

  logout() {
    this.router.navigate(['login']);
  }
}
