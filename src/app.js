class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "song",
    };
  }
  stockPage = () => this.setState({ page: "stock" });
  lovePage = () => this.setState({ page: "love" });
  songPage = () => this.setState({ page: "song" });
  render() {
    return (
      <div>
        <h1>Api project</h1>
        <nav>
          <ul className="nav">
            <li className="navbar-item" onClick={this.stockPage}>
              Stock Quote
            </li>
            <li className="navbar-item" onClick={this.lovePage}>
              Love Calculator
            </li>
            <li className="navbar-item" onClick={this.songPage}>
              Genius Lyric
            </li>
          </ul>
        </nav>
        <MainBody page={this.state.page} default = ''/>
      </div>
    );
  }
}