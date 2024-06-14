
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { FronteggAppService, FronteggAuthService, ContextHolder } from "@frontegg/angular";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  loadingSubscription: Subscription;
  user?: any;
  title = 'frontegg-darrenross';

  constructor(private fronteggAuthService: FronteggAuthService, private fronteggAppService: FronteggAppService) {
    this.loadingSubscription = fronteggAppService.isLoading$.subscribe((isLoading) => this.isLoading = isLoading)
  }

  ngOnInit(): void {
    this.fronteggAuthService?.user$.subscribe((user) => {
      this.user = user;
    })
  }

  // This is the auto login code. This causes a login never ending loop.
  // ngOnInit(): void {
  //   this.fronteggAuthService.authState$.subscribe(authState => {
  //     this.isLoading = authState.isLoading
  //     this.user = authState.user
  //     if (!authState.isLoading && !authState.isAuthenticated) {
  //       this.fronteggAuthService.loginWithRedirect();
  //     }
  //   });
  // }

  loginWithRedirect(): void {
    this.fronteggAuthService.loginWithRedirect();
  }
  
  logOut(): void {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe()
  }

  showApp(): void {
    this.fronteggAppService?.showAdminPortal()
  }
}