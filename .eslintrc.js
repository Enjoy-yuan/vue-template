module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 0 = off, 1 = warn, 2 = error
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off', // 设置函数后无空格
    'no-new': 'off', // 允许在使用 new 构造一个实例后不赋值
    'no-useless-return': 'off' // 允许 ruturn 空
  }
}
