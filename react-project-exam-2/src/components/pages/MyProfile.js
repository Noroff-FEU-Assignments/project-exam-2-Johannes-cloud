import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import banner from "../../images/banner.jpeg";
import profile from "../../images/profile.png";
import { BASE_API, PROFILES_PATH } from "../../constants/api";
import { OPTIONS } from "../../constants/options";
import NavBar from "../layout/Nav";

export default function MyProfile() {
  const [info, setInfo] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const getName = window.localStorage.getItem("name");
      const url = BASE_API + PROFILES_PATH + `${getName}`;
      const postUrl = url + `/posts`;
      try {
        const response = await axios.get(url, OPTIONS);
        const result = await axios.get(postUrl, OPTIONS);
        console.log("response", response.data);
        console.log("response", result.data);
        setInfo(response.data);
        setPosts(result.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    };
    fetchProfile();
  }, []);
  if (error) return <div>error</div>;
  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          <Card className="item" style={{ width: "auto" }}>
            <Card.Body className="profileFeedItem">
              {info.banner === null || info.banner === "" ? (
                <Card.Img
                  src={banner}
                  alt={info.author}
                  className="bannerImg"
                />
              ) : (
                <Card.Img
                  src={info.banner}
                  alt={info.author}
                  className="bannerImg"
                />
              )}

              {info.avatar === null || info.avatar === "" ? (
                <Card.Img
                  src={profile}
                  alt={info.name}
                  className="img-fluid rounded-circle"
                />
              ) : (
                <Card.Img
                  src={info.avatar}
                  alt={info.name}
                  className="img-fluid rounded-circle"
                />
              )}
              <div className="user">
                <Card.Title>{info.name}</Card.Title>
                <Card.Text>{info._count.followers} followers</Card.Text>
                <Card.Text>{info._count.following} following</Card.Text>
                <Link to="/editprofile">
                  <button className="btn">Edit profile</button>
                </Link>
              </div>
            </Card.Body>
            {posts.map((post) => (
              <Link to={`/post/${post.id}`} key={post.id}>
                <Card>
                  <Card.Body>
                    {post.media === null || post.media === "" ? (
                      <span></span>
                    ) : (
                      <Card.Img
                        src={post.media}
                        alt={post.title}
                        className="profileBanner"
                      />
                    )}
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.body}</Card.Text>
                    <Card.Text>{post._count.reactions} reactions</Card.Text>
                    <Card.Text>{post._count.comments} comments</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}
