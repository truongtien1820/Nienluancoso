import { model, Schema, Document } from 'mongoose';
import { Post } from '@/interfaces/posts.interface';

const postSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  idUser: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const postModel = model<Post & Document>('Post', postSchema);

export default postModel;
