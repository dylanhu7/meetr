import { eventsRouter } from "./routers/event";
import { exampleRouter } from "./routers/example";
import { friendsRouter } from "./routers/friends";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  friends: friendsRouter,
  events: eventsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
