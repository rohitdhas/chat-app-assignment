const Movie = require("../database/schema/movieSchema");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

// GFS Connnection
let gfs;
const conn = mongoose.connection;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("media");
});

const uploadFile = async (req, res) => {
  const file = req.files.file[0].filename;
  // Storing File Ref in DB
  try {
    req.body.file = file;
    let newMovie = new Movie(req.body);
    await newMovie.save();

    res
      .status(200)
      .json({ msg: "Upload Finished!", data: req.body, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message, success: false });
  }
};

const readFileData = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Not Found!", success: false });
  }
};

module.exports = { uploadFile, readFileData };
