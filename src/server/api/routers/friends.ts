import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const friendsRouter = createTRPCRouter({
  getFriend: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.friend.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  updateFriend: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        birthday: z.string().optional(),
        note: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.friend.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          birthday: input.birthday,
          note: input.note,
        },
      });
    }),
  getFriends: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.friend.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  addFriend: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        birthday: z.string().optional(),
        note: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.friend.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          birthday: input.birthday,
          note: input.note,
          userId: ctx.session.user.id,
        },
      });
    }),
});
