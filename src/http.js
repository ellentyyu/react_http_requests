import axios from 'axios';
export async function fetchAvailablePlaced() {
    const data = await axios.get('http://localhost:3000/places');

    if (data.status !== 200) {
        throw new Error('Failed to fetch places')
    }

    return data.data.places;
}