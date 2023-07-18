import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { App as AntApp, ConfigProvider } from "antd";

// Language support
import vi from "antd/locale/vi_VN";
import en from "antd/locale/en_US";
import ja from "antd/locale/ja_JP";
import { useState } from "react";
import { theme } from "./assets/theme";

function App() {
  const [language, setLanguage] = useState<I18nType.Language>("en");
  const test = import.meta.env.VITE_BACKEND_API_URL;

  const getLocate = (language: I18nType.Language) => {
    switch (language) {
      case "en":
        return en;
      case "vi":
        return vi;
      case "ja":
        return ja;
      default:
        return en;
    }
  };

  return (
    <AntApp>
      <ConfigProvider theme={theme} locale={getLocate(language)}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ConfigProvider>
    </AntApp>
  );
}

export default App;
