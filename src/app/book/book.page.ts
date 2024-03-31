import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  userId: any;
  userName: any;
  bookId: any;
  bookName: any;
  bookGenre: any;
  bookAuthor: any;
  bookSinopsis: any;

  constructor(
    private router: Router,
    private dataService: DataService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.userName = this.route.snapshot.queryParamMap.get('userName');
    this.bookId = this.route.snapshot.queryParamMap.get('bookId');
    this.fetchBook();
  }

  fetchBook() {
    const apiUrl = 'http://127.0.0.1:8000/api/data';
    this.http.get(apiUrl).subscribe((data: any) => {
      const data2 = data.data2;

      const book = data2.find((book: any) => book.id == this.bookId);
      if (book) {
        const genreId = book.genre_id;

        // Fetch the genre
        this.http
          .get(`http://127.0.0.1:8000/api/genre/${genreId}`)
          .subscribe((genreData: any) => {
            this.bookName = book.name;
            this.bookGenre = genreData.name;
            this.bookAuthor = book.author;
            this.bookSinopsis = book.sinopsis;
          });
      }
    });
  }

  checking() {
    this.http.get('http://127.0.0.1:8000/api/data').subscribe((data: any) => {
      const data4 = data.data4;
      const check = data4.find(
        (d: any) => d.buku_id == this.bookId && d.user_id == this.userId
      );
      if (check) {
        this.presentToast('This book is already on your personal list');
      } else {
        this.addBook();
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

  addBook() {
    this.dataService.saveUserData(this.userId, this.bookId).subscribe(
      (response) => {
        this.successToast('Saved to your personal list');
        console.log('data saved:', response);
      },
      (error) => {
        console.error('Error :', error);
      }
    );
  }

  homeNavigate() {
    this.router.navigate(['home'], {
      queryParams: {
        userId: this.userId,
        userName: this.userName,
      },
    });
  }
}
