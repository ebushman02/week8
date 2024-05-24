class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
    describe() {
        return `${this.title} is written by${this.author}`;
    }
}

class Series {
    constructor(name) {
        this.name = name;
        this.books= [];
    }
    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book)
        }
    
    else{
        throw new Error ('You can only add an instance of Book. Argument is not a book:' + book)
        }
    }
    describe () {
        return `${this.name} has ${this.books.length} books.`
    }   
}
class Menu {
    constructor () {
        this.series = [];
        this.selectedSeries = null;
    }
    start() {
        let selection = this.showMainMenuOptions();

        while (selection !== '0') {
            switch (selection) {
                case '1':
                    this.createSeries();
                    break;
                case '2':
                    this.viewSeries();
                    break;
                case '3':
                    this.deleteSeries();
                    break;
                case '4':
                    this.displaySeries();
                    break;
                    case '5':
                        this.deleteAll();
                default:
                    selection = '0';
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!')
    }
    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new series
        2) view series
        3) delete series
        4) display all series
        5) delete all series
        `)
    }

    showSeriesMenuOptions(seriesInfo) {
        return prompt (`
        0) back
        1) create book
        2) delete book
        -------------------
        ${seriesInfo}
        `);
    }
    displaySeries() {
        let seriesString = '';
        for (let i = 0; i < this.series.length; i++) {
            seriesString += i + ') '+ this.series[i].name + '\n';
        }
        alert(seriesString);
    }
    createSeries() {
        let name = prompt('Enter name for new series');
        this.series.push(new Series(name));
    }
    viewSeries() {
        let index = prompt('Enter idex of series you with to view');
        if (index > -1 && index < this.series.length) {
            this.selectedSeries = this.series[index];
            let description = 'Series Name:' + this.selectedSeries.name + '\n';
            for (let i=0; i < this.selectedSeries.books.length; i++) {
                description += i + ') ' + this.selectedSeries.books[i].title
                + ' - ' + this.selectedSeries.books[i].author + '\n';
            }
            
            let selection = this.showSeriesMenuOptions(description);
            switch(selection) {
                case '1':
                    this.createBook();
                    break;
                case '2':
                    this.deleteBook();            }
        }
    }
    createBook() {
        let title = prompt('Enter title for new book:');
        let author = prompt('Enter author for new book:')
        this.selectedSeries.books.push(new Book(title, author));
    }
    deleteBook() {
        let index = prompt('Enter the index of the book you would like to delete.');
        if (index > -1 && index < this.selectedSeries.books.length) {
            this.selectedSeries.books.splice(index, 1);
        }
    }
    deleteTeam() {
        let index = prompt('Enter the index of the team you would like to delete');
        if (index > -1 && index < this.selectedSeries.length) {
            this.selectedSeries.splice(index, 1);
        }
    }
    deleteAll() {
        const confirmation = prompt('Are you sure you want to delete all series? Enter "yes" to confirm or no to cancel');
        if (confirmation.toLowerCase() === 'yes') {
            this.series = []; // Clear all series
            alert('All series have been deleted.');
        } else  {
            alert('Deletion canceled.');
        } 
        
    }
}
let menus= new Menu();
menus.start();



