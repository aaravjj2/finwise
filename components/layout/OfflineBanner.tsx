'use client';

import { useEffect, useState } from 'react';

export function OfflineBanner(): JSX.Element | null {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div
      data-testid="offline-banner"
      className="fixed left-0 right-0 top-0 z-50 bg-amber-500 py-2 text-center text-sm font-medium text-white"
    >
      You are offline - saved lessons and your data are still available
    </div>
  );
}
