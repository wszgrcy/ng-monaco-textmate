const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
export default (config, options, targetOptions) => {
  console.log('webpack-start');
  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: ['typescript', 'javascript', 'html', 'css'],
    })
  );

  const loaders: any[] = config.module.rules.filter(
    (rule) =>
      rule.use &&
      rule.use.find(
        (it) =>
          it.loader &&
          (it.loader.includes('@angular-devkit\\build-optimizer') ||
            it.loader.includes('@angular-devkit/build-optimizer'))
      )
  );
  console.log(loaders.length);
  // console.log('需要修改的', loaders);
  loaders.forEach((loader) => {
    const originalTest = loader.test;
    loader.test = (file) => {
      const isMonaco = !!file.match('monaco-editor');
      return !isMonaco && !!file.match(originalTest);
    };
  });
  return config;
};
