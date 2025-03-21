
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bell, X, Check, AlertTriangle, Info, Shield } from 'lucide-react';
import { toast } from 'sonner';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'fraud';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Also display as toast
    switch (notification.type) {
      case 'info':
        toast.info(notification.title, { description: notification.message });
        break;
      case 'success':
        toast.success(notification.title, { description: notification.message });
        break;
      case 'warning':
        toast.warning(notification.title, { description: notification.message });
        break;
      case 'error':
        toast.error(notification.title, { description: notification.message });
        break;
      case 'fraud':
        toast(notification.title, { 
          description: notification.message,
          icon: <Shield className="h-4 w-4 text-red-500" />,
        });
        break;
    }
    
    return newNotification.id;
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(note => note.id === id ? { ...note, read: true } : note)
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(note => ({ ...note, read: true }))
    );
  };
  
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(note => note.id !== id));
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  // Load example notifications on first mount
  useEffect(() => {
    const exampleNotifications: Omit<Notification, 'id' | 'timestamp' | 'read'>[] = [
      {
        title: 'Fraud Alert',
        message: 'Suspicious activity detected in transaction #TX8294',
        type: 'fraud'
      },
      {
        title: 'Rule Engine Updated',
        message: 'Velocity check rule parameters have been updated',
        type: 'info'
      },
      {
        title: 'Report Generated',
        message: 'Monthly fraud report is now available for download',
        type: 'success'
      }
    ];
    
    exampleNotifications.forEach(note => {
      addNotification(note);
    });
  }, []);
  
  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    unreadCount: notifications.filter(n => !n.read).length
  };
};

export const NotificationIcon: React.FC<{ count: number; onClick: () => void }> = ({ 
  count, onClick 
}) => {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} className="relative">
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-white text-xs">
          {count > 9 ? '9+' : count}
        </Badge>
      )}
    </Button>
  );
};

interface NotificationCenterProps {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
  onClose
}) => {
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <X className="h-4 w-4 text-rose-500" />;
      case 'fraud':
        return <Shield className="h-4 w-4 text-rose-500" />;
    }
  };
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };
  
  return (
    <Card className="glass-card p-4 w-80 max-h-[70vh] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Notifications</h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
            Mark all read
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Separator className="my-1" />
      
      <div className="overflow-y-auto flex-grow">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No notifications
          </div>
        ) : (
          <div className="space-y-1">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-2 text-sm rounded hover:bg-muted transition-colors cursor-pointer ${
                  notification.read ? 'opacity-70' : 'border-l-2 border-primary'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-2 items-start">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div>
                      <div className="font-medium">{notification.title}</div>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 opacity-0 hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatTime(notification.timestamp)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {notifications.length > 0 && (
        <>
          <Separator className="my-1" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllNotifications} 
            className="text-xs mt-1"
          >
            Clear all
          </Button>
        </>
      )}
    </Card>
  );
};
