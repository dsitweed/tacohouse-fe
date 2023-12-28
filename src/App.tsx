import { App as AntApp, ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';

import router from './routes';
import { theme } from './assets/theme';
import viVN from 'antd/locale/vi_VN';
import enUS from 'antd/locale/en_US';
import jaJP from 'antd/locale/ja_JP';
import { useAppSelector } from './store/hooks';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const key: I18nType.Language = useAppSelector((state) => state.language.key);

  const getAntdLocale = (key: I18nType.Language) => {
    switch (key) {
      case 'vi':
        return viVN;
      case 'en':
        return enUS;
      case 'ja':
        return jaJP;
      default:
        return enUS;
    }
  };

  return (
    <AntApp>
      <ConfigProvider theme={theme} locale={getAntdLocale(key)}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </ConfigProvider>
    </AntApp>
  );
}

export default App;
