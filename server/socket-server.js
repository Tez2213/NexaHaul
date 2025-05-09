const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

// Add this to your socket server
const io = new Server(server, {
  cors: {
    origin: ["https://0xnexahaul.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

// Mock bid rooms data
const bidRooms = new Map();

// Constants (in seconds)
const MAX_BID_DURATION = 1800; // 30 minutes
const COOLDOWN_DURATION = 60;  // 60 seconds

// Helper functions
function createBidRoom(bidId, initialAmount) {
  if (bidRooms.has(bidId)) {
    return bidRooms.get(bidId);
  }

  const room = {
    bidId,
    initialAmount,
    currentLowestBid: initialAmount,
    timeRemaining: MAX_BID_DURATION, // Max 30 minutes for the entire bidding
    cooldownRemaining: COOLDOWN_DURATION, // 60 second cooldown
    participants: [],
    contractors: 0, // Track contractor count separately
    bidHistory: [],
    isActive: true,
    biddingStarted: false, // Bidding hasn't started yet
    winner: null,
    mainTimerId: null,
    cooldownTimerId: null
  };

  bidRooms.set(bidId, room);
  return room;
}

// Start the main 30-minute countdown
function startMainTimer(bidId) {
  const room = bidRooms.get(bidId);
  if (!room || room.mainTimerId) return;
  
  console.log(`Starting main timer for room ${bidId}`);
  room.biddingStarted = true;
  
  const intervalId = setInterval(() => {
    room.timeRemaining -= 1;
    
    // Broadcast time update
    io.to(bidId).emit('timerUpdate', { 
      timeRemaining: room.timeRemaining, 
      cooldownRemaining: room.cooldownRemaining,
      mainTimerActive: true
    });
    
    if (room.timeRemaining <= 0) {
      clearInterval(intervalId);
      room.isActive = false;
      room.mainTimerId = null;
      
      // Clear cooldown timer if it exists
      if (room.cooldownTimerId) {
        clearInterval(room.cooldownTimerId);
        room.cooldownTimerId = null;
      }
      
      // Determine winner (last bidder)
      if (room.bidHistory.length > 0) {
        const winningBid = room.bidHistory[0]; // Most recent bid
        room.winner = winningBid.userName;
        
        // Broadcast winning event
        io.to(bidId).emit('biddingCompleted', { 
          winner: room.winner, 
          finalAmount: room.currentLowestBid,
          reason: 'Time limit reached'
        });
        
        console.log(`Bidding completed for room ${bidId}. Winner: ${room.winner} with bid ${room.currentLowestBid} (time limit reached)`);
      } else {
        console.log(`Bidding completed for room ${bidId}. No bids were placed.`);
        
        io.to(bidId).emit('biddingCompleted', { 
          winner: null, 
          finalAmount: room.initialAmount,
          reason: 'Time limit reached with no bids'
        });
      }
    }
  }, 1000);
  
  room.mainTimerId = intervalId;
}

// Start or reset the cooldown timer
function startOrResetCooldown(bidId) {
  const room = bidRooms.get(bidId);
  if (!room) return;
  
  // Clear existing cooldown timer if it exists
  if (room.cooldownTimerId) {
    clearInterval(room.cooldownTimerId);
    room.cooldownTimerId = null;
  }
  
  // Reset cooldown to 60 seconds
  room.cooldownRemaining = COOLDOWN_DURATION;
  
  // Start new cooldown timer
  const cooldownId = setInterval(() => {
    room.cooldownRemaining -= 1;
    
    // Broadcast cooldown update
    io.to(bidId).emit('timerUpdate', { 
      timeRemaining: room.timeRemaining, 
      cooldownRemaining: room.cooldownRemaining,
      mainTimerActive: true
    });
    
    // If cooldown reaches zero, end the bidding
    if (room.cooldownRemaining <= 0) {
      clearInterval(cooldownId);
      room.cooldownTimerId = null;
      
      // Also clear the main timer
      if (room.mainTimerId) {
        clearInterval(room.mainTimerId);
        room.mainTimerId = null;
      }
      
      room.isActive = false;
      
      // Determine winner (last bidder)
      if (room.bidHistory.length > 0) {
        const winningBid = room.bidHistory[0]; // Most recent bid
        room.winner = winningBid.userName;
        
        // Broadcast winning event
        io.to(bidId).emit('biddingCompleted', { 
          winner: room.winner, 
          finalAmount: room.currentLowestBid,
          reason: 'No new bids for 60 seconds'
        });
        
        console.log(`Bidding completed for room ${bidId}. Winner: ${room.winner} with bid ${room.currentLowestBid} (cooldown expired)`);
      } else {
        console.log(`Bidding completed for room ${bidId}. No bids were placed.`);
        
        io.to(bidId).emit('biddingCompleted', { 
          winner: null, 
          finalAmount: room.initialAmount,
          reason: 'Cooldown expired with no bids'
        });
      }
    }
  }, 1000);
  
  room.cooldownTimerId = cooldownId;
}

// Check if bidding should start (when 2+ contractors connect)
function checkBiddingStart(bidId) {
  const room = bidRooms.get(bidId);
  if (!room) return;
  
  // If we have at least 2 contractors and bidding hasn't started yet, start it now
  if (room.contractors >= 2 && !room.biddingStarted) {
    io.to(bidId).emit('biddingStarted', {
      message: 'Bidding has started with 2 or more contractors',
      contractorCount: room.contractors
    });
    
    startMainTimer(bidId);
    startOrResetCooldown(bidId);
  }
}

// Socket connection handling
io.on('connection', (socket) => {
  const { userId, userName, role, bidId } = socket.handshake.query;
  
  console.log(`User connected: ${userName} (${userId}) as ${role}`);
  
  // Handle joining a bid room
  socket.on('joinBidRoom', ({ bidId, userId, userName, userRole }) => {
    // Create room if it doesn't exist (with mock data)
    if (!bidRooms.has(bidId)) {
      createBidRoom(bidId, 1000000);
    }
    
    const room = bidRooms.get(bidId);
    socket.join(bidId);
    
    // Add participant if not already in the room
    if (!room.participants.some(p => p.userId === userId)) {
      const participant = { 
        userId, 
        userName, 
        socketId: socket.id,
        role: userRole || role 
      };
      
      room.participants.push(participant);
      
      // Increment contractor count if the user is a contractor
      if ((userRole || role) === 'contractor') {
        room.contractors++;
        checkBiddingStart(bidId); // Check if we should start bidding
      }
    }
    
    // Send initial room state to the newly connected user
    socket.emit('roomState', {
      currentLowestBid: room.currentLowestBid,
      bidHistory: room.bidHistory,
      timeRemaining: room.timeRemaining,
      cooldownRemaining: room.cooldownRemaining,
      biddingStarted: room.biddingStarted,
      mainTimerActive: !!room.mainTimerId,
      cooldownActive: !!room.cooldownTimerId,
      contractorCount: room.contractors,
      participants: room.participants.map(p => ({
        name: p.userName,
        role: p.role
      })),
      winner: room.winner,
      isActive: room.isActive
    });
    
    // If bidding is complete, send the completed event
    if (!room.isActive && room.winner) {
      socket.emit('biddingCompleted', { 
        winner: room.winner, 
        finalAmount: room.currentLowestBid,
        reason: 'Previous bid winner'
      });
    }
    
    // Broadcast updated participants list
    io.to(bidId).emit('participantUpdate', { 
      participants: room.participants.map(p => p.userName),
      contractorCount: room.contractors
    });
    
    console.log(`${userName} joined bid room ${bidId}`);
  });
  
  // Handle bid placement
  socket.on('placeBid', (data, callback) => {
    const { bidId, userId, userName, amount } = data;
    const room = bidRooms.get(bidId);
    
    // Check if callback is a function before using it
    const isCallbackFunction = typeof callback === 'function';
    
    if (!room) {
      if (isCallbackFunction) {
        return callback({ error: 'Bid room not found' });
      }
      return;
    }
    
    if (!room.biddingStarted) {
      if (isCallbackFunction) {
        return callback({ error: 'Bidding has not started yet. Waiting for at least 2 contractors.' });
      }
      return;
    }
    
    if (!room.isActive) {
      if (isCallbackFunction) {
        return callback({ error: 'Bidding has ended' });
      }
      return;
    }
    
    if (amount >= room.currentLowestBid) {
      if (isCallbackFunction) {
        return callback({ error: 'Bid must be lower than current lowest bid' });
      }
      return;
    }
    
    // Add bid to history
    const newBid = {
      userId,
      userName,
      amount,
      timestamp: new Date()
    };
    
    // Insert at beginning (most recent first)
    room.bidHistory.unshift(newBid);
    room.currentLowestBid = amount;
    
    // Reset the cooldown timer when a new bid is placed
    startOrResetCooldown(bidId);
    
    // Broadcast bid update
    io.to(bidId).emit('bidUpdate', { 
      newBid: amount, 
      bidder: userName, 
      bids: room.bidHistory 
    });
    
    console.log(`New bid in room ${bidId} by ${userName}: ${amount}`);
    
    if (isCallbackFunction) {
      callback({ success: true });
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    // Find and remove participant from all rooms they were in
    bidRooms.forEach((room, roomId) => {
      const index = room.participants.findIndex(p => p.socketId === socket.id);
      
      if (index !== -1) {
        const participant = room.participants[index];
        room.participants.splice(index, 1);
        
        // Decrease contractor count if necessary
        if (participant.role === 'contractor') {
          room.contractors--;
        }
        
        // Broadcast updated participants list
        io.to(roomId).emit('participantUpdate', { 
          participants: room.participants.map(p => p.userName),
          contractorCount: room.contractors
        });
        
        console.log(`${participant.userName} left bid room ${roomId}`);
      }
    });
    
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Create some mock bid rooms
createBidRoom('BID12345', 1000000);
createBidRoom('BID67890', 500000);

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});

// Cleanup on server shutdown
process.on('SIGINT', () => {
  // Clear all timers
  bidRooms.forEach(room => {
    if (room.mainTimerId) {
      clearInterval(room.mainTimerId);
    }
    if (room.cooldownTimerId) {
      clearInterval(room.cooldownTimerId);
    }
  });
  process.exit(0);
});