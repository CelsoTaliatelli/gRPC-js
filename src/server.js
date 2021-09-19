const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const protoObject = protoLoader.loadSync(path.resolve(__dirname,'../proto/notes.proto'))
const NotesDefinition = grpc.loadPackageDefinition(protoObject);


function Arraynotes(){
    const notes = [];
    for(let i = 0; i < 1000; i++){
        notes.push({
            id:i +1,
            title:'Note',
            description:'Content'
        })
    }
    return notes;
}

const notes = [...Arraynotes()];

function List(_, callback){
    return callback(null,{notes})
}

/*function Find({request: {id}},callback){
    const note = notes().find((note) => note.id === id);
    if(!note) return callback(new Error('Not Found'),null)
    return callback(null,{note})
}*/

const server = new grpc.Server()
server.addService(NotesDefinition.NoteService.service,{List})

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();
console.log('Listening');