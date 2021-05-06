const db = require('../models');

exports.deleteComment = (req, res, next) => {
    if (res.locals.userRoles.includes('ROLE_MODERATOR')) {
        db.Comment.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Post supprimé !' }))
            .catch(error => res.status(404).json({ error }))
    } else {
        return res.status(403).json({ error: 'Vous ne disposez pas de droits suffisants' })
    }
}

exports.createComment = (req, res, next) => {
    // Searches for the post according to the identifier parameter given in the url
    db.Post.findOne({ where: { id: req.body.postId } })
        .then(post => {
            // Valid if the post is indeed existing
            if (!post) {
                return res.status(404).json({ error: 'Post introuvable !' })
            }

            db.Comment.create({
                message: req.body.message,
                ownerId: res.locals.userId,
                postId: post.id
            })
                .then(comment => res.status(201).json({ comment }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}
