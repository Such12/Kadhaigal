import { useEffect, useState } from 'react'
import KidsBooksHero from '../../../../components/bookstore/KidsBooksHero.jsx'
import KidsCurationPhilosophy from '../../../../components/bookstore/KidsCurationPhilosophy.jsx'
import BookstoreNavbar from '../../../../components/bookstore/BookstoreNavbar.jsx'
import StaffPicks from '../../../../components/bookstore/StaffPicks.jsx'
import KidsCategories from '../../../../components/bookstore/KidsCategories.jsx'
import SubscriptionBox from '../../../../components/bookstore/SubscriptionBox.jsx'
import JoinCommunity from '../../../../components/home/JoinCommunity.jsx'
import { getStaffPicks } from '../../../../lib/booksStore.js'
import { kidsCategories } from '../../../../data/kidsCategories.js'

export default function KidsBookstorePage() {
  const [staffPicks, setStaffPicks] = useState([])

  useEffect(() => {
    getStaffPicks("Children's Books").then(setStaffPicks)
  }, [])

  return (
    <>
      <BookstoreNavbar />
      <KidsBooksHero />
      <KidsCurationPhilosophy />
      <section id="kids-staff-picks">
        <StaffPicks books={staffPicks} />
      </section>
      <KidsCategories />
      <SubscriptionBox />
      <JoinCommunity />
    </>
  )
}