import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const friendsRouter = createTRPCRouter({
  deleteFriend: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.friend.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getFriend: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.friend.findUnique({
        where: {
          id: input.id,
        },
        include: {
          events: true,
        },
      });
    }),
  updateFriend: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        birthday: z.date().optional(),
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
      include: {
        events: true,
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
