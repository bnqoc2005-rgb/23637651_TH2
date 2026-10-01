import { Vibration } from 'react-native';

export enum ImpactFeedbackStyle {
  Light = 'light',
  Medium = 'medium',
  Heavy = 'heavy',
}

export enum NotificationFeedbackType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export async function impactAsync(style: ImpactFeedbackStyle = ImpactFeedbackStyle.Medium): Promise<void> {
  Vibration.vibrate(50);
}

export async function selectionAsync(): Promise<void> {
  Vibration.vibrate(30);
}

export async function notificationAsync(type: NotificationFeedbackType = NotificationFeedbackType.Success): Promise<void> {
  Vibration.vibrate([0, 50, 50, 50]);
}

export default {
  impactAsync,
  selectionAsync,
  notificationAsync,
  ImpactFeedbackStyle,
  NotificationFeedbackType,
};
