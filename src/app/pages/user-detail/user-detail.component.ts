import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../models/users';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    JsonPipe,
    RouterLink
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  route = inject(ActivatedRoute);
  UserService = inject(UserService);

  user$: Observable<User> = this.route.params
  .pipe(
    map((params) => params['id']),
    switchMap(id => this.UserService.getUser('id'))
  )

  
  values = from(this.user$)

}
