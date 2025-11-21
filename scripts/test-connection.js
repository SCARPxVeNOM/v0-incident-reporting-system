const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Try to read .env.local file
let uri = 'mongodb+srv://pratikkumar56778_db_user:etgWQEDg5km05zam@cluster0.ectjae0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
let dbName = 'incident_reporting';

try {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const uriMatch = envContent.match(/MONGODB_URI=(.+)/);
    const dbMatch = envContent.match(/MONGODB_DB_NAME=(.+)/);
    if (uriMatch) uri = uriMatch[1].trim();
    if (dbMatch) dbName = dbMatch[1].trim();
  }
} catch (e) {
  // Use defaults
}

async function testConnection() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
  });

  try {
    console.log('Testing MongoDB connection...');
    await client.connect();
    console.log('✓ Connected successfully!');

    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log(`✓ Database: ${dbName}`);
    console.log(`✓ Collections found: ${collections.length}`);
    collections.forEach(col => console.log(`  - ${col.name}`));

    // Test a simple operation
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log(`✓ Users in database: ${userCount}`);

    console.log('\n✅ Connection test passed!');
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.error('\n⚠️  SSL/TLS error detected. This might be a Windows OpenSSL issue.');
      console.error('   Try:');
      console.error('   1. Restart your computer');
      console.error('   2. Update Node.js to the latest version');
      console.error('   3. Check if your firewall/antivirus is blocking the connection');
    }
    process.exit(1);
  } finally {
    await client.close();
  }
}

testConnection();

