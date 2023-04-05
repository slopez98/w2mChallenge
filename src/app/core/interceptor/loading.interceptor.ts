import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    countRequest = 0;

    constructor(
        private spinner: MatSnackBar
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (!this.countRequest) {
            this.spinner.open('Cargando...', undefined, {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
            })
        }
        this.countRequest++;
        return next.handle(request)
            .pipe(
                finalize(() => {
                    this.countRequest--;
                    if (!this.countRequest) {
                        this.spinner.dismiss()

                    }
                })
            );
    }
}