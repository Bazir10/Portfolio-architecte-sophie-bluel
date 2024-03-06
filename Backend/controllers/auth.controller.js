
const jwt = require('jsonwebtoken');

// Exemple de logique d'authentification (à adapter selon vos besoins)
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Vérifiez les identifiants
  if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
    const user = { email }; // Vous pouvez inclure plus d'informations ici

    // Créer un token (signé avec une clé secrète)
    const token = jwt.sign(user, 'clé_secrète', { expiresIn: '24h' });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Identifiants invalides' });
  }
};
