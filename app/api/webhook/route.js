import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { createOrUpdateUser, deleteUser } from '@lib/actions/user';

export async function POST(req) {
  // Ensure the MongoDB connection is established
  await connectToDB();

  // Retrieve the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Extract svix headers from the request
  const headerPayload = headers(req);
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If required svix headers are missing, return an error response
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- missing svix headers', {
      status: 400,
    });
  }

  // Extract and parse the webhook payload
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with the webhook secret
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  // Verify the payload with the svix headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  // Handle the event based on its type
  const eventType = evt?.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, image_url, email_addresses, username } = evt?.data;

    try {
      // Call the function to create or update the user in the database
      await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username
      );

      // Return a success response
      return new Response('User is created or updated', {
        status: 200,
      });
    } catch (err) {
      console.error('Error creating or updating user:', err);
      return new Response('Error occurred', {
        status: 500,
      });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt?.data;

    try {
      // Call the function to delete the user from the database
      await deleteUser(id);

      // Return a success response
      return new Response('User is deleted', {
        status: 200,
      });
    } catch (err) {
      console.error('Error deleting user:', err);
      return new Response('Error occurred', {
        status: 500,
      });
    }
  }
}
