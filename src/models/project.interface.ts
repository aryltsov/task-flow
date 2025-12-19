import type { Creator } from '@models/creator.ts';

export interface ProjectInterface {
  description: string;
  id: string;
  status: string;
  title: string;
  creator: Creator;
}
