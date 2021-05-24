// Offline data

db.enablePersistence()
    .catch(err => {
        if (err.code == 'failed-precondition'){
            // Multiple tabs open
            console.log('persistence failed')
        } else if (err.code = 'unimplemented') {
            console.log('persistance is not available')
        }

    })

db.collection('posts').onSnapshot((snapshot) => {
    // console.log(snapshot.docChanges())
    snapshot.docChanges().forEach(change => {
        // console.log(change.type ,change.doc.data())

        if (change.type === 'added') {
            // Add new post
            renderPost(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            //Remove post
        }
    });
})

// add new post

const form = document.querySelector('form') 
const forms = document.querySelectorAll('.side-form');
  
form.addEventListener('submit' , e => {
    e.preventDefault()
    const post = {
        user: form['user'].value,
        caption: form['caption'].value
    }

    db.collection('posts').add(post)
        .catch(err => console.log(err))

        form['user'].value = ''
        form['caption'].value = ''
        M.Sidenav.init(forms, {edge: 'left'});
})