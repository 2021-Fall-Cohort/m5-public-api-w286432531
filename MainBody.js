var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainBody = function (_React$Component) {
  _inherits(MainBody, _React$Component);

  function MainBody(props) {
    _classCallCheck(this, MainBody);

    var _this = _possibleConstructorReturn(this, (MainBody.__proto__ || Object.getPrototypeOf(MainBody)).call(this, props));

    _this.resetResult = function () {
      _this.setState({ result: "" });
    };

    _this.getSearchData = function (event) {
      _this.searchData = event.target.value;
    };

    _this.getSearchData2 = function (event) {
      _this.searchData2 = event.target.value;
    };

    _this.getStockQuote = function () {
      fetch("https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=" + _this.searchData + "&datatype=json", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
          "x-rapidapi-key": stockKey
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        console.log(Object.keys(data["Global Quote"]).length);
        if (Object.keys(data["Global Quote"]).length == 0) {
          _this.setState({
            result: "Wrong symbol"
          });
        } else {
          _this.setState({
            result: React.createElement(
              "div",
              { className: "result" },
              React.createElement(
                "p",
                null,
                "Symbol: ",
                data["Global Quote"]["01. symbol"]
              ),
              React.createElement(
                "p",
                null,
                "Price: $",
                " ",
                Math.round(data["Global Quote"]["05. price"] * 100) / 100
              )
            )
          });
        }
      }).catch(function (err) {
        console.error(err);
      });
    };

    _this.getLove = function () {
      fetch("https://love-calculator.p.rapidapi.com/getPercentage?sname=" + _this.searchData2 + "&fname=" + _this.searchData, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "love-calculator.p.rapidapi.com",
          "x-rapidapi-key": loveKey
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        _this.setState({
          result: React.createElement(
            "div",
            { className: "result" },
            React.createElement(
              "p",
              null,
              "Love percentage: ",
              data["percentage"]
            ),
            React.createElement(
              "p",
              null,
              "result: ",
              data["result"]
            )
          )
        });
      }).catch(function (err) {
        console.error(err);
      });
    };

    _this.getSong = function () {
      _this.song(_this.searchData);
    };

    _this.state = {
      result: ""
    };
    return _this;
  }

  _createClass(MainBody, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProp, prevState) {
      if (prevProp.page !== this.props.page) {
        this.resetResult();
      }
    }
  }, {
    key: "song",
    value: function song(string) {
      var _this2 = this;

      fetch("https://genius.p.rapidapi.com/search?q=" + string, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "genius.p.rapidapi.com",
          "x-rapidapi-key": geniusKey
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        var x = data["response"]["hits"];
        console.log(x.map(function (song) {
          return React.createElement(
            "li",
            null,
            song["result"]["full_title"]
          );
        }));
        _this2.setState({
          result: x.map(function (song, i) {
            return React.createElement(
              "li",
              { key: i },
              " ",
              React.createElement(
                "a",
                { href: song["result"]["url"] },
                " ",
                song["result"]["full_title"]
              )
            );
          })
        });
      }).catch(function (err) {
        console.error(err);
      });
    }
  }, {
    key: "render",
    value: function render(props) {
      if (this.props.page == "stock") {
        body = React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            null,
            "Stock Quote"
          ),
          React.createElement("input", {
            type: "text",
            onChange: this.getSearchData,
            placeholder: "search for stock"
          }),
          React.createElement(
            "button",
            { onClick: this.getStockQuote },
            "submit"
          ),
          React.createElement("hr", null),
          this.state.result
        );
      } else if (this.props.page == "love") {
        body = React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            null,
            "Love Calculator"
          ),
          React.createElement("input", {
            type: "text",
            placeholder: "First person's name",
            onChange: this.getSearchData
          }),
          React.createElement("input", {
            type: "text",
            placeholder: "Second person's name",
            onChange: this.getSearchData2
          }),
          React.createElement(
            "button",
            { onClick: this.getLove },
            "submit"
          ),
          React.createElement("hr", null),
          this.state.result
        );
      } else if (this.props.page == "song") {
        {
          this.searchData = "";
        }
        body = React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            null,
            "Genius Lyric"
          ),
          React.createElement("input", {
            type: "text",
            className: "search",
            onChange: this.getSearchData,
            placeholder: "search for song"
          }),
          React.createElement(
            "button",
            { onClick: this.getSong },
            "submit"
          ),
          React.createElement("hr", null),
          React.createElement(
            "div",
            { className: "result" },
            React.createElement(
              "ol",
              null,
              this.state.result
            )
          )
        );
      }

      return React.createElement(
        "div",
        null,
        body
      );
    }
  }]);

  return MainBody;
}(React.Component);