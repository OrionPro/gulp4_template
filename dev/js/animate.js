
class Animation {
	constructor() {
		this.tl1 = new TimelineMax();
		this.tl1.pause();
	}

	description() {
		this.tl1.from('.top-section__title', 0.7, {
			y: -100,
			opacity: 0,
			ease: Power4.easeOut
		}, '+=0.3');

	}

	activeSection(section, startTop = 0, startBottom = 0) {
		section = '.' + section;
		if ($(section).offset() !== undefined) {
			var topPosition = $(section).offset().top - startTop,
				bottomPosition = $(section).offset().top + $(section).height() - startBottom;
			if (($(window).scrollTop() >= topPosition) && ($(window).scrollTop() <= bottomPosition)) {
				return true;
			}
		}
	}

	play() {
		if (this.activeSection('top-section',0, 500)) {
			this.tl1.resume();
		}
	}
}

var anim = new Animation;

$(window).scroll(function() {
	if (document.documentElement.clientWidth >= 1200) {
		anim.play();
	}
});

$(window).ready(function() {

	if (document.documentElement.clientWidth >= 1200) {
		anim.description();
		anim.play();
	}

});
