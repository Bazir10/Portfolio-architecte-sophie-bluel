const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
        const user = { email, role: 'admin' }; // Incluez le rôle de l'utilisateur

        const token = jwt.sign(user, 'clé_secrète', { expiresIn: '24h' });

        res.json({ token });
    } else {
        res.status(401).json({ message: 'Identifiants invalides' });
    }
});
