import ReactDOM from 'react-dom/client';
import './styles/global.less';
import App from './App';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import "./i18n"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
