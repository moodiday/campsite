import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const PusherTest = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });

    try {
      // Subscribe to the test channel
      const channel = pusher.subscribe('test_channel');

      // Connection status handling
      pusher.connection.bind('connected', () => {
        setConnectionStatus('Connected');
      });

      pusher.connection.bind('disconnected', () => {
        setConnectionStatus('Disconnected');
      });

      pusher.connection.bind('error', (err) => {
        setError(`Connection error: ${err.message}`);
      });

      // Bind to test event
      channel.bind('test_event', (data) => {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

    } catch (err) {
      setError(`Error initializing Pusher: ${err.message}`);
    }

    // Cleanup on unmount
    return () => {
      pusher.unsubscribe('test_channel');
      pusher.disconnect();
    };
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Pusher Test</h2>
        <p className="text-sm">Status: <span className={connectionStatus === 'Connected' ? 'text-green-500' : 'text-red-500'}>{connectionStatus}</span></p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-2">Received Messages:</h3>
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages received yet</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <li key={index} className="text-sm bg-gray-50 p-2 rounded">
                {message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PusherTest;