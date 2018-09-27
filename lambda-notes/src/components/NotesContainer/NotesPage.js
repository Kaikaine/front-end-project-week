import React, { Component } from 'react';
import '../../App.css';
import styled from 'styled-components';
import NotesContainer from './NotesContainer';
import axios from 'axios'

const NoteApp = styled.div`
`

class NotesPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            noteName: '',
            noteText: '',
            id: 0,

            clicked: 0,

            editName: '',
            editText: '',

            logout: props.logout,
            LoggedIn: props.logged

        }
        console.log(props)
    }

    componentDidMount() {
        axios.get('http://localhost:3500/')
            .then(res => {
                this.setState({ notes: res.data })
            }).catch(err => {
                console.log(err)
                this.setState({ LoggedIn: false })
            })
    }

    newNote = e => {
        this.setState({ [e.target.name]: e.target.value })

    }

    addNote = e => {
        e.preventDefault()
        axios.post('http://localhost:3500/api/create', { title: this.state.noteName, content: this.state.noteText })
            .then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        const notes = this.state.notes.slice()
        notes.push({
            noteName: this.state.noteName,
            noteText: this.state.noteText,
            id: this.state.notes.length
        })
        this.setState({ noteName: '', noteText: '', notes: notes })
        this.setState({ id: this.state.notes.length })

    }

    viewClick = id => {
        this.setState({ clicked: id })
    }

    deleteNote = (id) => {
        // let notes = this.state.notes
        // notes.splice(this.state.clicked, 1)
        // this.setState({ notes: notes })
        axios.delete(`http://localhost:3500/api/view/${id}/delete`)
            .then((res) => {
                console.log(res.data)
                let notes = this.state.notes
                notes.splice(this.state.clicked, 1)
                this.setState({ notes: notes })
                let newId = this.state.notes.slice()
                newId.forEach(note => note.id > this.state.clicked ? --note.id : null)
                this.setState({ notes: newId })
            }).catch(err => {
                console.log(err)
            })
        // let newId = this.state.notes.slice()
        // newId.forEach(note => note.id > this.state.clicked ? --note.id : null)
        // this.setState({ notes: newId })

    }


    editSubmit = (e, id) => {
        e.preventDefault()
        let notes = this.state.notes.slice()
        notes[this.state.clicked].noteName = this.state.editName
        notes[this.state.clicked].noteText = this.state.editText
        axios.put(`http://localhost:3500/api/edit/${id}`, { title: this.state.editName, content: this.state.editText })
            .then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        this.setState({ notes: notes, editName: '', editText: '' })
    }

    logout = e => {
        localStorage.removeItem('jwt')
    }


    render() {
        return (
            <NoteApp>
                <NotesContainer logout={this.state.logout} editSubmit={this.editSubmit} clicked={this.state.clicked} viewClick={this.viewClick} note={this.state.notes} addNote={this.addNote} newNote={this.newNote} noteName={this.state.noteName} noteText={this.state.noteText} delete={this.deleteNote} />

            </NoteApp>
        );
    }
}

export default NotesPage;
