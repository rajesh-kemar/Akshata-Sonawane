import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  role: string | null = null;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    //  Subscribe to login state changes
    this.userService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    //  Subscribe to role changes
    this.userService.role$.subscribe(role => {
      this.role = role;
    });

    // Initialize from localStorage in case page reload
    this.isLoggedIn = this.userService.isLoggedIn();
    this.role = this.userService.getRole();
  }

  logout() {
    this.userService.logout();
    this.isLoggedIn = false;
    this.role = null;
    this.router.navigate(['/home']); // redirect to home after logout
  }
}
