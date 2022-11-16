import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let projectId = null;
      if(route.params?.["filter"]){
        projectId = route.params?.["filter"];
      }else{
        projectId = JSON.parse(route.params["project"] ).id
      }

      return this.authService.loggedBelongsToProject(projectId).pipe(first(), map(x=>{
        if(x[0].length != 0){
          return true;
        }else{
        this.router.navigate(['/project-management'])
        return false;
        }
        
      }));;
  }
  
}
