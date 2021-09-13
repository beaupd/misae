export default function Post({ post }) {
    return (
        <div>{post.content}</div>
    )
}

export async function getStaticPaths() {

    const res = await fetch(`${process.env.API_HOST}/posts`);
    const posts = await res.json();

    const paths = posts.map((post)=>({
        params: { slug: post.slug},
    }))

    return {
        paths,
        fallback:true,
    };
}

export async function getStaticProps({ params }) {
    const { slug } = params;

    await new Promise((resolve) => {setTimeout(resolve,1000)})

    const res = await fetch(`${process.env.API_HOST}/posts?slug=${slug}`);
    const data = await res.json();
    const post = data[0];

    return {
        props: { post },
    };
}