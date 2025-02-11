import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function PusherTest() {
  const [status, setStatus] = useState('Connecting...');
  const [lastEvent, setLastEvent] = useState('No events received');

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!
    });

    pusher.connection.bind('connected', () => {
      setStatus('Connected to Pusher');
    });

    pusher.connection.bind('error', (err: any) => {
      setStatus(`Connection error: ${err.message}`);
    });

    const channel = pusher.subscribe('test-channel');
    channel.bind('test-event', (data: any) => {
      setLastEvent(JSON.stringify(data));
    });

    return () => {
      pusher.disconnect();
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Pusher Connection Test</h1>
      <div className="mb-4">
        <strong>Connection Status:</strong> {status}
      </div>
      <div>
        <strong>Last Event Received:</strong> {lastEvent}
      </div>
    </div>
  );
}