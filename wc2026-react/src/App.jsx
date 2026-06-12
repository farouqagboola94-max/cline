import Navbar           from './components/Navbar'
import Hero             from './components/Hero'
import MatchCenter      from './components/MatchCenter'
import GiveawayZone     from './components/GiveawayZone'
import DailyChallenge   from './components/DailyChallenge'
import HotTakes         from './components/HotTakes'
import BanterWall       from './components/BanterWall'
import BlameGame        from './components/BlameGame'
import ShareAndWin      from './components/ShareAndWin'
import PredictionEngine from './components/PredictionEngine'
import Leaderboard      from './components/Leaderboard'
import Footer           from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <MatchCenter />
        <GiveawayZone />
        <DailyChallenge />
        <HotTakes />
        <BanterWall />
        <BlameGame />
        <ShareAndWin />
        <PredictionEngine />
        <Leaderboard />
      </main>
      <Footer />
    </div>
  )
}
