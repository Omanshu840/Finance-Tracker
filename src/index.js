import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { ConfigProvider } from 'antd';
import rootReducer from './reducer';
import { createStore } from "redux";
import { screens } from './constants';
import { Provider} from "react-redux";

const jwtToken = localStorage.getItem("token");

let initialState = {
  screen: (jwtToken) ? screens.EXPENSES : screens.LOGIN,
}

const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          "components": {
            "Drawer": {
              "colorBgElevated": "var(--priColor1)",
              "colorText": "var(--secColor1)",
              "colorIcon": "var(--secColor1)",
              "colorIconHover": "var(--secColor1)"
            },
            "Modal": {
              "contentBg": "var(--priColor1)",
              "colorText": "var(--secColor1)",
            },
            "Form": {
              "controlOutline": "var(--priColor2)",
              "colorTextDescription": "var(--secColor2)",
              "colorText": "var(--secColor1)",
              "colorBorder": "var(--priColor2)"
            }
          },
          token: {
            fontFamily: "Montserrat",
            "colorTextBase": "var(--secColor1)"
          }
      }}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);