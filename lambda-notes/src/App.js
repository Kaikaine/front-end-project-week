import React, { Component } from 'react';
import './App.css';
import NotesContainer from './components/NotesContainer/NotesContainer';
import Note from './components/NotesContainer/Note';
import CreateNote from './components/NoteActions/CreateNote';
import ViewNote from './components/NoteActions/ViewNote';

class App extends Component {
  render() {
    return (
      <div>
        {/*<NotesContainer />*/}
        {/*<Note />*/}
        {/*<CreateNote />*/}
        <ViewNote />
      </div>
    );
  }
}

export default App;