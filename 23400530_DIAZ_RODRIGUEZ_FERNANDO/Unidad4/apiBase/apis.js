const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect(
    "mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix",
  )
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log("Error al conectar a la base de datos", err);
  });

// Definición del esquema de la colección "series"
const serieSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    genero: { type: String, required: true, trim: true },
    año: { type: Number, required: true, min: 1 },
    temporadas: { type: Number, required: true, min: 1 },
    episodios: { type: Number, required: true, min: 1 },
    idioma: { type: String, required: true, trim: true },
    calificacion: { type: Number, required: true, min: 1, max: 10 },
    nc: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

const serie = mongoose.model("Serie", serieSchema, "series");

// Definición del esquema de la colección "peliculas"
const peliculaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    genero: { type: String, required: true, trim: true },
    año: { type: Number, required: true, min: 1 },
    duracion: { type: Number, required: true, min: 1 },
    idioma: { type: String, required: true, trim: true },
    calificacion: { type: Number, required: true, min: 1, max: 10 },
    nc: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

const pelicula = mongoose.model("Pelicula", peliculaSchema, "peliculas");

// Mensaje de iniciación del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Ruta principal del servidor
app.get("/", (req, res) => {
  res.send("¡Hola Mundo!");
});

// ---------------------- RUTAS PARA LA COLECCIÓN SERIES ----------------------
// Obtener todas las series
app.get("/series", async (req, res) => {
  try {
    const series = await serie.find();
    res.json(series);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las series",
      error: error,
    });
  }
});

//Obtener una serie por su ID
app.get("/series/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const serieEncontrada = await serie.findById(id);
    if (!serieEncontrada) {
      return res.status(404).json({
        mensaje: "Serie no encontrada",
      });
    }
    res.json(serieEncontrada);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la serie",
      error: error,
    });
  }
});

// Crear una nueva serie
app.post("/series", async (req, res) => {
  try {
    const {
      titulo,
      genero,
      año,
      temporadas,
      episodios,
      idioma,
      calificacion,
      nc,
    } = req.body;
    if (
      !titulo ||
      !genero ||
      !año ||
      !temporadas ||
      !episodios ||
      !idioma ||
      !calificacion ||
      !nc
    ) {
      return res.status(400).json({
        mensaje: "Faltan datos de la serie",
      });
    }

    const nuevaSerie = new serie({
      titulo,
      genero,
      año,
      temporadas,
      episodios,
      idioma,
      calificacion,
      nc,
    });

    await nuevaSerie.save();
    res.status(201).json({
      mensaje: "Serie creada exitosamente",
      serie: nuevaSerie,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear la serie",
      error: error,
    });
  }
});

// Actualizar una serie existente
app.put("/series/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      titulo,
      genero,
      año,
      temporadas,
      episodios,
      idioma,
      calificacion,
      nc,
    } = req.body;

    const serieActualizada = await serie.findByIdAndUpdate(
      id,
      { titulo, genero, año, temporadas, episodios, idioma, calificacion, nc },
      { new: true },
    );

    if (!serieActualizada) {
      return res.status(404).json({
        mensaje: "Serie no encontrada",
      });
    }

    res.json({
      mensaje: "Serie actualizada exitosamente",
      serie: serieActualizada,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar la serie",
      error: error,
    });
  }
});

// Eliminar una serie existente
app.delete("/series/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const serieEliminada = await serie.findByIdAndDelete(id);

    if (!serieEliminada) {
      return res.status(404).json({
        mensaje: "Serie no encontrada",
      });
    }

    res.json({
      mensaje: "Serie eliminada exitosamente",
      serie: serieEliminada,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al eliminar la serie",
      error: error,
    });
  }
});

// ---------------------- RUTAS PARA LA COLECCIÓN PELICULAS ----------------------
app.get("/peliculas", async (req, res) => {
  try {
    const peliculas = await pelicula.find();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las peliculas",
      error: error,
    });
  }
});

//Obtener una pelicula por su ID
app.get("/peliculas/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const peliculaEncontrada = await pelicula.findById(id);
    if (!peliculaEncontrada) {
      return res.status(404).json({
        mensaje: "Pelicula no encontrada",
      });
    }
    res.json(peliculaEncontrada);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la pelicula",
      error: error,
    });
  }
});

// Crear una nueva pelicula
app.post("/peliculas", async (req, res) => {
  try {
    const { titulo, genero, año, duracion, idioma, calificacion, nc } =
      req.body;
    if (
      !titulo ||
      !genero ||
      !año ||
      !duracion ||
      !idioma ||
      !calificacion ||
      !nc
    ) {
      return res.status(400).json({
        mensaje: "Faltan datos de la pelicula",
      });
    }

    const nuevaPelicula = new pelicula({
      titulo,
      genero,
      año,
      duracion,
      idioma,
      calificacion,
      nc,
    });

    await nuevaPelicula.save();
    res.status(201).json({
      mensaje: "Pelicula creada exitosamente",
      pelicula: nuevaPelicula,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear la pelicula",
      error: error,
    });
  }
});

// Actualizar una pelicula existente
app.put("/peliculas/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, genero, año, duracion, idioma, calificacion, nc } =
      req.body;

    const peliculaActualizada = await pelicula.findByIdAndUpdate(
      id,
      { titulo, genero, año, duracion, idioma, calificacion, nc },
      { new: true },
    );

    if (!peliculaActualizada) {
      return res.status(404).json({
        mensaje: "Pelicula no encontrada",
      });
    }

    res.json({
      mensaje: "Pelicula actualizada exitosamente",
      pelicula: peliculaActualizada,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar la pelicula",
      error: error,
    });
  }
});

// Eliminar una pelicula existente
app.delete("/peliculas/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const peliculaEliminada = await pelicula.findByIdAndDelete(id);

    if (!peliculaEliminada) {
      return res.status(404).json({
        mensaje: "Pelicula no encontrada",
      });
    }

    res.json({
      mensaje: "Pelicula eliminada exitosamente",
      pelicula: peliculaEliminada,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al eliminar la pelicula",
      error: error,
    });
  }
});
