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
                        // we can add some notify service here...
                    }
                    switch (response.status) {
                        case 200:
                            const res: Response<any> = response.body;
                            if (!res.success) {
                                if (res.errorCode === 0) {
                                    // we can add some notify service here...
                                } else {
                                    // we can add some notify service here...
                                }
                            }
                            break;
                        case 201:
                            break;
                        case 0:
                            console.log(2, JSON.stringify(res));
                            console.warn('danger', 'Error, Please check logs.');
                            break;
                        default:
                            console.log(3, JSON.stringify(res));
                            const body: string = String(response.body);
                            console.warn('danger', JSON.parse(body).msg);
                    }
                }
            }, response => {
                switch (response.status) {
                    case 500:
                            // we can add some notify service here...
                        break;
                    case 403:
                            // we can add some notify service here...
                        break;
                    case 401:
                            // we can add some notify service here...
                        break;
                    case 400:
                    case 422:
                        console.log(response.error);
                        const message = 'message' in response.error ? response.error.message : response.error;
                        break;
                    case 0:
                        console.warn('danger', 'Error, Please check logs.');
                        break;
                    default:
                        console.warn('danger', response);
                }
            }),
        );
    }
}
