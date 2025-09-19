import { Permission, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PermissionSeeder {
  private permissions: { name: string; resource_name: string; method: string }[];
  private roles: string[];

  constructor(
    permissions: { name: string; resource_name: string; method: string }[],
    roles: string[],
  ) {
    this.permissions = permissions;
    this.roles = roles;
  }

  async seed() {
    try {
      console.log('Starting permission seeder...');
      for (const permission of this.permissions) {
        let existingPermission = await prisma.permission.findFirst({
          where: {
            method: permission.method,
            name: permission.name,
          },
        });

        if (!existingPermission) {
          const resource = await prisma.resource.findUnique({
            where: { name: permission.resource_name },
          });

          if (!resource) {
            console.warn(`\x1b[33mResource "${permission.resource_name}" not found. Skipping permission "${permission.name}".\x1b[0m`);
            continue;
}
          existingPermission = await prisma.permission.create({
            data: {
              name: permission.name,
              resource_id:  resource.id,
              method: permission.method,
            },
          });
          console.log(
            `\x1b[32mPermission created: ${existingPermission.name}\x1b[0m`,
          );
        } else {
          console.log(
            `\x1b[33mPermission already exists: ${existingPermission.name}\x1b[0m`,
          );
        }

        await this.assignRolesToPermission(existingPermission);
      }

      console.log('\x1b[32mSeeder completed successfully!\x1b[0m');
    } catch (error) {
      console.error('Error while running the seeder:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  private async assignRolesToPermission(permission: Permission) {
    for (const roleName of this.roles) {
      const role = await prisma.role.findFirst({
        where: { name: roleName },
      });

      if (role) {
        await prisma.rolesHasPermissions.upsert({
          where: {
            permission_id_role_id: {
              role_id: role.id,
              permission_id: permission.id,
            },
          },
          update: {},
          create: {
            role_id: role.id,
            permission_id: permission.id,
          },
        });
        console.log(
          `\x1b[32mPermission "${permission.name}" associated with role: ${role.name}\x1b[0m`,
        );
      } else {
        console.warn(`\x1b[33mRole "${roleName}" not found.\x1b[0m`);
      }
    }
  }
}
