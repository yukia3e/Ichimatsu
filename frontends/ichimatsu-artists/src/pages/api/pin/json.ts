import { URL_PIN_JSON_TO_PINATA } from "@/domains/pinata/constants";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  console.log("/api/pin/json is called!");
  if (process.env.PINATA_SECRET_JSON === undefined) {
    res.status(500).json({ error: "PINATA_SECRET_JSON not defined" });

    return;
  }
  if (req.method === "POST") {
    const pinataContent = req.body; // eslint-disable-line @typescript-eslint/no-unsafe-assignment

    const data = JSON.stringify({ pinataContent }); // eslint-disable-line @typescript-eslint/no-unsafe-assignment

    const config = {
      method: "post",
      url: URL_PIN_JSON_TO_PINATA,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PINATA_SECRET_JSON}`,
      },
      data,
    };

    try {
      const pinataResponse = await axios(config);
      res.status(200).json(pinataResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to pin JSON to IPFS" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `Method ${req.method || ""} is not allowed` });
  }
};

export default handler;
