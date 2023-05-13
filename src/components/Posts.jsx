import React, { useEffect, useState } from 'react';
import { useScreenSize } from '../hooks/useScreenSize';
import styled from 'styled-components';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch('./static/posts.json');
      setPosts(await data.json());
    };
    getData();
  }, []);
  const { isMobile } = useScreenSize();
  return (
    <Wrapper>
      {posts.map((post) => {
        return (
          <a href={post.url}>
            <div className="post">
              <img src={post.imageUrl} srcset={post.imageUrl} alt="" />
              <div className="category">{post.category}</div>
              <div className="title">{post.title}</div>
              <div className="details">
                <span className="author">{post.author}</span> •<span>{post.date}</span> •
                <span>{post.views}</span>
              </div>
              <p className="description">{post.description}</p>
            </div>
          </a>
        );
      })}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  font-family: Roboto;
  padding: 4rem 11rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 3rem 1.875rem;
  flex-wrap: wrap;
  @media only screen and (max-width: 960px) {
    padding: 1.75rem 5rem;
  }
  @media only screen and (max-width: 740px) {
    padding: 1.75rem 2.5rem;
  }
  a {
    text-decoration: none;
  }

  .post {
    width: 22rem;
    &:hover .title {
      text-decoration: underline;
    }
  }
  img {
    width: 22rem;
    height: 14.375rem;
    object-fit: cover;
  }
  .category {
    font-weight: 700;
    font-size: 0.8125rem;
    color: #eb0028;
    margin-top: 16px;
  }
  .title {
    font-weight: 700;
    font-size: 1.5rem;
    color: #000000;
    margin-top: 16px;
  }
  .details {
    font-weight: 400;
    font-size: 0.75rem;
    color: #9b9b9b;
    margin-top: 16px;
  }
  .author {
    font-weight: 500;
    color: #000000;
  }
  .description {
    margin-top: 16px;
    font-size: 0.875rem;
    line-height: 1.25rem;

    color: #929292;
    
  }
`;
