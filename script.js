const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "🚫", "🚫"];
const shuffledNumbers = numbers.sort(() => (Math.random() > 0.5 ? 1 : -1));
let currentNumber = 1; // To track the sequence

for (let i = 0; i < shuffledNumbers.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuffledNumbers[i];

    box.onclick = function (event) {
        if (this.classList.contains('boxOpen') || this.classList.contains('boxMatch')) {
            // Prevent clicking already open or matched boxes
            return;
        }
        // let divText = event.target.innerHTML;
        // console.log(divText);
        this.classList.add('boxOpen');

        setTimeout(() => {
            const openCards = document.querySelectorAll('.boxOpen');
            
            if (this.innerHTML === "🚫") {
                // If a null card is clicked, flip all cards
                flipAllCards();
                alert('Oops! You hit a 🚫 card.');
                currentNumber = 1; // Reset the sequence
            } else if (parseInt(this.innerHTML) === currentNumber) {
                // If the card matches the expected number
                this.classList.add('boxMatch');
                // this.classList.remove('boxOpen');
                currentNumber++;
                if (currentNumber > 10) {
                    alert('Congratulations! You win!');
                }
               
            } else {
                // If the card is out of sequence, flip all cards
                flipAllCards();
                currentNumber = 1; // Reset the sequence
            }
        }, 500);
    };

    document.querySelector('.game').appendChild(box);
}

// Function to flip all cards
function flipAllCards() {
    const allCards = document.querySelectorAll('.item');
    allCards.forEach(card => {
        card.classList.remove('boxOpen');
        card.classList.remove('boxMatch');
    });
}
