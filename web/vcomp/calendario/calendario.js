(function() {
'use strict';
var VComp = window._vcomp$;
var today = new Date();
today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

VComp.compMap["calendario"] = function(callback, template, match) {
	comp.template = template;
	callback(null, comp);
};
var comp = {
	template: null,
	props: {
		date: {
			type: Date,
			required: true
		},
		selectionStart: {
			type: Date,
			required: false
		},
		selectionEnd: {
			type: Date,
			required: false
		},
		monthNames: {
			type: Array,
			required: true
		},
		weekDaysHeader: {
			type: Array,
			required: true
		},
		customMonthHeader: {
			type: [String, Function],
			required: false
		},
		customDayClass: {
			type: Function,
			required: false
		}
	},
	computed: {
		monthName: function() {
			return this.monthNames[this.date.getMonth()];
		},
		year: function() {
			return this.date.getFullYear();
		},
		monthHeader: function() {
			var cmh = this.customMonthHeader;
			var month = this.monthName;
			var year = this.year;
			if (cmh instanceof Function) {
				return cmh.call(this, month, year, this.date);
			} else if ('string' === typeof cmh) {
				return cmh
					.replace(/\{\$month\}/gi, month)
					.replace(/\{\$year\}/gi, year);
			} else {
				return [month, year].join(' ');
			}
		},
		monthStart: function() {
			var d = this.date;
			return new Date(d.getFullYear(), d.getMonth(), 1);
		},
		monthEnd: function() {
			var d = this.date;
			return new Date(d.getFullYear(), d.getMonth()+1, 0);
		},
		weeks: function() {
			var monthStart = this.monthStart;
			var monthEnd = this.monthEnd;
			var lastDayOfMonth = monthEnd.getDate();
			var currentDate = new Date(monthStart);
			var weeks = [];
			while (currentDate <= monthEnd) {
				var weekDay = currentDate.getDay();
				var monthDay = currentDate.getDate();
				var week = [];
				for ( var i = 0; i < 7; i++ ) {
					var currentMonthDay = monthDay + i - weekDay;
					var currentMonthDate = null;
					if (1 <= currentMonthDay && currentMonthDay <= lastDayOfMonth) {
						currentMonthDate = new Date(
							currentDate.getFullYear(),
							currentDate.getMonth(),
							currentMonthDay
						);
					}
					week.push(currentMonthDate);
				}
				currentDate.setDate(monthDay + 7 - weekDay);
				weeks.push(week);
			}
			return weeks;
		}
	},
	methods: {
		suggestStartEnd: function(date) {
			var cStart = this.selectionStart;
			var cEnd = this.selectionEnd;
			var biggerStart = cStart;
			var biggerEnd = cEnd;
			var sStart = cStart;
			var sEnd = cEnd;
			var eStart = cStart;
			var eEnd = cEnd;
			if (!cStart) {
				// não tem data inicial
				biggerStart = sStart = eStart = biggerEnd = sEnd = eEnd = date;
				// não deveríamos nos preocupar com a data final aqui
				// porque o certo é marcar primeiro a data inicial
				// e depois a data final
			} else if (date < cStart) {
				// selecionou data anterior ao início atual
				biggerStart = sStart = eStart = date;
				if (cEnd) {
					eEnd = cStart;
				} else {
					biggerEnd = sEnd = eEnd = cStart;
				}
			} else if (+cStart == +date) {
				// selecionou exatamente o início atual
				if (cEnd && (+cEnd == +date)) {
					// também é o fim atual
					biggerStart = sStart = eStart = biggerEnd = sEnd = eEnd = null;
				} else {
					biggerStart = sStart = eStart = biggerEnd = sEnd = eEnd = cEnd;
				}
			} else if (cEnd) {
				// tem uma data final já selecionada
				if (+cEnd == +date) {
					// selecionou exatamente o fim atual
					biggerEnd = sEnd = eEnd = cStart;
				} else if (date < cEnd) {
					// selecionou uma data após o início e antes do fim atual
					biggerEnd = eEnd = date;
					sStart = date;
				} else if (cEnd < date) {
					// selecionou uma data após o fim atual
					sStart = cEnd;
					biggerEnd = sEnd = eEnd = date;
				}
			} else {
				// não tem uma data final selecionada ainda
				// então a data selecionada vai ser a final
				biggerEnd = sEnd = eEnd = date;
			}
			return {
				date: date,
				biggerStart: biggerStart,
				biggerEnd: biggerEnd,
				startStart: sStart,
				startEnd: sEnd,
				endStart: eStart,
				endEnd: eEnd
			};
		},
		clickDay: function(date) {
			if (!date) return;
			this.$emit('clickDay', this.suggestStartEnd(date));
		},
		changeMonth: function(change) {
			var d = this.date;
			d = new Date(d.getFullYear(), d.getMonth()+change, 1);
			this.$emit('changeMonth', d, change);
		},
		getDayClass: function(date) {
			var start = this.selectionStart;
			var end = this.selectionEnd;
			var custom = this.customDayClass;
			var originalDate = date;
			start = start && start.getTime();
			end   = end   && end  .getTime();
			date  = date  && date .getTime();
			return [
				'cal-day',
				custom instanceof Function && custom(originalDate) || '',
				{
					'cal-day-empty': !date,
					'cal-day-enabled': !!date,
					'cal-day-start': date && start === date,
					'cal-day-end': date && end === date,
					'cal-day-during': date && start <= date && date <= end,
					'cal-day-alone': date && start === date && (!end || start === end),
					'cal-day-today': date && today.getTime() === date
				}
			];
		}
	}
	/*
	props: {
		propA: {
			type: String
		}
	},
	data: function() {
		return {};
	},
	computed: {},
	methods: {},
	created: function() {},
	mounted: function() {},
	beforeDestroy: function() {}
	*/
};
})();
