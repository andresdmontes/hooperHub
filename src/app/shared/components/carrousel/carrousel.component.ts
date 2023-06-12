import { Component, Input } from '@angular/core';
import { Photo } from '../../interfaces/carrouselFoto.interface';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
  imports: [CommonModule],
})
export class CarrouselComponent {
  @Input() title: string;
  @Input() photos: Photo[];
  public currentIndex: number;
  private intervalId: any;

  constructor() {
    this.title = '';
    this.photos = [];
    this.currentIndex = 0;
    this.intervalId = null;
  }

  ngOnInit() {
    this.startInterval();
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  startInterval() {
    this.intervalId = setInterval(() => {
      this.nextPhoto();
    }, 7000);
  }

  stopInterval() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  previousPhoto() {
    this.currentIndex =
      this.currentIndex === 0 ? this.photos.length - 1 : this.currentIndex - 1;
    this.restartInterval();
  }

  nextPhoto() {
    this.currentIndex =
      this.currentIndex === this.photos.length - 1 ? 0 : this.currentIndex + 1;
    this.restartInterval();
  }

  restartInterval() {
    this.stopInterval();
    this.startInterval();
  }
}
