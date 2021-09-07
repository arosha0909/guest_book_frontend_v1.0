import { Permission } from '../common/permission';
import { Role } from '../common/role';

export interface User{
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role?: Role;
    permissions?: Permission[];
    status?: boolean;
    lastLogin?: Date;
    isActive?: boolean;
    photo?: string;
}