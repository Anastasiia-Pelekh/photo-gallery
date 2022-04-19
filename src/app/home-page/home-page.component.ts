import { Component, OnInit, OnDestroy } from '@angular/core';
import { RandomPhotoService } from 'src/app/shared/services/random-photo.service';

import { Subscription } from 'rxjs';
import { PhotoModel } from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent  implements OnInit, OnDestroy {
  private subscription!: Subscription;

  public loader: boolean = false;
  public photoData: PhotoModel[] = [];

  constructor(private photoService: RandomPhotoService) { }

  ngOnInit(): void {
    this.getPhoto();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getPhoto(): void {
    this.subscription = this.photoService.createRandomPhotos()
      .subscribe(data => this.photoData = data);
  }

  public getMore(): void {
    this.loader = true;

    this.subscription = this.photoService.fetchPhotos()
      .subscribe(data => {
        this.photoData.push(...data);
        this.loader = false;
      })
  }

  public addToFavorites(id: string, url: string): void {
    this.photoService.addToFavorites(id, url);
  }
}
