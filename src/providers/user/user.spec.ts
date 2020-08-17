import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserProvider } from './user.provider';
import { environment as ENV } from '../../environments/environment';

describe('User', () => {

    let service: UserProvider;
    let httpTestingController: HttpTestingController;
    let url: string;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpTestingController],
            providers: [
                UserProvider
            ]
        });

        service = TestBed.get(UserProvider);
        httpTestingController = TestBed.get(HttpTestingController);

        url = `${ENV.BASE_URL}v1/client/auth/`;
    });

    afterEach(()=> httpTestingController.verify());

    it('It should mount the GET request', ()=> {
        expect(service.BASE_URL).toBe(url);
    });
});