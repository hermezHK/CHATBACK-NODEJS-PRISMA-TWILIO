import prisma from "../../datasource";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.TZ_SECRET,
  cluster: "us2",
  useTLS: true
});

const findOne = async (email) => {
  try {
    return await prisma.user.findFirst({ where: { email } });
  } catch (error) {
    return false;
  }
};

export const findAll = async (req, res) => {
  try {
    const users = prisma.user.findMany();
    res.json({
      ok: true,
      data: users,
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

    const userByEmail = await findOne(body.email);

    if (userByEmail) {
      return res.json({
        ok: true,
        data: userByEmail,
      });
    }

    body.profile_url = `https://avatars.dicebear.com/api/avataaars/${body.name}.svg`;

    const user = await prisma.user.create({ data: { ...body } });
    pusher.trigger("my-channel", "my-event", 
    { message: "Hola Hermez"});
    res.status(201).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      data: error.message,
    });
  }
};