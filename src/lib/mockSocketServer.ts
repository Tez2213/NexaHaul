import { Server } from 'socket.io';

// This is just a reference implementation - not to be used in production
export function setupMockSocketServer() {
  // In a real implementation, this would be a separate server
  // For development/demo purposes, we're simulating the server behavior
  
  // Mock data
  const bidRoom = {
    initialAmount: 1000000,
    currentLowestBid: 1000000,
    timeRemaining: 300,
    participants: [],
    bidHistory: [],
    isActive: true,
    winner: null,
    timerId: null
  };
  
  // Mock server implementation
  const mockServer = {
    startCountdown() {
      const intervalId = setInterval(() => {
        bidRoom.timeRemaining -= 1;
        
        if (bidRoom.timeRemaining <= 0) {
          clearInterval(intervalId);
          bidRoom.isActive = false;
          
          // Determine winner (last bidder)
          if (bidRoom.bidHistory.length > 0) {
            const winningBid = bidRoom.bidHistory[0]; // Most recent bid
            bidRoom.winner = winningBid.userName;
            
            // Broadcast winning event
            // In a real implementation this would emit to clients
            console.log('Bidding completed', { 
              winner: bidRoom.winner, 
              finalAmount: bidRoom.currentLowestBid 
            });
          }
        }
        
        // In a real implementation this would emit to clients
        console.log('Timer update', { timeRemaining: bidRoom.timeRemaining });
      }, 1000);
      
      bidRoom.timerId = intervalId;
    },
    
    handleConnection(userId, userName, role) {
      if (!bidRoom.participants.some(p => p.userId === userId)) {
        bidRoom.participants.push({ userId, userName, role });
        
        // Start countdown if this is the first participant
        if (bidRoom.participants.length === 1) {
          this.startCountdown();
        }
        
        // In a real implementation this would emit to clients
        console.log('Participant update', { 
          participants: bidRoom.participants.map(p => p.userName) 
        });
      }
    },
    
    handleDisconnection(userId) {
      const index = bidRoom.participants.findIndex(p => p.userId === userId);
      if (index !== -1) {
        bidRoom.participants.splice(index, 1);
        
        // In a real implementation this would emit to clients
        console.log('Participant update', { 
          participants: bidRoom.participants.map(p => p.userName) 
        });
      }
    },
    
    handleBid(userId, userName, amount) {
      if (!bidRoom.isActive) {
        return { error: 'Bidding has ended' };
      }
      
      if (amount >= bidRoom.currentLowestBid) {
        return { error: 'Bid must be lower than current bid' };
      }
      
      // Add bid to history
      const newBid = {
        userId,
        userName,
        amount,
        timestamp: new Date()
      };
      
      // Insert at beginning (most recent first)
      bidRoom.bidHistory.unshift(newBid);
      bidRoom.currentLowestBid = amount;
      
      // In a real implementation this would emit to clients
      console.log('Bid update', { 
        newBid: amount, 
        bidder: userName, 
        bids: bidRoom.bidHistory 
      });
      
      return { success: true };
    }
  };
  
  return mockServer;
}