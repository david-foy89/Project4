const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createTestUser() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('techforum');
    const users = db.collection('users');
    
    // Check if test user already exists
    const existingUser = await users.findOne({ username: 'testuser' });
    
    if (existingUser) {
      console.log('Test user already exists:', existingUser.username);
      return;
    }
    
    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const testUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
      bio: 'This is a test user account',
      reputation: 0,
      isActive: true,
      joinedAt: new Date(),
      lastLoginAt: null
    };
    
    const result = await users.insertOne(testUser);
    console.log('Test user created successfully:', result.insertedId);
    console.log('Login credentials:');
    console.log('Username: testuser');
    console.log('Password: password123');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

createTestUser();