import React from 'react'
import AboutUs from '../AboutUs'
import { Vortex } from '../ui/vortex'

const AboutUsPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black' }}>
      <Vortex>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginTop: '7rem', 
          paddingBottom: '4rem',
          minHeight: '100vh'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '800px',
            padding: '40px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}>
            <AboutUs />
          </div>
        </div>
      </Vortex>
    </div>
  )
}

export default AboutUsPage
