const TicketContol = require('../models/ticket-control');

const ticketControl = new TicketContol();

const socketController = (socket) => {
    
    //Enviar mensaje al que se esta conectando
    socket.emit('ultimo-ticket', ticketControl.ultimo);

    //console.log('Cliente conectado', socket.id );
    socket.on('disconnect', () => {
        //console.log('Cliente desconectado', socket.id );
    });

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        //socket.broadcast.emit('enviar-mensaje', payload );

    });

    socket.on('atender-ticket', ( {escritorio}, callback ) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        //TODO: Notificar cambio en los ultimos4
        if (!ticket) {
            return callback({
                ok: false,
                msg: 'No hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }
        
        //const siguiente = ticketControl.siguiente();
        //callback(siguiente);

        //socket.broadcast.emit('enviar-mensaje', payload );

    });
    

}



module.exports = {
    socketController
}

