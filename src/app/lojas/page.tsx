"use client"
import { useDateStore } from '@/store/use-date-store'

export default function Lojas() {
  const singleFilter = useDateStore((state) => state.dates['filter-single'])
  const rangeFilter = useDateStore((state) => state.dates['filter-range'])

  return (
    <div>
      <div>{JSON.stringify(singleFilter)}</div>
      <div>{JSON.stringify(rangeFilter)}</div>
    </div>
  )
}
function getStorageKey() {
  throw new Error('Function not implemented.');
}

