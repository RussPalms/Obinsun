import { AppDispatch, RootState } from 'pages/app/state/store';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default () => {};
