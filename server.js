require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/generar-token", (req, res) => {
  const { usuario_id, sucursal_id, rol = "anon" } = req.body;

  if (!usuario_id || !sucursal_id) {
    return res.status(400).json({ error: "Faltan datos." });
  }

  const payload = {
    sub: usuario_id,
    role: rol,
    sucursal_id: sucursal_id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    issuer: "supabase",
    expiresIn: "7d",
  });

  res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
