const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'secreta_chave';


app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'usuario não tem' });
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) return res.status(401).json({ error: 'senha invalida' });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });
    res.status(200).json({ auth: true, token , message: 'deu certo'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers['autorizado bb'];
  if (!token) return res.status(401).json({ auth: false, message: 'nenhum token recebido' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).json({ auth: false, message: 'falha no token' });
    req.userId = decoded.id;
    next();
  });
};

app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ auth: true, message: 'acesso liberado' });
});

app.listen(PORT, () => {
  console.log(`servidor esta rodando na porta ${PORT}`);
});
