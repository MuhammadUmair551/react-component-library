import React from 'react'
import { Card } from './components/Phase2/Card/Card'

function App() {
  return (
    <div className='p-8'>
      <Card variant="filled">
        <Card.Body>
          <Card.Text>Total Revenue</Card.Text>
          <Card.Title size="lg">$48,295</Card.Title>
          <span>↑ 12% this month</span>
        </Card.Body>
      </Card>
    </div>
  )
}

export default App
