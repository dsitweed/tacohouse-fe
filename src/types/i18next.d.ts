// import the original type declarations
import 'i18next';
import { en } from '@/locales/index';
declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // Setting for recommend when use t()
    resources: {
      translation: typeof en;
    };
  }
}
