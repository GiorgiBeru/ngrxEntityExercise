const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);
// Custom POST endpoint to insert each member of the array
server.post('/users/insert-users', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Request body must be an array' });
  }
  
  const users = req.body;
  const db = router.db; // Get a reference to the database
  
  const insertedUsers = users.map(user => {
    const lastUserId = db.get('users').value().reduce((maxId, user) => {
      const idNumber = user.id;
      return idNumber > maxId ? idNumber : maxId;
    }, 0);
    
    const newUserId = lastUserId+ 1;
    const newUser = { ...user, id: newUserId };
    
    db.get('users').push(newUser).write();
    return newUser;
  });
  
  res.status(201).json(insertedUsers);
});
server.put('/users/update-users', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Request body must be an array' });
  }
  console.log('bla')
  const users = req.body;
  const db = router.db; // Get a reference to the database
  
  const updatedUsers = users.map(user => {
    const existingUser = db.get('users').find({ id: user.id }).value();
    if (existingUser) {
      const updatedUser = { ...existingUser, ...user };
      db.get('users').find({ id: user.id }).assign(updatedUser).write();
      return updatedUser;
    } else {
      return null; // User not found
    }
  });
  
  res.status(200).json(updatedUsers);
});
server.delete('/users/all', (req, res) => {
  const db = router.db;
  console.log('shemodis')
  db.get('users').remove().write();

  res.status(204).send(); // 204 No Content
});

// Handle DELETE request to delete all users

server.delete('/users', (req, res) => {
  const userIDsToDelete = req.body; // Assuming an array of user IDs

  if (!Array.isArray(userIDsToDelete)) {
    return res.status(400).json({ error: 'Request body must be an array' });
  }

  const db = router.db;

  // Remove users with matching IDs from the array
  userIDsToDelete.forEach(userID => {
    db.get('users').remove({ id: userID }).write();
  });

  res.status(204).send(); // 204 No Content
});


server.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const db = router.db;

  // Find the index of the user with the provided ID
  const userIndex = db.get('users').findIndex({ id: userId }).value();

  if (userIndex !== -1) {
    // Remove the user from the array
    db.get('users').splice(userIndex, 1).write();
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

server.use(router);
server.listen(4000, () => {
  console.log('JSON Server is running');
});
