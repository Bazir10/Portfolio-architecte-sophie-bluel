// auth.js
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
    // Exemple de logique d'authentification (à adapter selon vos besoins)
    const { email, password } = req.body;

    // Vérifiez les identifiants 
    if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
        const user = { email }; // Vous pouvez inclure plus d'informations ici

        // Créer un token (signé avec une clé secrète, assurez-vous de gérer cela en toute sécurité)
        const token = jwt.sign(user, 'clé_secrète' expiresIn: '24h');

        res.json({ token });
    } else {
        res.status(401).json({ message: 'Identifiants invalides' });
    }
});

module.exports = router;

 