import express from 'express';
import { prisma } from '../lib/prisma';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Prisma API!');
});

app.post('/user', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  }
  catch {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/users', async (requestAnimationFrame, res) => {
    try{
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch{
        res.status(500).json({ error: 'Failed to fetch users'});
    }
});

app.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { Userid: id },
      data: { name, email },
    });
    res.json(user);
  }
  catch{
    res.status(500).json({ error: 'Failed to update user' });
  }
});

//workshop 7
app.get('/user/email/:email', async (req, res) => { 
    const userEmail = req.params.email;
    try {
        const user = await prisma.user.findUnique({
            where: { email: userEmail }
        });
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch {
        res.status(500).json({ error: 'Failed to fetch user'});
    }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: { Userid: id },
    });
    res.json({ message: 'User deleted successfully', user });
  } catch {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/posts', async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.status(201).json(post);
  } catch {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { postId: id },
    });
    
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;
  
  try {
    const post = await prisma.post.update({
      where: { postId: id },
      data: { title, content, published },
    });
    res.json(post);
  } catch {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.delete({
      where: { postId: id },
    });
    res.json({ message: 'Post deleted successfully', post });
  } catch {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});