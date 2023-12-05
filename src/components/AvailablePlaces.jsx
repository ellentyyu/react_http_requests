import axios from 'axios';
import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';

export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPlaces = async () => {
            setIsFetching(true);
            try {
                const data = await axios.get('http://localhost:3000/places');

                if (data.status !== 200) {
                    throw new Error('Failed to fetch places')
                }

                navigator.geolocation.getCurrentPosition((position) => {
                    const sortedPlaces = sortPlacesByDistance(data.data.places, position.coords.latitude, position.coords.longitude)
                    setAvailablePlaces(sortedPlaces);
                    setIsFetching(false);
                });                
            } catch(error) {
                setError({ message: error.message || 'Could not fetch places, please try again later.'});
                setIsFetching(false);
            }
        }
        fetchPlaces();
    }, []);

    if (error) {
        return <Error title="An error occurred!" message={error.message} />
    }

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isFetching}
            loadingText="Fetching places data..."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
