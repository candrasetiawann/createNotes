//add note to local Storage
const addButton = document.getElementById('btn-add');
addButton.addEventListener('click', function(e) {

    const addTitle = document.getElementById('text-field');
    const addNotes = document.getElementById('textarea-field');

    //jika kosong
    if (addTitle.value == "" && addNotes.value == "") {
        return alert("input your notes ");
    }

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addNotes.value
    };

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addNotes.value = "";

    // console.log(notesObj);
    showNotes();

});

//function to show element from localStorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
        <div class="list-notes">
        <span class="notes-id">Note ${index + 1}</span>
        <span class="notes-title">${element.title}</span>
        <span class="text-notes">${element.text}</span>
        <button id="${index}"" onclick="editNote(this.id)" class="button-action btn-edit" type="button">Edit</button>
        <button id="${index}" onclick="deleteNote(this.id)" class="button-action btn-hapus" type="button">Hapus</button>
        </div>
        `;
    });

    let notesElement = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElement.innerHTML = html;
    } else {
        notesElement.innerHTML = "No Notes , add your notes ";
    }
}

//function to delete note
function deleteNote(index) {
    let confirmDelete = confirm("are you sure to delete this note ?");
    if (confirmDelete == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}


//function to edit notes
function editNote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById('text-field');
    let addNotes = document.getElementById('textarea-field');

    if (addTitle.value !== "" && addNotes.value !== "") {
        return alert('please clear before edit note');
    }

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    notesObj.findIndex((element, index)=> {
        addTitle.value = element.title;
        addNotes.value = element.text;
    });

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

showNotes();