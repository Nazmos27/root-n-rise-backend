import cron from 'node-cron';
import { User } from '../modules/user/user.model';

const checkPlanValidity = async () => {
  try {
    const now = new Date();

    // Find and update all users with an expired plan validity in a single query
    const result = await User.updateMany(
      { plan: 'premium', planValidity: { $lte: now } },
      { $set: { plan: 'basic' } },
    );

    if (result.modifiedCount > 0) {
      console.log(
        `Downgraded ${result.modifiedCount} users to the basic plan.`,
      );
    } else {
      console.log('No users with expired plans found.');
    }
  } catch (error) {
    console.error('Error checking plan validity:', error);
  }
};

// Schedule the function to run daily at midnight (00:00)
cron.schedule('0 0 * * *', checkPlanValidity);

