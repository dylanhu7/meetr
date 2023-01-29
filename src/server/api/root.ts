import { exampleRouter } from "./routers/example";
<<<<<<< HEAD
import { friendsRouter } from "./routers/friends";
=======
>>>>>>> 27033f7 (twilio routers)
import { twilioRouter } from "./routers/twilio";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  friends: friendsRouter,
  twilio: twilioRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
