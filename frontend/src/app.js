import { backend } from 'declarations/backend';

const weekSelector = document.getElementById('week');
const gamesList = document.getElementById('games-list');
const teamsList = document.getElementById('teams-list');
const loader = document.getElementById('loader');

async function init() {
    await backend.initialize();
    await loadTeams();
    await loadGames();
    weekSelector.addEventListener('change', loadGames);
}

async function loadTeams() {
    showLoader();
    try {
        const teams = await backend.getTeams();
        teamsList.innerHTML = teams.map(team => `
            <div class="team-card">
                <img src="${team.logoUrl}" alt="${team.name} logo" class="team-logo">
                <div>
                    <h3>${team.name}</h3>
                    <p>Abbreviation: ${team.abbreviation}</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading teams:', error);
    }
    hideLoader();
}

async function loadGames() {
    showLoader();
    const selectedWeek = Number(weekSelector.value);
    try {
        const [schedule, scores, teams] = await Promise.all([
            backend.getSchedule(selectedWeek),
            backend.getScores(selectedWeek),
            backend.getTeams()
        ]);

        const teamMap = new Map(teams.map(team => [team.name, team]));

        gamesList.innerHTML = schedule.map(game => {
            const score = scores.find(s => s.homeTeam === game.homeTeam && s.awayTeam === game.awayTeam);
            const homeTeam = teamMap.get(game.homeTeam);
            const awayTeam = teamMap.get(game.awayTeam);
            return `
                <div class="game-card">
                    <img src="${awayTeam.logoUrl}" alt="${awayTeam.name} logo" class="team-logo">
                    <div>
                        <h3>${game.awayTeam} @ ${game.homeTeam}</h3>
                        <p>Date: ${new Date(Number(game.date) / 1000000).toLocaleString()}</p>
                        ${score ? `
                            <p>Final Score:</p>
                            <p>${score.awayTeam}: ${score.awayScore}</p>
                            <p>${score.homeTeam}: ${score.homeScore}</p>
                        ` : '<p>Score not available</p>'}
                    </div>
                    <img src="${homeTeam.logoUrl}" alt="${homeTeam.name} logo" class="team-logo">
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading games:', error);
    }
    hideLoader();
}

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

init();
