module.exports = (api) => {
  const module = api.env('module')
  const presetEnv = [
    '@lunde/es',
    {
      env: {
        modules: module ? false : 'commonjs',
        targets: module
          ? {
              browsers: '> 2%',
            }
          : {
              node: '8',
            },
      },
      devExpression: false,
      objectAssign: false,
    },
  ]

  return {
    presets: [presetEnv, api.env('test') && '@babel/react'].filter(Boolean),
    plugins: ['optimize-react'],
  }
}
