import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "POST") {
      const currentUser = await serverAuth(req,res);
      const { movieId } = req.body;
      if (!movieId || typeof movieId !== "string") {
        return res.status(400).json({ error: "Invalid movieId" });
      }
      const existingMovie = await prismadb.movie.findFirst({
        where: {
          id: movieId,
        },
      });
      if (!existingMovie) {
        throw new Error("Invalid Id");
      }
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
      return res.status(200).json(user);
    }
    if (req.method === "DELETE") {
      const currentUser = await serverAuth(req,res);
      const { movieId } = req.body;
      if (!movieId || typeof movieId !== "string") {
        return res.status(400).json({ error: "Invalid movieId" });
      }
      const existingMovie = await prismadb.movie.findFirst({
        where: {
          id: movieId,
        },
      });
      if (!existingMovie) throw new Error("Invalid ID");
      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
      const updateUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });
      return res.status(200).json(updateUser);
    }
    return res.status(405).end();
  } catch (error) {
    console.error("[FAVORITE_API_ERROR]", error); // Thêm log
    return res.status(500).json({ error: "Internal Server Error" }); // <- TRẢ VỀ RESPONSE RÕ RÀNG
  }
}
