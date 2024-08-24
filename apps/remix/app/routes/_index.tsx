import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";

import { remixCaller } from "@acme/api";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export async function loader({ request }: LoaderFunctionArgs) {
  const trpc = await remixCaller(request);
  const data = await trpc.post.prisma_all();

  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  return json({ data, env });
}

export default function Index() {
  const { data, env } = useLoaderData<typeof loader>();
  const supabase = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  return (
    <div className="p-4 font-sans">
      <button
        onClick={async () => {
          await supabase.auth.signInWithPassword({
            email: "",
            password: "",
          });
        }}
      >
        Login
      </button>
      {data?.map((post) => {
        return (
          <div>
            <h3 className="rounded-md bg-slate-200 text-center text-3xl text-slate-800">
              {post?.title}
            </h3>
            <div className="rounded-md bg-slate-100 p-6 text-slate-600">
              {post?.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
