const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom POST endpoint to insert each member of the array
server.post('/users/insert-users', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Request body must be an array' });
  }
  
  const users = req.body;
  const db = router.db; // Get a reference to the database
  
  const insertedUsers = users.map(user => {
    const lastUserId = db.get('users').value().reduce((maxId, user) => {
      const idNumber = user.id; // Convert "s" + number to number
      return idNumber > maxId ? idNumber : maxId;
    }, 0);
    
    const newUserId = lastUserId+ 1;
    const newUser = { ...user, id: newUserId };
    
    db.get('users').push(newUser).write();
    return newUser;
  });
  
  res.status(201).json(insertedUsers);
});

server.use(router);
server.listen(4000, () => {
  console.log('JSON Server is running');
});
