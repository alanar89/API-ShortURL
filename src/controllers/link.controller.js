import { Link } from "../models/link.model.js";
import { nanoid } from "nanoid";

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid });
    return res.status(200).json({ links });
  } catch (error) {
    return res.json({ error: error });
  }
};

export const getLink = async (req, res) => {
  const { short } = req.params;
  try {
    const link = await Link.findOne({ shortLink: short });
    if (link) {
      return res.redirect(link.link);
    } else {
      return res.status(404).json({ msg: "link no encontrado" });
    }
  } catch (error) {
    return res.json({ error: error });
  }
};

export const createLink = async (req, res) => {
  const { link } = req.body;
  try {
    const shortLink = new Link({
      link: link,
      shortLink: nanoid(6),
      uid: req.uid,
    });

    await shortLink.save();
    return res.status(201).json({ shortLink });
  } catch (error) {
    return res.json({ error: error });
  }
};

export const updateLink = async (req, res) => {
  const { link } = req.body;

  const { id } = req.params;
  try {
    const updateLink = await Link.findOneAndUpdate({ _id: id }, { link });
    if (updateLink) {
      return res.status(200).json({ updateLink });
    } else {
      return res.status(304).json({ msg: "error al actulizar" });
    }
  } catch (error) {
    return res.json({ error: error });
  }
};

export const deleteLink = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteLink = await Link.findOneAndDelete({ _id: id });
    console.log(deleteLink);
    if (deleteLink) {
      return res.status(200).json({ deleteLink });
    } else {
      return res.status(304).json({ msg: "error al eliminar" });
    }
  } catch (error) {
    return res.json({ error: error });
  }
};
