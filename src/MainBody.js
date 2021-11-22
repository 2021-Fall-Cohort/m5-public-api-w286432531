class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
    };
  }

  apiData;
  searchData;
  searchData2;

  componentDidUpdate (prevProp, prevState) {
    if (prevProp.page !== this.props.page) {
      this.resetResult()
    }
  }
  
  resetResult = () => {
    this.setState({result:""});
  }
  getSearchData = (event) => {
    this.searchData = event.target.value;
  };
  getSearchData2 = (event) => {
    this.searchData2 = event.target.value;
  };
  getStockQuote = () => {
    fetch(
      `https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=${this.searchData}&datatype=json`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
          "x-rapidapi-key":
            stockKey,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
                console.log(data);
                console.log(Object.keys(data["Global Quote"]).length);
                if (Object.keys(data["Global Quote"]).length == 0) {
                  this.setState({
                    result: "Wrong symbol",
                  });
                } else {
                  this.setState({
                    result: (
                      <div className="result">
                        <p>Symbol: {data["Global Quote"]["01. symbol"]}</p>
                        <p>
                          Price: ${" "}
                          {Math.round(data["Global Quote"]["05. price"] * 100) /
                            100}
                        </p>
                      </div>
                    ),
                  });
                }
      }
        
      )
      .catch((err) => {
        console.error(err);
      });
  }
  getLove = () => {
    fetch(
      `https://love-calculator.p.rapidapi.com/getPercentage?sname=${this.searchData2}&fname=${this.searchData}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "love-calculator.p.rapidapi.com",
          "x-rapidapi-key": loveKey,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          result: (
            <div className="result">
              <p>Love percentage: {data["percentage"]}</p>
              <p>result: {data["result"]}</p>
            </div>
          ),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  getSong = () => {
    this.song(this.searchData);
  };
  song(string) {
    fetch(`https://genius.p.rapidapi.com/search?q=${string}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "genius.p.rapidapi.com",
        "x-rapidapi-key": geniusKey,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let x = data["response"]["hits"];
        console.log(x.map((song) => <li>{song["result"]["full_title"]}</li>));
        this.setState({
          result: x.map((song, i) => (
            <li key={i}>
              {" "}
              <a href={song["result"]["url"]}>
                {" "}
                {song["result"]["full_title"]}
              </a>
            </li>
          )),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render(props) {
    if (this.props.page == "stock") {
      body = (
        <div>
          <h1>Stock Quote</h1>
          <input
            type="text"
            onChange={this.getSearchData}
            placeholder="search for stock"
          />
          <button onClick={this.getStockQuote}>submit</button>
          <hr />
          {this.state.result}
        </div>
      );
    } else if (this.props.page == "love") {
      body = (
        <div>
          <h1>Love Calculator</h1>
          <input
            type="text"
            placeholder="First person's name"
            onChange={this.getSearchData}
          />
          <input
            type="text"
            placeholder="Second person's name"
            onChange={this.getSearchData2}
          />
          <button onClick={this.getLove}>submit</button>
          <hr />
          {this.state.result}
        </div>
      );
    } else if (this.props.page == "song") {
       {
         this.searchData = "";
       }
      body = (
        <div>
          <h1>Genius Lyric</h1>
          <input
            type="text"
            className="search"
            onChange={this.getSearchData}
            placeholder="search for song"
          />
          <button onClick={this.getSong}>submit</button>
          <hr />
          <div className="result">
            <ol>{this.state.result}</ol>
          </div>
        </div>
      );
    }

    return <div>{body}</div>;
  }
}
