import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'mailboxLabel',
    pathMatch: 'full',
  },
  
  {
    path: 'mailboxLabel',
    loadComponent: () =>
      import('./modules/public/pages/public-mailboxLabel/public-mailboxLabel.component').then(
        (m) => m.PublicMailboxLabelComponent
      ),
  },
  {
    path: 'mailboxLabel/detail/:mailboxLabelId',
    loadComponent: () =>
      import('./modules/public/pages/public-mailboxLabel-detail/public-mailboxLabel-detail.component').then(
        (m) => m.PublicMailboxLabelDetailComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./modules/public/pages/public-users/public-users.component').then(
        (m) => m.PublicUsersComponent
      ),
  },
  {
    path: 'users/detail/:userId',
    loadComponent: () =>
      import('./modules/public/pages/public-users-detail/public-users-detail.component').then(
        (m) => m.PublicUsersDetailComponent
      ),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./modules/public/pages/public-services/public-services.component').then(
        (m) => m.PublicServicesComponent
      ),
  },
  {
    path: 'services/detail/:serviceId',
    loadComponent: () =>
      import('./modules/public/pages/public-services-detail/public-services-detail.component').then(
        (m) => m.PublicServicesDetailComponent
      ),
  },
  {
    path: 'mailboxOutgoing',
    loadComponent: () =>
      import('./modules/public/pages/public-mailboxOutgoing/public-mailboxOutgoing.component').then(
        (m) => m.PublicMailboxOutgoingComponent
      ),
  },
  {
    path: 'mailboxOutgoing/detail/:mailboxOutgoingId',
    loadComponent: () =>
      import('./modules/public/pages/public-mailboxOutgoing-detail/public-mailboxOutgoing-detail.component').then(
        (m) => m.PublicMailboxOutgoingDetailComponent
      ),
  },
  {
    path: 'mailbox',
    loadComponent: () =>
      import('./modules/public/pages/public-mailbox/public-mailbox.component').then(
        (m) => m.PublicMailboxComponent
      ),
  },
  {
    path: 'mailbox/detail/:mailboxId',
    loadComponent: () =>
      import('./modules/public/pages/public-mailbox-detail/public-mailbox-detail.component').then(
        (m) => m.PublicMailboxDetailComponent
      ),
  },
  {
    path: 'systemStatus',
    loadComponent: () =>
      import('./modules/public/pages/public-systemStatus/public-systemStatus.component').then(
        (m) => m.PublicSystemStatusComponent
      ),
  },
  {
    path: 'systemStatus/detail/:systemStatusId',
    loadComponent: () =>
      import('./modules/public/pages/public-systemStatus-detail/public-systemStatus-detail.component').then(
        (m) => m.PublicSystemStatusDetailComponent
      ),
  },
  {
    path: 'admin/mailboxLabel',
    loadComponent: () =>
      import('./modules/admin/pages/admin-mailboxLabel/admin-mailboxLabel.component').then(
        (m) => m.AdminMailboxLabelComponent
      ),
  },
  {
    path: 'admin/users',
    loadComponent: () =>
      import('./modules/admin/pages/admin-users/admin-users.component').then(
        (m) => m.AdminUsersComponent
      ),
  },
  {
    path: 'admin/services',
    loadComponent: () =>
      import('./modules/admin/pages/admin-services/admin-services.component').then(
        (m) => m.AdminServicesComponent
      ),
  },
  {
    path: 'admin/mailboxOutgoing',
    loadComponent: () =>
      import('./modules/admin/pages/admin-mailboxOutgoing/admin-mailboxOutgoing.component').then(
        (m) => m.AdminMailboxOutgoingComponent
      ),
  },
  {
    path: 'admin/mailbox',
    loadComponent: () =>
      import('./modules/admin/pages/admin-mailbox/admin-mailbox.component').then(
        (m) => m.AdminMailboxComponent
      ),
  },
  {
    path: 'admin/systemStatus',
    loadComponent: () =>
      import('./modules/admin/pages/admin-systemStatus/admin-systemStatus.component').then(
        (m) => m.AdminSystemStatusComponent
      ),
  },
];
