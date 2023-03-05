import React from 'react'
import loading from './loading.gif'

export default function Loading() {
  return (
    // <div className='container' style={{height : '100px', width : '100px'}}>
      <img className='container'  src={loading} alt="loading" />
    // </div>
  )
}
