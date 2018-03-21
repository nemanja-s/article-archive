//Main component for rendering in HTML
class App extends React.Component {
  state = {};

  dateHandler = (date) => {
    this.setState({
      year: date[0],
      month: date[1]
    })
  };

  render() {
    let articles = null;
    if(this.state.year) {
      articles = <Articles year={this.state.year} month={this.state.month} />
    }

    return(
      <Aux>
        <Header>
          <Selector getDate={this.dateHandler} />
        </Header>
        {articles}
      </Aux>
    )
  }
}

//Simple auxiliary component for wrapping JSX elements
const Aux = props => props.children;

//Full screen header section
const Header = props => (
  <header id="header" className="header">
    <div className="bg-video">
      <video className="bg-video__content" autoPlay muted loop>
        <source src="../img/NYC-Traffic.mp4" type="video/mp4" />
        <source src="../img/NYC-Traffic.webm" type="video/webm" />
        Your browser does not supported video background!
      </video>
    </div>
    <div className="bg-video__overlay" />
    <div className="header__logo-box">
      <img src="../img/logo.png" alt="logo" className="logo" />
    </div>
    <div className="header__text-box">
      <h1 className="heading-primary">
        <span className="heading-primary--main">
          Article Archive
        </span>
        <span className="heading-primary--sub">
          Explore more than 13 million NYT articles, since 1851 year!
        </span>
      </h1>
      {props.children}
    </div>
    <a href="#all-articles" className="header__scroll-box">
      <img src="../img/scroll.gif" alt="logo" id="scroll" className="scroll-icon" />
    </a>
  </header>
);

class Selector extends React.Component {
  // Checking validity of input values
  findArticles = () => {
    const currentYear = (new Date()).getFullYear();
    const currentMonth = (new Date()).getMonth() + 1;
    const choosenYear = parseInt(this.year.value);
    const choosenMonth = parseInt(this.month.value);
    if(this.year.value === "" || choosenYear < 1851 || choosenYear > currentYear){
      document.getElementById('msgAlert').innerHTML = "You must insert valid year...";
      return;
    }
    if(choosenYear === currentYear && choosenMonth > currentMonth){
      document.getElementById('msgAlert').innerHTML = "You must insert valid month...";
      return;
    }
    document.getElementById('msgAlert').innerHTML = "Loading...";
    document.getElementById('searchBtn').classList.add('not-active');
    //Send date to parent App component
    this.props.getDate([this.year.value, this.month.value]);
  };

  render() {
    return(
      <div className="header__submit">
        <p id="msgAlert">Please select year and month</p>
        <input
          type="number"
          id="year"
          name="year"
          min="1851"
          max="2018"
          maxLength="4"
          placeholder="e.g.1983"
          ref={(input) => this.year = input} />
        <select
          name="month"
          id="month"
          ref={(select) => this.month = select}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <a href="#" id="searchBtn" className="btn" onClick={this.findArticles}>Find articles</a>
      </div>
    )
  }
}

// Calling NYT Api and display search results
class Articles extends React.Component {
  state = {
    from: 0,
    to: 20,
    pageCounter: 1
  };

  // Change state data for using as props in LoadArticles component and loading "pages"
  nextPage = () => {
    this.setState({
      from: this.state.from + 20,
      to: this.state.to + 20,
      pageCounter: this.state.pageCounter + 1
    });
  };

  prevPage = () => {
    this.setState({
      from: this.state.from - 20,
      to: this.state.to - 20,
      pageCounter: this.state.pageCounter - 1
    });
  };

  componentDidMount() {
    const url = new URL(
      "https://api.nytimes.com/svc/archive/v1/" + this.props.year + "/" + this.props.month + ".json");
    url.searchParams.append("api-key", "74f9b23fb5884f49a5694562ff4a358b");
    const request = new Request(
      url,
      {
        method: "GET",
        mode: "cors"
      }
    );
    fetch(request)
      .then(response => response.json())
      .then(json => {
        this.setState({data: json})
      })
      .catch(error => {
        console.log(error);
        document.getElementById('msgAlert').innerHTML = "NYT archive doesn't respond. Please reload page and try again";
      });
  }

  render(){
    let loadArticles = null;
    let copyright = null;
    if(this.state.data) {
      loadArticles = <LoadArticles data={this.state.data} from={this.state.from} to={this.state.to}/>;
      copyright = this.state.data.copyright;
    }
    let prevButton = null;
    if(this.state.pageCounter > 1) {
      prevButton = <p><a href="#" className="btn-text" onClick={this.prevPage}>&larr; Prev page</a></p>;
    }

    return(
      <div className="main-container">
        <div className="results">
          <div className="heading-secondary">
            <h2 id="all-articles" className="heading-secondary--text">Your searched articles:</h2>
            <h2 className="heading-secondary--page">Page {this.state.pageCounter}</h2>
          </div>
          <div className="all-articles">
            {loadArticles}
          </div>
          <div className="all-articles__button">
            {prevButton}
            <p><a href="#" className="btn-text" onClick={this.nextPage}>Next page &rarr;</a></p>
          </div>
        </div>
        <div className="footer">
          <div className="footer_text-box">{copyright}<br/>Page built by Nemanja Stojanovic</div>
        </div>
      </div>
    )
  }
}

// Load and preview 20 new articles
const LoadArticles = (props) => {
  let newArticles = [];
  for(let i = props.from; i < props.to; i++){
    newArticles.push(<PreviewArticle key={props.data.response.docs[i]._id} doc={props.data.response.docs[i]}/>)
  }
  return <div>{newArticles}</div>
};

// Calling LinkPreview API and return stylized article with details on hover
class PreviewArticle extends React.Component {
  state = {};

  responseHandler = (json) => {
    this.setState({data: json});
    document.getElementById('msgAlert').innerHTML = "DONE! Scroll down or click on arrow";
    document.getElementById('searchBtn').classList.remove('not-active');
    document.getElementById('scroll').style.display = "block";
  };

  errorHandler = (error) => {
    document.getElementById('msgAlert').innerHTML =
      "Too many requests / rate limit exceeded. Try again later";
    document.getElementById('searchBtn').classList.add('not-active');
    console.log(error)
  };

  componentDidMount() {
    let previewUrl = this.props.doc.web_url;
    let apiUrl = new URL(
      "https://api.linkpreview.net?key=5aae148c02e21f14824353c448ef73fb76ccfe2c009e5&q=" + previewUrl);
    const request = new Request(
      apiUrl,
      {
        method: "GET",
      }
    );
    fetch(request)
      .then(response => response.json())
      .then(json => this.responseHandler(json))
      .catch(error => this.errorHandler(error));
  }

  // Return article box with image, title and description and also hidden div with details showing on hover
  render(){
    return(
      this.state.data ?
        <div className="article">
          <img className="article--image" src={this.state.data.image} />
          <div className="article--image--details">
            <p className="details__headline">
              {this.props.doc.headline.print_headline ? this.props.doc.headline.print_headline : this.props.doc.headline.main}
            </p>
            <p className="details__author">
              {this.props.doc.byline !== null ? this.props.doc.byline.original : null}
            </p>
            <p>Published: {this.props.doc.pub_date}</p>
            <p>Type of article: {this.props.doc.type_of_material}</p>
            <p>Total words: {this.props.doc.word_count}</p>
            <a className="btn-text" href={this.props.doc.web_url} target="_blank">Read Article</a>
          </div>
          <h2 className="article--title">{this.state.data.title}</h2>
          <p className="article--description">{this.state.data.description}</p>
        </div>
        : null
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));