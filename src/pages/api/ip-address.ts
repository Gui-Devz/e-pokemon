// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ip: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //using a Node native API to get the user's IP address.
  const os = require("os");
  const networkInterfaces = os.networkInterfaces();

  const ipV6 = networkInterfaces.Ethernet[0].address;

  res.status(200).json({ ip: ipV6 });
}
