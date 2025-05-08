const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function main() {
  try {
    // Test connection by getting user count
    const userCount = await prisma.user.count();
    console.log(`Database connection successful! User count: ${userCount}`);
    
    // Can also test creating a dummy user (will be deleted)
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'test-password'
      }
    });
    console.log('Test user created:', testUser);
    
    // Delete test user
    await prisma.user.delete({ where: { id: testUser.id } });
    console.log('Test user deleted');
    
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();