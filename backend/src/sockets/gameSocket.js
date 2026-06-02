/**
 * Socket.io - Manejo de conexiones cooperativas
 * Preparado para futuro desarrollo de multiplayer online
 */

export const initializeSocketIO = (io) => {
  const rooms = new Map();

  io.on('connection', (socket) => {
    console.log(`✓ Cliente conectado: ${socket.id}`);

    // Crear sala
    socket.on('create-room', (data) => {
      const roomId = Math.random().toString(36).substring(7);
      const room = {
        id: roomId,
        host: socket.id,
        players: [socket.id],
        missionId: data.missionId,
        createdAt: Date.now(),
      };

      rooms.set(roomId, room);
      socket.join(roomId);

      socket.emit('room-created', {
        roomId,
        room,
      });

      console.log(`✓ Sala creada: ${roomId}`);
    });

    // Unirse a sala
    socket.on('join-room', (data) => {
      const { roomId } = data;
      const room = rooms.get(roomId);

      if (!room) {
        socket.emit('error', {
          message: 'Sala no encontrada',
        });
        return;
      }

      if (room.players.length >= 4) {
        socket.emit('error', {
          message: 'Sala llena',
        });
        return;
      }

      room.players.push(socket.id);
      socket.join(roomId);

      io.to(roomId).emit('player-joined', {
        players: room.players,
        count: room.players.length,
      });

      console.log(`✓ Jugador se unió a sala ${roomId}`);
    });

    // Sincronizar posición
    socket.on('sync-position', (data) => {
      const { roomId, position, rotation } = data;
      const room = rooms.get(roomId);

      if (room) {
        socket.to(roomId).emit('player-position', {
          playerId: socket.id,
          position,
          rotation,
        });
      }
    });

    // Sincronizar NPC
    socket.on('sync-npc', (data) => {
      const { roomId, npcState } = data;
      const room = rooms.get(roomId);

      if (room) {
        socket.to(roomId).emit('npc-update', {
          npcState,
        });
      }
    });

    // Desconectar
    socket.on('disconnect', () => {
      for (const [roomId, room] of rooms) {
        if (room.players.includes(socket.id)) {
          room.players = room.players.filter((id) => id !== socket.id);

          if (room.players.length === 0) {
            rooms.delete(roomId);
          } else {
            io.to(roomId).emit('player-left', {
              playerId: socket.id,
              players: room.players,
            });
          }
        }
      }

      console.log(`✗ Cliente desconectado: ${socket.id}`);
    });
  });
};

export default initializeSocketIO;
