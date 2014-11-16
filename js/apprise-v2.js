// Global Apprise variables
var $Apprise = null,
		$overlay = null,
		$body = null,
		$window = null,
		$cA = null,
		AppriseQueue = [];

// Add overlay and set opacity for cross-browser compatibility
$(function() {
	
	$Apprise = $('<div class="apprise">');
	$overlay = $('<div class="apprise-overlay">');
	$body = $('body');
	$window = $(window);
	
	$body.append( $overlay.css('opacity', '.2') ).append($Apprise);
});

function Apprise(text, options) {
	
	// Restrict blank models
	if(text===undefined || !text) {
		return false;
	}
	
	// Necessary variables
	var $me = this,
			$_inner = $('<div class="apprise-inner">'),
			$_buttons = $('<div class="apprise-buttons">'),
			$_input = $('<input type="text">');
	
	// Default settings (edit these to your liking)
	var settings = {
	
		animation: 500,	// Animation speed
		buttons: {
			confirm: {
				action: function() { $me.disappear(); }, // Callback function
				className: null, // Custom class name(s)
				id: 'confirm', // Element ID
				text: 'OK' // Button text
			}
		},
		input: false, // input dialog
		override: true // Override browser navigation while Apprise is visible
	};
	
	// Merge settings with options
	$.extend(settings, options);
	
	// Close current Apprise, exit
	if(text=='close') { 
		$cA.disappear();
		return;
	}
	
	// If an Apprise is already open, push it to the queue
	if($Apprise.is(':visible')) {

		AppriseQueue.push({text: text, options: settings});
	
		return;
	}
	
	// Width adjusting function
	this.adjustWidth = function() {
		
		var window_width = $window.width(), w = "20%", l = "40%";

		if(window_width<=800) {
			w = "20%", l = "40%";
		} else if(window_width <= 1400 && window_width > 800) {
			w = "20%", l = "40%";
		} else if(window_width <= 1800 && window_width > 1400) {
			w = "20%", l = "40%";
		} else if(window_width <= 2200 && window_width > 1800) {
			w = "20%", l = "40%";
		}
		
		$Apprise.css('width', w).css('left', l);
		
	};
	
	// Close function
	this.disappear = function() {
		
		$Apprise.animate({
			top: '-100%'
		}, settings.animation, function() {
			
			$overlay.fadeOut(300);
			$Apprise.hide();
			
			// Unbind window listeners
			$window.unbind("beforeunload");
			$window.unbind("keydown");

			// If in queue, run it
			if(AppriseQueue[0]) { 
				Apprise(AppriseQueue[0].text, AppriseQueue[0].options);
				AppriseQueue.splice(0,1);
			}
		});
		
		return;
	};
	
	// Keypress function
	this.keyPress = function() {
		
		$window.bind('keydown', function(e) {
			// Close if the ESC key is pressed
			if(e.keyCode===27) {
				
				if(settings.buttons.cancel) {
					
					$("#apprise-btn-" + settings.buttons.cancel.id).trigger('click');
				} else {
					
					$me.disappear();
				}
			} else if(e.keyCode===13) {

				if(settings.buttons.confirm) {
					
					$("#apprise-btn-" + settings.buttons.confirm.id).trigger('click');
				} else {
					
					$me.disappear();
				}
			}
			
		});
	};
	//click outside to make disappear
	$('.apprise-overlay').on('click', function(){
		$me.disappear();
	});
	
	// Add buttons
	$.each(settings.buttons, function(i, button) {
		
		if(button) {
			
			// Create button
			var $_button = $('<button id="apprise-btn-' + button.id + '">').append(button.text);
			
			// Add custom class names
			if(button.className) {
				$_button.addClass(button.className);
			}
			
			// Add to buttons
			$_buttons.append($_button);
			
			// Callback (or close) function
			$_button.on("click", function() {
				
				// Build response object
				var response = {
					clicked: button, // Pass back the object of the button that was clicked
					input: ($_input.val() ? $_input.val() : null) // User inputted text
				};
				
				button.action( response );
				//$me.disappear();
			});
		}
	});
	
	// Disabled browser actions while open
	if(settings.override) {
		$window.bind('beforeunload', function(e){ 
			return "An alert requires attention";
		});
	}
	
	// Adjust dimensions based on window
	$me.adjustWidth();
	
	$window.resize( function() { $me.adjustWidth() } );
	
	// Append elements, show Apprise
	$Apprise.html('').append( $_inner.append('<div class="apprise-content">' + text + '</div>') ).append($_buttons);
	$cA = this;
	
	if(settings.input) {
		$_inner.find('.apprise-content').append( $('<div class="apprise-input">').append( $_input ) );
	}
	
	$overlay.fadeIn(100);
	$Apprise.show().animate({
		top: '20%'
	}, 
		settings.animation, 
		function() {
			$me.keyPress();
		}
	);
	
	// Focus on input
	if(settings.input) {
		$_input.focus();
	}
	
} // end Apprise();
