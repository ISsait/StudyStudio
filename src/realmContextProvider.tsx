import Realm from 'realm';
import React, { useState, useEffect, useContext } from 'react';
import { getRealm, closeRealm } from './data/storage/storageManager';
import { View, Text, ActivityIndicator } from 'react-native';

// Realm context
export const RealmContext = React.createContext<Realm | null>(null);

// Custom hook to consume Realm context
export const useRealm = (): Realm => {
    const context = useContext(RealmContext);
    if (!context) {
        throw new Error('useRealm must be used within a RealmProvider');
    }
    return context;
};

// Realm provider
export const RealmProvider = ({ children }: { children: React.ReactNode }) => {
    const [realm, setRealm] = useState<Realm | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeRealm = async () => {
            try {
                console.log('Initializing Realm instance in Provider');
                const newRealm = await getRealm();
                setRealm(newRealm);
                console.log('Realm instance has been initialized in Provider');
                console.log('Realm', newRealm);
            } catch (err) {
                console.error('Failed to initialize Realm:', err);
                setError('Failed to initialize the database. Please try again.');
            }
        };

        initializeRealm();

        return () => {
            if (realm) {
                console.log('Closing Realm instance at Provider cleanup');
                closeRealm(realm); // Clean up Realm instance on unmount
            }
        };
    }, []); // Run only once on mount

    if (error) {
        return <ErrorComponent error={error} />;
    }

    if (!realm) {
        return <LoadingComponent />;
    }

    return <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>;
};

// Loading component
const LoadingComponent = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading database...</Text>
    </View>
);

// Error component
const ErrorComponent = ({ error }: { error: string }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
    </View>
);
