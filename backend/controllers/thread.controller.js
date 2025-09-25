import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";

export const getThreads = async (req, res, next) => {
  try {
    const threads = await prisma.threads.findMany({
      include: {
        users: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    res.json(threads);
  } catch (err) {
    next(err);
  }
};

export const createThread = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const { id: userId } = req.user; // Get user id from token

    const newThread = await prisma.threads.create({
      data: {
        title,
        body,
        user_id: userId,
      },
    });

    res.status(201).json(newThread);
  } catch (err) {
    next(err);
  }
};

export const getThread = async (req, res, next) => {
  try {
    const { id } = req.params;
    const thread = await prisma.threads.findUnique({
      where: {
        thread_id: parseInt(id),
      },
      include: {
        users: {
          select: {
            username: true,
          },
        },
        replies: {
          include: {
            users: {
              select: {
                username: true,
              },
            },
            replies: {
              include: {
                users: {
                  select: {
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!thread) return next(createError(404, "Thread not found"));
    res.json(thread);
  } catch (err) {
    next(err);
  }
};

export const createReply = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body, parent_id } = req.body;
    const { id: userId } = req.user;

    const newReply = await prisma.replies.create({
      data: {
        thread_id: parseInt(id),
        user_id: userId,
        body,
        parent_id,
      },
    });

    const thread = await prisma.threads.findUnique({
      where: {
        thread_id: parseInt(id),
      },
      include: {
        users: {
          select: {
            username: true,
          },
        },
        replies: {
          include: {
            users: {
              select: {
                username: true,
              },
            },
            replies: {
              include: {
                users: {
                  select: {
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(201).json(thread);
  } catch (err) {
    next(err);
  }
};
