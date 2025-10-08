import { z } from "zod";
import { useEffect } from "react";

const postSchema = z.object({
  userId: z.number().positive().int(),
  id: z.number().positive().int(),
  title: z.string(),
  body: z.string(),
});

const postSchemaArray = z.array(postSchema); // schema for an array of posts

const ZodApi = () => {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => {
        const validatedPosts = postSchemaArray.safeParse(posts); // remember to use safeParse instead of parse

        if (validatedPosts.success === false) {
          console.log("Validation Error:", validatedPosts.error);
          return;
        }

        // we can now safely use the posts
        console.log(validatedPosts.data);
      });
  }, []);
  return <div>ZodApi</div>;
};

export default ZodApi;
