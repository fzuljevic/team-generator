"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PlayerAttributes = {
  name: string;
  rating: number;
};

type SelectedPlayers = {
  [division: number]: {
    player1: string;
    player1Attributes?: PlayerAttributes;
    player2: string;
    player2Attributes?: PlayerAttributes;
  };
};

type Team = {
  name: string;
  players: PlayerAttributes[];
  totalRating: number;
};

export default function ShuffleTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [allPlayers, setAllPlayers] = useState<string[]>([
    "Filip",
    "Blekic",
    "Ciko",
    "Toni",
    "Butko",
    "Milos",
    "Rafi",
    "Ljubo",
    "Matija",
    "Sila",
    "Ivo",
    "Sanko",
    "Celic",
  ]);

  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayers>({
    1: { player1: "", player2: "" },
    2: { player1: "", player2: "" },
    3: { player1: "", player2: "" },
    4: { player1: "", player2: "" },
    5: { player1: "", player2: "" },
  });

  const [playerAttributes, setPlayerAttributes] = useState<{
    [playerName: string]: PlayerAttributes;
  }>({});

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayer.trim() && !allPlayers.includes(newPlayer.trim())) {
      setAllPlayers([...allPlayers, newPlayer.trim()]);
      setNewPlayer("");
    }
  };

  const handlePlayerSelect = (
    division: number,
    dropdownNumber: "player1" | "player2",
    playerName: string
  ) => {
    setSelectedPlayers((prev) => ({
      ...prev,
      [division]: {
        ...prev[division],
        [dropdownNumber]: playerName,
      },
    }));
  };

  const isPlayerSelected = (playerName: string): boolean => {
    return Object.values(selectedPlayers).some(
      (division) =>
        division.player1 === playerName || division.player2 === playerName
    );
  };

  const isAllPlayersSelected = () => {
    return Object.values(selectedPlayers).every(
      (division) => division.player1 && division.player2
    );
  };

  const handleAttributeChange = (
    division: number,
    playerKey: "player1" | "player2",
    value: string
  ) => {
    const playerName = selectedPlayers[division][playerKey];
    if (!playerName) return;

    const numValue = Math.min(Math.max(parseInt(value) || 0, 1), 10);
    setPlayerAttributes((prev) => ({
      ...prev,
      [playerName]: {
        name: playerName,
        rating: numValue,
      },
    }));
  };

  const calculateTeamRating = (players: PlayerAttributes[]) => {
    return players.reduce((sum, player) => sum + player.rating, 0);
  };

  const shuffleTeams = () => {
    const team1: PlayerAttributes[] = [];
    const team2: PlayerAttributes[] = [];

    // Get all players with their ratings and sort
    const playersWithRatings = Object.entries(selectedPlayers)
      .flatMap(([, players]) => {
        const player1 = {
          ...(playerAttributes[players.player1] || {
            name: players.player1,
            rating: 5,
          }),
        };
        const player2 = {
          ...(playerAttributes[players.player2] || {
            name: players.player2,
            rating: 5,
          }),
        };
        return [player1, player2];
      })
      .sort((a, b) => b.rating - a.rating);

    // Distribute players to balance teams
    playersWithRatings.forEach((player) => {
      const team1Rating = calculateTeamRating(team1);
      const team2Rating = calculateTeamRating(team2);

      if (team1Rating <= team2Rating) {
        team1.push(player);
      } else {
        team2.push(player);
      }
    });

    setTeams([
      {
        name: "Team Red",
        players: team1,
        totalRating: calculateTeamRating(team1),
      },
      {
        name: "Team Blue",
        players: team2,
        totalRating: calculateTeamRating(team2),
      },
    ]);
  };

  const AttributeInputs = ({
    division,
    playerKey,
  }: {
    division: number;
    playerKey: "player1" | "player2";
  }) => {
    const playerName = selectedPlayers[division][playerKey];
    if (!playerName) return null;

    const attributes = playerAttributes[playerName] || {
      rating: 5,
    };

    return (
      <div className="mt-2 space-y-2 p-2 bg-gray-100 rounded-lg">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="10"
            value={attributes.rating}
            onChange={(e) =>
              handleAttributeChange(division, playerKey, e.target.value)
            }
            className="flex-1"
          />
          <span className="text-sm font-medium w-8 text-center">
            {attributes.rating}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl max-w-7xl mx-auto p-3 sm:p-4 md:p-8">
        {/* Hero Section */}
        <div className="mb-4 sm:mb-8 md:mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#00447c]">
            Team Generator (Blekic 2.0 🤖)
          </h1>
        </div>

        {/* Add Player Form */}
        <div className="mb-8">
          <form onSubmit={handleAddPlayer} className="flex gap-2">
            <input
              type="text"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              placeholder="Enter player name"
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#00447c] focus:border-[#00447c] outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#00447c] text-white rounded-lg hover:bg-[#003366] transition-colors"
            >
              Add Player
            </button>
          </form>
        </div>

        {/* Player List */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#00447c]">
            Available Players
          </h2>
          <div className="flex flex-wrap gap-2">
            {allPlayers.map((player) => (
              <span
                key={player}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {player}
              </span>
            ))}
          </div>
        </div>

        {/* Division Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3 md:gap-6 mb-4 sm:mb-8 md:mb-16">
          {[1, 2, 3, 4, 5].map((divisionNumber) => (
            <div key={divisionNumber} className="relative">
              <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-6 text-[#00447c]">
                  Division {divisionNumber}
                </h2>
                <div className="space-y-2">
                  <Select
                    value={selectedPlayers[divisionNumber].player1}
                    onValueChange={(value) =>
                      handlePlayerSelect(divisionNumber, "player1", value)
                    }
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select Player 1" />
                    </SelectTrigger>
                    <SelectContent>
                      {allPlayers.map((player) => (
                        <SelectItem
                          key={player}
                          value={player}
                          disabled={
                            isPlayerSelected(player) &&
                            selectedPlayers[divisionNumber].player1 !== player
                          }
                          className="cursor-pointer"
                        >
                          {player}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedPlayers[divisionNumber].player1 && (
                    <AttributeInputs
                      division={divisionNumber}
                      playerKey="player1"
                    />
                  )}

                  <Select
                    value={selectedPlayers[divisionNumber].player2}
                    onValueChange={(value) =>
                      handlePlayerSelect(divisionNumber, "player2", value)
                    }
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select Player 2" />
                    </SelectTrigger>
                    <SelectContent>
                      {allPlayers.map((player) => (
                        <SelectItem
                          key={player}
                          value={player}
                          disabled={
                            isPlayerSelected(player) &&
                            selectedPlayers[divisionNumber].player2 !== player
                          }
                          className="cursor-pointer"
                        >
                          {player}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedPlayers[divisionNumber].player2 && (
                    <AttributeInputs
                      division={divisionNumber}
                      playerKey="player2"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Generate Button */}
        <button
          onClick={shuffleTeams}
          disabled={!isAllPlayersSelected()}
          className={`
            w-full py-2 sm:py-3 md:py-4 rounded-lg font-bold text-base sm:text-lg md:text-xl
            transition-all duration-300
            ${
              isAllPlayersSelected()
                ? "bg-[#00447c] text-white hover:bg-[#003366] shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {isAllPlayersSelected() ? "Generate Teams" : "Select all players"}
        </button>

        {/* Results Section */}
        {teams.length > 0 && (
          <div className="mt-4 sm:mt-8 md:mt-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-[#00447c]">
              Generated Teams
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-8 max-w-4xl mx-auto">
              {teams.map((team, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-[#00447c]">
                    {team.name}
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                    {team.players.map((player, playerIndex) => (
                      <li
                        key={playerIndex}
                        className="flex justify-between items-center border-b border-gray-100 pb-2"
                      >
                        <span className="font-medium">{player.name}</span>
                        <span className="text-sm text-gray-500">
                          Rating: {player.rating}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Team Rating: {team.totalRating.toFixed(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
