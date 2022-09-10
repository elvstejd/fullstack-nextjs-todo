import { NextApiResponse, NextApiRequest, NextApiHandler } from "next";
import { getServerAuthSession } from "./get-server-auth-session";

export function withAuthentication(apiRoute: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await getServerAuthSession({ req, res });
    if (!session) {
      res.status(401).end();
      return;
    }

    const uid = session.user.id;
    req.headers.uid = uid;

    await apiRoute(req, res);
  };
}
