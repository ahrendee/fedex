import { TestBed } from '@angular/core/testing';

import { JsonPlaceHolderService } from './json-place-holder.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('JsonPlaceHolderService', () => {
  let service: JsonPlaceHolderService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientModule],
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(JsonPlaceHolderService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return photo response', () => {
    service.getPhotos(5)
      .subscribe({
        next: (response) => {
          expect(response).toBeTruthy();
          expect(response).toEqual(mockPhotoResponse);
        }
      });

    const mockHttp = httpCtrl.expectOne(`${JsonPlaceHolderService.apiUrls.photos}/5`);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush(mockPhotoResponse);
  });

  it('Should return users response', () => {
    service.getUsers(mockUsersRequest)
      .subscribe({
        next: (response) => {
          expect(response).toBeTruthy();
          expect(response).toEqual(mockUsersResponse);
        }
      });

    const mockHttp = httpCtrl.expectOne(JsonPlaceHolderService.apiUrls.users);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("POST");

    mockHttp.flush(mockUsersResponse);
  });

  const mockPhotoResponse = {
    id: 2,
    albumId: 3,
    title: 'Some title',
    url: 'https://photosurl.nl',
    thumbnailUrl: 'https://photosurl.thumb.nl'
  }
  const mockUsersRequest = {
    firstName: 'Japie',
    lastName: 'Krekel',
    email: 'japie@krekel.nl',
    thumbnailUrl: 'https://photosurl.thumb.nl'
  }
  const mockUsersResponse = {
    ...mockUsersRequest,
    id: 4
  }
});
