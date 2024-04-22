import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, switchMap, takeUntil } from "rxjs";

export interface PhotosApiRequest {
  firstName: string;
  lastName: string;
  email: string;
}

interface PhotosApiResponse {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface UsersApiRequest extends PhotosApiRequest {
  thumbnailUrl: string;
}

interface UsersApiResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  thumbnailUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceHolderService implements OnDestroy {
  destroy$ = new Subject<void>();

  readonly apiUrls = {
    photos: 'https://jsonplaceholder.typicode.com/photos',
    users: 'https://jsonplaceholder.typicode.com/users'
  }

  constructor(private httpclient: HttpClient) {
  }

  callApi(request: PhotosApiRequest): Observable<UsersApiResponse> {
    return this.httpclient.get<PhotosApiResponse>(`${this.apiUrls.photos}/${request.lastName.length}`)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(result => this.httpclient.post<UsersApiRequest>(this.apiUrls.users, {
          ...request,
          thumbnailUrl: result.thumbnailUrl
        })),
      ) as Observable<UsersApiResponse>;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
