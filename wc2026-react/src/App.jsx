import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BanterWall from './components/BanterWall'
import BlameGame from './components/BlameGame'
import PredictionEngine from './components/PredictionEngine'
import Leaderboard from './components/Leaderboard'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <BanterWall />
        <BlameGame />
        <PredictionEngine />
        <Leaderboard />
      </main>
      <Footer />
    </div>
  )
}
