import { App as AntApp, ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import router from './routes';
import { store } from './store/store';
import { theme } from './assets/theme';

function App() {
  return (
    <AntApp>
      <ConfigProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ConfigProvider>
    </AntApp>
  );
}

export default App;
