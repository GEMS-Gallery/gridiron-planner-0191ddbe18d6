import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Game {
  'homeTeam' : string,
  'date' : Time,
  'week' : bigint,
  'awayTeam' : string,
}
export interface GameResult {
  'homeTeam' : string,
  'week' : bigint,
  'homeScore' : bigint,
  'awayTeam' : string,
  'awayScore' : bigint,
}
export interface Team {
  'name' : string,
  'logoUrl' : string,
  'abbreviation' : string,
}
export type Time = bigint;
export interface _SERVICE {
  'addGame' : ActorMethod<[string, string, Time, bigint], undefined>,
  'addScore' : ActorMethod<[string, string, bigint, bigint, bigint], undefined>,
  'getSchedule' : ActorMethod<[bigint], Array<Game>>,
  'getScores' : ActorMethod<[bigint], Array<GameResult>>,
  'getTeams' : ActorMethod<[], Array<Team>>,
  'initialize' : ActorMethod<[], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
