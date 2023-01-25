import prisma from "../../datasource";
import { pusher } from "../../services";

export const findAll = async (req, res) => {
  const senderId = Number(req.params.sender_id);
  const id = Number(req.params.id);

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            AND: [{ sender_id: senderId }, { user_id: id }],
          },
          {
            AND: [{ sender_id: id }, { user_id: senderId }],
          },
        ],
      },
      include: {
        user: true,
      },
    });
    res.json({
      ok: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      data: error.message,
    });
  }
};

export const store = async (req, res) => {
  try {
    const { body } = req;
    const message = await prisma.message.create({
      data: [...body],
      include: {
        User: true,
      },
    });
    pusher.trigger("my-chat", `new-message ${body.user_id}-${body.sender_id}`, {
      message,
    });

    res.status(200).json({
      ok: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      data: error.message,
    });
  }
};
