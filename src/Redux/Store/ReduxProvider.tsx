'use client';

import { Provider } from 'react-redux';
import store from './store';
import { Toaster } from 'react-hot-toast';
const ReduxProvider=({children})=>{
    return <Provider store={store}>{children}<Toaster /></Provider>
}

export default ReduxProvider;