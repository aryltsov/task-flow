import { getTasksByStatus } from './tasks';
import { BOARD_SECTIONS } from '../constants/board-section.const.ts';
import type { BoardSections, Status, Task } from './types.ts';

export const initializeBoard = (tasks: Task[]) => {
  const boardSections: BoardSections = {};

  Object.keys(BOARD_SECTIONS).forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getTasksByStatus(tasks, boardSectionKey as Status);
  });

  return boardSections;
};

export const findBoardSectionContainer = (boardSections: BoardSections, id: string) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) => boardSections[key].find((item) => item.id === id));
  return container;
};
