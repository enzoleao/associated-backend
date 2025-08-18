export declare class PermissionSeeder {
    private permissions;
    private roles;
    constructor(permissions: {
        name: string;
        resource: string;
        method: string;
    }[], roles: string[]);
    seed(): Promise<void>;
    private assignRolesToPermission;
}
