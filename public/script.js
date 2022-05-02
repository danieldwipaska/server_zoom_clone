const socket = io();
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

const myPeer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '3030',
});

// Send user ID and room ID to server
myPeer.on('open', (id) => {
  socket.emit('join-room', ROOM_ID, id);
});

// Get user video and audio
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    // add our own video stream without audio to html
    addVideoStream(myVideo, stream);
    // receive other user video and audio streams
    myPeer.on('call', (call) => {
      call.answer(stream);
      const video = document.createElement('video');
      // other user video and audio stream
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream); // add other user video and audio stream to html
      });
    });
    // receive other user ID from server
    socket.on('user-connected', (userId) => {
      // call that user
      setTimeout(() => {
        connectToNewUser(userId, stream);
      }, 1000);
    });
  });

// Function: call other users
const connectToNewUser = (userId, stream) => {
  // call other users
  const call = myPeer.call(userId, stream);
  // send user id and stream to other users
  const video = document.createElement('video');
  call.on('stream', (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

// Function: add video and stream to html
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
};
