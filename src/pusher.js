import Pusher from 'pusher-js';

const socket = new Pusher('2c0a72aec54648a29b9a', {
  cluster: 'us2',
  encrypted: true,
  authEndpoint: 'http://localhost:4000/pusher/auth'
});

export default socket;