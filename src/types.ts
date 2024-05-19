import { Services as ServicesDb, User } from '@prisma/client';

export interface ServiceWithUser extends ServicesDb {
    user: User;
}