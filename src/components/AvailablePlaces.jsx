import axios from 'axios';
import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        const fetchPlaces = async () => {
            const { data } = await axios.get('http://localhost:3000/places');
            setAvailablePlaces(data.places);
            setIsFetching(false);
        }
        fetchPlaces();
    }, []);

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
