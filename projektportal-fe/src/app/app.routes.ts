import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'mailboxLabel',
    pathMatch: 'full',
  },
  
  {
    path: 'mailboxLabel',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/public/pages/public-mailboxLabel/public-mailboxLabel.component').then(
        (m) => m.PublicMailboxLabelComponent
      ),
  },
  {
    path: 'mailboxLabel/detail/:mailboxLabelId',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/public/pages/public-mailboxLabel-detail/public-mailboxLabel-detail.component').then(
        (m) => m.PublicMailboxLabelDetailComponent
      ),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/public/pages/public-users/public-users.component').then(
        (m) => m.PublicUsersComponent
      ),
  },
  {
    path: 'users/detail/:userId',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/public/pages/public-users-detail/public-users-detail.component').then(
        (m) => m.PublicUsersDetailComponent
      ),
  },
  {
    path: 'services',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/public/pages/public-services/public-services.component').then(
        (m) => m.PublicServicesComponent
      ),
  },
  {
    path: 'services/detail/:serviceId',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/public/pages/public-services-detail/public-services-detail.component').then(
        (m) => m.PublicServicesDetailComponent
      ),
  },
  {
    path: 'mailboxOutgoing',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/public/pages/public-mailboxOutgoing/public-mailboxOutgoing.component').then(
        (m) => m.PublicMailboxOutgoingComponent
      ),
  },
  {
    path: 'mailboxOutgoing/detail/:mailboxOutgoingId',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/public/pages/public-mailboxOutgoing-detail/public-mailboxOutgoing-detail.component').then(
        (m) => m.PublicMailboxOutgoingDetailComponent
      ),
  },
  {
    path: 'mailbox',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/public/pages/public-mailbox/public-mailbox.component').then(
        (m) => m.PublicMailboxComponent
      ),
  },
  {
    path: 'mailbox/detail/:mailboxId',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/public/pages/public-mailbox-detail/public-mailbox-detail.component').then(
        (m) => m.PublicMailboxDetailComponent
      ),
  },
  {
    path: 'systemStatus',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/public/pages/public-systemStatus/public-systemStatus.component').then(
        (m) => m.PublicSystemStatusComponent
      ),
  },
  {
    path: 'systemStatus/detail/:systemStatusId',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/public/pages/public-systemStatus-detail/public-systemStatus-detail.component').then(
        (m) => m.PublicSystemStatusDetailComponent
      ),
  },
  {
    path: 'admin/mailboxLabel',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/admin/pages/admin-mailboxLabel/admin-mailboxLabel.component').then(
        (m) => m.AdminMailboxLabelComponent
      ),
  },
  {
    path: 'admin/users',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/admin/pages/admin-users/admin-users.component').then(
        (m) => m.AdminUsersComponent
      ),
  },
  {
    path: 'admin/services',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/admin/pages/admin-services/admin-services.component').then(
        (m) => m.AdminServicesComponent
      ),
  },
  {
    path: 'admin/mailboxOutgoing',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/admin/pages/admin-mailboxOutgoing/admin-mailboxOutgoing.component').then(
        (m) => m.AdminMailboxOutgoingComponent
      ),
  },
  {
    path: 'admin/mailbox',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/admin/pages/admin-mailbox/admin-mailbox.component').then(
        (m) => m.AdminMailboxComponent
      ),
  },
  {
    path: 'admin/systemStatus',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/admin/pages/admin-systemStatus/admin-systemStatus.component').then(
        (m) => m.AdminSystemStatusComponent
      ),
  },
];
