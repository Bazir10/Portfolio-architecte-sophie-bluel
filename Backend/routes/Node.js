// Route DELETE pour supprimer une image par son ID
app.delete('/api/works/:workId', async (req, res) => {
    try {
        const workId = req.params.workId;
        // Supprimez l'image de votre système de stockage (base de données, système de fichiers, etc.)
        // ...
        // Répondez avec succès
        res.status(200).json({ message: 'Image supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'image :', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de l\'image' });
    }
});
