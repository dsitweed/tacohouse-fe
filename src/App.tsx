import { App as AntApp, ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import router from './routes';
import { store } from './store/store';
import { theme } from './assets/theme';
import { LoadScript } from '@react-google-maps/api';
import viVN from 'antd/locale/vi_VN';

function App() {
  return (
    <AntApp>
      <ConfigProvider theme={theme} locale={viVN}>
        <Provider store={store}>
            <RouterProvider router={router} />
          {/* <LoadScript googleMapsApiKey="AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8">
          </LoadScript> */}
        </Provider>
      </ConfigProvider>
    </AntApp>
  );
}

export default App;
