"use strict";

var date_range = {};
function update_range(date_range)
{
    $('#start_date').val(date_range.start);
    $('#end_date').val(date_range.end);
}

function show_date_picker()
{
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    /*Selector Range*/

    var Range = function (_React$Component) {
        _inherits(Range, _React$Component);

        function Range(props) {
            _classCallCheck(this, Range);

            var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

            _this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            _this.daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return _this;
        }

        Range.prototype.dateInfo = function dateInfo(date) {
            var dateRow = undefined;
            var rangeMonthText = 'Choose a date';
            if (date) {
                dateRow = React.createElement(
                    "td",
                    { rowSpan: "2" },
                    React.createElement(
                        "span",
                        { className: "calendar__range-date" },
                        date.getDate()
                    )
                );
                rangeMonthText = this.monthNames[date.getMonth()] + ' ' + date.getFullYear();
            }
            return React.createElement(
                "tr",
                null,
                dateRow,
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "span",
                        { className: "calendar__range-month" },
                        rangeMonthText
                    )
                )
            );
        };

        Range.prototype.dumbDate = function dumbDate(date, title) {
            var day = date ? React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "span",
                        { className: "calendar__range-day" },
                        this.daysNames[date.getDay()]
                    )
                )
            ) : null;
            return React.createElement(
                "div",
                { className: "calendar__from-date" },
                React.createElement(
                    "table",
                    null,
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                { colSpan: "2" },
                                React.createElement(
                                    "span",
                                    { className: "calendar__range-h" },
                                    title
                                )
                            )
                        ),
                        this.dateInfo(date),
                        day
                    )
                )
            );
        };

        Range.prototype.render = function render() {
            var _props = this.props;
            var dateFrom = _props.dateFrom;
            var dateTo = _props.dateTo;

            dateTo = dateTo ? new Date(dateTo) : dateTo;
            dateFrom = dateFrom ? new Date(dateFrom) : dateFrom;
            return React.createElement(
                "div",
                { className: "calendar__range" },
                this.dumbDate(dateFrom, 'From'),
                React.createElement(
                    "div",
                    { className: "calendar__image-arrow" },
                    React.createElement(
                        "span",
                        null,
                        "→"
                    )
                ),
                this.dumbDate(dateTo, 'To')
            );
        };

        return Range;
    }(React.Component);
/*Header Table*/

var Header = function (_React$Component2) {
    _inherits(Header, _React$Component2);

    function Header(props) {
        _classCallCheck(this, Header);

        var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this2.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        _this2.dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        return _this2;
    }

    Header.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return nextProps.date != this.props.date;
    };

    Header.prototype.render = function render() {
        var date = new Date(this.props.date);
        return React.createElement(
            "div",
            { className: "calendar__header" },
            React.createElement(
                "div",
                { className: "calendar__month-chooser" },
                React.createElement(
                    "span",
                    { className: "calendar__prev-month", onClick: this.props.prevMonth },
                    "❮"
                ),
                React.createElement(
                    "span",
                    null,
                    this.monthNames[date.getMonth()]
                ),
                React.createElement(
                    "span",
                    { className: "calendar__next-month", onClick: this.props.nextMonth },
                    "❯"
                )
            ),
            React.createElement(
                "table",
                { className: "calendar__days-names", cellSpacing: "0" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        this.dayNames.map(function (i, key) {
                            return React.createElement(
                                "td",
                                { className: "calendar__day-name", key: key },
                                i
                            );
                        })
                    )
                )
            )
        );
    };

    return Header;
}(React.Component);

/*Calendar Table*/

var Calendar = function (_React$Component3) {
    _inherits(Calendar, _React$Component3);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

        _this3.selectionEnaled = false;
        _this3.animationDirection = "forward";
        _this3.shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        _this3.currentDate = new Date();
        return _this3;
    }

    Calendar.prototype.handleClick = function handleClick(index) {
        var _props2 = this.props;
        var setRange = _props2.setRange;
        var indexStart = _props2.indexStart;
        var indexEnd = _props2.indexEnd;

        if (this.selectionEnabled) {
            if (index == indexStart) {
                this.selectionEnabled = false;
                setRange();
            } else {
                this.selectionEnabled = false;
                setRange(this.props.indexStart, index);
            }
        } else {
            if (index == indexEnd) {
                this.selectionEnabled = true;
            } else if(index >= this.currentDate.valueOf()) {
                this.selectionEnabled = true;
                setRange(index);
            }
        }
    };

    Calendar.prototype.mouseOver = function mouseOver(index) {
        if (this.selectionEnabled) {
            this.props.setRange(this.props.indexStart, index);
        }
    };

    Calendar.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
        if (nextProps.date != this.props.date) {
            this.animationDirection = nextProps.date - this.props.date > 0 ? "forward" : "backward";
        }
    };

    Calendar.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (prevProps.date != this.props.date) {
            this.refs.calendar.classList.add("animate--" + this.animationDirection);
        }
    };

    Calendar.prototype.getDay = function getDay(date, key, month) {
        var time = date.getTime();
        var currentDate = this.currentDate;
        var _props3 = this.props;
        var indexEnd = _props3.indexEnd;
        var indexStart = _props3.indexStart;

        var dayClass = time > indexStart && time < indexEnd ? 'selected' : '';
        dayClass += date < currentDate.setHours(0) ? ' out--range' : '';
        dayClass += time == indexStart && indexEnd > indexStart ? ' sel--start' : '';
        dayClass += time == indexEnd && time > indexStart ? ' sel--end' : '';
        dayClass += date.getMonth() == month ? ' calendar__day' : ' calendar__day dis';
        return React.createElement(
            "td",
            { className: dayClass,
                onClick: this.handleClick.bind(this, time),
                onMouseOver: this.mouseOver.bind(this, time),
                key: key },
            React.createElement(
                "div",
                { className: "calendar__inner-day" },
                date.getDate()
            )
        );
    };

    Calendar.prototype.render = function render() {
        var _this4 = this;

        var date = new Date(this.props.date);
        var month = date.getMonth();
        date.setDate(1);
        if (this.animationDirection == "forward") {
            date.setMonth(date.getMonth() - 1);
        }
        var firstDay = date.getDay();
        if (firstDay !== 1) {
            firstDay == 0 ? date.setDate(date.getDate() - 6) : date.setDate(date.getDate() - (firstDay - 1));
        }
        date.setDate(date.getDate() - 1);
        return React.createElement(
            "div",
            { className: "calendar__wrap" },
            React.createElement(
                "table",
                { className: "calendar__table", ref: "calendar", key: this.props.date, cellSpacing: "0" },
                React.createElement(
                    "tbody",
                    null,
                    Array(12).fill(0).map(function (i, key) {
                        return React.createElement(
                            "tr",
                            { key: key },
                            Array(7).fill(0).map(function (_i, _key) {
                                date.setDate(date.getDate() + 1);
                                return _this4.getDay(date, _key, month);
                            })
                        );
                    })
                )
            )
        );
    };

    return Calendar;
}(React.Component);

/*Smart Component*/

var APP = function (_React$Component4) {
    _inherits(APP, _React$Component4);

    function APP(props) {
        _classCallCheck(this, APP);

        var _this5 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

        _this5.state = {
            date: Date.now(),
            selectionStart: 0,
            selectionEnd: 0
        };
        return _this5;
    }

    APP.prototype.prevMonth = function prevMonth() {
        var date = new Date(this.state.date);
        date.setMonth(date.getMonth() - 1);
        this.setState({ date: date.getTime() });
    };

    APP.prototype.nextMonth = function nextMonth() {
        var date = new Date(this.state.date);
        date.setMonth(date.getMonth() + 1);
        this.setState({ date: date.getTime() });
    };

    APP.prototype.setRange = function setRange() {
        var selectionStart = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var selectionEnd = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        date_range.start = new Date(selectionStart);
        date_range.end = new Date(selectionEnd);
        update_range(date_range);
        this.setState({ selectionStart: selectionStart, selectionEnd: selectionEnd });
    };

    APP.prototype.render = function render() {
        var _state = this.state;
        var date = _state.date;
        var selectionStart = _state.selectionStart;
        var selectionEnd = _state.selectionEnd;

        return React.createElement(
            "div",
            { className: "calendar" },
            React.createElement(Range, { dateFrom: selectionStart, dateTo: selectionEnd }),
            React.createElement(Header, { date: date, prevMonth: this.prevMonth.bind(this), nextMonth: this.nextMonth.bind(this) }),
            React.createElement(Calendar, { date: date,
                indexStart: selectionStart,
                indexEnd: selectionEnd,
                setRange: this.setRange.bind(this)
            })
        );
    };

    return APP;
}(React.Component);

    var picker = React.createElement(APP, null);
    ReactDOM.render(picker, document.querySelector('#date_picker'));
}

show_date_picker();
