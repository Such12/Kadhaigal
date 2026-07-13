import { useEffect, useState } from 'react'
import KidsBooksHero from '../../../../components/bookstore/KidsBooksHero.jsx'
import KidsCurationPhilosophy from '../../../../components/bookstore/KidsCurationPhilosophy.jsx'
import StaffPicks from '../../../../components/bookstore/StaffPicks.jsx'
import ShopByCategory from '../../../../components/bookstore/ShopByCategory.jsx'
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
      <KidsBooksHero />
      <KidsCurationPhilosophy />
      <section id="kids-staff-picks">
        <StaffPicks books={staffPicks} />
      </section>
      <ShopByCategory
        title="Shop By Category"
        categories={kidsCategories}
        viewAllHref="/bookstore/kids"
      />
      <SubscriptionBox />
      <JoinCommunity />
    </>
  )
}