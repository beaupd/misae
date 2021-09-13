import Link from "next/link";

export default function Posts({ posts }) {
    setTimeout(() => {console.log("yea");return},3000);
    return (
        <div>
            <h1>POSTS</h1>
            <p>lorem ipsum dolor sit amet, consectetur adipiscinglorem ipsum dolor sit amet, consectetur adipiscinglorem ipsum dolor sit amet, consectetur adipiscinglorem ipsum dolor sit amet, consectetur adipiscing</p>
            {posts && posts.map((post) => (
                <Link href={`/posts/${post.slug}`} key={post.slug}>
                    <a>
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>
                    </a>
                </Link>
            ))}
        </div>
    );
}

export async function getStaticProps() {
    const res = await fetch(`${process.env.API_HOST}/posts`);
    const posts = await res.json();
    
    return {
        
        props: { posts },
    };
  }