import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";

actor {
  type Team = {
    name: Text;
    abbreviation: Text;
    logoUrl: Text;
  };

  type Game = {
    homeTeam: Text;
    awayTeam: Text;
    date: Time.Time;
    week: Nat;
  };

  type GameResult = {
    homeTeam: Text;
    awayTeam: Text;
    homeScore: Nat;
    awayScore: Nat;
    week: Nat;
  };

  stable var teams : [Team] = [];
  stable var schedule : [Game] = [];
  stable var scores : [GameResult] = [];

  // Initialize some sample data
  public func initialize() : async () {
    teams := [
      { name = "New England Patriots"; abbreviation = "NE"; logoUrl = "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png" },
      { name = "Buffalo Bills"; abbreviation = "BUF"; logoUrl = "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png" },
      { name = "Miami Dolphins"; abbreviation = "MIA"; logoUrl = "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png" },
      { name = "New York Jets"; abbreviation = "NYJ"; logoUrl = "https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png" }
    ];

    schedule := [
      {
        homeTeam = "Buffalo Bills";
        awayTeam = "New York Jets";
        date = Time.now();
        week = 1;
      },
      {
        homeTeam = "Miami Dolphins";
        awayTeam = "New England Patriots";
        date = Time.now() + 86400_000_000_000; // Add one day in nanoseconds
        week = 1;
      }
    ];

    scores := [
      {
        homeTeam = "Buffalo Bills";
        awayTeam = "New York Jets";
        homeScore = 24;
        awayScore = 17;
        week = 1;
      }
    ];
  };

  public query func getTeams() : async [Team] {
    teams
  };

  public query func getSchedule(week: Nat) : async [Game] {
    Array.filter(schedule, func (game: Game) : Bool { game.week == week })
  };

  public query func getScores(week: Nat) : async [GameResult] {
    Array.filter(scores, func (result: GameResult) : Bool { result.week == week })
  };

  // Helper function to add a new game to the schedule
  public func addGame(homeTeam: Text, awayTeam: Text, date: Time.Time, week: Nat) : async () {
    let newGame : Game = {
      homeTeam = homeTeam;
      awayTeam = awayTeam;
      date = date;
      week = week;
    };
    schedule := Array.append(schedule, [newGame]);
  };

  // Helper function to add a new score
  public func addScore(homeTeam: Text, awayTeam: Text, homeScore: Nat, awayScore: Nat, week: Nat) : async () {
    let newScore : GameResult = {
      homeTeam = homeTeam;
      awayTeam = awayTeam;
      homeScore = homeScore;
      awayScore = awayScore;
      week = week;
    };
    scores := Array.append(scores, [newScore]);
  };
}
