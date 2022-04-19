export interface PhotoModel {
  alt_description?: string,
  urls: { small: string },
  id: string,
  smallUrl: string
}

export interface FavoritePhotoModel {
  id?: string,
  url: string
}
