import { createContext, useContext } from 'react';
import ProductState from 'src/manager/productmeneger';
import UserState from 'src/manager/user';

const AppContext = createContext<any>([[], () => null]);

export interface IContext {
    children: JSX.Element
}
export const AppWrapper: React.FC<IContext> = ({ children }) => {
    return (
        <AppContext.Provider value={
            {
                user: new UserState(),
                product: new ProductState()
            }
        }>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}