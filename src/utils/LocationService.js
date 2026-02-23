/**
 * LocationService.js
 * Utility for handling geolocation and reverse geocoding.
 * 
 * Uses the browser's Geolocation API for coordinates and
 * OpenStreetMap's Nominatim API for reverse geocoding.
 */

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                let errorMessage = "Unable to retrieve location";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location permission denied";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out";
                        break;
                    default:
                        break;
                }
                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
};

export const getAddressFromCoordinates = async (lat, lng) => {
    try {
        const response = await fetch(
            `https://replateo-com-1.onrender.com/api/reverse-geocode?lat=${lat}&lng=${lng}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch address");
        }

        const data = await response.json();

        if (data && data.display_name) {
            return data.display_name;
        } else {
            throw new Error("Address not found");
        }
    } catch (error) {
        console.error("Reverse geocoding error:", error);
        throw new Error("Could not determine address from location");
    }
};
