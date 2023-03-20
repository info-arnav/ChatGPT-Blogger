import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    res.json({ status: "Good" });
  } catch (e) {
    console.error(e);
  }
};
