import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idSchema = z.object({ id: z.string() });

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
});

const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

export const exampleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  getOne: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: idSchema.parse(input),
    });
  }),

  createUser: publicProcedure.input(userSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.user.create({
      data: userSchema.parse(input),
    });
  }),

  updateUser: publicProcedure
    .input(userUpdateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        data: userUpdateSchema.parse(input),
        where: idSchema.parse(input),
      });
    }),

  deleteUser: publicProcedure.input(idSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.user.delete({
      where: idSchema.parse(input),
    });
  }),
});
