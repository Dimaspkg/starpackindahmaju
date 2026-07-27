"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RecentLead {
  id: number;
  name: string;
  company: string;
  email: string;
  created_at: string;
}

interface NotificationContextData {
  unreadCount: number;
  recentLeads: RecentLead[];
  hasNewNotification: boolean;
  markAsOpened: () => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextData>({
  unreadCount: 0,
  recentLeads: [],
  hasNewNotification: false,
  markAsOpened: () => {},
  refreshNotifications: () => {}
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/leads/notifications');
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.count);
        setRecentLeads(data.recent);

        // Cek logic "Mute": bandingkan ID terbaru dengan yang terakhir dilihat di localStorage
        if (data.latestId > 0) {
          const lastSeenId = parseInt(localStorage.getItem('last_seen_lead_id') || '0', 10);
          if (data.latestId > lastSeenId) {
            setHasNewNotification(true);
          } else {
            setHasNewNotification(false);
          }
        } else {
          setHasNewNotification(false);
        }
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }, []);

  // Polling setiap 30 detik
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const markAsOpened = () => {
    if (recentLeads.length > 0) {
      const latestId = recentLeads[0].id;
      localStorage.setItem('last_seen_lead_id', latestId.toString());
      setHasNewNotification(false);
    }
  };

  return (
    <NotificationContext.Provider value={{
      unreadCount,
      recentLeads,
      hasNewNotification,
      markAsOpened,
      refreshNotifications: fetchNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
