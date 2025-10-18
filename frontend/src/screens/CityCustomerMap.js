// CityCustomerMap.jsx

import React from 'react';

const cityData = [
  // COORDS (coordinates) remain the same as the last iteration for proper placement
  { city: "San Jose", customers: 150, coords: { top: '38%', left: '18%' } },
  { city: "San Francisco", customers: 144, coords: { top: '33%', left: '15%' } },
  { city: "Indianapolis", customers: 143, coords: { top: '35%', left: '60%' } },
  { city: "Detroit", customers: 135, coords: { top: '30%', left: '65%' } },
  { city: "Tucson", customers: 133, coords: { top: '65%', left: '28%' } },
  { city: "El Paso", customers: 129, coords: { top: '60%', left: '35%' } },
  { city: "Las Vegas", customers: 129, coords: { top: '50%', left: '25%' } },
  { city: "Denver", customers: 129, coords: { top: '45%', left: '42%' } },
  { city: "San Diego", customers: 124, coords: { top: '70%', left: '20%' } },
  { city: "Columbus", customers: 122, coords: { top: '38%', left: '70%' } },
];

const CityCustomerMap = () => {
    // We no longer need maxCustomers for scaling, as we want uniform tiny dots.
    // However, if you wanted to pass the 'color' from cityData, you'd add it back to the data objects.
    // For now, we'll use a fixed red color in the style.

    return (
        <div className="map-container">
            <div className="map-placeholder">
                {cityData.map((data, index) => (
                    <div
                        key={index}
                        className="map-marker"
                        style={{ 
                            top: data.coords.top, 
                            left: data.coords.left, 
                            // Set a fixed smaller size and red background color
                            backgroundColor: '#ef4444', // A standard red color
                            width: '10px', // Tiny size
                            height: '10px', // Tiny size
                        }}
                    >
                        <div className="marker-tooltip">
                            <strong>{data.city}</strong><br />{data.customers} Customers
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CityCustomerMap;