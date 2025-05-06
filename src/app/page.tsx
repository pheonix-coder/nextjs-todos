import { db } from "@/db";
import { todosTable } from "@/db/schema";
import { Github } from "lucide-react";

export default async function Home() {
  const todos = await db.query.todosTable.findMany()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <li key={index} className="tracking-[-.01em]">
                {todo.content}
              </li>
            ))
          ) : (
            <li className="tracking-[-.01em] text-gray-500 italic">
              {`< No todos yet — create some! >`}
            </li>
          )}
        </ol>

        <form
          action={
            async (formData: FormData) => {
              "use server";

              // db.insert(todosTable).values({ content: String(formData.get("content")) })
              console.log({ content: String(formData.get("content")) })
            }
          }
          className="flex gap-4 items-center flex-col sm:flex-row">
          <input
            name="content"
            type="text"
            required
            placeholder="Enter task"
            className="rounded-full border border-black/[.08] dark:border-white/[.145] bg-background text-foreground transition-colors font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[200px] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />
          <button
            className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[120px]"
          >
            Add Task
          </button>
        </form>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/pheonix-coder"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github color="white" />
          Github
        </a>
      </footer>
    </div>
  );
}
