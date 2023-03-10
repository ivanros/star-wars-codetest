import type { NextApiRequest, NextApiResponse } from 'next';

type CommonMessage = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<CommonMessage>) {
  res.status(200).json({ message: 'Next.js API is alive!' });
}
