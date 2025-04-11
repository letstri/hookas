import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  rules: {
    'react-hooks/rules-of-hooks': 'off',
  }
})
