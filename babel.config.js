module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
        },
      ],
      [
        'react-native-reanimated/plugin',
        {
          globals: ['__example_plugin', '__example_plugin_swift'],
        },
      ],
    ],
  };
};
