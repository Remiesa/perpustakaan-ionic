import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';

@Component({
  selector: 'app-saved-books',
  templateUrl: './saved-books.page.html',
  styleUrls: ['./saved-books.page.scss'],
})
export class SavedBooksPage implements OnInit {
  savedBooks: any[] = [];
  IDbooks: any[] = [];
  userId: any;
  userName: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.userName = this.route.snapshot.queryParamMap.get('userName');
    this.getBukuID();
    this.fetchSavedBooks();
  }

  getBukuID() {
    const apiUrl = 'http://127.0.0.1:8000/api/data';
    this.http.get(apiUrl).subscribe((data: any) => {
      const data4 = data.data4;
      data4.forEach((item: any) => {
        if (item.user_id == this.userId) {
          this.IDbooks.push(item.buku_id);
        }
      });
    });
  }

  fetchSavedBooks() {
    const apiUrl = 'http://127.0.0.1:8000/api/dataBook';
    this.http.get(apiUrl).subscribe((data: any) => {
      const data1 = data.data1;
      this.IDbooks.forEach((idToCheck: any) => {
        const matchingItem = data1.find((item: any) => item.id == idToCheck);
        if (matchingItem) {
          this.savedBooks.push(matchingItem);
        }
      });
    });
  }

  deleteBook(book: any) {
    const apiUrl = `http://127.0.0.1:8000/api/data/${this.userId}/${book.id}`;
    const deleting = this.http.delete(apiUrl).subscribe(() => {
      window.location.reload();
      this.fetchSavedBooks();
    });
    if (deleting) {
      this.dangerToast('Deleted');
    } else {
      this.dangerToast('Something Went Wrong');
    }
  }

  homeNavigate() {
    this.router.navigate(['home'], {
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

  async dangerToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // 2 seconds
      position: 'top',
      color: 'danger',
    });

    toast.present();
  }
}
