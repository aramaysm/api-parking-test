import { RoleEntity } from './entities/role.entity';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';

const RoleGuard = (roleName: string): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      console.log('Role:', request.user);

      return user?.role.name === roleName;
    }
  }

  return mixin(RoleGuardMixin);
};
export default RoleGuard;
