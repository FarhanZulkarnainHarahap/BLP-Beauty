import { notFound } from "next/navigation";
import { articlesService } from "@/services/articles.service";
export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article;
  try {
    article = (await articlesService.detail(slug)).data;
  } catch {
    return notFound();
  }
  return (
    <article className="shell py-16">
      <header className="mx-auto max-w-4xl text-center">
        <p className="eyebrow">
          {new Date(article.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h1 className="display mt-5 !text-[clamp(3rem,7vw,6.5rem)]">{article.title}</h1>
        {article.excerpt && (
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#6b5750]">
            {article.excerpt}
          </p>
        )}
      </header>
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt=""
          className="mt-12 aspect-[16/8] w-full rounded-[32px] object-cover"
        />
      )}
      <div className="prose-beauty mx-auto mt-12 max-w-2xl whitespace-pre-line">
        {article.content}
      </div>
    </article>
  );
}
