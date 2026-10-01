module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@constants': './src/constants',
          '@services': './src/services',
          '@stores': './src/stores',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          'expo-haptics': './src/compat/expo-haptics',
          'expo-location': './src/compat/expo-location',
        },
      },
    ],
  ],
};
