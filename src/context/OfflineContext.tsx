import React, { createContext, useContext, useState, useEffect } from 'react';
import { OfflinePendingAction } from '../types';
import { useStore } from './StoreContext';

export type SyncState = 'online' | 'offline' | 'syncing' | 'synced';

interface OfflineContextType {
  isSimulatedOffline: boolean;
  toggleSimulatedOffline: () => void;
  syncState: SyncState;
  pendingActions: OfflinePendingAction[];
  queueAction: (type: OfflinePendingAction['type'], payload: any) => void;
  syncNow: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addCrop, updateCrop, deleteCrop, addNotification } = useStore();
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [pendingActions, setPendingActions] = useState<OfflinePendingAction[]>(() => {
    try {
      const saved = localStorage.getItem('agriconnect_offline_queue');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [syncState, setSyncState] = useState<SyncState>('online');

  // Listen to browser network state
  useEffect(() => {
    const handleOnline = () => {
      if (!isSimulatedOffline) {
        setSyncState('online');
      }
    };
    const handleOffline = () => {
      setSyncState('offline');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isSimulatedOffline]);

  // Persist pending actions
  useEffect(() => {
    localStorage.setItem('agriconnect_offline_queue', JSON.stringify(pendingActions));
  }, [pendingActions]);

  const toggleSimulatedOffline = () => {
    setIsSimulatedOffline(prev => {
      const next = !prev;
      if (next) {
        setSyncState('offline');
      } else {
        setSyncState('syncing');
        setTimeout(() => {
          syncPendingItems();
        }, 1200);
      }
      return next;
    });
  };

  const queueAction = (type: OfflinePendingAction['type'], payload: any) => {
    const action: OfflinePendingAction = {
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      payload,
      createdAt: new Date().toISOString()
    };
    setPendingActions(prev => [...prev, action]);
  };

  const syncPendingItems = async () => {
    if (pendingActions.length === 0) {
      setSyncState('synced');
      setTimeout(() => setSyncState('online'), 2500);
      return;
    }

    setSyncState('syncing');
    await new Promise(resolve => setTimeout(resolve, 1400));

    // Process queued actions
    pendingActions.forEach(item => {
      if (item.type === 'ADD_CROP') {
        addCrop(item.payload);
      } else if (item.type === 'UPDATE_CROP') {
        updateCrop(item.payload.id, item.payload.updates);
      } else if (item.type === 'DELETE_CROP') {
        deleteCrop(item.payload.id);
      }
    });

    const count = pendingActions.length;
    setPendingActions([]);
    setSyncState('synced');

    addNotification({
      userId: 'usr_farmer_1',
      type: 'sync',
      title: 'Offline Actions Synchronized!',
      message: `Successfully uploaded ${count} queued change(s) to the AgriConnect platform.`
    });

    setTimeout(() => {
      setSyncState('online');
    }, 3000);
  };

  const syncNow = async () => {
    if (isSimulatedOffline) return;
    await syncPendingItems();
  };

  return (
    <OfflineContext.Provider value={{
      isSimulatedOffline,
      toggleSimulatedOffline,
      syncState,
      pendingActions,
      queueAction,
      syncNow
    }}>
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) throw new Error('useOffline must be used within an OfflineProvider');
  return context;
};
