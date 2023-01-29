import { exampleRouter } from "./routers/example";
import { friendsRouter } from "./routers/friends";
import { twilioRouter } from "./routers/twilio";
<<<<<<< HEAD
import { userRouter } from "./routers/user";
=======
>>>>>>> 18de690f58d8f654ea83b622163d145a99174246
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
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
