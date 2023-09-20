import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // get all events
    const events = await prisma.event.findMany({
      orderBy: { start: "desc" },
    });
    res.json(events);
  } else if (req.method === "POST") {
    // create event
    const event = await prisma.event.create({
      data: JSON.parse(req.body),
    });

    res.json(event);
  } else if (req.method === "PUT") {
    // update event
    const id = req.query.eventId as string;
    const data = JSON.parse(req.body);
    const event = await prisma.event.update({
      where: { id },
      data,
    });

    res.json(event);
  } else if (req.method === "DELETE") {
    // delete event
    const id = req.query.eventId as string;
    await prisma.event.delete({ where: { id } });

    res.json({ status: "ok" });
  }
};
