import Post from "../pages/posts/[slug]";
import { linkStyle } from "../styles/styles-utils";
import styled, { css } from "styled-components";
import Link from "next/link";

const Tags = styled.div`
  margin-bottom: 2.4rem;
  display: flex;
`;
const Tag = styled.a`
  margin-right: 1.3rem;
`;
const PostTags = ({ tags }) => (
  <Tags css={linkStyle}>
    {tags &&
      tags.map((tag) => (
        <Link as={`/tags/${tag}`} href="/tags/[tag]">
          <Tag># {tag}</Tag>
        </Link>
      ))}
  </Tags>
);
export default PostTags;
