import { useEffect, useState } from 'react'
import KidsBooksHero from '../../../../components/bookstore/KidsBooksHero.jsx'
import StaffPicks from '../../../../components/bookstore/StaffPicks.jsx' // Reverted to original
import KidsCategories from '../../../../components/bookstore/KidsCategories.jsx'
import SubscriptionBox from '../../../../components/bookstore/SubscriptionBox.jsx'
import KidsJoinCommunity from '../../../../components/bookstore/KidsJoinCommunity.jsx'
import { getStaffPicks } from '../../../../lib/booksStore.js'

export default function KidsBookstorePage() {
  const [staffPicks, setStaffPicks] = useState([])

  useEffect(() => {
    getStaffPicks("Children's Books").then(setStaffPicks)
  }, [])

  return (
    <div className="kids-page min-h-screen relative overflow-x-clip bg-brand-cream">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
        
        .kids-page .font-display {
          font-family: 'Lilita One', cursive !important;
          letter-spacing: 0.03em;
          font-weight: 400 !important;
        }
      `}</style>

      <KidsBooksHero />
      
      <div className="relative z-10 -mt-10">
        <StaffPicks books={staffPicks} />
      </div>

      <KidsCategories />
      <SubscriptionBox />
      <KidsJoinCommunity />
      
    </div>
  )
}