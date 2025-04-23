import React, { useState, useEffect } from 'react';
import DiscreteSliderMarks from '../DiscreteSliderMarks'; // Assume this is a slider component you already have
import { Navbar2 } from '../Navbar2';
import { Vortex } from '../ui/vortex';
import ContactUsForm from '../ContactUsForm';

const ContactUsPage = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'black', paddingTop: '0' }}>
            <Vortex>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginTop: '0', 
                    paddingBottom: '4rem',
                    minHeight: '100vh'
                }}>
                    <div style={{
                        width: '100%',
                        maxWidth: '600px',
                        padding: '40px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                        marginTop: '2rem'
                    }}>
                        <ContactUsForm />
                    </div>
                </div>
            </Vortex>
        </div>
    );
};

export default ContactUsPage;
