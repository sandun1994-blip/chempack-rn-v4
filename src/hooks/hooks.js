import {useContext} from 'react';
import {Context} from '../context/ContextProvider';

export const useDataContext = () => useContext(Context);
