// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 调整
    // 给参数从新赋值
    'no-param-reassign': 0,
    // 字符串最大长度
    "max-len": [0, 80, 4],
    // return 后面是否允许省略
    "consistent-return": 0,
    // 使用严格模式
    "strict": 0,
    // 对象字面量项尾不能有逗号
    "comma-dangle": [1, 'never'],
    // 连续声明
    "one-var": 0,
    //函数表达式必须有名字
    "func-names": 0,
    //for in循环要用if语句过滤
    "guard-for-in": 0,
    // 多重赋值
    "no-multi-assign": 0,
    // for-in for-of 不可用
    "no-restricted-syntax": 0,
    // 禁止使用console
    "no-console": 0
  }
}
