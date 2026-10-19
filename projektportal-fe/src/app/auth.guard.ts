import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  { authenticated, grantedRoles, keycloak }: AuthGuardData
): Promise<boolean | UrlTree> => {
  if (!authenticated) {
    await keycloak.login({
      redirectUri: window.location.origin + state.url,
    });
    return false;
  }

  const requiredRoles = route.data['roles'] as string[] | undefined;
  if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
    return true;
  }

  const allRoles = [
    ...grantedRoles.realmRoles,
    ...Object.values(grantedRoles.resourceRoles).flat(),
  ];
  return requiredRoles.every(role => allRoles.includes(role));
};

export const AuthGuard = createAuthGuard<CanActivateFn>(isAccessAllowed);
