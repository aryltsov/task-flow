import type { Creator } from '@models/creator.ts';

export interface ProjectInterface {
  description: string;
  id: string;
  status: 'active' | 'archived';
  title: string;
  wiki: string;
  creator: Creator;
}
