import { PermissionsAndroid, Platform } from 'react-native';

export enum Accuracy {
  Lowest = 1,
  Low = 2,
  Balanced = 3,
  High = 4,
  Highest = 5,
  BestForNavigation = 6,
}

export interface LocationPermissionResponse {
  status: 'granted' | 'denied' | 'undetermined';
  granted: boolean;
  canAskAgain: boolean;
  expires: 'never' | number;
}

export async function requestForegroundPermissionsAsync(): Promise<LocationPermissionResponse> {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return { status: 'granted', granted: true, canAskAgain: true, expires: 'never' };
      }
      if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        return { status: 'denied', granted: false, canAskAgain: false, expires: 'never' };
      }
      return { status: 'denied', granted: false, canAskAgain: true, expires: 'never' };
    } catch (e) {
      return { status: 'granted', granted: true, canAskAgain: true, expires: 'never' };
    }
  }
  return { status: 'granted', granted: true, canAskAgain: true, expires: 'never' };
}

export async function getForegroundPermissionsAsync(): Promise<LocationPermissionResponse> {
  return requestForegroundPermissionsAsync();
}

export async function getCurrentPositionAsync(options?: any) {
  // Trả về toạ độ thực tế gần khuôn viên KTX IUH
  return {
    coords: {
      latitude: 10.8250,
      longitude: 106.6890,
      altitude: null,
      accuracy: 10,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: Date.now(),
  };
}

export default {
  requestForegroundPermissionsAsync,
  getForegroundPermissionsAsync,
  getCurrentPositionAsync,
  Accuracy,
};
