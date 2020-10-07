// Τα ερωτήματα 2 έως 7 θα απαντηθούν στο αρχείο αυτό

const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");
const root = document.querySelector(":root");

// 2. να ορίσετε τους σχετικούς χειριστές συμβάντων

let previousGuesses = [];
let theGuess;
window.onload = newRandom();
newGuess.focus();
newGuess.addEventListener("keyup", checkKey);
restartButton.addEventListener("click", restart);
checkButton.addEventListener("click", checkGuess);

function newRandom() {
    /* 3. συνάρτηση που βρίσκει ένα τυχαίο αριθμό μεταξύ 1 και 100
     και τον εκχωρεί στη μεταβλητή theGuess */
    theGuess = Math.floor((Math.random() * 100) + 1);
    restartButton.classList.add('hidden'); //κρύβω το restart
}

function checkKey(e) {
    /* 4. συνάρτηση που όταν ο χρήστης πατήσει <<enter>>
     να καλεί τη συνάρτηση που αποτελεί τον κεντρικό ελεγκτή του παιχνιδιού.
     */

    if (e.code === "Enter") {
        checkGuess();
    }
}

function checkGuess() {
    /* 5. Να ορίσετε συνάρτηση checkGuess η οποία καλείται είτε όταν ο χρήστης πατήσει <<enter>>
    στο πεδίο "new-guess" είτε όταν πατήσει το πλήκτρο "check", η οποία είναι ο κεντρικός ελεγκτής,
    καλεί τη συνάρτηση processGuess (η οποία αποφαίνεται για την ορθότητα του αριθμού) και κάνει
    τις κατάλληλες ενέργειες για να μην μπορεί να εισάγει ο χρήστης νέο αριθμό ή να ανασταλεί η
    λειτουργία του <<enter>>, εμφάνιση του πλήκτρου 'restart' και την εξαφάνιση του πλήκτρου 'check'
    σε περίπτωση ολοκλήρωσης του παιχνιδιού. */

    let result = processGuess(theGuess);
    newGuess.value = "";
    if (result === 'win' || result === 'lost') {
        newGuess.disabled = true; // δε μπορούμε να βάλουμε αριθμό
        newGuess.removeEventListener("keyup", checkKey); // το enter δε λειτουργεί
        checkButton.classList.add("hidden");
        restartButton.classList.remove("hidden"); // το εμφανίζω ξανά
    }

}

function processGuess(newValue) {
    /* 6.  Να ορίσετε συνάρτηση processGuess(newValue) η οποία καλείται από τη συνάρτηση checkGuess,
    περιέχει τη λογική του παιχνιδιού, ελέγχει αν η τιμή του χρήστη είναι σωστή, ή αν το παιχνίδι έχει
    τελειώσει χωρίς ο χρήστης να έχει βρει τον αριθμό, και επιστρέφει αντίστοιχα την τιμή "win", ή "lost",
    δημιουργεί και εμφανίζει τα κατάλληλα μηνύματα, αλλάζοντας το χρώμα του στοιχείου μηνυμάτων.
    Όλα τα μηνύματα του προγράμματος εμανίζονται από την processGuess().
    Σε περίπτωση που το παιχνίδι δεν έχει ακόμα τελειώσει, η συνάρτηση μπορεί είτε να μην επιστρέφει κάποια ιδιαίτερη τιμή,
    είτε να επιστρέφει κάποια τιμή της επιλογής σας */

    let guess = parseInt(newGuess.value);

    if (isNaN(guess)) {
        addLostMessage('Δώσε αριθμό!');
        return "continue";
        
    } else if (guess < theGuess) {
        addLostMessage('Λάθος, είσαι πιο χαμηλά');

    } else if (guess > theGuess) {
        addLostMessage('Λάθος, το ξεπέρασες');

    } else {
        addwinmessage('Μπράβο το βρήκες');
        previousGuesses.push(guess);
        showPreviousGuesses();
        return "win";
    }

    previousGuesses.push(guess);
    showPreviousGuesses();

    if (previousGuesses.length === 10) {
        addLostMessage('Τέλος παιχνιδιού, έχασες!');
        return "lost";
    }

    return "continue";
}

function restart() {
    /* 7. Να ορίσετε συνάρτηση restart η οποία καλείται όταν ο χρήστης πατήσει το πλήκτρο
    'restart' και επανεκινεί τη διαδικασία */
    previousGuesses = [];
    newGuess.disabled = false;
    newGuess.addEventListener("keyup", checkKey);
    checkButton.classList.remove("hidden");
    restartButton.classList.add("hidden");
    message.innerHTML = "";
    lowHigh.innerHTML = "";

}

function addwinmessage(text) {
    message.innerHTML = '<p class="win">' + text + '</p>';
}

function addLostMessage(text) {
    message.innerHTML = '<p class="lost">' + text + '</p>';
}

function showPreviousGuesses() {
    if (previousGuesses.length > 0) {
        lowHigh.innerHTML = 'Προηγούμενες προσπάθειες: ' + previousGuesses.join(" ");

    }
}