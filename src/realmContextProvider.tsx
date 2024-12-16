import Realm from 'realm';
import React from 'react';
import { getRealm, closeRealm } from './data/storage/storageManager';
import { Text } from 'react-native';

// Realm context
export const RealmContext = React.createContext<Realm | null>(null);

// Custom hook to consume Realm context
export const useRealm = (): Realm => {
    const context = React.useContext(RealmContext);
    if (!context) {
        throw new Error('useRealm must be used within a RealmProvider');
    }
    return context;
};

// Realm provider
export const RealmProvider = ({ children }: { children: React.ReactNode }) => {
    const [realm, setRealm] = React.useState<Realm | null>(null);

    React.useEffect(() => {
        const realmRef = { current: null as Realm | null };

        const initializeRealm = async () => {
            try {
                const newRealm = await getRealm();
                realmRef.current = newRealm;
                setRealm(newRealm);
            } catch (error) {
                console.error('Failed to initialize Realm:', error);
            }
        };

        initializeRealm();

        return () => {
            if (realmRef.current) {
                closeRealm(realmRef.current);
            }
        };
    }, []);

    if (!realm) {
        return <LoadingComponent />; // Render a loading state until Realm is ready
    }

    return <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>;
};

// Example loading component
const LoadingComponent = () => <Text>Loading...</Text>;
