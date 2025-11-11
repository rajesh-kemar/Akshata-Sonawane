import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { User } from '../../Models/UserModel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {
  user: User = { userName: '', password: '', role: '' };
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.user).subscribe({
      next: (res) => {
        // Save token
        this.userService.saveToken(res.token);

        // Save driverName and role
        this.userService.setUserInfo({ userName: this.user.userName, role: res.role });

        // Redirect to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
