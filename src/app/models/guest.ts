import { User } from './user';

export interface Guest extends User {
    comment: string;
}
