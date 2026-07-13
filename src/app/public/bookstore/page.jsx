import { useEffect, useState } from 'react'
import BooksHero from '../../../components/bookstore/BooksHero.jsx'
import CurationPhilosophy from '../../../components/bookstore/CurationPhilosophy.jsx'
import StaffPicks from '../../../components/bookstore/StaffPicks.jsx'
import ShopByCategory from '../../../components/bookstore/ShopByCategory.jsx'
import ChildrensCorner from '../../../components/bookstore/ChildrensCorner.jsx'
import JoinCommunity from '../../../components/home/JoinCommunity.jsx'
import { getStaffPicks } from '../../../lib/booksStore.js'
import { categories } from '../../../data/categories.js'

export default function BookstorePage() {
  const [staffPicks, setStaffPicks] = useState([])

  useEffect(() => {
    getStaffPicks().then(setStaffPicks)
  }, [])

  return (
    <>
      <BooksHero />
      <CurationPhilosophy />
      <StaffPicks books={staffPicks} />
      <ShopByCategory categories={categories} />
      <ChildrensCorner />
      <JoinCommunity />
    </>
  )
}