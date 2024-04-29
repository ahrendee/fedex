import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, Subject, take } from "rxjs";

export interface PhotosApiResponse {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface UsersApiRequest {
  firstName: string;
  lastName: string;
  email: string;
  thumbnailUrl: string;
}

export interface UsersApiResponse extends UsersApiRequest {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceHolderService {
  destroy$ = new Subject<void>();

  static readonly apiUrls = {
    photos: 'https://jsonplaceholder.typicode.com/photos',
    users: 'https://jsonplaceholder.typicode.com/users'
  }

  constructor(private httpclient: HttpClient) {
  }

  getPhotos(lnLength: number): Observable<PhotosApiResponse> {
    return this.httpclient.get<PhotosApiResponse>(`${JsonPlaceHolderService.apiUrls.photos}/${lnLength}`)
      .pipe(
        take(1)
      ) as Observable<PhotosApiResponse>;
  }

  getUsers(request: UsersApiRequest): Observable<UsersApiResponse> {
    return this.httpclient.post<UsersApiResponse>(JsonPlaceHolderService.apiUrls.users, request)
      .pipe(
        take(1)
      ) as Observable<UsersApiResponse>;
  }
}
