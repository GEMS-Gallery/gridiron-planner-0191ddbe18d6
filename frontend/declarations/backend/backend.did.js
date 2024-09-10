export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Game = IDL.Record({
    'homeTeam' : IDL.Text,
    'date' : Time,
    'week' : IDL.Nat,
    'awayTeam' : IDL.Text,
  });
  const GameResult = IDL.Record({
    'homeTeam' : IDL.Text,
    'week' : IDL.Nat,
    'homeScore' : IDL.Nat,
    'awayTeam' : IDL.Text,
    'awayScore' : IDL.Nat,
  });
  const Team = IDL.Record({
    'name' : IDL.Text,
    'logoUrl' : IDL.Text,
    'abbreviation' : IDL.Text,
  });
  return IDL.Service({
    'addGame' : IDL.Func([IDL.Text, IDL.Text, Time, IDL.Nat], [], []),
    'addScore' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Nat, IDL.Nat],
        [],
        [],
      ),
    'getSchedule' : IDL.Func([IDL.Nat], [IDL.Vec(Game)], ['query']),
    'getScores' : IDL.Func([IDL.Nat], [IDL.Vec(GameResult)], ['query']),
    'getTeams' : IDL.Func([], [IDL.Vec(Team)], ['query']),
    'initialize' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
