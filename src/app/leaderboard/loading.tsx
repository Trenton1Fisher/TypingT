import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
  return (
    <section className="flex flex-col items-center justify-center mt-14 overflow-y-hidden text-white">
      <h1 className="font-extrabold text-5xl mb-8">Top Typers</h1>
      <div className="w-full max-w-screen-md overflow-hidden">
        <div className="grid grid-cols-3 text-gray-300 font-bold text-sm py-2 rounded-t-sm">
          <div className="ml-2">#</div>
          <div className="">Username</div>
          <div className="">WPM</div>
        </div>
        <Skeleton count={10} className=' mt-1' height={45} highlightColor='#646669' baseColor='#4F4F4F' />
      </div>
    </section>
  )
}
