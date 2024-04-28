import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, Subject, take } from "rxjs";

export interface PhotosApiRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface PhotosApiResponse {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface UsersApiRequest extends PhotosApiRequest {
  thumbnailUrl: string;
}

export interface UsersApiResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  thumbnailUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceHolderService {
  destroy$ = new Subject<void>();

  readonly apiUrls = {
    photos: 'https://jsonplaceholder.typicode.com/photos',
    users: 'https://jsonplaceholder.typicode.com/users'
  }

  constructor(private httpclient: HttpClient) {
  }

  getPhotos(request: PhotosApiRequest): Observable<PhotosApiResponse> {
    return this.httpclient.get<PhotosApiResponse>(`${this.apiUrls.photos}/${request.lastName.length}`)
      .pipe(
        take(1)
      ) as Observable<PhotosApiResponse>;
  }

  getUsers(request: UsersApiRequest): Observable<UsersApiResponse> {
    return this.httpclient.post<UsersApiResponse>(this.apiUrls.users, request)
      .pipe(
        take(1)
      ) as Observable<UsersApiResponse>;
  }
}
