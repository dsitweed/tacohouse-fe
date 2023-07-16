// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)

declare module "i18next" {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        returnNull: false;
    }
}