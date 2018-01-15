$(function() {
    
	function randomString() {
	    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    var str = '';
	    for (var i = 0; i < 10; i++) {
	        str += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return str;
	}
	function Column(name) {
	    var self = this; // useful for nested functions

	    this.id = randomString();
	    this.name = name;
	    this.$element = createColumn();

	    function createColumn() {
		    // CREATING COMPONENTS OF COLUMNS
		    var $column = $('<div>').addClass('column columns');
		    var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		    var $columnCardList = $('<ul>').addClass('column-card-list');
		    var $columnDelete = $('<button>').addClass('btn-delete').text('x').attr({'title':'Delete'});
		    var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
		    var $columnInputText = $('<textarea>').addClass('textArea').text('Card text');
		    var $columnColorYellow = $('<button>').addClass('btn-yellow col-4 btn-column');
		    var $columnColorBlue = $('<button>').addClass('btn-blue col-4 btn-column');
		    var $columnColorGreen = $('<button>').addClass('btn-green col-4 btn-column');

		    // ADDING EVENTS
		    $columnDelete.click(function() {
		        self.removeColumn();
		    });
		    $columnAddCard.click(function() {
		    	var textInput = $columnInputText.val();
		    	self.addCard(new Card(textInput));

		        //self.addCard(new Card(prompt("Enter the name of the card")));
		    });
		    $columnInputText.click(function(){
		    	$columnInputText.val('');
		    });	
		    $columnColorYellow.click(function() {
		        self.changeColorYellow();
		    });
		    $columnColorBlue.click(function() {
		        self.changeColorBlue();
		    });
		    $columnColorGreen.click(function() {
		        self.changeColorGreen();
		    });
		    // CONSTRUCTION COLUMN ELEMENT
		    $column.append($columnDelete)
		        .append($columnTitle)
		        .append($columnInputText)
		        .append($columnAddCard)
		        .append($columnCardList)
		        .append($columnColorYellow)
		        .append($columnColorBlue)
		    	.append($columnColorGreen);

		    // RETURN OF CREATED COLUMN
		    return $column;
		}
	}
	Column.prototype = {
	    addCard: function(card) {
	    	this.$element.children('ul').append(card.$element);
	    },
	    removeColumn: function() {
	    	this.$element.remove();
	    },
	    changeColorYellow: function() {
	    	this.$element.removeClass('background-blue background-green');
	    	this.$element.addClass('background-yellow');
	    },
	    changeColorBlue: function() {
	    	this.$element.removeClass('background-yellow background-green');
	    	this.$element.addClass('background-blue');
	    },
	    changeColorGreen: function() {
	    	this.$element.removeClass('background-blue background-yellow');
	    	this.$element.addClass('background-green');
	    }
	};
	function Card(description) {
		var self = this;

	    this.id = randomString();
	    this.description = description;
	    this.$element = createCard();

	    function createCard() {
		    // CREATING THE BLOCKS
		    var $card = $('<li>').addClass('card');
		    var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		    var $cardDelete = $('<button>').addClass('btn-delete').text('x').attr({'title':'Delete'});

		    // BINDING TO CLICK EVENT
		    $cardDelete.click(function(){
		    	self.removeCard();
		    });

		    // COMBINING BLOCKS AND RETURNING THE CARD
		    $card.append($cardDelete)
		    	.append($cardDescription);
		    return $card;
		}
	}
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}
	var board = {
    	name: 'Kanban Board',
    	addColumn: function(column) {
      		this.$element.append(column.$element);
      		initSortable();
    	},
    	$element: $('#board .column-container')
	}
	function initSortable() {
		$('.column-card-list').sortable({
	    	connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}
	$('.columnTitle').click(function(){
		$('.columnTitle').val('');
	});
	$('.create-column').click(function(){
		var name = $('.columnTitle').val();
		var column = new Column(name);
    	board.addColumn(column);
		});
	
	// CREATING COLUMNS
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// ADDING COLUMNS TO THE BOARD
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// CREATING CARDS
	var card1 = new Card('Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki.');
	var card2 = new Card('Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki.');
	var card3 = new Card('Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki.');

	// ADDING CARDS TO COLUMNS
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
	doneColumn.addCard(card3);
})