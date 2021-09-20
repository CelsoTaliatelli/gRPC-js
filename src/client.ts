import { ChannelCredentials } from '@grpc/grpc-js'
import { NotesClient } from '../proto/notes_grpc_pb'
import { Void } from '../proto/notes_pb'

const client = new NotesClient('0.0.0.0:50052', ChannelCredentials.createInsecure())
client.list(new Void(), (err, notes) => {
  if (err) return console.log(err)
  console.log(notes.toObject())
})