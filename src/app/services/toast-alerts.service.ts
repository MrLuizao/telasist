import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastAlertsService {
  constructor(private toastr: ToastrService) {}

  showErrorPassword() {
    this.toastr.error('verifica la información capturada', 'Contraseña incorrecta', {
      timeOut: 3000,
    });
  }

  showErrorEmail() {
    this.toastr.error('verifica los datos ingresados', 'Email no encontrado', {
      timeOut: 3000,
    });
  }
}
