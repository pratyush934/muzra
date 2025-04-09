import prisma from "@/lib/prisma";
import { YT_REGEX } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

type Upvote = {
  id: string;
  userId: string;
  streamId: string;
};

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYoutube = YT_REGEX.test(data.url);

    if (!isYoutube) {
      return NextResponse.json(
        {
          message: "Wrong url format",
        },
        {
          status: 400,
        }
      );
    }

    const extractedId = data.url.split("?v=")[1];

    await prisma.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        active: true,
        upvotes: 0,
        Upvote: undefined,
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while parsing the CreateStream",
      },
      {
        status: 400,
      }
    );
  }
}
