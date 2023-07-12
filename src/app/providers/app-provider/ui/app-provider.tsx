import { Provider } from 'react-redux/es/exports';
import { store } from 'store/store';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => <Provider store={store}>{children}</Provider>;
