import React, { Component } from 'react';
import axios from 'axios';

import './Comment.scss';

class Comment extends Component {

    handleDelete = () => {
        if (window.confirm('Voulez vous vraiment supprimer ce commentaire ?')) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; token=`);
            const token = parts.pop().split(';').shift();

            axios.delete('http://localhost:3000/api/comments/'+this.props.comment.id, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(() => {
                    this.props.deleteComment(this.props.comment.id);
                })
                .catch(err => {
                    console.log(err);
                    window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
                })
        }
    }

    render() {
        return (
            <div className="comment">
                <div className="comment__body">
                    <p className="comment__message">{this.props.comment.message}</p>
                </div>
                <div className="comment__footer">
                    <p className="comment__owner">
                        {new Date(this.props.comment.createdAt).toLocaleDateString() + ' ' + new Date(this.props.comment.createdAt).getHours() + ':' + new Date(this.props.comment.createdAt).getMinutes() + ', ' + this.props.comment.User.username}
                    </p>
                    { this.props.user.roles && this.props.user.roles.includes('ROLE_MODERATOR') ?
                        <button href="#" className="comment__delete" onClick={this.handleDelete}>Supprimer</button> : ''
                    }
                </div>
            </div>
        )
    }
}

export default Comment;
