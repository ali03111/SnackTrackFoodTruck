import {
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import ImageCropPicker from 'react-native-image-crop-picker';
// import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { MapAPIKey } from '../Utils/Urls';
import { store } from '../Redux/Reducer';
import { femaleImg, maleImg } from '../Assets';
// import Intl from 'intl';

const getSingleCharacter = text => {
  let letter = text?.charAt(0).toUpperCase();
  return letter;
};

const reqPer = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
  );
  return granted;
};

const checkPer = async () => {
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      // ||
      // PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION ||
      // PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
    console.log('grantedgrantedgrantedgrantedgrantedgrantedgranted', granted);
    return granted == PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Permission check failed:', err);
    return false;
  }
};

// const getProperLocation = () => {
//   Geolocation.setRNConfiguration({
//     config: {
//       skipPermissionRequests: false,
//       authorizationLevel: 'always' | 'whenInUse' | 'auto',
//       enableBackgroundLocationUpdates: true,
//       locationProvider: 'playServices' | 'android' | 'auto',
//     },
//   });

// return new Promise(async (resolve, reject) => {
//   try {
//     // Function to get current position and location name
//     const getCurrentPosition = async geolocationFunction => {
//       return new Promise((resolve, reject) => {
//         geolocationFunction(
//           async info => {
//             const locationName = await getLocationName(
//               info.coords.latitude,
//               info.coords.longitude,
//             );
//             resolve({
//               coords: {
//                 lat: info.coords.latitude,
//                 long: info.coords.longitude,
//               },
//               description: locationName || 'Unknown location',
//               ok: true,
//             });
//           },
//           error => {
//             errorMessage('Please enable your mobile location');
//             reject({error, ok: false});
//           },
//           {enableHighAccuracy: true, accuracy: true},
//         );
//       });
//     };

//       // Request permission for Android
//       if (Platform.OS === 'android') {
//         const granted = await reqPer();
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           return Alert.alert(
//             'Warning',
//             'Location permission have been denied. Please enable location permission from settings.',
//             [
//               {text: 'Cancel', onPress: () => null, style: 'cancel'},
//               {
//                 text: 'Open Setting',
//                 onPress: () => {
//                   openSettings().catch(() =>
//                     console.warn('Cannot open settings'),
//                   );
//                 },
//               },
//             ],
//             {userInterfaceStyle: 'light'},
//           );
//         }
//       }

//       // Get location based on platform
//       const position = await (Platform.OS === 'android'
//         ? getCurrentPosition(Geolocation.getCurrentPosition)
//         : getCurrentPosition(Geolocationios.getCurrentPosition));

//       resolve(position);
//     } catch (error) {
//       console.error('Error getting location:', error);
//       store.dispatch(loadingFalse());
//       reject(error);
//     }
//   });
// };

// Function to check location permission
const checkLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    return permissionStatus === RESULTS.GRANTED;
  } else {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted;
  }
};

// Function to request location permission
const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const permissionStatus = await request(
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    );
    return permissionStatus === RESULTS.GRANTED;
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
};

// Function to get current location
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async position => {
        const locationName = await getLocationName(
          position.coords.latitude,
          position.coords.longitude,
        );
        resolve({
          coords: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          },
          description: locationName || 'Unknown location',
          ok: true,
        });
      },
      error => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });
};

const getProperLocation = async () => {
  const hasPermission = await checkLocationPermission();
  if (hasPermission) {
    const position = await getCurrentLocation();
    return { location: position, ok: true };
  } else {
    const permissionGranted = await requestLocationPermission();
    if (permissionGranted) {
      const position = await getCurrentLocation();
      return position;
    } else {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to use this feature',
        [{ text: 'OK' }],
      );
      return { location: {}, ok: false };
    }
  }
};

const getLocationName = async (latitude, longitude) => {
  console.log('third');

  const geocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MapAPIKey}`;

  // Replace "YOUR_API_KEY" with your actual Google Maps Geocoding API key

  const res = await fetch(geocodingAPI);
  const response = await res.json();
  if (response.results.length > 0) {
    const locationName = response.results[0].formatted_address;
    return locationName;
  }
};

function extractTimeFromString(str) {
  const timeRegex = /(\d{1,2}:\d{2}\s*[AP]M)/i; // Regular expression to match time in format "hh:mm AM/PM"
  const match = str.match(timeRegex);

  if (match) {
    return match[1]; // Extracting the matched time
  } else {
    return '';
  }
}

function removeTimeFromDate(datetimeStr) {
  // input value ""2024-03-12T08:00:15.000000Z""
  // output value "2024-03-12"

  const dateInString = datetimeStr.toISOString();

  // Split the string at 'T' and take the first part (the date)
  const datePart = dateInString.split('T')[0];
  return datePart;
}

function getDateMonthYear(dateString) {
  if (dateString) {
    // Create a Date object from the provided global date string
    const globalDate = new Date(dateString);

    // Check if the date is valid
    if (isNaN(globalDate)) {
      throw new Error(
        'Invalid date format. Please provide a valid date string.',
      );
    }

    // Format the local date parts
    const options = {
      weekday: 'short', // Day name (e.g., "Mon")
      year: 'numeric', // Year (e.g., "2024")
      month: 'short', // Month name (e.g., "Nov")
      day: '2-digit', // Day of the month (e.g., "25")
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Local time zone
    };

    // Use Intl.DateTimeFormat to extract formatted date parts
    const formatter = new Intl.DateTimeFormat(undefined, options);
    const parts = formatter.formatToParts(globalDate);

    // Extract the needed parts
    const dayName = parts.find(part => part.type === 'weekday')?.value;
    const day = parts.find(part => part.type === 'day')?.value;
    const monthName = parts.find(part => part.type === 'month')?.value;
    const year = parts.find(part => part.type === 'year')?.value;

    return {
      dayName, // Day of the week (e.g., "Mon")
      day: Number(day) + 1, // Day of the month (e.g., "25")
      monthName, // Month name (e.g., "Nov")
      year, // Year (e.g., "2024")
    };
  }
}

function convertToLocalTime(globalTimeString) {
  if (globalTimeString) {
    // Parse the input global time string into a Date object
    const globalDate = new Date(globalTimeString);

    // Check if the date is valid
    if (isNaN(globalDate)) {
      throw new Error(
        'Invalid date format. Please provide a valid date string.',
      );
    }

    // Format the date to local time with hours and minutes
    const options = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true, // Use 12-hour format
    };

    // Use Intl.DateTimeFormat to format the time
    const localTimeFormatter = new Intl.DateTimeFormat(undefined, options);
    const formattedTime = localTimeFormatter.format(globalDate);

    // Split the formatted time into time and period (e.g., "12:53 PM")
    const [time, period] = formattedTime.split(' ');

    return {
      time, // Time without period (e.g., "12:53")
      period, // Period (e.g., "AM" or "PM")
    };
  }
}

const openGoogleMaps = (latitude, longitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  Linking.openURL(url);
};

const fetchRailwayCrossingAPI = async (lat, long) => {
  const apiKey = MapAPIKey;
  const locations = `${lat},${long}`;
  const radius = '10'; // Radius in meters (adjust as needed)
  const query = 'railway crossing -station'; // Search for railway crossings and exclude stations
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query,
  )}&location=${locations}&radius=${radius}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    // Filter out any results that contain "station" in their name
    const filteredResults = results.filter(
      place => !place.name.toLowerCase().includes('station'),
    );
    const places = filteredResults.map(place => ({
      id: place.place_id,
      name: place.name,
      location: {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      },
    }));
    return { ok: true, data: places };
    // setCrossings(places);
  } catch (error) {
    console.log('Error fetching railway crossings:', error);
    return { ok: false, data: error };
  }
};

function getValBeforePoint(value) {
  //    input = 353.68558
  //    output = 353

  // Convert the string to a number
  const number = parseFloat(value);

  // Return the integer part before the decimal point
  return Math.floor(number);
}

/**
 * Calculates the distance between two geographic coordinates using the Haversine formula.
 * @param {number} lat1 - Latitude of the first point.
 * @param {number} lon1 - Longitude of the first point.
 * @param {number} lat2 - Latitude of the second point.
 * @param {number} lon2 - Longitude of the second point.
 * @returns {number} Distance between the two points in kilometers.
 */
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers

  // Helper function to convert degrees to radians
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return distance.toFixed(2); // Return distance rounded to two decimal places
}

/**
 * Converts degrees to radians.
 * @param {number} deg - Value in degrees.
 * @returns {number} Value in radians.
 */
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Calculates the distance between the current location and each location in an array.
 * @param {Object} currentLocation - Current location object with 'lat' and 'lon' properties.
 * @param {Array} locations - Array of location objects, each with 'lat' and 'lon' properties.
 * @returns {Array} Array of distances from the current location to each location in the array in kilometers.
 */
function getDistancesBetweenLocationsArry(currentLocation, locations) {
  // console.log(
  //   'skldbvklsdblkvbsdlkbvlksdvlkbsdvlksdbvklsdbvksdl',
  //   currentLocation,
  // );
  return locations.map(res => {
    return {
      id: res?.id,
      km: getDistanceFromLatLonInKm(
        currentLocation?.lat,
        currentLocation?.long,
        res?.location?.latitude,
        res?.location?.longitude,
      ),
    };
  });
}

const matchTwoArrays = (matchFrom, matchTheArry, needToGetId) => {
  let matchFromArry = [...matchFrom];
  // Create a Set of nutrition IDs for faster lookup
  let nutritionIds = needToGetId
    ? new Set(matchTheArry.map(matchTheArry => matchTheArry.id))
    : matchTheArry;

  // Match nutritions with ingredients
  matchFromArry.forEach(matchFrom => {
    if (nutritionIds.has(matchFrom.id)) {
      matchFrom.match = true;
    } else {
      matchFrom.match = false;
    }
  });
  return matchFromArry;
};

const matchIDinTwoArry = (data, ids) => {
  return data.filter(item => ids.includes(item.id));
};

/**
 * The function `filterKeyFromArry` filters an array of objects based on a specified key.
 * @param arry - An array of objects.
 * @param key - The `key` parameter in the `filterKeyFromArry` function is used to specify the key that
 * you want to filter the array of objects by. This key will be used to access a specific property in
 * each object within the array for filtering.
 * @returns The `filterKeyFromArry` function takes an array `arry` and a key `key`, and filters the
 * array based on the truthiness of the value at the specified key in each element. The function
 * returns a new array containing only the elements where the value at the specified key is truthy.
 */
const filterKeyFromArry = (arry, key) => {
  return arry.filter(res => res[key])[0];
};

/**
 * The AMPMLayout function checks if the given time is between 6 AM and 6 PM.
 * @returns a boolean value. It returns true if the hours of the given time parameter are between 6
 * (inclusive) and 19 (exclusive), indicating that it is daytime. Otherwise, it returns false,
 * indicating that it is nighttime.
 */
const AMPMLayout = (onDay, onNight) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  if (hours >= 6 && hours < 19) return onDay ?? true;
  else return onNight ?? false;
};

/**
 * The function `removeSpacesBetweenWords` removes spaces from a given input string.
 * @param input - The `removeSpacesBetweenWords` function takes a string `input` as a parameter. It
 * checks if the input contains any spaces. If spaces are found, it removes all spaces from the input
 * string and returns the modified string. If no spaces are found, it simply returns the input string
 * as it
 * @returns The `removeSpacesBetweenWords` function removes spaces between words in the input string
 * and returns the modified string without spaces. If the input does not contain any spaces, it returns
 * the input string as it is.
 */
function removeSpacesBetweenWords(name) {
  // Check if the name contains a space
  if (name && name.includes(' ')) {
    // Split the name into words
    let words = name.split(' ');

    // Capitalize the first letter of the second word
    words[1] = words[1].charAt(0).toUpperCase() + words[1].slice(1);

    // Join the words back together without the space
    return words.join('');
  } else {
    // If there's no space, return the name as it is
    return name;
  }
}

// Function to get object by ID
function getObjectById(data, id) {
  return data.find(obj => obj.id === id);
}

function generateUniqueId() {
  const timestamp = Date.now(); // Get the current timestamp
  const randomNum = Math.random().toString(36).substr(2, 9); // Generate a random string
  return `${timestamp}${randomNum}`;
}

function updateArryObjById(data, id, newObject) {
  // Create a copy of the data array
  let newArry = [...data];

  // Find the index of the object with the specified id
  let index = newArry.findIndex(obj => obj.id === id);

  // If the object is found, update it with the new object
  if (index !== -1) {
    newArry[index] = newObject;
  }

  // Return the updated array
  return newArry;
}

const getIdsFromArry = (arry, key) => {
  return arry.map(res => res[key]);
};

//GET IMAGE From Mobile
const uploadFromGalary = async isMulti => {
  const imageData = await ImageCropPicker.openPicker({
    cropping: true,
    width: 300, // set desired resolution
    height: 300,
    // compressImageQuality: 0.8,
    multiple: isMulti ?? false,
  });

  const getOrientation = (width, height) => {
    if (width > height) return 'landscape';
    if (height > width) return 'portrait';
    return 'square';
  };

  if (Array.isArray(imageData)) {
    return imageData.map(res => ({
      uri: Platform.OS === 'ios' ? res?.sourceURL : res?.path,
      name: res?.filename || 'photo.jpg',
      type: res?.mime,
      orientation: getOrientation(res?.width, res?.height),
    }));
  } else {
    const {
      height,
      width,
      size,
      path,
      filename,
      sourceURL,
      localIdentifier,
      mime,
    } = imageData;
    const uri = Platform.OS === 'ios' ? sourceURL : path;
    const fileName = filename || 'photo.jpg';

    return {
      uri,
      name: fileName,
      type: mime,
      orientation: getOrientation(width, height),
    };
  }
};

//GET IMAGE From Mobile
const uploadFromCamera = async isMulti => {
  const imageData = await ImageCropPicker.openCamera({
    cropping: true,
    multiple: isMulti ?? false,
  });

  const checkOrientation = img => {
    return img.height >= img.width ? 'portrait' : 'landscape';
  };

  if (Array.isArray(imageData)) {
    return imageData.map(res => ({
      uri: Platform.OS === 'ios' ? res?.path : res?.sourceURL,
      name: res?.filename || 'photo.jpg',
      type: res?.mime,
      orientation: checkOrientation(res),
    }));
  } else {
    const {
      height,
      width,
      size,
      path,
      filename,
      sourceURL,
      localIdentifier,
      mime,
    } = imageData;

    const uri = Platform.OS === 'ios' ? path : sourceURL;
    const fileName = filename || 'photo.jpg';
    const orientation = checkOrientation(imageData);

    return {
      uri,
      name: fileName,
      type: mime,
      orientation,
    };
  }
};

function formatDateToCustomFormat(isoDate) {
  var originalDate = new Date(isoDate);

  // Define an array of month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get the month name using the array
  var monthName = monthNames[originalDate.getMonth()];

  var year = originalDate.getUTCFullYear();
  var day = originalDate.getUTCDate();

  var formattedDate = `${monthName} ${day}, ${year}`;
  return formattedDate;
}

//For Time Format Convert Function
function convertToCustomTimeFormat(isoDate) {
  const date = new Date(isoDate);

  // Subtract 5 hours
  date.setUTCHours(date.getUTCHours() - 7);

  // Extract hours and minutes
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Determine if it's A.M. or P.M.
  const amOrPm = hours < 12 ? 'P.M.' : 'A.M.';

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Ensure that both hours and minutes have two digits
  const formattedTime = `${formattedHours}:${String(minutes).padStart(
    2,
    '0',
  )} ${amOrPm}`;

  return formattedTime;
}

function getOrdinal(num) {
  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) return `${num}st`;
  if (lastDigit === 2 && lastTwoDigits !== 12) return `${num}nd`;
  if (lastDigit === 3 && lastTwoDigits !== 13) return `${num}rd`;

  return `${num}th`;
}

function convertDateFormat(inputDate) {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function convertDateString(dateString) {
  // Parse the input date string
  const date = new Date(dateString);

  // Get year, month, day, hours, minutes, and seconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Format as "YYYY-MM-DD HH:MM:SS"
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function to check location permission
const checkCalenderPermission = async () => {
  if (Platform.OS === 'ios') {
    const permissionStatus = await check(PERMISSIONS.IOS.CALENDARS);
    return permissionStatus === RESULTS.GRANTED;
  } else {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
    );
    return granted;
  }
};

// Function to request location permission
const requestCalenderPermission = async () => {
  if (Platform.OS === 'ios') {
    const permissionStatus = await request(PERMISSIONS.IOS.CALENDARS);
    return permissionStatus === RESULTS.GRANTED;
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
};

const getCalenderPerComfirm = async () => {
  const hasPermission = await checkCalenderPermission();
  if (hasPermission) {
    return { ok: true };
  } else {
    const permissionGranted = await requestCalenderPermission();
    if (permissionGranted) {
      return { ok: false };
    } else {
      Alert.alert(
        'Permission Denied',
        'Calender permission is required to use this feature',
        [{ text: 'OK' }],
      );
      return { ok: false };
    }
  }
};

function capitalizeFirstLetter(string) {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

function removeUndefined(arr) {
  if (arr) {
    return arr.filter(item => item !== undefined);
  } else [];
}

function checkParagraphForUndefined(paragraph) {
  if (typeof paragraph !== 'string') {
    return false;
  }
  return !paragraph.includes('undefined');
}

const formatDate = dateString => {
  // input: "1988-03-04T20:49:00.000Z"
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit format
  const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit format
  return `${year}-${month}-${day}`;
  // Output: "1988-03-04"
};

const calculateAge = birthdate => {
  // input: "1988-03-04"
  const birthDate = new Date(birthdate);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Adjust age if the birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
  // Output: "15"
};

const getFileNameFromURL = fileURL => {
  return fileURL.split('/').pop();
};

// Secure fallback for cryptographic security

// bcrypt.setRandomFallback(len => require('crypto').randomBytes(len));
// const hashPassword = password =>
//   new Promise((resolve, reject) => {
//     bcrypt.genSalt(10, (err, salt) => {
//       if (err) reject(err);
//       else {
//         bcrypt.hash(password, salt, (err, hash) => {
//           err ? reject(err) : resolve(hash);
//         });
//       }
//     });
//   });

// /**
//  * Verifies if the provided password matches the hashed password.
//  * @param {string} password - The plain text password.
//  * @param {string} hashedPassword - The hashed password.
//  * @returns {Promise<boolean>} - True if the password matches, otherwise false.
//  */
// const verifyPassword = (password, hashedPassword) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(password, hashedPassword, (err, result) => {
//       if (err) return reject(err);
//       resolve(result); // true or false
//     });
//   });
// };

const getLastNightDigit = async phoneNumbers => {
  const result = phoneNumbers.map(phoneNumber => {
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');

    // Take the last nine digits
    return digitsOnly.slice(-9);
  });
  return result;
};

const deriveIV = password => crypto.createHash('md5').update(password).digest(); // Always 16 bytes

const key = '2b7e151628aed2a6abf7158809cf4f3c'; // Fixed key

function hashPassword(password) {
  let output = '';
  // console.log('skdjbvjksbdkjlvbksd', password);
  for (let i = 0; i < password.length; i++) {
    // XOR each character of the password with the corresponding character in the key
    const charCode = password.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    // console.log('skdjbvjksbdkjlvbkssdsdsdsdd', charCode);
    output += String.fromCharCode(charCode);
  }
  // console.log('skdjbvjksbdkjlvbkssasdsdfgdfgdfdfdsdsdsdd', output);
  // Encode the output in hexadecimal to handle non-printable characters
  // const hashed = Buffer.from(output).toString('hex');
  return { hashed: JSON.stringify(output) };
}

// Example usage

/**
 * Hashes a password using AES encryption.
 * @param {string} password - The plain text password.
 * @returns {Promise<{hashed: string, key: string}>} - Hashed password and key.
 */
// const hashPassword = async password => {
//   let output = '';
//   for (let i = 0; i < password.length; i++) {
//     // XOR each character of the input with the corresponding character in the key
//     const charCode = input.charCodeAt(i) ^ key.charCodeAt(i % key.length);
//     output += String.fromCharCode(charCode);
//   }
//   return {hashed: output};
// };
// const hashPassword = async password => {
//   const fixedKey =
//     '2b7e151628aed2a6abf7158809cf4f3c2b7e151628aed2a6abf7158809cf4f3c'; // Must be 32 bytes for AES-256
//   const fixedIV = '3ad77bb40d7a3660a89ecaf32466ef97'; // Must be 16 bytes
//   try {
//     const hashed = await AES.encrypt(
//       password,
//       fixedKey,
//       fixedIV,
//       'aes-128-cbc',
//     );
//     return {hashed, fixedKey, fixedIV};
//   } catch (error) {
//     console.error('Encryption Error:', error.message);
//     throw new Error('Encryption failed');
//   }
// };

const checkMaleFemaleForImg = () => {
  const { Auth } = store.getState();
  if (Auth?.userData?.gender == 'male') return maleImg;
  else if (Auth?.userData?.gender == 'female') return femaleImg;
  else return maleImg;
};

function showFirstThreeAndCountRest(arr, startingCount) {
  // input [1,2,3,4,5]

  if (arr.length <= (startingCount ?? 3)) {
    return arr; // If array has 3 or fewer items, return as is
  }
  const firstThree = arr.slice(0, 3);
  const remainingCount = arr.length - 3;
  return [...firstThree, `+${remainingCount}`];
  // output: [1, 2, 3, "+2"]
}

function convertToArray(associations) {
  // input: "NRHA"

  if (associations) {
    return associations.split(',').map(item => item.trim());
  }
  // Output: ["NRHA"]
  return [];
}

function sortByNameAlphabetically(data) {
  return data.sort((a, b) => a.name.localeCompare(b.name));
}

function isFutureOrNow(dateString) {
  const inputDate = new Date(dateString.replace(' ', 'T')); // Convert to ISO format
  const now = new Date();
  return inputDate >= now;
}

function mergeIds(id1, id2) {
  const { userData } = store.getState('Auth');

  const num1 = Number(id1);
  const num2 = Number(id2 ?? userData?.id);

  if (isNaN(num1) || isNaN(num2)) {
    console.log('Both IDs must be numeric or numeric strings.', id1, id2);
  }

  // Merge with the smaller number first
  const merged = num1 < num2 ? `${num1}${num2}` : `${num2}${num1}`;

  return merged;
}

const formatPrice = (amount, locale = 'en-US', currency = 'USD') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const checkImageOrientation = imageUrl => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      imageUrl,
      (width, height) => {
        if (width > height) {
          resolve('landscape');
        } else if (height > width) {
          resolve('portrait');
        } else {
          resolve('square');
        }
      },
      error => {
        console.error('Failed to get image size:', error);
        reject(error);
      },
    );
  });
};
// Example usage:

function formatDateToYMD(dateStr) {
  // input "Mon Jul 14 2025";

  const date = new Date(dateStr);

  if (isNaN(date)) return null; // invalid date

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;

  // output: "2025-07-14"
}

function formatDateToLong(dateStr) {
  // input "Mon Jul 14 2025";
  const date = new Date(dateStr);

  if (isNaN(date)) return null; // Invalid date

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options); // "July 14, 2025"
  // output: "July 14, 2025"
}

function getFormattedTime(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return null;

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
  // output: "23:00:00"
}

function getCustom12HourTime(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return null;

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  if (hours === 0) hours = 12; // 12 AM or 12 PM

  return `${hours}:${minutes} ${period}`;
  // output: "12.21 .AM"
}

const convertTo24HourFormat = timeStr => {
  // input '1:28:00 PM'

  if (!timeStr) return '';

  const date = new Date(`1970-01-01T${timeStr}`);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;

  // output "13:28"
};

const formatTimeTo24Hour = date => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
};

const formatTimeBothFormats = dateInput => {
  const date = new Date(dateInput);
  if (isNaN(date)) return { time24: null, time12: null };

  // 24-hour format
  const hours24 = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const time24 = `${hours24}:${minutes}`;

  // 12-hour format
  let hours12 = date.getHours();
  const period = hours12 >= 12 ? 'PM' : 'AM';
  hours12 = hours12 % 12;
  if (hours12 === 0) hours12 = 12;
  const time12 = `${hours12}:${minutes} ${period}`;

  return {
    time24,
    time12,
  };
};

export {
  getSingleCharacter,
  getProperLocation,
  getDateMonthYear,
  extractTimeFromString,
  openGoogleMaps,
  removeTimeFromDate,
  getValBeforePoint,
  fetchRailwayCrossingAPI,
  getDistanceFromLatLonInKm,
  checkPer,
  reqPer,
  requestLocationPermission,
  checkLocationPermission,
  getDistancesBetweenLocationsArry,
  matchTwoArrays,
  matchIDinTwoArry,
  AMPMLayout,
  removeSpacesBetweenWords,
  filterKeyFromArry,
  getObjectById,
  generateUniqueId,
  updateArryObjById,
  getIdsFromArry,
  uploadFromGalary,
  formatDateToCustomFormat,
  convertToCustomTimeFormat,
  getOrdinal,
  convertDateFormat,
  convertDateString,
  getCalenderPerComfirm,
  convertToLocalTime,
  capitalizeFirstLetter,
  removeUndefined,
  checkParagraphForUndefined,
  uploadFromCamera,
  formatDate,
  calculateAge,
  getFileNameFromURL,
  hashPassword,
  getLastNightDigit,
  checkMaleFemaleForImg,
  showFirstThreeAndCountRest,
  convertToArray,
  sortByNameAlphabetically,
  isFutureOrNow,
  mergeIds,
  formatPrice,
  checkImageOrientation,
  formatDateToYMD,
  formatDateToLong,
  getFormattedTime,
  getCustom12HourTime,
  convertTo24HourFormat,
  formatTimeTo24Hour,
  formatTimeBothFormats,
};
