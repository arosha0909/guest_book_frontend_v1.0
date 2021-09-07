import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Response} from '../models/response';


@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        // private notifierService: NotifierService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = AuthService.getToken();
        if (token && req.params.get('override') !== 'true') {
            req = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
            // noinspection AssignmentToFunctionParameterJS
        }
        if (req.params.get('override') === 'true') {
            req = req.clone({ params: req.params.delete('override') });

        }

        return next.handle(req).pipe(
            tap((response: any) => {
                if (response instanceof HttpResponse) {
                    if (!response.body) {
                        // this.notifierService.notify('warning', 'Empty Response Received');
                    }
                    switch (response.status) {
                        case 200:
                            const res: Response<any> = response.body;
                            if (!res.success) {
                                if (res.errorCode === 0) {
                                    // this.notifierService.notify('warning', res.error);
                                } else {
                                    // console.log(1, JSON.stringify(res));
                                    //   this.notifierService.notify('warning', 'Something went wrong.');
                                }
                            }
                            break;
                        case 201:
                            break;
                        case 0:
                            console.log(2, JSON.stringify(res));
                            //   this.notifierService.notify('error', 'Something went wrong.');
                            console.warn('danger', 'Error, Please check logs.');
                            break;
                        default:
                            console.log(3, JSON.stringify(res));
                            //   this.notifierService.notify('error', 'Something went wrong.');
                            const body: string = String(response.body);
                            console.warn('danger', JSON.parse(body).msg);
                    }
                }
            }, response => {
                switch (response.status) {
                    case 500:
                        // this.notifierService.notify('error', 'An internal server error occurred');
                        break;
                    case 403:
                        // this.notifierService.notify('error', 'You are not allowed to perform this action! Forbidden.');
                        break;
                    case 401:
                        // this.notifierService.notify('error', 'You are not allowed to perform this action! Unauthorized.');
                        break;
                    case 400:
                    case 422:
                        console.log(response.error);
                        const message = 'message' in response.error ? response.error.message : response.error;
                        // this.notifierService.notify('error', message);
                        break;
                    case 0:
                        // this.notifierService.notify('error', 'Something went wrong.');
                        console.warn('danger', 'Error, Please check logs.');
                        break;
                    default:
                        // this.notifierService.notify('error', 'Something went wrong.');
                        console.warn('danger', response);
                }
            }),
        );
    }
}
