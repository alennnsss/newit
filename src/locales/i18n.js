import { createI18n } from 'vue-i18n'
import en from './en.js'
import ru from './ru.js'
import kz from './kz.js'
const i18n = createI18n({
  legacy: false, 
  globalInjection: true, 
  locale: localStorage.getItem('locale') || 'ru',
  fallbackLocale: 'en',
  messages: { en, ru, kz }
})

export default i18n
export function setLocale(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.setAttribute('lang', locale)
}

export const supportedLocales = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'kz', label: 'Қазақша' }
]