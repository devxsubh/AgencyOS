import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  sections: [{
    heading: String,
    content: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  trending: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  }
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;