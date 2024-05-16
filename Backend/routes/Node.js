const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const db = require('./models');  // Assurez-vous que vos modèles sont correctement configurés

// Route DELETE pour supprimer une image par son ID
app.delete('/api/works/:workId', async (req, res) => {
    try {
        const workId = req.params.workId;

        // Rechercher l'enregistrement de l'image dans la base de données
        const work = await db.Work.findByPk(workId);
        if (!work) {
            return res.status(404).json({ message: 'Image non trouvée' });
        }

        // Supprimer le fichier image du système de fichiers
        const imagePath = path.join(__dirname, 'images', path.basename(work.imageUrl));
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Erreur lors de la suppression du fichier image :', err);
                return res.status(500).json({ message: 'Erreur lors de la suppression du fichier image' });
            }

            // Supprimer l'enregistrement de l'image dans la base de données
            work.destroy().then(() => {
                res.status(200).json({ message: 'Image supprimée avec succès' });
            }).catch((error) => {
                console.error('Erreur lors de la suppression de l\'enregistrement de l\'image :', error);
                res.status(500).json({ message: 'Erreur lors de la suppression de l\'enregistrement de l\'image' });
            });
        });

    } catch (error) {
        console.error('Erreur lors de la suppression de l\'image :', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de l\'image' });
    }
});

module.exports = app;
