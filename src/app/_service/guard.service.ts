import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //1) VERIFICAR SI EL USUARIO ESTA LOGUEADO
    let rpta = this.loginService.estaLogeado();
    if (!rpta) {
      this.loginService.cerrarSesion();
      return false;
    }

    //2) VERIFICAR SI EL TOKEN NO HA EXPIRADO
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    if (!helper.isTokenExpired(token)) {
      //3) VERIFICAR SI TIENES EL ROL NECESARIO PARA ACCEDER A ESE COMPONENTE 'PAGINA'
      //url -> /pages/paciente
      let url = state.url;
      const decodedToken = helper.decodeToken(token);
      return true;

    } else {
      this.loginService.cerrarSesion();
      return false;
    }
  }
}
