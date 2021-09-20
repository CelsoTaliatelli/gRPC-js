import { sendUnaryData, Server, ServerCredentials, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js';
import { promisify } from 'util';
import { INotesServer, NotesService } from './../proto/notes_grpc_pb';
import { Note, NoteListResponse, Void } from './../proto/notes_pb';

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

const notes: Note.AsObject[] = [...Arraynotes()]

class NotesServer implements INotesServer{
    
    list (_: ServerUnaryCall<Void, NoteListResponse>, callback: sendUnaryData<NoteListResponse>): void {
        const response = new NoteListResponse()
        notes.forEach((note) => {
          response.addNotes(
            (new Note).setId(note.id)
                      .setTitle(note.title)
                      .setDescription(note.description)
          )
        })
        callback(null, response)
      }

    [name: string]: UntypedHandleCall;
}

const server = new Server()
server.addService(NotesService, new NotesServer())

const bindPromise = promisify(server.bindAsync).bind(server)

bindPromise('0.0.0.0:50052', ServerCredentials.createInsecure())
  .then((port) => {
    console.log(`listening on ${port}`)
    server.start()
  })
  .catch(console.error)