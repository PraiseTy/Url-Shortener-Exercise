const Url = require("../models/Url");
const { customAlphabet } = require("nanoid");

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, shortUrl } = req.body;
    const generateShortId = customAlphabet(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      6
    );

    if (!originalUrl) {
      return res.status(404).json({ error: "Url required" });
    }

    shortId = generateShortId();
    const shortenedUrl = `https://example.com/${shortId}`;

    const url = await Url.create({ originalUrl, shortUrl: shortenedUrl });
    return res.status(200).json({
      message: "Url shortened sucessfully",
      data: { originalUrl, shortUrl: shortenedUrl },
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong. Try again" });
  }
};

const getAllUrls = async (req, res) => {
  try {
    const url = await Url.find();
    return res.status(200).json(url);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong. Try again" });
  }
};

module.exports = { createShortUrl, getAllUrls };
