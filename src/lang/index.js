import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from '@/lang/en.js'
import zh from '@/lang/zh.js'
import { getCookie } from '@/utils/cookie'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: getCookie("language"),
  messages: {
    en: {
      ...en,
      ...enLocale
    },
    zh: {
      ...zh,
      ...zhLocale
    }
  }
})

export default i18n
