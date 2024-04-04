import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/users';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  userService = inject(UserService);
  rouer = inject(Router);
  route = inject(ActivatedRoute);

  user$ = this.route.params.pipe(
    map((params) => params['id']),
    switchMap((id) => {
      if (id) {
        return this.userService.getUser(id);
      } else {
        return [];
      }
    }),
    tap((user) => {
      if (user) {
        this.form.patchValue(user);
      }
    })
  );

  ngOnInit(): void {
    this.user$.subscribe();
  }

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submit() {
    if (this.form.invalid) {
      console.log('Invalid Info');
      return;
    }

    const { name, email } = this.form.value;

    const randomId = String(Math.floor(Math.random() * 1000));

    const user = {
      id: randomId,
      name,
      email,
    } as User;

    this.userService.createUser(user).subscribe((res) => {
      this.rouer.navigate(['/']);
    });
  }
}
