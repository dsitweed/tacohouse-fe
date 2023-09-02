import { useState } from 'react';
import { App as AntApp, ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
// Language support
import vi from 'antd/locale/vi_VN';
import en from 'antd/locale/en_US';
import ja from 'antd/locale/ja_JP';

import router from './routes';
import { store } from './store/store';
import { theme } from './assets/theme';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [language, setLanguage] = useState('vi');

  const getLanguage = (language: string) => {
    switch (language) {
      case 'vi':
        return vi;
      case 'en':
        return en;
      case 'ja':
        return ja;
      default:
        return en;
    }
  };

  return (
    <AntApp>
      <ConfigProvider theme={theme} locale={getLanguage(language)}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ConfigProvider>
    </AntApp>
  );
}

export default App;
