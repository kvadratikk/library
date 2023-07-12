import { Statuses } from '../constants/statuses';

export type Loading = Statuses.IDLE | Statuses.PENDING | Statuses.SUCCEDED | Statuses.FAILED;

export type Code = number | null;
