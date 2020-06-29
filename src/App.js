import React from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer"
import MainContent from "./components/MainContent"
import r from './Login'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      defaultSubreddits: ['itookapicture', 'astrophotography', 'nocontextpics', 'houseplants'],
      postData: [],
      postProgressCounter: 0,
      delay: 10000
    }

    this.extractDataFromSubreddit = this.extractDataFromSubreddit.bind(this)

  }

  componentDidMount() {
    this.extractDataFromSubreddit(this.state.defaultSubreddits[Math.floor(Math.random() * this.state.defaultSubreddits.length)])
    //this.extractDataFromSubreddit('dogs')
  }

  // search reddit for subreddits which fit in with the user input and extract their data
  async extractDataFromSubreddit(userInput) {

    this.setState({loading: true})

    const possibleSubrredits = await r.searchSubreddits({query: userInput});
    const postData = [];
    let counter = 0;

    // Check if the subreddit has valid images, if not, repeat and check next best subreddit
    while(postData.length === 0){

      const postInformation = await r.getSubreddit(possibleSubrredits[counter].display_name).getNew();
      
      // Check which submissions have an image attached to them, push into new array
      for(const post of postInformation){
        if(post.url.match(/\.(jpeg|jpg|png)$/)){
          postData.push(post);
        }
      }

      counter++;

   }
    this.setState({ postData, loading: false});

    // Start the timer to change the image
    this.interval = setInterval(this.tick, this.state.delay);

    console.log(this.state.postData);
  }

  tick = () => {
     /*
    /* make sure the loop rolls back to the beginning
    /* the -1 is to prevent the progress to go 1 too far
    /* since arrays start at 0
    */
    if(this.state.postProgressCounter < this.state.postData.length - 1){
      this.setState({
        postProgressCounter: this.state.postProgressCounter + 1
      });
    } else {
      this.setState({
        postProgressCounter: 0
      });
    }
  }

  render() {

    const { postData, postProgressCounter } = this.state;

    // Make a global counter
    // send all the data [counter]

    return (
      <div>
        {postData.length > 0 && (
          <div>
             <Header postTitle={postData[postProgressCounter].title} postSubreddit={postData[postProgressCounter].subreddit.display_name}/>
             <MainContent postUrl={postData[postProgressCounter].url}/>
             <Footer postAuthor={postData[postProgressCounter].author.name}/>
           </div>
        )}
      </div>
    );
  }

}
