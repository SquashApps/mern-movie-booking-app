let string = 'A';
export const generateSeatSeed = (movieID, seatID, noOfSeats) => {
    string = 'A';
    let seats = [];
    let count = 0;
    
    if(!movieID || !seatID || !noOfSeats) return;


    const seatNumbers = Array(Number(noOfSeats)).fill()
        .map((value, index) => {

            // start the generation with 'A-0'
            if (index === 0) return `${string}-${index}`;

            // multiples of 10 becomes seat number suffix of 0
            if ((index + 1) % 10 === 0) {
                return `${generateString(string)}-${0}`

            }

            // split the string and make the seat number generation sequential 1-9
            if (index > 9) {
                let numbers = String(index + 1).split('');
                count = numbers[numbers.length - 1];
                return `${string}-${count}`;
            }
            return `${string}-${index + 1}`
        });

    // generate the seat objects
    seats = seatNumbers.map((seat) => {
        return {
            seatNo: seat,
            movieID,
            seatID
        }
    });
    return seats;
}

const generateString = (character) => {
    let charCode = character.charCodeAt(0);
    string = String.fromCharCode(++charCode);
    return string;
}

