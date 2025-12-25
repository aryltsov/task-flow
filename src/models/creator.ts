import type { User } from '@models/user.interface.ts';

export type Creator = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type Assignee = Creator;

// todo remove hardcode, replace with factory
export class CreatorClass implements Creator {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;

  constructor(user: User) {
    this.id = user.uid;
    this.name = 'Ryltsov Anton';
    this.email = user.email;
    this.avatarUrl = 'https://lh3.googleusercontent.com/a/ACg8ocLPgen7KROmMikMXoAa1d-vE00v-tdtPgoYa0BU-I9ukUzy3P7y=s576-c-no';
  }
}
