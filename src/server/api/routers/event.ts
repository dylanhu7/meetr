import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const eventsRouter = createTRPCRouter({
  getEvents: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.friend
      .findMany({
        where: {
          userId: ctx.session.user.id,
        },
      })
      .then((friends) => {
        return ctx.prisma.event.findMany({
          where: {
            friendId: {
              in: friends.map((friend) => friend.id),
            },
          },
          include: {
            friend: true,
          },
        });
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
