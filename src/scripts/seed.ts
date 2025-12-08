/**
 * Seed script to initialize database with default data
 *
 * Run this script using: npm run seed
 * or: ts-node -r tsconfig-paths/register src/scripts/seed.ts
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { InitializeScoringRulesService } from '../scoring-rules/services/initialize-scoring-rules.service';
import { GetUserService } from '../users/services/get-user.service';
import { UserRole } from '../users/enums/user-role.enum';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('Starting database seed...');

    const initializeScoringRulesService = app.get(
      InitializeScoringRulesService,
    );
    const getUserService = app.get(GetUserService);

    // Find or create a default admin user for initialization
    // You may need to adjust this based on your user creation logic
    let adminUserId: string;

    try {
      // Try to find an admin user
      const usersResult = await getUserService.findAll(
        { role: UserRole.ADMIN },
        { page: 1, limit: 1 },
      );
      const adminUser = usersResult.edges?.[0]?.node;

      if (adminUser) {
        adminUserId = adminUser._id;
        console.log(`Using existing admin user: ${adminUser.email}`);
      } else {
        // If no admin exists, you might want to create one or use a default ID
        console.log('No admin user found. Please create an admin user first.');
        console.log('Using system user ID for initialization...');
        adminUserId = 'system'; // Fallback system user ID
      }
    } catch {
      console.log('Could not fetch users, using system user ID...');
      adminUserId = 'system';
    }

    // Initialize scoring rules
    console.log('Initializing scoring rules...');
    await initializeScoringRulesService.initialize(adminUserId);
    console.log('Scoring rules initialized successfully!');

    console.log('Database seed completed successfully!');
  } catch (error) {
    console.error('Seed failed:', error);
    throw error;
  } finally {
    await app.close();
  }
}

// Run seed if executed directly
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seed script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed script failed:', error);
      process.exit(1);
    });
}

export { seed };
