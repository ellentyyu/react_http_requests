import axios from 'axios';
export async function fetchAvailablePlaced() {
    const data = await axios.get('http://localhost:3000/places');

    if (data.status !== 200) {
        throw new Error('Failed to fetch places');
    }

    return data.data.places;
}


export async function updateUserPlaces(places) {
    // 這樣寫是因為後端預期接到的是一個物件裡面有 places 欄位 資料是陣列
    const jsonPlaces = JSON.stringify({ places });
    const data = await axios.put('http://localhost:3000/user-places', jsonPlaces, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (data.status !==200) {
        throw new Error('Failed to update user data');
    }

    return data.data.message;
}