import dbConnect from "../../../utils/db-connect";
import initMiddleware from "../../lib/init-middleware";
import User from "../../../models/User";

const useCors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  await useCors(req, res);

  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const user = await User.findOne({ user: id }, { _id: 0 });
        res.status(200).json({ success: !!user, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      try {
        await User.findOneAndUpdate({ user: id }, req.body);
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
