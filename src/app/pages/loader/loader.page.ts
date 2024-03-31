import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {
  constructor(private nav: NavController) {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.nav.navigateForward('login');
    }, 3000); // Delay milliseconds (3 detik)
  }

  ngOnInit() {}
}
