import { db } from '@/db/dbConfig'

export async function getLeaderBoard() {
  const leaderboardData = await db.query.Leaderboard.findMany();
  if (leaderboardData) {
    return leaderboardData;
  }
  return undefined
}

