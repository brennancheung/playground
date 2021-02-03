import React from 'react'
import { Timer, mockData } from '../components/Timer'

export const Widgets = () => {
  return (
    <div>
      <Timer segments={mockData.segments} />
    </div>
  )
}
