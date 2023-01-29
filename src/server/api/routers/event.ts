import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const eventsRouter = createTRPCRouter({
  getEvents: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      include: {
        friend: true,
      },
    });
  }),
  addEvent: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.date(),
        friendId: z.string(),
        location: z.string().optional(),
        note: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.event.create({
        data: {
          name: input.name,
          date: input.date,
          friendId: input.friendId,
          location: input.location,
          note: input.note,
        },
      });
    }),
});
