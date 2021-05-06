import React, { Component } from 'react';
import axios from 'axios';

import './Profile.scss';
import profilePic from './matthew.png';

class Profile extends Component {

    handleDelete() {
        if (window.confirm('Voulez vous vraiment supprimer votre compte ?')) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; token=`);
            const token = parts.pop().split(';').shift();

            axios.delete('http://localhost:3000/api/users', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(() => {
                    window.location.href = '/logout';
                })
                .catch(err => {
                    console.log(err);
                    window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
                })
        }
    }

    render() {
        return (
            <div className="profile__wrapper">
                <div className="profile">
                    <div className="profile__header">
                        <img src={profilePic} alt="" className="profile__picture"/>
                        <div>
                            <p className="profile__fullname">{this.props.user.username}</p>
                        </div>
                    </div>
                    <p className="profile__description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur arcu enim. Donec erat metus, luctus at leo non, porttitor ultricies orci. Integer sagittis interdum mattis. Proin venenatis condimentum maximus. Sed rutrum dolor vel ipsum commodo rhoncus.
                    </p>
                    <button href="#" className="profile__delete" onClick={this.handleDelete}>Supprimer mon compte</button>
                </div>
            </div>
        )
    }
}

export default Profile;
