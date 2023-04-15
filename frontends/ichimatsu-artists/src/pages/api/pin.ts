import fs from "fs";
import { URL_PIN_FILE_TO_PINATA } from "@/domains/pinata/constants";
import { ResponsePinFileToPinata } from "@/domains/pinata/types/response";
import axios from "axios";
import FormData from "form-data";
import { IncomingForm } from "formidable";
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
  console.log("/api/pin is called!");
  if (process.env.PINATA_SECRET_JSON === undefined) {
    res.status(500).json({ error: "PINATA_SECRET_JSON not defined" });

    return;
  }
  if (req.method === "POST") {
    try {
      const form = new IncomingForm();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await new Promise<Record<string, any>>((resolve, reject) => {
        console.log("Before form.parse");
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error("Error in form.parse:", err);
            reject(err);

            return;
          }
          console.log("Form parsed successfully:", { fields, files });
          resolve({ fields, files });
        });
      });

      const file = data.files.file; // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const fileStream = fs.createReadStream(file.filepath); // eslint-disable-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      const formData = new FormData();
      formData.append("file", fileStream, {
        filename: file.originalFilename, // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        contentType: file.mimetype, // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      });

      const headers = {
        Authorization: `Bearer ${process.env.PINATA_SECRET_JSON}`,
        ...formData.getHeaders(),
      };

      const response = await axios.post<ResponsePinFileToPinata>(
        URL_PIN_FILE_TO_PINATA,
        formData,
        {
          headers,
        }
      );

      console.log("/api/pin is finished!");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      fs.unlink(file.filepath, (err) => {
        if (err) {
          console.error("Error deleting temporary file:", err);
        }
      });
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Error uploading file" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
