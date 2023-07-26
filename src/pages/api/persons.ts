import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // get all persons
    const persons = await prisma.person.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(persons);
  } else if (req.method === "POST") {
    // create person
    const person = await prisma.person.create({
      data: JSON.parse(req.body),
    });

    res.json(person);
  } else if (req.method === "PUT") {
    // update person
    const id = req.query.personId as string;
    const data = JSON.parse(req.body);
    const person = await prisma.person.update({
      where: { id },
      data,
    });

    res.json(person);
  } else if (req.method === "DELETE") {
    // delete person
    const id = req.query.personId as string;
    await prisma.person.delete({ where: { id } });

    res.json({ status: "ok" });
  }
};
