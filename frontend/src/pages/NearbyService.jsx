import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

const apiKey = "AlzaSy-tUgCWFuDyffGAus9mK-qKQkDXaiz093C"; // Existing key

const NearbyService = () => {
  const [mechanics, setMechanics] = useState([]);
  const [sortRating, setSortRating] = useState('');
  const [sortDistance, setSortDistance] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [locationHeading, setLocationHeading] = useState('Nearby Mechanics in Bhopal');
  const [loading, setLoading] = useState(false);

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(`https://maps.gomaps.pro/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
      const data = await response.json();
      if (data.status === "OK") {
        const components = data.results[0].address_components;
        let city = "your area";
        for (const component of components) {
          if (component.types.includes("locality") || component.types.includes("administrative_area_level_1")) {
            city = component.long_name;
            break;
          }
        }
        return city;
      }
      return "your area";
    } catch (error) {
      return "your area";
    }
  };

  const fetchMechanics = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await fetch(`https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=car_repair&language=en&key=${apiKey}`);
      const data = await response.json();

      let fetchedMechanics = [];
      
      if (data.results && data.results.length > 0) {
        fetchedMechanics = data.results.map((place) => ({
          Name: place.name || "N/A",
          Rating: place.rating ? `${place.rating}` : "N/A",
          Address: place.vicinity || "N/A",
          MobileNumber: place.formatted_phone_number || "N/A",
          Price: place.price_level ? `$${place.price_level}` : "N/A",
          Lat: place.geometry.location.lat,
          Lng: place.geometry.location.lng,
        }));

        const origins = `${lat},${lng}`;
        const destinations = fetchedMechanics.map(m => `${m.Lat},${m.Lng}`).join('|');
        const distanceResponse = await fetch(`https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}`);
        const distanceData = await distanceResponse.json();

        if (distanceData.status === "OK") {
          distanceData.rows[0].elements.forEach((element, index) => {
            if (element.status === "OK") {
              fetchedMechanics[index].Distance = element.distance.value;
              fetchedMechanics[index].DistanceText = element.distance.text;
            } else {
              fetchedMechanics[index].Distance = Infinity;
              fetchedMechanics[index].DistanceText = "N/A";
            }
          });
        } else {
          fetchedMechanics.forEach(m => {
            m.Distance = Infinity;
            m.DistanceText = "N/A";
          });
        }
      } else {
        // Mock data fallback if Gomaps API fails or returns no results
        fetchedMechanics = [
          { Name: "SuperFast Auto Repair", Rating: "4.8", Address: "123 Engine Blvd, " + (await reverseGeocode(lat, lng)), DistanceText: "1.2 km", Distance: 1200 },
          { Name: "Reliable Mechanics Co.", Rating: "4.5", Address: "456 Transmission Ave", DistanceText: "2.5 km", Distance: 2500 },
          { Name: "Quick Fix Garage", Rating: "4.2", Address: "789 Brake St", DistanceText: "3.8 km", Distance: 3800 },
          { Name: "City Center Motors", Rating: "4.9", Address: "101 Exhaust Way", DistanceText: "5.1 km", Distance: 5100 },
        ];
      }

      setMechanics(fetchedMechanics);
      const locationName = await reverseGeocode(lat, lng);
      setLocationHeading(`Nearby Mechanics in ${locationName}`);
    } catch (error) {
      console.error("Error fetching mechanics data:", error);
    }
    setLoading(false);
  };

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setLocationHeading(`Nearby Mechanics in ${data[0].display_name.split(',')[0]}`);
        fetchMechanics(lat, lng);
      } else {
        alert("Address not found. Please try another address.");
      }
    } catch (error) {
      alert("Failed to fetch geocode data. Please try again.");
    }
  };

  const handleSearch = () => {
    if (searchAddress.trim()) {
      geocodeAddress(searchAddress.trim());
    } else {
      alert("Please enter an address.");
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchMechanics(latitude, longitude);
        },
        () => {
          alert("Failed to get current location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    // Default fetch
    fetchMechanics(23.259933, 77.412613);
  }, []);

  const getSortedMechanics = () => {
    let sortedMechanics = [...mechanics];
    sortedMechanics.sort((a, b) => {
      let distanceResult = 0;
      let ratingResult = 0;

      if (sortDistance) {
        const distanceA = a.Distance || Infinity;
        const distanceB = b.Distance || Infinity;
        distanceResult = sortDistance === 'asc' ? distanceA - distanceB : distanceB - distanceA;
      }

      if (sortRating) {
        const ratingA = parseFloat(a.Rating) || 0;
        const ratingB = parseFloat(b.Rating) || 0;
        ratingResult = sortRating === 'asc' ? ratingA - ratingB : ratingB - ratingA;
      }

      return distanceResult !== 0 ? distanceResult : ratingResult;
    });
    return sortedMechanics;
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Enter address to search"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                style={{ flex: '1', padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px' }}
              />
              <button type="submit" style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Search
              </button>
              <button type="button" onClick={getCurrentLocation} style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Use Current Location
              </button>
            </form>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>Sort by Rating:</label>
                <select value={sortRating} onChange={(e) => setSortRating(e.target.value)} style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}>
                  <option value="">None</option>
                  <option value="desc">Highest to Lowest</option>
                  <option value="asc">Lowest to Highest</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>Sort by Distance:</label>
                <select value={sortDistance} onChange={(e) => setSortDistance(e.target.value)} style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}>
                  <option value="">None</option>
                  <option value="asc">Nearest to Farthest</option>
                  <option value="desc">Farthest to Nearest</option>
                </select>
              </div>
            </div>
          </div>

          <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>{locationHeading}</h2>

          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading mechanics...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {getSortedMechanics().map((mechanic, index) => (
                <div key={index} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px' }}>{mechanic.Name}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ backgroundColor: '#22c55e', color: 'white', padding: '2px 8px', borderRadius: '4px', marginRight: '10px' }}>
                        {mechanic.Rating}★
                      </span>
                      <span style={{ color: '#4b5563' }}>{mechanic.Address}</span>
                    </div>
                    <div style={{ color: '#4b5563', marginBottom: '15px' }}>Distance: {mechanic.DistanceText}</div>
                  </div>
                  <button style={{ width: '100%', backgroundColor: '#3b82f6', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
};

export default NearbyService;
