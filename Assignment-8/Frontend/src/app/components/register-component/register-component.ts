import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { User } from '../../Models/UserModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone:true,
  imports:[FormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrls: ['./register-component.css']
})
export class RegisterComponent {
  user: User = {
    userName: '',
    password: '',
    role: 'Driver',
    phoneNumber: undefined,
    experienceYear: undefined
  };

  constructor(private auth: UserService, public router: Router) {}

register() {
  this.auth.register(this.user).subscribe({
    next: () => {
      alert('Driver registered successfully!');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      // If the server sends an object, convert to readable message
      const msg = err.error?.message || JSON.stringify(err.error) || 'Registration failed';
      alert(msg);
    }
  });
}
}
