import { getLeaderBoard } from '@/utils/getLeaderboard';
import { Suspense } from 'react';
import Loading from './loading';
import React from 'react';

export default async function Home() {
  const leaderboard = await getLeaderBoard();

  return (
    <section className="flex flex-col items-center justify-center mt-14 overflow-y-hidden text-white">
      <h1 className="font-extrabold text-5xl mb-8">Top Typers</h1>
      <div className="w-full max-w-screen-md overflow-hidden">
        <Suspense fallback={<Loading />}>
          {leaderboard ? (
            <>
              <div className="grid grid-cols-4 max-md:grid-cols-3 text-gray-300 font-bold text-sm py-2 rounded-t-sm">
                <div className="ml-2">#</div>
                <div className="">Username</div>
                <div className="text-center">WPM</div>
                <div className="text-center max-md:hidden">Date</div>
              </div>
              {leaderboard.map((entry, index) => (
                <div
                  key={index + 1}
                  className={`grid max-md:grid-cols-3 grid-cols-4 ${index % 2 === 0 ? 'bg-[#4F4F4F]' : ''
                    }  py-2 rounded-md`}
                >
                  <div className="ml-2">{index + 1}</div>
                  <div className="">{entry.username}</div>
                  <div className="text-center">{entry.wpm}</div>
                  <div className="text-center max-md:hidden">{entry.date}</div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center text-gray-400 py-4">
              No leaderboard data available.
            </p>
          )}
        </Suspense>
      </div>
    </section>
  );
}

