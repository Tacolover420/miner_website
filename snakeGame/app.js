  var config = {
    apiKey: "AIzaSyCp-YouZr_fkhRBn5eLheTAARH8CvVtVNY",
    authDomain: "gamingwebsite-b16e5.firebaseapp.com",
    databaseURL: "https://gamingwebsite-b16e5.firebaseio.com",
    projectId: "gamingwebsite-b16e5",
    storageBucket: "gamingwebsite-b16e5.appspot.com",
    messagingSenderId: "813467457055"
  };
  firebase.initializeApp(config);
  var firestore = firebase.firestore();

  function signUP(){

    var uname =  document.forms["register"]["name"].value;
    var password =  document.forms["register"]["password"].value;
    var email =  document.forms["register"]["email"].value;

    firebase.auth().createUserWithEmailAndPassword(email, password);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user.updateProfile({
            displayName: uname
      
            }).then(function() {
              window.location.href = "index.html";
            }).catch(function(error) {
              // An error happened.
            });
        } 
      });    
  }

  function signIn(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        document.getElementById('error').innerText='Wrong password.';
      } else {
        document.getElementById('error').innerText=errorMessage;
      }
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          window.location.href = "index.html";
        } 
      });
    }

    function checkcurrentuser(){
      var name, email, uid, emailVerified;
       firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          name = user.displayName;
          email = user.email;
          emailVerified = user.emailVerified;
          uid = user.uid;  
          document.getElementById('test').innerText="LogIn as : "+name;
        } else {
          document.getElementById('test').innerText="Not LogIN";
      }
      });
}

function signout(){
  firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          firebase.auth().signOut().then(function() {
          window.location.href = "welcome.html";
          
        }).catch(function(error) {
          document.getElementById('test').innerText=error.message;
        });
        } else {
          document.getElementById('test').innerText="error";
      }
      });
}