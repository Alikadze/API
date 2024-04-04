import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'create',
    component: UserCreateComponent
  },
  {
    path: 'create/:id',
    component: UserCreateComponent
  },
  {
    path: 'view/:id',
    component: UserDetailComponent
  }
];
