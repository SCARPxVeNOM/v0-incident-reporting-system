// MongoDB initialization script
// Run this with: mongosh "mongodb+srv://cluster0.ectjae0.mongodb.net/" --apiVersion 1 --username pratikkumar56778_db_user --password etgWQEDg5km05zam < 01-init-mongodb.js

use incident_reporting;

// Create Users collection with indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });

// Create Incidents collection with indexes
db.incidents.createIndex({ user_id: 1 });
db.incidents.createIndex({ status: 1 });
db.incidents.createIndex({ assigned_to: 1 });
db.incidents.createIndex({ category: 1, location: 1, created_at: 1 });
db.incidents.createIndex({ created_at: -1 });

// Create Incident Updates collection with indexes
db.incident_updates.createIndex({ incident_id: 1 });
db.incident_updates.createIndex({ user_id: 1 });
db.incident_updates.createIndex({ created_at: -1 });

// Create Technician Schedule collection with indexes
db.technician_schedule.createIndex({ technician_id: 1 });
db.technician_schedule.createIndex({ incident_id: 1 });
db.technician_schedule.createIndex({ scheduled_time: 1 });
db.technician_schedule.createIndex({ status: 1 });

// Create Predictions collection with indexes
db.predictions.createIndex({ location: 1 });
db.predictions.createIndex({ category: 1 });
db.predictions.createIndex({ created_at: -1 });

// Create Notifications collection with indexes
db.notifications.createIndex({ user_id: 1 });
db.notifications.createIndex({ read: 1 });
db.notifications.createIndex({ created_at: -1 });

print("Database initialized successfully!");

