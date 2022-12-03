import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { FULL_API } from "../../constants/api";
import { OPTIONS } from "../../constants/options";
import NavBar from "../layout/Nav";

var url = FULL_API;

export default function Feed() {
  const [data, setData] = useState([]);

  url = url + `&limit=30&offset=0`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, OPTIONS);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1>What's the latest in our community</h1>
        <p className="centeredText">
          Here's what our developers have been up too recently:
        </p>
        {data.map((post) => (
          <Card className="item">
            <Link to={`/post/${post.id}`}>
              <Card.Body>
                <Link className="profile" to={`/profile/${post.author.name}`}>
                  {post.author.name}
                </Link>
                <div>
                  {post.media === null || post.media === "" ? (
                    <span></span>
                  ) : (
                    <Card.Img
                      className="feedImg"
                      src={post.media}
                      alt={post.title}
                    />
                  )}
                </div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text key={post.id}>{post.body}</Card.Text>
                <div className="reactionsAndComments">
                  <div className="reactions">
                    <Card.Text className="commentLength">
                      {post.reactions.length < 1 ? `0 reactions ` : ``}
                    </Card.Text>
                    {post.reactions.map((reaction, i) => (
                      <Card.Text className="emoji">{reaction.symbol}</Card.Text>
                    ))}
                  </div>
                  <Card.Text className="commentLength">
                    {post.comments.length === 1
                      ? `${post.comments.length} comment`
                      : `${post.comments.length} comments`}
                  </Card.Text>
                </div>
              </Card.Body>
            </Link>
            <Card className="reactionAndComment">
              <Link to={`/post/${post.id}`} className="btn">
                React
              </Link>
              <Link to={`/post/${post.id}`} className="btn">
                Comment
              </Link>
            </Card>
          </Card>
        ))}
      </div>
      <p className="centeredText">Ideally you would never reach here!</p>
    </div>
  );
}
