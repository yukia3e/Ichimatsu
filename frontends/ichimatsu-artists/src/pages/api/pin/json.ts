import PersistentFile from "formidable/PersistentFile";
import { URL_PIN_FILE_TO_PINATA } from "@/domains/pinata/constants";
import { ResponsePinJSONToPinata } from "@/domains/pinata/types/response";
import { getRandomString } from "@/utils/random";
import * as fs from "async-file";
import axios from "axios";
import FormData from "form-data";
import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

const path = require("path");
const basePathConverter = require("base-path-converter");

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
    try {
      const form = new IncomingForm();
      const data = await new Promise<Record<string, any>>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);

            return;
          }
          resolve({ fields, files });
        });
      });

      const formData = new FormData();
      const files: PersistentFile & { filepath: string; mimetype: string }[] =
        Object.values(data.files);

      console.log("-------- files", files);

      let i = 0;
      const afterPaths: string[] = [];
      let dirName = "";
      for (const file of files) {
        dirName = path.dirname(file.filepath);
        const beforePath = file.filepath;
        const afterPath = `${dirName}/${String(i)}`;
        await fs.rename(beforePath, afterPath);

        afterPaths.push(afterPath);
        i++;
      }

      i = 0;
      for (const afterPath of afterPaths) {
        const fileStream = fs.createReadStream(afterPath);
        console.log("------i", i, afterPath);
        formData.append("file", fileStream, {
          filepath: basePathConverter(dirName, afterPath),
          filename: String(i),
        });
        i++;
      }

      const headers = {
        Authorization: `Bearer ${process.env.PINATA_SECRET_JSON}`,
        "Content-Type": `multipart/form-data;`,
        ...formData.getHeaders(),
      };

      const response = await axios.post<ResponsePinJSONToPinata>(
        URL_PIN_FILE_TO_PINATA,
        formData,
        {
          headers,
        }
      );

      console.log("/api/pin/json is finished!");

      for (const afterPath of afterPaths) {
        await fs.unlink(afterPath);
      }
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error uploading JSON file:", error);
      res.status(500).json({ error: "Error uploading JSON file" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
