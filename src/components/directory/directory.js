import React from 'react'
import Categories from '../categories/categories'
import './directory.scss'

export const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <Categories key={category.id} category={category} />
      ))}
    </div>
  )
}

export default Directory;