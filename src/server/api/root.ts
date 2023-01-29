import { exampleRouter } from "./routers/example";
<<<<<<< HEAD
import { friendsRouter } from "./routers/friends";
=======
>>>>>>> bb6a73b176e12ce187c673277ce5f9ee77ea7e81
import { twilioRouter } from "./routers/twilio";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
<<<<<<< HEAD
  friends: friendsRouter,
=======
>>>>>>> bb6a73b176e12ce187c673277ce5f9ee77ea7e81
  twilio: twilioRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
